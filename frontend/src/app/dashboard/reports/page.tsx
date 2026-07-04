"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  X, 
  AlertCircle,
  FileSearch,
  ScanText
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function ReportsOCR() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "ocr" | "analyzing" | "complete">("idle");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    // Only accept basic image or pdf for demo
    if (selectedFile.type.startsWith("image/") || selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUploadState("idle");
      setProgress(0);
    } else {
      alert("Please upload a valid image or PDF file.");
    }
  };

  const processFile = () => {
    if (!file) return;
    
    // Simulate pipeline: Upload -> OCR -> LLM Analysis -> Complete
    setUploadState("uploading");
    setProgress(0);

    const stages = [
      { state: "uploading", limit: 30, time: 800 },
      { state: "ocr", limit: 70, time: 2000 },
      { state: "analyzing", limit: 95, time: 2500 },
      { state: "complete", limit: 100, time: 500 }
    ];

    let currentLimit = 0;
    let currentStage = 0;

    const interval = setInterval(() => {
      setProgress(prev => {
        const target = stages[currentStage].limit;
        if (prev < target) {
          return prev + 1;
        } else {
          currentStage++;
          if (currentStage >= stages.length) {
            clearInterval(interval);
            setUploadState("complete");
            return 100;
          }
          setUploadState(stages[currentStage].state as any);
          return prev;
        }
      });
    }, 40);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medical Report OCR</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Upload your blood reports, prescriptions, or scans. Our AI will extract the data and provide an easy-to-understand summary.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upload Section */}
        <div className="space-y-6">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm border-slate-200/60 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>Supported formats: JPG, PNG, PDF (Max 10MB)</CardDescription>
            </CardHeader>
            <CardContent>
              {!file ? (
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <UploadCloud className="h-12 w-12 mx-auto text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Drag & drop your file here</h3>
                  <p className="text-sm text-slate-500 mt-1">or click to browse from your computer</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected File Card */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {uploadState === "idle" && (
                      <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500">
                        <X className="h-5 w-5" />
                      </Button>
                    )}
                  </div>

                  {/* Processing Status */}
                  {uploadState !== "idle" && (
                    <div className="space-y-4 bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-700 dark:text-slate-300">
                          {uploadState === 'uploading' && "Uploading document securely..."}
                          {uploadState === 'ocr' && "Running Optical Character Recognition..."}
                          {uploadState === 'analyzing' && "AI analyzing medical terminology..."}
                          {uploadState === 'complete' && "Analysis Complete!"}
                        </span>
                        <span className="text-blue-600">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {uploadState === "idle" && (
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                      onClick={processFile}
                    >
                      Extract & Analyze
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl flex gap-3 border border-amber-100 dark:border-amber-900/50 text-amber-800 dark:text-amber-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>
              Your medical data is processed securely and is never used to train our AI models. Documents are automatically deleted from our servers after analysis.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <AnimatePresence mode="wait">
            {uploadState === "complete" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm border-emerald-200 dark:border-emerald-900/50">
                  <CardHeader className="bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/50 rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                      Extraction Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Document Type</h4>
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
                        <FileSearch className="h-5 w-5 text-blue-500" /> Complete Blood Count (CBC)
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">Key Findings (AI Summary)</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        The blood report indicates that most parameters are within the normal reference range. However, the <strong>Hemoglobin (Hb)</strong> level is slightly low at 11.2 g/dL (normal: 13.0 - 17.0 g/dL), suggesting mild anemia. <strong>Vitamin D3</strong> is also deficient at 18 ng/mL.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-3">Structured Data (JSON Preview)</h4>
                      <div className="bg-slate-900 text-slate-300 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                        <pre>{`{
  "patient_name": "Alex Johnson",
  "date": "2023-10-12",
  "biomarkers": [
    {
      "name": "Hemoglobin",
      "value": 11.2,
      "unit": "g/dL",
      "status": "Low"
    },
    {
      "name": "Vitamin D",
      "value": 18.0,
      "unit": "ng/mL",
      "status": "Deficient"
    }
  ]
}`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 p-8 text-center bg-slate-50/50 dark:bg-slate-900/20">
                <ScanText className="h-16 w-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-slate-500">Analysis Results</h3>
                <p className="text-sm mt-2 max-w-sm">
                  Upload a document to see the AI-extracted structured data and summary here.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
