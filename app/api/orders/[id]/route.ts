import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";

export async function GET(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  await connectToDatabase();
  const item = await Order.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function DELETE(_: Request, context: unknown) {
  const { params } = context as { params: { id: string } };
  await connectToDatabase();
  const deleted = await Order.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}


