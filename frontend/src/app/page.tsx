"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Brain, HeartPulse } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-blue-500/30 overflow-hidden flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl tracking-tight">MedAI</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" className="font-medium hidden md:inline-flex">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-32 pb-16 px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Next Generation AI Medical Assistant
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Your Health, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Empowered by AI.</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl">
                Experience the future of healthcare. MedAI combines advanced artificial intelligence with deep medical knowledge to provide instant, trustworthy health insights 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-blue-500/20">
                    Try MedAI Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 text-base border-slate-300 dark:border-slate-700">
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                  HIPAA Compliant
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Powered by LLMs
                </div>
              </div>
            </motion.div>

            {/* Right Content - Abstract Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/10 via-cyan-400/10 to-teal-400/10 dark:from-blue-500/5 dark:via-cyan-400/5 dark:to-teal-400/5 blur-3xl rounded-full -z-10" />
              
              {/* Main Glass Card */}
              <div className="relative w-full max-w-md backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 border border-white/60 dark:border-slate-800 p-8 rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Diagnosis</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Analyzing symptoms...</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 ${i % 2 === 0 ? 'bg-slate-200 dark:bg-slate-800' : 'bg-blue-600'}`} />
                      <div className="flex-1 space-y-2 py-1">
                        <div className={`h-2 rounded-full ${i % 2 === 0 ? 'bg-slate-200 dark:bg-slate-800 w-3/4' : 'bg-blue-600/20 dark:bg-blue-400/20 w-full'}`} />
                        <div className={`h-2 rounded-full ${i % 2 === 0 ? 'bg-slate-200 dark:bg-slate-800 w-1/2' : 'bg-blue-600/20 dark:bg-blue-400/20 w-5/6'}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Confidence Score</span>
                    <span className="text-emerald-500 flex items-center gap-1">98.5%</span>
                  </div>
                  <div className="mt-3 h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "98.5%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" 
                    />
                  </div>
                </div>
              </div>

              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 -bottom-8 backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border border-white/80 dark:border-slate-700 p-4 rounded-2xl shadow-xl flex items-center gap-3 hidden sm:flex"
              >
                <div className="h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Vitals Stable</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Updated just now</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
