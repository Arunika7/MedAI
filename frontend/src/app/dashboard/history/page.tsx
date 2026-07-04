"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  History, 
  Search, 
  Filter, 
  MessageSquare, 
  Stethoscope, 
  FileText, 
  MoreHorizontal,
  Download,
  Trash2,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const HISTORY_DATA = [
  {
    id: "1",
    type: "chat",
    title: "Headache and fatigue consultation",
    date: "Today, 10:30 AM",
    preview: "I understand you're experiencing some symptoms...",
    icon: MessageSquare,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: "2",
    type: "symptom",
    title: "Symptom Check: Fever",
    date: "Yesterday, 04:15 PM",
    preview: "Analysis complete. Moderate risk detected for Viral Infection.",
    icon: Stethoscope,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: "3",
    type: "report",
    title: "Blood Test Results Analysis",
    date: "Oct 12, 2023",
    preview: "Your Vitamin D levels are slightly below normal range.",
    icon: FileText,
    color: "text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    id: "4",
    type: "chat",
    title: "Dietary plan for mild asthma",
    date: "Sep 28, 2023",
    preview: "Here are some anti-inflammatory foods you can include...",
    icon: MessageSquare,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  }
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = HISTORY_DATA.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medical History</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Review your past consultations, symptom checks, and reports.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search history..." 
            className="pl-9 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto gap-2 bg-white dark:bg-slate-950">
            <Filter className="h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" className="w-full sm:w-auto gap-2 bg-white dark:bg-slate-950">
            <Calendar className="h-4 w-4" /> Date Range
          </Button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <History className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p>No history records found matching &quot;{searchQuery}&quot;</p>
          </div>
        ) : (
          filteredData.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.id}
            >
              <Card className="hover:shadow-md transition-shadow group bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-800 overflow-hidden cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex items-center p-4 sm:p-6 gap-4 sm:gap-6">
                    
                    {/* Icon */}
                    <div className={`h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl flex items-center justify-center ${item.bgColor} ${item.color}`}>
                      <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {item.type}
                        </Badge>
                        <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-1">
                        {item.preview}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="shrink-0 flex items-center">
                      <span className="text-xs text-slate-400 font-medium sm:hidden block mb-8 mr-2">
                        {item.date.split(',')[0]}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200" })}>
                          <MoreHorizontal className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Continue Chat</DropdownMenuItem>
                          <DropdownMenuItem><Download className="mr-2 h-4 w-4" /> Download PDF</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
