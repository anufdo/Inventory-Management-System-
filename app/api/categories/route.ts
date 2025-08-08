import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { categorySchema } from "@/lib/validation";

export async function GET() {
  await connectToDatabase();
  const items = await Category.find({}).sort({ name: 1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = categorySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  await connectToDatabase();
  const created = await Category.create(parsed.data);
  return NextResponse.json({ item: created }, { status: 201 });
}


