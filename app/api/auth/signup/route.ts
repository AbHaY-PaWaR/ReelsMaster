

import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/lib/db";
import User from "@/model/User";

export async function POST(request: NextRequest) {
  try {
    await connectdb();

    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 401 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 401 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    // Exclude password from response
    const userToReturn = { _id: newUser._id, name: newUser.name, email: newUser.email };

    return NextResponse.json({ message: "User registered succesfully", user: userToReturn }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
