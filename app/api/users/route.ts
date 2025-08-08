import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { userSchema } from "@/lib/validation";
import { hash } from "bcryptjs";

export async function GET() {
  await connectToDatabase();
  const items = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = userSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  await connectToDatabase();
  const exists = await User.findOne({ email: parsed.data.email });
  if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 400 });
  const hashed = await hash(parsed.data.password, 10);
  const created = await User.create({ ...parsed.data, password: hashed });
  return NextResponse.json({ item: { _id: created._id, name: created.name, email: created.email, role: created.role } }, { status: 201 });
}


