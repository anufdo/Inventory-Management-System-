import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { orderSchema } from "@/lib/validation";

export async function GET() {
  await connectToDatabase();
  const items = await Order.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = orderSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  await connectToDatabase();
  const itemsWithPrice = [] as { productId: any; quantity: number; price: number }[];
  for (const it of parsed.data.items) {
    const product = await Product.findById(it.productId);
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 400 });
    if (product.stock < it.quantity) return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    product.stock -= it.quantity;
    await product.save();
    itemsWithPrice.push({ productId: product._id, quantity: it.quantity, price: product.price });
  }
  const totalAmount = itemsWithPrice.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const created = await Order.create({ customer: parsed.data.customer, items: itemsWithPrice, totalAmount });
  return NextResponse.json({ item: created }, { status: 201 });
}


