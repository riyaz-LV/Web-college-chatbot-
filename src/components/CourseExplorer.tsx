import React, { useState } from 'react';
import { BookOpen, Award, Users, Clock, Briefcase, Search, Sparkles, ArrowRight } from 'lucide-react';
import { COLLEGE_DATA, CourseInfo } from '../data/collegeData.ts';

interface CourseExplorerProps {
  onAskAiAboutCourse: (course: CourseInfo) => void;
  onApplyForCourse: (course: CourseInfo) => void;
}

export const CourseExplorer: React.FC<CourseExplorerProps> = ({
  onAskAiAboutCourse,
  onApplyForCourse,
}) => {
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'UG' | 'PG'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COLLEGE_DATA.courses.filter((course) => {
    const matchesLevel = levelFilter === 'ALL' || course.level === levelFilter;
    const matchesSearch =
      searchQuery === '' ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Autonomous Curriculum Under Anna University
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Academic Programs & Department Matrix
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Choose from 10+ cutting-edge UG and PG specializations accredited by NAAC 'A++' and NBA.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Level Filter Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['ALL', 'UG', 'PG'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  levelFilter === lvl
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lvl === 'ALL' ? 'All Programs' : lvl === 'UG' ? 'UG (B.E./B.Tech)' : 'PG (M.E./MBA/MCA)'}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search course or topic..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="group relative flex flex-col bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 hover:border-sky-300 dark:hover:border-sky-700 shadow-xs hover:shadow-xl transition-all duration-300"
          >
            {/* Badges Bar */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                {course.degree} • {course.duration}
              </span>

              {course.nbaAccredited && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Award className="w-3 h-3 text-amber-500" />
                  NBA Accredited
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {course.name}
            </h4>

            {/* Quick Specs */}
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 my-2.5">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-sky-500" />
                Intake: <strong className="text-slate-700 dark:text-slate-300">{course.intake} Seats</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {course.duration}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
              {course.description}
            </p>

            {/* Key Topics / Syllabus Highlights */}
            <div className="mt-auto">
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Key Core Topics:</div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {course.keyTopics.slice(0, 4).map((topic, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-2">
                <button
                  onClick={() => onAskAiAboutCourse(course)}
                  className="flex-1 text-xs font-semibold py-2 px-3 rounded-xl bg-sky-50 dark:bg-sky-950/80 hover:bg-sky-100 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Ask AI
                </button>
                <button
                  onClick={() => onApplyForCourse(course)}
                  className="flex-1 text-xs font-semibold py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition flex items-center justify-center gap-1 shadow-xs"
                >
                  Apply
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No courses found matching your search. Try another keyword.</p>
        </div>
      )}
    </div>
  );
};
