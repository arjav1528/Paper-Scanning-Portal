import { connectToDatabase } from '@/lib/mongodb';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { User } from '@/models/models';




  const getUserRoleFromEmail = (email: string) => {
    const domain = "@goa.bits-pilani.ac.in";

    if (!email.endsWith(domain)) {
      return "UNAUTHORIZED";
    }

    const localPart = email.slice(0, -domain.length);

    if (/^[a-zA-Z]+$/.test(localPart)) {
      return "PROFESSOR";
    }

    return "TA";
  }

export async function POST(req: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || process.env.SVIX_WEBHOOK;
    
    if (!WEBHOOK_SECRET) {
      console.error('Webhook secret not set');
      return new NextResponse('Webhook secret not set', { status: 500 });
    }

    const headerPayload = await headers();


    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing required Svix headers');
      return new NextResponse('Missing required headers', { status: 400 });
    }

    const payload = await req.text();
    
    const webhook = new Webhook(WEBHOOK_SECRET);
    
    let evt: WebhookEvent;
    
    try {
      evt = webhook.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new NextResponse('Error verifying webhook', { status: 400 });
    }

    const eventType = evt.type;
    
    console.log(`Webhook received: ${eventType}`);

    const client = (await connectToDatabase()).db("paper-scanning-software");
    const collection = client.collection('users');

    if (!collection) {
      console.error('Collection not found');
      return new NextResponse('Collection not found', { status: 500 });
    }

    if (eventType === 'user.created') {

      const existingUser = await collection.findOne({ clerkId: evt.data.id });
      if (existingUser) {
        console.log('User already exists:', existingUser);
        return new NextResponse('User already exists', { status: 200 });
      }

      const user : User = {
        clerkId : evt.data.id,
        name : evt.data.first_name || "",
        email : evt.data.email_addresses[0].email_address,
        imageUrl : evt.data.image_url,
        role : getUserRoleFromEmail(evt.data.email_addresses[0].email_address) as "TA" | "PROFESSOR" | "UNAUTHORIZED",
        courseIds : []
      }

      const result = await collection.insertOne({
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        role: user.role,
        courseIds: user.courseIds
      });
      if(result.acknowledged) {
        console.log('User created:', result.insertedId);
      }
      return new NextResponse('User created', { status: 200 });

      
    } else if (eventType === 'user.updated') {

      const clerkId = evt.data.id;
      
      if (!clerkId) {
        console.error('User ID not found in event data');
        return new NextResponse('User ID not found', { status: 400 });
      }
      
      const existingUser = await collection.findOne({ clerkId: clerkId });

      if (!existingUser) {
        console.error('User not found in database:', clerkId);
        return new NextResponse('User not found', { status: 404 });
      }
      
      const updatedUser: Partial<User> = {
        name: evt.data.first_name || existingUser.name,
        email: evt.data.email_addresses[0].email_address || existingUser.email,
        imageUrl: evt.data.image_url || existingUser.imageUrl,
        role: getUserRoleFromEmail(evt.data.email_addresses[0].email_address) as "TA" | "PROFESSOR" | "UNAUTHORIZED",
      };

      const result = await collection.updateOne(
        { clerkId: clerkId },
        { $set: updatedUser }
      );

      if (result.modifiedCount === 0) {
        console.error('No user updated:', clerkId);
        return new NextResponse('No user updated', { status: 200 });
      }

      return new NextResponse('User updated', { status: 200 });



    }

    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


