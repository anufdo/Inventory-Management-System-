import { LogoutButton } from "@/components/LogoutButton";
import Sidebar from "@/components/Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authConfig } from "@/lib/auth";
import { Bell, Search } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Button variant="outline" asChild>
          <a href="/login">Sign in</a>
        </Button>
      </div>
    );
  }
  const userName = session.user.name || "User";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <Link href="/dashboard" className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
              Inventory
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products, orders..."
                className="w-80 pl-10 bg-white border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
              />
            </div>
            <Button variant="outline" size="icon" className="relative border-gray-200 hover:bg-gray-50">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Avatar className="h-10 w-10 ring-2 ring-emerald-100">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <div className="w-72 bg-white border-r border-gray-200 shadow-sm">
          <Sidebar />
        </div>
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
