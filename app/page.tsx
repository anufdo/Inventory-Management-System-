import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl">
            <Package className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gray-900">
              Inventory Management
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your business operations with our modern, intuitive inventory management system. 
              Track products, manage orders, and grow your business efficiently.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg text-lg px-8 py-4">
              <Link href="/dashboard" className="flex items-center gap-2">
                Open Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-200 hover:bg-gray-50 text-lg px-8 py-4">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Management</h3>
              <p className="text-sm text-gray-600">Organize and track your entire product catalog with ease</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-sm text-gray-600">Get insights into your business with detailed analytics</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Processing</h3>
              <p className="text-sm text-gray-600">Streamline your order fulfillment process</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600">Control access and manage team permissions</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 border-0 shadow-xl">
          <CardContent className="p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-emerald-100 mb-6 text-lg">
              Join thousands of businesses using our platform to manage their inventory efficiently.
            </p>
            <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 shadow-lg">
              <Link href="/dashboard" className="flex items-center gap-2">
                Launch Dashboard
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
