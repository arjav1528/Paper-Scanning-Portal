import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';

export async function POST(req: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || process.env.SVIX_WEBHOOK;
    
    if (!WEBHOOK_SECRET) {
      console.error('Webhook secret not set');
      return new NextResponse('Webhook secret not set', { status: 500 });
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing required Svix headers');
      return new NextResponse('Missing required headers', { status: 400 });
    }

    // Get the body
    const payload = await req.text();
    
    // Create a new Svix instance with your secret
    const webhook = new Webhook(WEBHOOK_SECRET);
    
    let evt: WebhookEvent;
    
    // Verify the payload with the headers
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

    // Get the event type
    const eventType = evt.type;
    
    console.log(`Webhook received: ${eventType}`);

    if (eventType === 'user.created') {
      // Handle user created event
      console.log('User created event:', evt.data);
      return new NextResponse('User created event received', { status: 200 });
    } else if (eventType === 'user.updated') {
      // Handle user updated event
      console.log('User updated event:', evt.data);
      return new NextResponse('User updated event received', { status: 200 });
    }

    // Return a response to acknowledge receipt of the event
    return new NextResponse('Webhook received', { status: 200 });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}