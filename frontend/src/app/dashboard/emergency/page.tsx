"use client";

import { motion } from "framer-motion";
import { 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Heart, 
  Activity,
  Ambulance,
  PhoneCall,
  Stethoscope
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EMERGENCY_CONTACTS = [
  { name: "Emergency Services", number: "911", icon: Ambulance, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" },
  { name: "Poison Control", number: "1-800-222-1222", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { name: "Primary Care Doctor", number: "555-0199", icon: Stethoscope, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/30" },
];

const FIRST_AID_GUIDES = [
  {
    title: "CPR (Cardiopulmonary Resuscitation)",
    desc: "1. Call 911 immediately.\n2. Push hard and fast in the center of the chest (100-120 pushes a minute).\n3. Allow chest to come back up to its normal position after each push.",
    icon: Heart
  },
  {
    title: "Choking (Heimlich Maneuver)",
    desc: "1. Stand behind the person and wrap arms around waist.\n2. Make a fist just above their navel.\n3. Grab fist with other hand and give quick, upward thrusts.",
    icon: Activity
  }
];

export default function EmergencyPage() {
  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-12 w-12 bg-red-100 dark:bg-red-900/40 rounded-2xl flex items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-500">Emergency Center</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Immediate resources for medical emergencies. If this is a life-threatening emergency, call 911 immediately.
          </p>
        </div>
      </div>

      {/* SOS Button */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 bg-red-600 dark:bg-red-700 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl shadow-red-600/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-24 w-24 bg-white text-red-600 rounded-full flex items-center justify-center shadow-inner mb-6 ring-8 ring-red-500/50">
            <PhoneCall className="h-10 w-10 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-red-100 text-lg max-w-xl mx-auto mb-8">
            Press the button below to instantly dial emergency services and share your medical profile and current location.
          </p>
          <Button size="lg" className="bg-white text-red-600 hover:bg-slate-50 rounded-full px-12 h-14 text-lg font-bold shadow-xl">
            CALL 911 NOW
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Quick Contacts */}
        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>Tap to call immediately</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-slate-300 dark:hover:border-slate-700 transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${contact.bg} ${contact.color}`}>
                    <contact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{contact.name}</h4>
                    <p className="text-sm font-medium text-slate-500">{contact.number}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-slate-50 dark:bg-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-800">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* First Aid */}
        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
          <CardHeader>
            <CardTitle>First Aid Reference</CardTitle>
            <CardDescription>Quick steps for common emergencies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {FIRST_AID_GUIDES.map((guide, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <guide.icon className="h-4 w-4 text-emerald-500" />
                  {guide.title}
                </h4>
                <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed pl-6">
                  {guide.desc}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
