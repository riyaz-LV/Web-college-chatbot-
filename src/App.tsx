/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  Bot,
  Calculator,
  BookOpen,
  Briefcase,
  Home,
  PhoneCall,
  MapPin,
  Map,
  Award,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Layers,
  Compass,
  ArrowRight,
  Clock,
  Phone,
  Radio
} from 'lucide-react';
import { Campus3DVisualizer } from './components/Campus3DVisualizer.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import { CutoffCalculator } from './components/CutoffCalculator.tsx';
import { CourseExplorer } from './components/CourseExplorer.tsx';
import { PlacementShowcase } from './components/PlacementShowcase.tsx';
import { CampusFacilities } from './components/CampusFacilities.tsx';
import { EnquiryModal } from './components/EnquiryModal.tsx';
import { CampusMapModal } from './components/CampusMapModal.tsx';
import { COLLEGE_DATA, CourseInfo } from './data/collegeData.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'cutoff' | 'courses' | 'placements' | 'facilities'>('chatbot');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [prefilledCutoff, setPrefilledCutoff] = useState<number | undefined>(undefined);
  const [prefilledCourse, setPrefilledCourse] = useState<string | undefined>(undefined);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('');

  // Handle department click in 3D visualizer
  const handleDepartmentSelectedIn3D = (deptName: string) => {
    setActiveTopic(deptName);
    setActiveTab('chatbot');
  };

  // Handle asking AI from cutoff calculator
  const handleAskAiWithCutoff = (cutoff: number, _eligibleCourses: string[]) => {
    setActiveTopic(`TNEA Cutoff ${cutoff} marks`);
    setActiveTab('chatbot');
  };

  // Handle applying with score
  const handleRequestAdmissionFromCutoff = (cutoff: number) => {
    setPrefilledCutoff(cutoff);
    setIsEnquiryModalOpen(true);
  };

  // Handle asking AI about a specific course
  const handleAskAiAboutCourse = (course: CourseInfo) => {
    setActiveTopic(course.name);
    setActiveTab('chatbot');
  };

  // Handle direct apply for a course
  const handleApplyForCourse = (course: CourseInfo) => {
    setPrefilledCourse(`[${course.degree}] ${course.name}`);
    setIsEnquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans antialiased">
      {/* 1. Curatorial Institutional Ribbon */}
      <div className="bg-[#05080f] border-b border-slate-800/80 text-[11px] py-2 px-4 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-bold text-amber-400 tracking-wider">TNEA CODE: 3806</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>NAAC 'A++' Accredited</span>
            <span aria-hidden="true" className="text-slate-600 hidden md:inline">·</span>
            <span className="hidden md:inline">UGC Autonomous</span>
            <span aria-hidden="true" className="text-slate-600 hidden lg:inline">·</span>
            <span className="hidden lg:inline">Anna University Permanent Affiliation</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-sky-300">Admissions 2026-2027 Open</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:+919976888999"
              className="hover:text-amber-400 transition flex items-center gap-1 font-semibold text-sky-300"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Admissions: +91 99768 88999</span>
            </a>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">|</span>
            <a
              href="https://egspec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition hidden sm:flex items-center gap-1 text-slate-400 hover:text-slate-200"
            >
              <span>egspec.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Top Bar Navigation Contract: [Brand Wordmark] - [Clean Nav Links] - [Actions] */}
      <header className="bg-[#090e1a]/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 ring-1 ring-white/10 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <a href="/" className="font-extrabold text-base sm:text-lg tracking-tight text-white hover:text-amber-400 transition">
                E.G.S. PILLAY ENGINEERING COLLEGE
              </a>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>Autonomous</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-semibold">TNEA 3806</span>
                <span aria-hidden="true">·</span>
                <span>Nagapattinam</span>
              </div>
            </div>
          </div>

          {/* Zone 2: Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`hover:text-white transition pb-0.5 ${activeTab === 'chatbot' ? 'text-amber-400 border-b-2 border-amber-400 font-bold' : ''}`}
            >
              AI Counselor
            </button>
            <button
              onClick={() => setActiveTab('cutoff')}
              className={`hover:text-white transition pb-0.5 ${activeTab === 'cutoff' ? 'text-amber-400 border-b-2 border-amber-400 font-bold' : ''}`}
            >
              Cutoff Estimator
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`hover:text-white transition pb-0.5 ${activeTab === 'courses' ? 'text-amber-400 border-b-2 border-amber-400 font-bold' : ''}`}
            >
              Programs & Intake
            </button>
            <button
              onClick={() => setActiveTab('placements')}
              className={`hover:text-white transition pb-0.5 ${activeTab === 'placements' ? 'text-amber-400 border-b-2 border-amber-400 font-bold' : ''}`}
            >
              Placements (12 LPA)
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`hover:text-white transition pb-0.5 ${activeTab === 'facilities' ? 'text-amber-400 border-b-2 border-amber-400 font-bold' : ''}`}
            >
              Hostels & FAQ
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Campus Map Modal + Request Callback) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* New Campus Map Modal Button */}
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-sky-300 hover:text-white border border-slate-700 hover:border-sky-500/50 shadow-sm transition flex items-center gap-1.5 whitespace-nowrap"
              title="Interactive 40-Acre Campus Map"
            >
              <Map className="w-3.5 h-3.5 text-sky-400" />
              <span>Campus Map</span>
            </button>

            {/* Request Callback Modal Button */}
            <button
              onClick={() => {
                setPrefilledCutoff(undefined);
                setPrefilledCourse(undefined);
                setIsEnquiryModalOpen(true);
              }}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 shadow-md shadow-amber-500/10 transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Request Callback</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Visual Section: Interactive 3D Visualizer with Quick Utility Strip */}
      <section className="bg-gradient-to-b from-[#090e1a] via-[#060a12] to-[#070b14] px-4 sm:px-6 pt-5 pb-3">
        <div className="max-w-7xl mx-auto space-y-4">
          
          {/* 3D Visualizer Canvas */}
          <Campus3DVisualizer
            isAiSpeaking={isAiSpeaking}
            onSelectDepartment={handleDepartmentSelectedIn3D}
            activeTopic={activeTopic}
          />

          {/* Operational Quick Utility Ribbon */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="text-left bg-slate-900/80 hover:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition group shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Map className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Interactive Map</span>
                  <span className="font-bold text-xs sm:text-sm text-white truncate block">40+ Acre Campus Layout</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('cutoff')}
              className="text-left bg-slate-900/80 hover:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition group shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Cutoff Calculator</span>
                  <span className="font-bold text-xs sm:text-sm text-amber-400 truncate block">Check TNEA Eligibility</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('placements')}
              className="text-left bg-slate-900/80 hover:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition group shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Placement Record</span>
                  <span className="font-bold text-xs sm:text-sm text-emerald-400 truncate block">12.00 LPA Highest</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className="text-left bg-slate-900/80 hover:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition group shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">Program Catalog</span>
                  <span className="font-bold text-xs sm:text-sm text-indigo-300 truncate block">10 UG & 7 PG Branches</span>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Tab Navigation Strip (Segmented Controls) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 mb-6 overflow-x-auto no-scrollbar gap-1.5 shadow-md">
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'chatbot'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4 text-amber-400" />
            AI Enquiry Chatbot
          </button>

          <button
            onClick={() => setActiveTab('cutoff')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'cutoff'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Cutoff Calculator (TNEA 200)
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'courses'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Departments & Intake
          </button>

          <button
            onClick={() => setActiveTab('placements')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'placements'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Placements (12 LPA)
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'facilities'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Home className="w-4 h-4" />
            Hostels, Buses & FAQ
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6">
          {activeTab === 'chatbot' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Main Chatbot Column */}
              <div className="lg:col-span-8">
                <Chatbot
                  onOpenEnquiryModal={() => setIsEnquiryModalOpen(true)}
                  onOpenCalculator={() => setActiveTab('cutoff')}
                  onAiSpeakingChange={setIsAiSpeaking}
                  onTopicTriggered={setActiveTopic}
                />
              </div>

              {/* Sidebar Quick Cards Column */}
              <div className="lg:col-span-4 space-y-4">
                {/* Admissions Helpline Card */}
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <PhoneCall className="w-4 h-4" />
                    Direct Admission Helpline
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">
                    Talk to Admissions Officer
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Have questions about TNEA counselling cutoff, lateral entry, or First Graduate scholarship? Speak directly with faculty counselors.
                  </p>

                  <div className="space-y-2 mb-4">
                    <a
                      href="tel:+919976888999"
                      className="block p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-700 transition"
                    >
                      <div className="text-[10px] text-sky-300">Admission Hotline 1:</div>
                      <div className="font-mono text-sm font-bold text-amber-400 tabular-nums">+91 99768 88999</div>
                    </a>
                    <a
                      href="tel:+918680954537"
                      className="block p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-xs font-semibold text-white border border-slate-700 transition"
                    >
                      <div className="text-[10px] text-sky-300">Admission Hotline 2:</div>
                      <div className="font-mono text-sm font-bold text-amber-400 tabular-nums">+91 86809 54537</div>
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsMapModalOpen(true)}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
                    >
                      <Map className="w-3.5 h-3.5 text-sky-400" />
                      Campus Map
                    </button>
                    <button
                      onClick={() => setIsEnquiryModalOpen(true)}
                      className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Callback
                    </button>
                  </div>
                </div>

                {/* TNEA Counselling Badge Card */}
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400">TNEA Counselling Code</span>
                    <span className="text-xs font-bold text-amber-400">Anna University</span>
                  </div>
                  <div className="text-3xl font-extrabold text-amber-400 tracking-tight font-mono tabular-nums mb-1">
                    3806
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Use this official code during Tamil Nadu Engineering Admissions (TNEA) online single-window counselling choices.
                  </p>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                  <div className="font-semibold text-slate-300 mb-2">Explore Next:</div>
                  <button
                    onClick={() => setActiveTab('cutoff')}
                    className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-left text-slate-200 transition flex items-center justify-between"
                  >
                    <span>Check Engineering Cutoff</span>
                    <span className="text-sky-400 font-bold">→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-left text-slate-200 transition flex items-center justify-between"
                  >
                    <span>View AI & DS and CSE Curriculum</span>
                    <span className="text-sky-400 font-bold">→</span>
                  </button>
                  <button
                    onClick={() => setIsMapModalOpen(true)}
                    className="w-full p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-left text-slate-200 transition flex items-center justify-between"
                  >
                    <span>View 40-Acre Campus Map (Hostels & Sports)</span>
                    <span className="text-sky-400 font-bold">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cutoff' && (
            <CutoffCalculator
              onAskAiWithCutoff={handleAskAiWithCutoff}
              onRequestAdmission={handleRequestAdmissionFromCutoff}
            />
          )}

          {activeTab === 'courses' && (
            <CourseExplorer
              onAskAiAboutCourse={handleAskAiAboutCourse}
              onApplyForCourse={handleApplyForCourse}
            />
          )}

          {activeTab === 'placements' && (
            <PlacementShowcase
              onAskAiAboutPlacements={() => {
                setActiveTopic('Placements');
                setActiveTab('chatbot');
              }}
            />
          )}

          {activeTab === 'facilities' && (
            <CampusFacilities
              onAskAiTopic={(topic) => {
                setActiveTopic(topic);
                setActiveTab('chatbot');
              }}
            />
          )}
        </div>
      </main>

      {/* 5. Minimal Institutional Footer */}
      <footer className="bg-[#05080f] border-t border-slate-800/80 text-slate-400 text-xs py-8 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-200 text-sm">
              E.G.S. Pillay Engineering College (Autonomous)
            </p>
            <p className="mt-1 text-slate-400">
              Old Nagore Main Road, Thethi Village, Nagore, Nagapattinam - 611 002, Tamil Nadu, India.
            </p>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2 justify-center md:justify-start">
              <span>TNEA Code: 3806</span>
              <span aria-hidden="true">·</span>
              <span>NAAC 'A++' Accredited</span>
              <span aria-hidden="true">·</span>
              <span>Anna University</span>
              <span aria-hidden="true">·</span>
              <span>Estd. 1995</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="hover:text-amber-400 transition flex items-center gap-1 text-sky-400"
            >
              <Map className="w-3.5 h-3.5" />
              <span>Campus Map</span>
            </button>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a
              href="https://egspec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition flex items-center gap-1"
            >
              <span>egspec.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a href="tel:+919976888999" className="hover:text-amber-400 transition">
              +91 99768 88999
            </a>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <a href="mailto:admission@egspec.org" className="hover:text-amber-400 transition">
              admission@egspec.org
            </a>
          </div>
        </div>
      </footer>

      {/* Campus Map Interactive Modal */}
      <CampusMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onAskAiTopic={(topic) => {
          setActiveTopic(topic);
          setActiveTab('chatbot');
        }}
      />

      {/* Admission Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        prefilledCutoff={prefilledCutoff}
        prefilledCourse={prefilledCourse}
      />
    </div>
  );
}
