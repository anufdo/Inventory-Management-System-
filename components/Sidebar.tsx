"use client";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    Settings,
    ShoppingCart,
    Tags,
    Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/categories", label: "Categories", icon: Tags },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export default function Sidebar() {
  const pathname = usePathname() || "";
  return (
    <aside className="h-full bg-white px-4 py-8">
      <div className="mb-8">
        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">MAIN MENU</p>
      </div>
      <nav className="space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
