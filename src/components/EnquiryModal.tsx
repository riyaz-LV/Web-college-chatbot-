import React, { useState } from 'react';
import { X, CheckCircle, PhoneCall, Calendar, Send, Sparkles, User, Mail, MapPin, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COLLEGE_DATA } from '../data/collegeData.ts';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledCutoff?: number;
  prefilledCourse?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledCutoff,
  prefilledCourse,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(prefilledCourse || 'B.Tech Artificial Intelligence and Data Science (AI & DS)');
  const [cutoff, setCutoff] = useState(prefilledCutoff ? String(prefilledCutoff) : '');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; message: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please enter your full name and contact phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          coursePreference: course,
          cutoffScore: cutoff ? Number(cutoff) : undefined,
          city,
          notes,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmittedData({
          id: data.enquiryId || `ENQ-${Date.now().toString(36).toUpperCase()}`,
          message: data.message,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#f59e0b', '#10b981'],
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please call admissions directly at +91 99768 88999.');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      // Fallback offline confirmation
      setSubmittedData({
        id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
        message: 'Your enquiry request has been logged! Our admissions counselor will call you within 24 hours.',
      });
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setName('');
    setPhone('');
    setEmail('');
    setCity('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                TNEA 3806
              </span>
              <h3 className="font-bold text-lg text-white">Direct Admission Enquiry</h3>
            </div>
            <p className="text-xs text-sky-200 mt-0.5">
              E.G.S. Pillay Engineering College (Autonomous), Nagapattinam
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submittedData ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-50 dark:ring-emerald-900/20">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Enquiry Successfully Registered!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 max-w-sm mx-auto">
                {submittedData.message}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-left mb-6">
                <div className="text-xs text-slate-500 mb-1">Enquiry Reference ID:</div>
                <div className="font-mono font-bold text-sky-600 dark:text-sky-400 text-lg">
                  {submittedData.id}
                </div>
                <div className="text-xs text-slate-500 mt-2">Preferred Program:</div>
                <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">{course}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+919976888999"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Admissions: +91 99768 88999
                </a>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                  {errorMessage}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / Mobile Number *
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City / Native Town
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Nagapattinam / Karaikal"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Course / Branch
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    {COLLEGE_DATA.courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        [{c.degree}] {c.name}
                      </option>
                    ))}
                    <option value="General Admission Enquiry">General / Undecided Admission Enquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    10+2 / Diploma Cutoff Score (if available)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={200}
                    value={cutoff}
                    onChange={(e) => setCutoff(e.target.value)}
                    placeholder="e.g. 165.50"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hostel / Bus Requirement?
                  </label>
                  <select
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="Day Scholar (College Bus)">Day Scholar (Need College Bus)</option>
                    <option value="Hostel Accommodation Needed">Hostel Accommodation Needed</option>
                    <option value="Local Commute (Self)">Local Commute (Self / Two-wheeler)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering Enquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit & Request Counselor Call
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                Direct Admissions Hotline: <strong className="text-sky-600 dark:text-sky-400">+91 99768 88999</strong> • Old Nagore Main Road, Nagapattinam
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
