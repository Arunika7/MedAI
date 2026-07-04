"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Shield, Activity, Edit3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal and medical information.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit3 className="h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Main Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 ring-4 ring-blue-500/20 mb-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AX</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">Alex Johnson</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Patient ID: #MED-4829</p>
              
              <div className="w-full flex justify-center gap-2 mb-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-medium rounded-full">
                  Account Verified
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-xs font-medium rounded-full">
                  Premium
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="text-lg">Contact Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">alex.j@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">Born Jan 15, 1990</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Medical Details */}
        <div className="md:col-span-2 space-y-6">
          
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Basic Medical Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Blood Type</p>
                  <p className="text-lg font-semibold text-rose-500">O+</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Height</p>
                  <p className="text-lg font-semibold">178 cm</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Weight</p>
                  <p className="text-lg font-semibold">72 kg</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 font-medium mb-1">Gender</p>
                  <p className="text-lg font-semibold">Male</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-rose-500">
                <Shield className="h-5 w-5" />
                Allergies & Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">Known Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-medium rounded-lg border border-rose-100 dark:border-rose-800">
                    Penicillin
                  </span>
                  <span className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-medium rounded-lg border border-rose-100 dark:border-rose-800">
                    Peanuts
                  </span>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">Chronic Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-sm font-medium rounded-lg border border-amber-100 dark:border-amber-800">
                    Mild Asthma
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
