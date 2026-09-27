import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, ArrowRight, Award, Sparkles } from 'lucide-react';
import { COLLEGE_DATA } from '../data/collegeData.ts';

interface CutoffCalculatorProps {
  onAskAiWithCutoff: (cutoff: number, eligibleCourses: string[]) => void;
  onRequestAdmission: (cutoff: number) => void;
}

export const CutoffCalculator: React.FC<CutoffCalculatorProps> = ({
  onAskAiWithCutoff,
  onRequestAdmission,
}) => {
  const [maths, setMaths] = useState<number | ''>(85);
  const [physics, setPhysics] = useState<number | ''>(80);
  const [chemistry, setChemistry] = useState<number | ''>(80);
  const [community, setCommunity] = useState<'OC' | 'BC' | 'BCM' | 'MBC' | 'SC' | 'SCA' | 'ST'>('BC');

  // TNEA Cutoff Formula: Maths (out of 100) + Physics/2 (out of 50) + Chemistry/2 (out of 50) = Max 200
  const m = typeof maths === 'number' ? Math.min(100, Math.max(0, maths)) : 0;
  const p = typeof physics === 'number' ? Math.min(100, Math.max(0, physics)) : 0;
  const c = typeof chemistry === 'number' ? Math.min(100, Math.max(0, chemistry)) : 0;

  const calculatedCutoff = Number((m + (p / 2) + (c / 2)).toFixed(2));

  // Determine course recommendations based on realistic TNEA cutoff thresholds for EGS Pillay (Code 3806)
  const getBranchRecommendations = (score: number) => {
    const list: { name: string; degree: string; probability: 'Very High' | 'High' | 'Moderate'; cutoffTrend: string }[] = [];

    COLLEGE_DATA.courses
      .filter((course) => course.level === 'UG')
      .forEach((course) => {
        let prob: 'Very High' | 'High' | 'Moderate' = 'Moderate';
        let trend = '140 - 175';

        if (course.id.includes('cse') || course.id.includes('aids')) {
          prob = score >= 155 ? 'Very High' : score >= 140 ? 'High' : 'Moderate';
          trend = '145 - 175';
        } else if (course.id.includes('it') || course.id.includes('cyber') || course.id.includes('csbs')) {
          prob = score >= 148 ? 'Very High' : score >= 135 ? 'High' : 'Moderate';
          trend = '138 - 168';
        } else if (course.id.includes('ece')) {
          prob = score >= 142 ? 'Very High' : score >= 130 ? 'High' : 'Moderate';
          trend = '130 - 165';
        } else {
          prob = score >= 130 ? 'Very High' : score >= 115 ? 'High' : 'Moderate';
          trend = '115 - 150';
        }

        list.push({
          name: course.name,
          degree: course.degree,
          probability: prob,
          cutoffTrend: trend,
        });
      });

    return list;
  };

  const recommendations = getBranchRecommendations(calculatedCutoff);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            TNEA 2026 Cutoff Calculator
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Calculate Your Engineering Cutoff (Out of 200)
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official Anna University / TNEA formula for admission to E.G.S. Pillay Engineering College (Code: <strong className="text-sky-600">3806</strong>).
          </p>
        </div>

        {/* Big Result Badge */}
        <div className="bg-gradient-to-br from-sky-900 via-indigo-900 to-slate-900 text-white px-6 py-4 rounded-2xl shadow-lg border border-sky-800/40 text-center min-w-[160px]">
          <span className="text-xs uppercase tracking-wider text-sky-200 font-semibold block">Your Cutoff</span>
          <span className="text-3xl md:text-4xl font-extrabold text-amber-400 tracking-tight">
            {calculatedCutoff.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-300 block mt-0.5">/ 200 Marks</span>
        </div>
      </div>

      {/* Input Marks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Mathematics (Max 100)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={maths}
            onChange={(e) => setMaths(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
            placeholder="e.g. 85"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Full Weightage (100%)</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Physics (Max 100)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={physics}
            onChange={(e) => setPhysics(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
            placeholder="e.g. 80"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Half Weightage (50%)</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Chemistry (Max 100)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={chemistry}
            onChange={(e) => setChemistry(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-sky-500 focus:outline-none"
            placeholder="e.g. 80"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Half Weightage (50%)</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Community Category
          </label>
          <select
            value={community}
            onChange={(e: any) => setCommunity(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="OC">OC (Open Competition)</option>
            <option value="BC">BC (Backward Class)</option>
            <option value="BCM">BCM (BC Muslim)</option>
            <option value="MBC">MBC / DNC</option>
            <option value="SC">SC (Scheduled Caste)</option>
            <option value="SCA">SCA (SC Arunthathiyar)</option>
            <option value="ST">ST (Scheduled Tribe)</option>
          </select>
          <span className="text-[11px] text-slate-400 mt-1 block">Reserved quota eligible</span>
        </div>
      </div>

      {/* Eligible Courses Recommendation Grid */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Branch Admission Chances at E.G.S. Pillay (TNEA Code 3806)
          </h4>
          <span className="text-xs text-slate-500">Based on past admission cutoffs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.slice(0, 6).map((rec, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-center justify-between gap-3 hover:border-sky-300 transition"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 mr-2">
                  {rec.degree}
                </span>
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">
                  {rec.name}
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Expected Cutoff: {rec.cutoffTrend}
                </div>
              </div>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                  rec.probability === 'Very High'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : rec.probability === 'High'
                    ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {rec.probability} Chance
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          Have questions about your rank or management seats? Our admission officers are ready to help.
        </p>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => onAskAiWithCutoff(calculatedCutoff, recommendations.map((r) => r.name))}
            className="flex-1 sm:flex-initial text-xs font-semibold px-4 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 hover:bg-sky-100 border border-sky-200 dark:border-sky-800 transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Ask AI Counselor About My Cutoff
          </button>
          <button
            onClick={() => onRequestAdmission(calculatedCutoff)}
            className="flex-1 sm:flex-initial text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md transition flex items-center justify-center gap-1"
          >
            Apply with this Score
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
