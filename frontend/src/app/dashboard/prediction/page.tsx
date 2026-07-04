"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Dna, 
  Heart, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PredictionPage() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    // Simulate API call to AI Prediction Model
    setTimeout(() => {
      setIsPredicting(false);
      setShowResult(true);
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Disease Prediction</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Enter your vital health metrics to receive an AI-powered risk assessment for common conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" /> 
                Health Metrics
              </CardTitle>
              <CardDescription>
                Provide as much information as possible for an accurate assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePredict} className="space-y-6">
                
                {/* Vitals */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Basic Vitals</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age (years)</Label>
                      <Input type="number" placeholder="e.g. 45" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <select className="flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 dark:border-slate-800 dark:focus-visible:ring-blue-500" required>
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>BMI</Label>
                      <Input type="number" step="0.1" placeholder="e.g. 24.5" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Blood Pressure (Systolic)</Label>
                      <Input type="number" placeholder="e.g. 120" required />
                    </div>
                  </div>
                </div>

                {/* Blood Work */}
                <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Blood Work (Optional)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Glucose Level (mg/dL)</Label>
                      <Input type="number" placeholder="e.g. 95" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cholesterol (mg/dL)</Label>
                      <Input type="number" placeholder="e.g. 180" />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={isPredicting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md shadow-blue-500/20"
                >
                  {isPredicting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Analyzing Metrics...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Run AI Prediction Model <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Sidebar */}
        <div className="lg:col-span-1">
          {showResult ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800 overflow-hidden sticky top-24">
                <div className="h-2 w-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <ShieldAlert className="h-5 w-5" />
                    Assessment Ready
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Heart Disease Risk</span>
                      <span className="text-emerald-600 font-bold text-sm">Low (12%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[12%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">Type 2 Diabetes Risk</span>
                      <span className="text-amber-500 font-bold text-sm">Moderate (45%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[45%] rounded-full" />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                    <h4 className="font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-400 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      AI Recommendation
                    </h4>
                    <p className="text-sm text-blue-600/80 dark:text-blue-300/80 leading-relaxed">
                      Your metrics look generally healthy. However, your BMI and Glucose levels suggest a slight risk for Type 2 Diabetes. Consider incorporating 30 minutes of daily cardio.
                    </p>
                  </div>
                  
                  <Button variant="outline" className="w-full" onClick={() => setShowResult(false)}>
                    Reset Assessment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800 h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6 border-dashed">
              <Dna className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4 animate-pulse" />
              <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400">Awaiting Data</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                Fill out the metrics form and run the model to see your AI-generated health prediction.
              </p>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
}
