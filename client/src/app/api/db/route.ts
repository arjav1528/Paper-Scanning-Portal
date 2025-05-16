import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = (await connectToDatabase()).db("paper-scanning-software");
    const usersCollection = db.collection("users");
    
    // Fetch all users and convert to array
    const users = await usersCollection.find({}).toArray();
    
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
  }
}