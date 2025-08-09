import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { connectToDatabase } from "@/lib/db";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { AlertTriangle, DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp } from "lucide-react";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here&apos;s what&apos;s happening with your inventory.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Products</CardTitle>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.productCount}</div>
            <div className="flex items-center space-x-2 text-sm">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <TrendingUp className="mr-1 h-3 w-3" />
                +2.5%
              </Badge>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Revenue</CardTitle>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">${stats.stockValue.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-sm">
              <Badge className="bg-green-100 text-green-700 border-green-200">
                <TrendingUp className="mr-1 h-3 w-3" />
                +4.3%
              </Badge>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Orders Today</CardTitle>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.todayOrders}</div>
            <div className="flex items-center space-x-2 text-sm">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                <TrendingUp className="mr-1 h-3 w-3" />
                +1.8%
              </Badge>
              <span className="text-gray-500">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Low Stock Alert</CardTitle>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.lowStockCount}</div>
            <div className="flex items-center space-x-2 text-sm">
              <Badge className="bg-red-100 text-red-700 border-red-200">
                <TrendingDown className="mr-1 h-3 w-3" />
                -0.5%
              </Badge>
              <span className="text-gray-500">needs attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-white border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Sales Overview</CardTitle>
            <CardDescription className="text-gray-600">Your sales performance this week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-end justify-center space-x-4 px-4">
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-32 flex items-end justify-center pb-3 shadow-lg">
                <span className="text-xs text-white font-semibold">Mon</span>
              </div>
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-24 flex items-end justify-center pb-3 shadow-lg opacity-75">
                <span className="text-xs text-white font-semibold">Tue</span>
              </div>
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-40 flex items-end justify-center pb-3 shadow-lg">
                <span className="text-xs text-white font-semibold">Wed</span>
              </div>
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-20 flex items-end justify-center pb-3 shadow-lg opacity-60">
                <span className="text-xs text-white font-semibold">Thu</span>
              </div>
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-48 flex items-end justify-center pb-3 shadow-lg">
                <span className="text-xs text-white font-semibold">Fri</span>
              </div>
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-36 flex items-end justify-center pb-3 shadow-lg opacity-85">
                <span className="text-xs text-white font-semibold">Sat</span>
              </div>
              <div className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg w-12 h-28 flex items-end justify-center pb-3 shadow-lg opacity-50">
                <span className="text-xs text-white font-semibold">Sun</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-white border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">Latest updates in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-100"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">New product added</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-100"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">Order #1234 processed</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full ring-4 ring-orange-100"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">Low stock alert</p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full ring-4 ring-purple-100"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">Category updated</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-100"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-900">System backup completed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


