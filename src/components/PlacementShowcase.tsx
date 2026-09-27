import React from 'react';
import { Briefcase, TrendingUp, Award, Building, Sparkles, CheckCircle2 } from 'lucide-react';
import { COLLEGE_DATA } from '../data/collegeData.ts';

interface PlacementShowcaseProps {
  onAskAiAboutPlacements: () => void;
}

export const PlacementShowcase: React.FC<PlacementShowcaseProps> = ({
  onAskAiAboutPlacements,
}) => {
  const { placements, topRecruiters } = COLLEGE_DATA;

  const trainingTimeline = [
    {
      year: 'Year 1',
      title: 'Foundational Soft Skills & Tech Basics',
      details: 'English communication, presentation skills, logical reasoning, and basic programming fundamentals in C/Python.',
    },
    {
      year: 'Year 2',
      title: 'Data Structures & Core Engineering',
      details: 'Object-Oriented Programming (Java/C++), Data Structures, Algorithms, and domain project work.',
    },
    {
      year: 'Year 3',
      title: 'Advanced Coding Bootcamps & Competitions',
      details: 'Full Stack Development, HackerRank/LeetCode competitive coding challenges, AI & cloud certifications.',
    },
    {
      year: 'Year 4',
      title: 'Mock Technical & HR Drives & Campus Hiring',
      details: 'Company-specific recruitment drills, aptitude testing, group discussions, and tier-1 corporate interviews.',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            Centre for Corporate Relations & Placements
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Placement Records & Top Industry Recruiters
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Empowering students with industry-ready engineering skills and career outcomes.
          </p>
        </div>

        <button
          onClick={onAskAiAboutPlacements}
          className="self-start md:self-auto text-xs font-semibold px-4 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 transition flex items-center gap-1.5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Ask AI About Hiring Companies
        </button>
      </div>

      {/* 4 Big Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-slate-800/40 p-5 rounded-2xl border border-sky-100 dark:border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block mb-1">
            Total Job Offers
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400">
            {placements.totalOffers}+
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block mt-1">
            Across UG & PG
          </span>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-slate-800/80 dark:to-slate-800/40 p-5 rounded-2xl border border-amber-100 dark:border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block mb-1">
            Highest Package
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-500">
            {placements.highestPackage}
          </span>
          <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium block mt-1">
            Product & Core Tech
          </span>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-slate-800/80 dark:to-slate-800/40 p-5 rounded-2xl border border-emerald-100 dark:border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block mb-1">
            Average Package
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {placements.averagePackage}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block mt-1">
            Consistent Baseline
          </span>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50/50 dark:from-slate-800/80 dark:to-slate-800/40 p-5 rounded-2xl border border-indigo-100 dark:border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block mb-1">
            Recruiting Companies
          </span>
          <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {placements.recruitersCount}+
          </span>
          <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium block mt-1">
            MNCs & Startups
          </span>
        </div>
      </div>

      {/* Recruiter Logos Grid */}
      <div className="mb-8">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-sky-600" />
          Prominent Corporate Partners & Campus Recruiters
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3">
          {topRecruiters.map((recruiter, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 flex flex-col justify-between hover:border-amber-400 transition"
            >
              <div className="font-mono font-bold text-sm text-sky-900 dark:text-sky-300">
                {recruiter.logoText}
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate mt-1">
                {recruiter.name}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {recruiter.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Year Structured Training Roadmap */}
      <div>
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          4-Year Career Training Roadmap
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainingTimeline.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 relative"
            >
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white inline-block mb-2">
                {item.year}
              </span>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                {item.title}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
