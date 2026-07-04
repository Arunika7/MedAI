"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Save,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Settings
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("appearance");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "language", label: "Language", icon: Globe },
    { id: "devices", label: "Devices", icon: Smartphone },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Manage your account preferences, theme, and privacy settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              {tab.label}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Theme Preferences</CardTitle>
                    <CardDescription>Select how you want the application to look.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Light Theme Option */}
                      <div 
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-blue-300'}`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="p-3 bg-white border border-slate-200 rounded-full shadow-sm">
                          <Sun className="h-6 w-6 text-amber-500" />
                        </div>
                        <span className="font-medium">Light</span>
                      </div>

                      {/* Dark Theme Option */}
                      <div 
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-blue-300'}`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="p-3 bg-slate-900 border border-slate-700 rounded-full shadow-sm">
                          <Moon className="h-6 w-6 text-blue-400" />
                        </div>
                        <span className="font-medium">Dark</span>
                      </div>

                      {/* System Theme Option */}
                      <div 
                        className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all ${theme === 'system' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-800 hover:border-blue-300'}`}
                        onClick={() => setTheme('system')}
                      >
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm">
                          <Monitor className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                        </div>
                        <span className="font-medium">System</span>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input defaultValue="Alex" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input defaultValue="Johnson" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input defaultValue="alex.johnson@example.com" type="email" />
                    </div>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {["notifications", "privacy", "language", "devices"].includes(activeTab) && (
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800 h-64 flex flex-col items-center justify-center">
                <Settings className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4 animate-spin-slow" />
                <h3 className="text-lg font-medium text-slate-500">Settings Coming Soon</h3>
                <p className="text-sm text-slate-400 mt-1">This section is currently under development.</p>
              </Card>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}
