"use client";

import { motion } from "framer-motion";
import { 
  Activity, 
  MessageSquare, 
  Stethoscope, 
  FileText, 
  Droplets,
  Flame,
  Moon,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const quickActions = [
  { title: "Check Symptoms", icon: Stethoscope, href: "/dashboard/symptoms", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" },
  { title: "Medical Chat", icon: MessageSquare, href: "/dashboard/chat", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400" },
  { title: "Upload Report", icon: FileText, href: "/dashboard/reports", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" },
];

const healthData = [
  { day: 'Mon', score: 82 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 84 },
  { day: 'Thu', score: 88 },
  { day: 'Fri', score: 89 },
  { day: 'Sat', score: 92 },
  { day: 'Sun', score: 92 },
];

const heartRateData = [
  { time: '6am', bpm: 62 },
  { time: '9am', bpm: 75 },
  { time: '12pm', bpm: 82 },
  { time: '3pm', bpm: 78 },
  { time: '6pm', bpm: 85 },
  { time: '9pm', bpm: 70 },
  { time: '12am', bpm: 64 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8 pb-8">
      
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gradient">Good Morning, Alex</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium text-lg">Here is your health summary for today.</p>
        </div>
        <Link href="/dashboard/chat">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </Link>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className="glass-card cursor-pointer group">
              <CardHeader className="flex flex-row items-center gap-4 py-4">
                <div className={`p-3 rounded-2xl ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-xs mt-1 flex items-center text-slate-500">
                    Get started <ArrowUpRight className="ml-1 h-3 w-3" />
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* AI Health Score & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Score Card with Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 flex flex-col gap-6"
        >
          <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-0 shadow-xl shadow-blue-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Activity className="h-32 w-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-white/90 font-medium text-lg">AI Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4">
                <span className="text-6xl font-bold tracking-tighter">92</span>
                <span className="text-blue-100 font-medium mb-2 text-lg">/100</span>
              </div>
              <p className="mt-4 text-blue-50 leading-relaxed text-sm">
                Your health score is excellent. Your recent vitals are stable, and you&apos;ve met your activity goals for 4 consecutive days.
              </p>
            </CardContent>
          </Card>

          {/* Health Score Trend Chart */}
          <Card className="glass-card flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Health Score Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[150px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={healthData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Small Metrics Grid & Heart Rate */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2 font-medium">
                  <Flame className="h-4 w-4 text-orange-500" /> Active Calories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">640 <span className="text-sm font-normal text-slate-500">kcal</span></div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '75%' }} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2 font-medium">
                  <Droplets className="h-4 w-4 text-cyan-500" /> Hydration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 <span className="text-sm font-normal text-slate-500">/ 2.5 L</span></div>
                <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '48%' }} />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card col-span-2 sm:col-span-1">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2 font-medium">
                  <Moon className="h-4 w-4 text-indigo-500" /> Sleep Analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7h 24m</div>
                <p className="text-xs text-emerald-500 mt-1 flex items-center font-medium">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card col-span-2 sm:col-span-1">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2 font-medium">
                  <Activity className="h-4 w-4 text-rose-500" /> Avg Heart Rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-end gap-1">
                  72 <span className="text-sm font-normal text-slate-500 mb-1">bpm</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">Resting: 64 bpm</p>
              </CardContent>
            </Card>
          </div>

          {/* Heart Rate Chart */}
          <Card className="glass-card flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Heart Rate History</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={heartRateData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="bpm" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

      </div>

    </div>
  );
}
