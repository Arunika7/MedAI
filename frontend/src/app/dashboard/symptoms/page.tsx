"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  Activity, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  User,
  ActivitySquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STEPS = [
  { id: 'patient', title: 'Patient Profile' },
  { id: 'symptoms', title: 'Symptoms' },
  { id: 'details', title: 'Severity & History' },
  { id: 'analysis', title: 'Analysis' }
];

export default function SymptomChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNext = () => {
    if (currentStep === 2) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(prev => prev + 1);
      }, 3000);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Identify possible conditions and get recommended next steps based on your symptoms.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          />
          
          {STEPS.map((step, idx) => {
            const isActive = idx === currentStep;
            const isPast = idx < currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900' 
                      : isPast 
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                >
                  {isPast ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-xl border-slate-200/60 dark:border-slate-800 overflow-hidden">
        <div className="relative min-h-[400px]">
          {isAnalyzing && (
            <div className="absolute inset-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 rounded-full border-t-2 border-blue-600 animate-spin" />
                <div className="absolute inset-2 rounded-full border-r-2 border-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                <Activity className="absolute inset-0 m-auto h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Analyzing Symptoms</h3>
              <p className="text-slate-500 mt-2">Consulting medical knowledge base...</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8"
            >
              
              {/* Step 1: Patient Profile */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-6">
                    <User className="h-6 w-6" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Basic Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Age</Label>
                      <Input type="number" placeholder="e.g. 35" className="h-12" />
                    </div>
                    <div className="space-y-3">
                      <Label>Gender</Label>
                      <select className="flex h-12 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-slate-800 dark:focus-visible:ring-blue-500">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Symptoms */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-6">
                    <Stethoscope className="h-6 w-6" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Describe Symptoms</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>What are you experiencing?</Label>
                    <textarea 
                      className="flex w-full rounded-xl border border-slate-200 bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:focus-visible:ring-blue-500 min-h-[120px] resize-none"
                      placeholder="e.g., I have a headache, slight fever, and feel tired..."
                    />
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea'].map(symptom => (
                        <div key={symptom} className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          + {symptom}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-6">
                    <ActivitySquare className="h-6 w-6" />
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Severity & History</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="flex justify-between">
                        <span>Pain/Discomfort Level</span>
                        <span className="text-blue-600 font-medium">6/10</span>
                      </Label>
                      <input type="range" min="1" max="10" defaultValue="6" className="w-full accent-blue-600" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Mild</span>
                        <span>Severe</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Label>Duration</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Today', '1-3 Days', '1 Week', 'Longer'].map(duration => (
                          <div key={duration} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center text-sm cursor-pointer hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                            {duration}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Analysis Result */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-2">
                    <CheckCircle2 className="h-8 w-8" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analysis Complete</h2>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-xl p-4 flex gap-4">
                    <AlertTriangle className="h-6 w-6 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300">Moderate Risk Detected</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-400 mt-1 leading-relaxed">
                        Based on your symptoms, we recommend consulting a general physician within the next 48 hours. If you experience difficulty breathing, seek emergency care immediately.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b border-slate-100 dark:border-slate-800 pb-2">Possible Conditions</h3>
                    
                    {[
                      { name: 'Viral Infection', confidence: 85, color: 'bg-emerald-500' },
                      { name: 'Seasonal Allergies', confidence: 45, color: 'bg-blue-500' },
                      { name: 'Migraine', confidence: 30, color: 'bg-slate-400' }
                    ].map(condition => (
                      <div key={condition.name} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">{condition.name}</span>
                          <span className="text-slate-500">{condition.confidence}% Match</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${condition.confidence}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${condition.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex justify-between items-center">
          {currentStep > 0 && currentStep < STEPS.length - 1 ? (
            <Button variant="ghost" onClick={handlePrev} disabled={isAnalyzing}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}
          
          {currentStep < STEPS.length - 1 ? (
            <Button 
              onClick={handleNext} 
              disabled={isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 px-8"
            >
              {currentStep === 2 ? 'Analyze Symptoms' : 'Continue'} 
              {currentStep !== 2 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          ) : (
            <div className="flex gap-3 w-full justify-end">
              <Button variant="outline" onClick={() => setCurrentStep(0)}>Start Over</Button>
              <Link href="/dashboard/doctors">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Find a Doctor</Button>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
