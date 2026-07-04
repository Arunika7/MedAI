"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Activity, 
  MessageSquare, 
  Stethoscope, 
  Pill, 
  Dna, 
  FileText, 
  History, 
  AlertCircle, 
  Settings, 
  Menu,
  X,
  Bell,
  Search,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Activity },
  { name: 'Medical Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Symptom Checker', href: '/dashboard/symptoms', icon: Stethoscope },
  { name: 'Disease Prediction', href: '/dashboard/prediction', icon: Dna },
  { name: 'Medicine Info', href: '/dashboard/medicines', icon: Pill },
  { name: 'Reports OCR', href: '/dashboard/reports', icon: FileText },
  { name: 'Previous Chats', href: '/dashboard/history', icon: History },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="flex h-screen overflow-hidden text-slate-900 dark:text-slate-50">
          
          {/* Mobile sidebar backdrop */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 h-16 px-6 border-b border-slate-200 dark:border-slate-800">
              <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl tracking-tight">MedAI</span>
              <button 
                className="ml-auto lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-50'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <Link
                href="/dashboard/emergency"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
                Emergency Section
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                <Settings className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                Settings
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* Top Navbar */}
            <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 -ml-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Menu className="h-5 w-5" />
                </button>
                
                {/* Search */}
                <div className="hidden sm:flex relative w-96 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                  <Input 
                    placeholder="Search medical knowledge..." 
                    className="pl-9 bg-slate-100 dark:bg-slate-800/50 border-transparent focus-visible:ring-blue-500/20 focus-visible:border-blue-500 rounded-full h-10 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                </Button>
                
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1" />
                
                <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition-all">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="mx-auto max-w-6xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
