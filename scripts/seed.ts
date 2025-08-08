import 'dotenv/config';
import { connectToDatabase } from "@/lib/db";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { hash } from "bcryptjs";

async function run() {
  await connectToDatabase();

  await Promise.all([Category.deleteMany({}), Product.deleteMany({}), User.deleteMany({})]);

  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: await hash("admin123", 10),
    role: "ADMIN",
  });

  const cat1 = await Category.create({ name: "Electronics" });
  const cat2 = await Category.create({ name: "Accessories" });

  await Product.create([
    { name: "Laptop", categoryId: cat1._id, price: 999, stock: 10 },
    { name: "Mouse", categoryId: cat2._id, price: 25, stock: 3 },
  ]);

  // eslint-disable-next-line no-console
  console.log("Seed completed. Admin: admin@example.com / admin123");
}

run().then(() => process.exit(0)).catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});


