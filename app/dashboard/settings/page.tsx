import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Database, Palette, Settings, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure your application preferences and system settings</p>
      </div>

      {/* Settings Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              Database
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage database connections and backups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Configure your database settings, run backups, and monitor connection status.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-600" />
              Notifications
            </CardTitle>
            <CardDescription className="text-gray-600">
              Control notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Set up email alerts, low stock notifications, and system alerts.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Security
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Configure user permissions, API keys, and security policies.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-600" />
              Appearance
            </CardTitle>
            <CardDescription className="text-gray-600">
              Customize the look and feel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Adjust branding, colors, and layout preferences for your organization.</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-soft hover:shadow-lg transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              General
            </CardTitle>
            <CardDescription className="text-gray-600">
              Basic application settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Configure general application behavior, locale, and system preferences.</p>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="text-center">
            <Settings className="mx-auto h-12 w-12 text-emerald-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuration Coming Soon</h3>
            <p className="text-gray-600">
              Advanced settings and configuration options will be available in future updates. 
              Stay tuned for more customization features!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


