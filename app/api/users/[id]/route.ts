import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { userSchema } from "@/lib/validation";
import { hash } from "bcryptjs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const item = await User.findById(params.id, { password: 0 }).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const json = await request.json();
  const parsed = userSchema.partial().safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  await connectToDatabase();
  const data: any = { ...parsed.data };
  if (data.password) {
    data.password = await hash(data.password, 10);
  }
  const updated = await User.findByIdAndUpdate(params.id, data, { new: true, select: "-password" });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const deleted = await User.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}


