import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { categorySchema } from "@/lib/validation";

export async function GET(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  await connectToDatabase();
  const item = await Category.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  const json = await request.json();
  const parsed = categorySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  await connectToDatabase();
  const updated = await Category.findByIdAndUpdate(params.id, parsed.data, { new: true });
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  await connectToDatabase();
  const deleted = await Category.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}


