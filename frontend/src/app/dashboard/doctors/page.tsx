"use client";

import { useState } from "react";
import { Search, Star, MapPin, Clock, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock Data
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 128,
    experience: "15 years",
    location: "Heart Institute, NY",
    nextAvailable: "Today",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "General Physician",
    rating: 4.8,
    reviews: 256,
    experience: "10 years",
    location: "City Hospital, SF",
    nextAvailable: "Tomorrow",
    image: "https://i.pravatar.cc/150?u=michael"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 89,
    experience: "8 years",
    location: "Skin Care Clinic, TX",
    nextAvailable: "In 2 days",
    image: "https://i.pravatar.cc/150?u=emily"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Neurologist",
    rating: 4.9,
    reviews: 210,
    experience: "20 years",
    location: "Neuro Center, WA",
    nextAvailable: "Next Week",
    image: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: 5,
    name: "Dr. Olivia Taylor",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 312,
    experience: "12 years",
    location: "Children's Health, FL",
    nextAvailable: "Today",
    image: "https://i.pravatar.cc/150?u=olivia"
  },
  {
    id: 6,
    name: "Dr. William Patel",
    specialty: "Orthopedist",
    rating: 4.6,
    reviews: 145,
    experience: "14 years",
    location: "Bone & Joint Center, IL",
    nextAvailable: "Tomorrow",
    image: "https://i.pravatar.cc/150?u=william"
  }
];

const SPECIALTIES = ["All", "General Physician", "Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "Orthopedist"];

export default function FindDoctorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter logic
  const filteredDoctors = DOCTORS.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBook = (name: string) => {
    setToastMessage(`Appointment request sent to ${name}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right">
          <CalendarCheck className="h-5 w-5" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Find a Doctor</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Book appointments with top medical specialists</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            type="text"
            placeholder="Search by name or clinic..."
            className="pl-10 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {SPECIALTIES.map(specialty => (
            <Badge 
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedSpecialty === specialty 
                  ? "bg-blue-600 hover:bg-blue-700 text-white border-transparent" 
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
              onClick={() => setSelectedSpecialty(specialty)}
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="group overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-50 line-clamp-1">{doctor.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">{doctor.specialty}</p>
                    
                    <div className="flex items-center gap-1 text-sm text-amber-500 mt-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-slate-400 ml-1">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="line-clamp-1">{doctor.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{doctor.experience} exp</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CalendarCheck className="h-4 w-4" />
                      <span>{doctor.nextAvailable}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                  <Button variant="outline" className="flex-1">View Profile</Button>
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                    onClick={() => handleBook(doctor.name)}
                  >
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-50">No doctors found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

    </div>
  );
}
