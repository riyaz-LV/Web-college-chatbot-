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
  Award,
  Sparkles,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Layers
} from 'lucide-react';
import { Campus3DVisualizer } from './components/Campus3DVisualizer.tsx';
import { Chatbot } from './components/Chatbot.tsx';
import { CutoffCalculator } from './components/CutoffCalculator.tsx';
import { CourseExplorer } from './components/CourseExplorer.tsx';
import { PlacementShowcase } from './components/PlacementShowcase.tsx';
import { CampusFacilities } from './components/CampusFacilities.tsx';
import { EnquiryModal } from './components/EnquiryModal.tsx';
import { COLLEGE_DATA, CourseInfo } from './data/collegeData.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'cutoff' | 'courses' | 'placements' | 'facilities'>('chatbot');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
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
  const handleAskAiWithCutoff = (cutoff: number, eligibleCourses: string[]) => {
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-950 border-b border-sky-800/40 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              TNEA Code 3806
            </span>
            <span className="text-slate-300">
              Admissions Open for Academic Year 2026-2027 • B.E. / B.Tech / MBA / MCA
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a
              href="tel:+919976888999"
              className="hover:text-amber-400 transition flex items-center gap-1 font-semibold text-sky-300"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Admissions: +91 99768 88999
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="https://egspec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition hidden md:flex items-center gap-1"
            >
              Official Website: egspec.org
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Institution Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-sky-500/10 ring-2 ring-white/10 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  E.G.S. PILLAY ENGINEERING COLLEGE
                </h1>
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  AUTONOMOUS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                NAAC 'A++' Grade • Affiliated to Anna University, Chennai • Established 1995 • Nagapattinam
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block leading-none">Counselling Code</span>
                <span className="font-bold text-amber-400 text-xs">TNEA: 3806</span>
              </div>
            </div>

            <button
              onClick={() => {
                setPrefilledCutoff(undefined);
                setPrefilledCourse(undefined);
                setIsEnquiryModalOpen(true);
              }}
              className="text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Request Callback</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero 3D Animation & Quick Highlights */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 px-4 sm:px-6 pt-6 pb-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* 3D Visualizer Canvas */}
          <Campus3DVisualizer
            isAiSpeaking={isAiSpeaking}
            onSelectDepartment={handleDepartmentSelectedIn3D}
            activeTopic={activeTopic}
          />

          {/* Key Facts Pill Marquee */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Accreditation</span>
                <span className="font-bold text-sm text-white truncate block">NAAC 'A++' Grade</span>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">TNEA Code</span>
                <span className="font-bold text-sm text-amber-400 truncate block">Code: 3806</span>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Placement High</span>
                <span className="font-bold text-sm text-emerald-400 truncate block">12.00 LPA Package</span>
              </div>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-md p-3 rounded-2xl border border-slate-700/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Programs Offered</span>
                <span className="font-bold text-sm text-indigo-300 truncate block">10 UG & 7 PG Branches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Interactive Navigation Tabs */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Navigation Tabs Bar */}
        <div className="flex bg-slate-800/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 mb-6 overflow-x-auto no-scrollbar gap-1.5 shadow-lg">
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === 'chatbot'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
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
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
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
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
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
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
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
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Home className="w-4 h-4" />
            Hostels, Buses & Scholarships
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
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                    <PhoneCall className="w-4 h-4" />
                    Direct Admission Helpline
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">
                    Talk to Admissions Officer
                  </h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Have doubts about management quota, lateral entry, or first graduate fee concession? Speak directly with our faculty counselors.
                  </p>

                  <div className="space-y-2 mb-4">
                    <a
                      href="tel:+919976888999"
                      className="block p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-600 transition"
                    >
                      <div className="text-[10px] text-sky-300">Admission Hotline 1:</div>
                      <div className="font-mono text-sm font-bold text-amber-400">+91 99768 88999</div>
                    </a>
                    <a
                      href="tel:+918680954537"
                      className="block p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-600 transition"
                    >
                      <div className="text-[10px] text-sky-300">Admission Hotline 2:</div>
                      <div className="font-mono text-sm font-bold text-amber-400">+91 86809 54537</div>
                    </a>
                  </div>

                  <button
                    onClick={() => setIsEnquiryModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Request Instant Callback
                  </button>
                </div>

                {/* TNEA Counselling Badge Card */}
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400">TNEA Code</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Anna University
                    </span>
                  </div>
                  <div className="text-3xl font-extrabold text-amber-400 tracking-tight font-mono mb-1">
                    3806
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Use this official code during Tamil Nadu Engineering Admissions (TNEA) online single-window counselling choices.
                  </p>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 space-y-2 text-xs">
                  <div className="font-semibold text-slate-300 mb-2">Explore Next:</div>
                  <button
                    onClick={() => setActiveTab('cutoff')}
                    className="w-full p-2.5 rounded-xl bg-slate-700/40 hover:bg-slate-700 text-left text-slate-200 transition flex items-center justify-between"
                  >
                    <span>Check Engineering Cutoff</span>
                    <span className="text-sky-400 font-bold">→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="w-full p-2.5 rounded-xl bg-slate-700/40 hover:bg-slate-700 text-left text-slate-200 transition flex items-center justify-between"
                  >
                    <span>View AI & DS and CSE Curriculum</span>
                    <span className="text-sky-400 font-bold">→</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('placements')}
                    className="w-full p-2.5 rounded-xl bg-slate-700/40 hover:bg-slate-700 text-left text-slate-200 transition flex items-center justify-between"
                  >
                    <span>View 780+ Job Offers & TCS/Zoho Recruiters</span>
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

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-200 text-sm">
              E.G.S. Pillay Engineering College (Autonomous)
            </p>
            <p className="mt-1 text-slate-400">
              Old Nagore Main Road, Thethi Village, Nagore, Nagapattinam - 611 002, Tamil Nadu, India.
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              TNEA Code: 3806 • NAAC 'A++' Accredited • Affiliated to Anna University • Estd. 1995
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
            <a
              href="https://egspec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition flex items-center gap-1"
            >
              Official Website (egspec.org)
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a href="tel:+919976888999" className="hover:text-amber-400 transition">
              Call: +91 99768 88999
            </a>
            <span>•</span>
            <a href="mailto:admission@egspec.org" className="hover:text-amber-400 transition">
              admission@egspec.org
            </a>
          </div>
        </div>
      </footer>

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
