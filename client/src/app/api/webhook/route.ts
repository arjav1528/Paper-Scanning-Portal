import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'

export async function POST(req: NextRequest) {
  try{
    const ADD_USER_WEBHOOK = process.env.ADD_USER_WEBHOOK;
    if(!ADD_USER_WEBHOOK) {
      return new NextResponse('Webhook secret not set', { status: 500 })
    }

    const headerPayload = req.headers;
    const svix_id = headerPayload.get('svix-id');
    const svix_signature = headerPayload.get('svix-signature');
    const svix_timestamp = headerPayload.get('svix-timestamp');

    if(!svix_id || !svix_signature || !svix_timestamp) {
      return new NextResponse('Missing required headers', { status: 400 })
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const webhook = new Webhook(ADD_USER_WEBHOOK);
    const verified : any = webhook.verify(body, {
      id: svix_id,
      signature: svix_signature,
      timestamp: svix_timestamp,
    });

    if (!verified) {
      return new NextResponse('Invalid signature', { status: 401 })
    }
    const event = verified.data.id;
    const eventType = verified.data.type;

    if (eventType === 'user.created') {
      // Handle user created event
      console.log('User created event:', event);
    } else if (eventType === 'user.updated') {
      // Handle user updated event
      console.log('User updated event:', event);
    }

  }catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}