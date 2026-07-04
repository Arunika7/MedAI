"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Pill, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  ShieldAlert, 
  ChevronDown,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock Data
const MEDICINE_DB = [
  {
    id: "med1",
    genericName: "Paracetamol",
    brandNames: ["Tylenol", "Panadol", "Calpol"],
    type: "Analgesic, Antipyretic",
    uses: ["Mild to moderate pain relief", "Fever reduction"],
    dosage: "Adults: 500mg-1000mg every 4-6 hours. Max 4000mg/day.",
    sideEffects: ["Nausea", "Stomach pain", "Loss of appetite", "Liver damage (in high doses)"],
    warnings: "Do not exceed the maximum daily dose. Avoid alcohol consumption while taking this medication.",
    interactions: ["Warfarin", "Ketoconazole", "Certain seizure medications"],
    pregnancySafety: "Category B - Generally considered safe",
    prescriptionRequired: false
  },
  {
    id: "med2",
    genericName: "Amoxicillin",
    brandNames: ["Amoxil", "Moxatag", "Trimox"],
    type: "Antibiotic (Penicillin-class)",
    uses: ["Bacterial infections", "Pneumonia", "Bronchitis", "Ear infections"],
    dosage: "Adults: 250mg-500mg every 8 hours or 500mg-875mg every 12 hours.",
    sideEffects: ["Diarrhea", "Nausea", "Vomiting", "Skin rash"],
    warnings: "Finish the entire prescribed course even if you feel better. Seek immediate help if you experience signs of an allergic reaction (swelling, trouble breathing).",
    interactions: ["Birth control pills (may reduce effectiveness)", "Methotrexate", "Probenecid"],
    pregnancySafety: "Category B - Generally considered safe",
    prescriptionRequired: true
  },
  {
    id: "med3",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Nurofen"],
    type: "Nonsteroidal Anti-inflammatory Drug (NSAID)",
    uses: ["Pain relief", "Inflammation reduction", "Fever reduction", "Menstrual cramps"],
    dosage: "Adults: 200mg-400mg every 4-6 hours. Max 3200mg/day.",
    sideEffects: ["Upset stomach", "Heartburn", "Dizziness", "Increased risk of bleeding"],
    warnings: "May increase the risk of fatal heart attack or stroke. Use with caution if you have a history of stomach ulcers.",
    interactions: ["Aspirin", "Blood thinners (Warfarin)", "Lithium", "Corticosteroids"],
    pregnancySafety: "Category C (Avoid in 3rd trimester)",
    prescriptionRequired: false
  },
  {
    id: "med4",
    genericName: "Cetirizine",
    brandNames: ["Zyrtec", "Reactine", "Aller-Tec"],
    type: "Antihistamine",
    uses: ["Allergy symptoms", "Hay fever", "Hives", "Itching"],
    dosage: "Adults: 5mg-10mg once daily.",
    sideEffects: ["Drowsiness", "Dry mouth", "Fatigue", "Dizziness"],
    warnings: "May cause drowsiness; use caution when driving or operating machinery. Avoid alcohol.",
    interactions: ["CNS depressants", "Alcohol", "Theophylline"],
    pregnancySafety: "Category B - Generally considered safe",
    prescriptionRequired: false
  },
  {
    id: "med5",
    genericName: "Omeprazole",
    brandNames: ["Prilosec", "Losec", "Zegerid"],
    type: "Proton Pump Inhibitor (PPI)",
    uses: ["Acid reflux (GERD)", "Stomach ulcers", "Heartburn"],
    dosage: "Adults: 20mg-40mg once daily before a meal.",
    sideEffects: ["Headache", "Stomach pain", "Nausea", "Diarrhea", "Gas"],
    warnings: "Long-term use may increase the risk of bone fractures and vitamin B12 deficiency.",
    interactions: ["Clopidogrel", "St. John's Wort", "Methotrexate", "Digoxin"],
    pregnancySafety: "Category C - Use only if benefits outweigh risks",
    prescriptionRequired: false
  },
  {
    id: "med6",
    genericName: "Metformin",
    brandNames: ["Glucophage", "Fortamet", "Riomet"],
    type: "Biguanide (Antidiabetic)",
    uses: ["Type 2 Diabetes management", "PCOS (off-label)"],
    dosage: "Adults: 500mg twice daily, titrating up to max 2000mg/day with meals.",
    sideEffects: ["Diarrhea", "Nausea", "Metallic taste", "Vitamin B12 deficiency"],
    warnings: "Rare but serious risk of lactic acidosis. Stop taking before imaging procedures requiring iodinated contrast.",
    interactions: ["Alcohol", "Cimetidine", "Iodinated contrast materials"],
    pregnancySafety: "Category B - Generally considered safe for use during pregnancy",
    prescriptionRequired: true
  },
  {
    id: "med7",
    genericName: "Atorvastatin",
    brandNames: ["Lipitor"],
    type: "Statin (HMG-CoA reductase inhibitor)",
    uses: ["High cholesterol", "Lower risk of stroke and heart attack"],
    dosage: "Adults: 10mg-80mg once daily.",
    sideEffects: ["Muscle pain", "Joint pain", "Diarrhea", "Mild memory confusion (rare)"],
    warnings: "Can cause severe muscle breakdown (rhabdomyolysis) which can lead to kidney failure. Do not consume large amounts of grapefruit juice.",
    interactions: ["Grapefruit juice", "Clarithromycin", "Itraconazole", "Cyclosporine"],
    pregnancySafety: "Category X - Contraindicated in pregnancy",
    prescriptionRequired: true
  },
  {
    id: "med8",
    genericName: "Albuterol (Salbutamol)",
    brandNames: ["ProAir HFA", "Ventolin HFA", "Proventil HFA"],
    type: "Bronchodilator",
    uses: ["Asthma", "COPD", "Exercise-induced bronchospasm"],
    dosage: "Adults: 2 inhalations every 4-6 hours as needed.",
    sideEffects: ["Nervousness", "Tremors", "Rapid heart rate", "Headache"],
    warnings: "Overuse can lead to paradoxical bronchospasm. Seek emergency help if breathing problems worsen quickly.",
    interactions: ["Beta-blockers", "Diuretics", "Digoxin", "MAO inhibitors"],
    pregnancySafety: "Category C - Use if benefits outweigh risks",
    prescriptionRequired: true
  }
];

export default function MedicineLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("med1");

  const filteredMedicines = MEDICINE_DB.filter(med => 
    med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.brandNames.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Medicine Library</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Search for detailed information on medications, dosages, and interactions.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-blue-500" />
        </div>
        <Input 
          type="text"
          placeholder="Search by generic or brand name (e.g., Paracetamol, Amoxil)..."
          className="pl-12 h-14 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm focus-visible:ring-blue-500 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredMedicines.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Pill className="h-12 w-12 mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">No medicines found</p>
            <p className="text-sm text-slate-500">Try checking the spelling or use a different brand name.</p>
          </div>
        ) : (
          filteredMedicines.map((med, idx) => {
            const isExpanded = expandedId === med.id;

            return (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`overflow-hidden transition-all duration-300 border-slate-200/60 dark:border-slate-800 ${isExpanded ? 'shadow-lg ring-1 ring-blue-500/20' : 'hover:shadow-md'}`}>
                  
                  {/* Card Header (Clickable) */}
                  <div 
                    className={`p-6 cursor-pointer flex flex-col sm:flex-row justify-between gap-4 ${isExpanded ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'bg-white dark:bg-slate-950'}`}
                    onClick={() => setExpandedId(isExpanded ? null : med.id)}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${isExpanded ? 'bg-blue-600 text-white' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'}`}>
                        <Pill className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold">{med.genericName}</h2>
                          {med.prescriptionRequired ? (
                            <Badge variant="destructive" className="text-[10px] uppercase font-bold tracking-wider px-2 bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 border-rose-200 dark:border-rose-800">Rx Required</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800">OTC</Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 font-medium">{med.type}</p>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {med.brandNames.map(brand => (
                            <span key={brand} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300">
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end sm:justify-start">
                      <Button variant="ghost" size="icon" className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-5 w-5 text-slate-400" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Left Column */}
                            <div className="space-y-6">
                              <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Uses
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-1">
                                  {med.uses.map((use, i) => <li key={i}>{use}</li>)}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                                  <Info className="h-4 w-4 text-blue-500" /> Standard Dosage
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                  {med.dosage}
                                </p>
                              </div>

                              <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                                  <ShieldAlert className="h-4 w-4 text-purple-500" /> Pregnancy Safety
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {med.pregnancySafety}
                                </p>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                              <div>
                                <h4 className="flex items-center gap-2 font-semibold text-rose-600 dark:text-rose-400 mb-2">
                                  <AlertTriangle className="h-4 w-4" /> Warnings
                                </h4>
                                <p className="text-sm text-rose-700/80 dark:text-rose-300/80 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-lg border border-rose-100 dark:border-rose-900/50">
                                  {med.warnings}
                                </p>
                              </div>

                              <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                                  <Activity className="h-4 w-4 text-amber-500" /> Common Side Effects
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {med.sideEffects.map((effect, i) => (
                                    <span key={i} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-md border border-amber-100 dark:border-amber-900/50">
                                      {effect}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-2">
                                  <ShieldAlert className="h-4 w-4 text-slate-500" /> Drug Interactions
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1 ml-1">
                                  {med.interactions.map((interaction, i) => <li key={i}>{interaction}</li>)}
                                </ul>
                              </div>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </Card>
              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}
