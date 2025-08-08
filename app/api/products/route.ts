import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { productSchema } from "@/lib/validation";

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 50);
  const filter: Record<string, unknown> = q ? { name: { $regex: q, $options: "i" } } : {};
  const [items, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);
  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  await connectToDatabase();
  const created = await Product.create(parsed.data);
  return NextResponse.json({ item: created }, { status: 201 });
}


