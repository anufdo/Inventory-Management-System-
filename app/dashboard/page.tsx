import { connectToDatabase } from "@/lib/db";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

async function getStats() {
  await connectToDatabase();
  const [productCount, lowStockCount, stockValueAgg, todayOrders] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ stock: { $lt: 5 } }),
    Product.aggregate([{ $group: { _id: null, value: { $sum: { $multiply: ["$price", "$stock"] } } } }]),
    Order.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
  ]);
  const stockValue = stockValueAgg[0]?.value || 0;
  return { productCount, lowStockCount, stockValue, todayOrders };
}

export default async function DashboardPage() {
  const stats = await getStats();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-600">Total Products</div>
        <div className="text-2xl font-semibold">{stats.productCount}</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-600">Stock Value</div>
        <div className="text-2xl font-semibold">${stats.stockValue.toFixed(2)}</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-600">Orders Today</div>
        <div className="text-2xl font-semibold">{stats.todayOrders}</div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-sm text-gray-600">Low Stock Items</div>
        <div className="text-2xl font-semibold">{stats.lowStockCount}</div>
      </div>
    </div>
  );
}


