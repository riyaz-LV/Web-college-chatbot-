import React, { useState } from 'react';
import { Home, Bus, Award, BookOpen, MapPin, Phone, ShieldCheck, Heart, Coffee, Wifi, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { COLLEGE_DATA } from '../data/collegeData.ts';

interface CampusFacilitiesProps {
  onAskAiTopic: (topic: string) => void;
}

interface FaqItem {
  category: 'Hostel' | 'Transport' | 'Scholarships';
  question: string;
  answer: string;
  bulletPoints?: string[];
}

const FACILITY_FAQS: FaqItem[] = [
  {
    category: 'Hostel',
    question: 'How do I register for the college hostel and what is the room allotment procedure?',
    answer: 'Hostel registration is completed either during initial counselling admission or through the campus hostel office. Rooms are allotted on a first-come, first-served basis with separate residential compounds for boys (600+ capacity) and girls (450+ capacity).',
    bulletPoints: [
      'Accommodation options: 2, 3, or 4-sharing rooms equipped with individual study tables, cot, and storage wardrobes.',
      'Required documents: 2 passport-size photographs, college admission allotment slip, and parent/guardian contact details.',
      'Resident Wardens and security teams are present 24/7 in each block.'
    ]
  },
  {
    category: 'Hostel',
    question: 'What is the hostel fee structure and what does it include?',
    answer: 'The annual hostel fee is approximately ₹42,000 to ₹46,000 per academic year, which covers your complete lodging, utilities, and daily food.',
    bulletPoints: [
      'Covers 4 daily meals (morning breakfast, packed or dining lunch, evening tea & snacks, and dinner).',
      'High-speed Wi-Fi, 24/7 electricity with backup generator, RO purified drinking water, and hot water facilities.',
      'Flexible installment options are available upon request to the finance office.'
    ]
  },
  {
    category: 'Hostel',
    question: 'What food is served in the mess? Are vegetarian and non-vegetarian meals available?',
    answer: 'Yes! The college operates a modern steam-cooking hygienic mess that prepares both delicious South Indian vegetarian and non-vegetarian food.',
    bulletPoints: [
      'Non-vegetarian dishes (chicken, fish, egg curries) are served multiple times every week.',
      'Strict quality standards: separate cooking and serving areas are maintained for vegetarian diners.',
      'Special feast menus are prepared for major festivals and college events.'
    ]
  },
  {
    category: 'Transport',
    question: 'Which cities and routes do the 52+ college buses cover?',
    answer: 'EGS Pillay operates the largest college transport network in the Cauvery Delta region, covering an extensive 60 km radius across 12 major towns and over 150 boarding points.',
    bulletPoints: [
      'Major routes include: Nagapattinam, Nagore, Karaikal, Thiruvarur, Mayiladuthurai, Velankanni, Vedaranyam, Sirkazhi, Mannargudi, Kumbakonam, Thiruthuraipoondi, and Kuthalam.',
      'All buses are equipped with GPS tracking for real-time location monitoring by parents and students.',
      'Experienced licensed drivers operate speed-governed buses adhering strictly to transport safety regulations.'
    ]
  },
  {
    category: 'Transport',
    question: 'How do day scholars apply for a college bus pass?',
    answer: 'Students can apply for their bus pass during admission or at the start of each semester by submitting the transport application form at the campus transport desk.',
    bulletPoints: [
      'Fee is calculated based on the boarding stage/distance from the campus.',
      'Digital RFID bus passes are issued once fees are cleared.',
      'Buses arrive on campus at 8:40 AM and depart after classes at 5:00 PM.'
    ]
  },
  {
    category: 'Scholarships',
    question: 'Who is eligible for the First Graduate (FG) scholarship and how much fee is waived?',
    answer: 'The First Graduate (FG) scholarship provides a ₹25,000 to ₹27,500 annual tuition fee concession funded directly by the Government of Tamil Nadu for candidates admitted through TNEA counselling (Code 3806).',
    bulletPoints: [
      'Eligibility: No member in the candidate’s immediate family (parents or elder siblings) should be a graduate.',
      'Mandatory documents: First Graduate Certificate issued by the Zonal Deputy Tahsildar, Joint Declaration signed by parent and candidate, and Family Ration Card.',
      'The concession is credited directly toward your tuition fees for all 4 years of engineering.'
    ]
  },
  {
    category: 'Scholarships',
    question: 'What are the criteria for the Post-Matric SC / ST / SCA 100% full fee waiver?',
    answer: 'Candidates belonging to SC, ST, and SCA communities admitted under government quota via TNEA 3806 receive a 100% full tuition fee waiver along with state maintenance allowances.',
    bulletPoints: [
      'Income ceiling: Family annual income must be below ₹2.5 Lakhs.',
      'Required proofs: Community Certificate, Income Certificate from Tahsildar, and 10+2 mark sheet.',
      'The institution scholarship cell assists eligible students with complete online portal submission (TN Adi Dravidar & Tribal Welfare Portal).'
    ]
  },
  {
    category: 'Scholarships',
    question: 'Does EGS Pillay offer merit and sports excellence scholarships?',
    answer: 'Yes, the E.G.S. Pillay Educational Trust awards institutional merit scholarships of up to 50% to 100% tuition waivers for top board exam performers and recognized athletes.',
    bulletPoints: [
      'Merit Quota: Students scoring 85%+ or 90%+ in 10+2 board examinations receive direct fee discounts.',
      'Sports Quota: State and National level medalists in cricket, athletics, football, basketball, and kabaddi are eligible for free education and hostel accommodation.',
      'Contact our Admission Office at +91 99768 88999 for sports trials and merit verification.'
    ]
  }
];

export const CampusFacilities: React.FC<CampusFacilitiesProps> = ({ onAskAiTopic }) => {
  const { hostel, transport, scholarships, address, contact } = COLLEGE_DATA;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState<'All' | 'Hostel' | 'Transport' | 'Scholarships'>('All');

  const filteredFaqs = FACILITY_FAQS.filter(
    (f) => faqCategory === 'All' || f.category === faqCategory
  );

  return (
    <div className="space-y-8">
      {/* Hostels & Living */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-2">
              <Home className="w-3.5 h-3.5" />
              On-Campus Residential Living
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Hostel Accommodation & Dining
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Safe, secure, and disciplined home away from home with separate blocks for boys and girls.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-amber-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">Annual Fee (Approx):</span>
            <span className="text-base font-bold text-amber-600 dark:text-amber-400">
              ₹42,000 - ₹46,000 / Year
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Living Amenities & Safety
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {hostel.amenities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-amber-500" />
                Hygienic Dining & Mess Menu
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {hostel.food}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Boys Hostel Capacity:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{hostel.boysCapacity}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Girls Hostel Capacity:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{hostel.girlsCapacity}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onAskAiTopic('What are the hostel rules, fees, and food menu at EGS Pillay?')}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1.5"
        >
          Ask AI about hostel room allocation & food timings →
        </button>
      </div>

      {/* Transport Fleet */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold mb-2">
              <Bus className="w-3.5 h-3.5" />
              52+ College Buses Across 60km Radius
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Campus Transport Network
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Extensive bus routes connecting students from all neighboring districts and towns.
            </p>
          </div>

          <div className="bg-sky-50 dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-sky-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 block">Fleet Capacity:</span>
            <span className="text-base font-bold text-sky-600 dark:text-sky-400">
              52+ GPS Tracked Buses
            </span>
          </div>
        </div>

        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Coverage Towns & Hubs:
          </span>
          <div className="flex flex-wrap gap-2">
            {transport.coverageCities.map((city, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700"
              >
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs text-slate-600 dark:text-slate-300">
          {transport.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scholarships Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            Empowering Deserving Students
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            Government & Institutional Scholarships
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Over ₹1.5 Crores in fee concessions and government assistance disbursed annually.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map((sch, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-amber-400 transition"
            >
              <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                {sch.name}
              </h5>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                {sch.benefit}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {sch.eligibility}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Campus Facilities & Admissions FAQ
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Find quick, verified answers about hostel bookings, bus routes, pass allocation, and government scholarship criteria.
            </p>
          </div>

          {/* Category Filter for FAQ */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['All', 'Hostel', 'Transport', 'Scholarships'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  faqCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-sky-50/40 dark:bg-slate-800/80 border-sky-300 dark:border-sky-800 shadow-sm'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 shrink-0">
                      {faq.category}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-sky-600 text-white rotate-180'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Answer Body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-sky-100 dark:border-slate-700/60">
                    <p className="mb-3">{faq.answer}</p>

                    {faq.bulletPoints && (
                      <ul className="space-y-1.5 mb-3 pl-1">
                        {faq.bulletPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Need more custom advice?
                      </span>
                      <button
                        onClick={() => onAskAiTopic(faq.question)}
                        className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center gap-1"
                      >
                        Ask AI Counselor about this →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Location & Address Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 md:p-8 border border-sky-800/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
            Campus Address & Verification
          </span>
          <h4 className="text-xl font-bold text-white mb-2">
            {address.full}
          </h4>
          <p className="text-xs text-sky-200">
            Conveniently situated along the Nagore Main Highway, accessible by direct bus routes and nearby Nagore/Nagapattinam Railway Stations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href={address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition"
          >
            <MapPin className="w-4 h-4" />
            View on Google Maps
          </a>
          <a
            href={`tel:${contact.phoneAdmissions[0]}`}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
          >
            <Phone className="w-4 h-4" />
            Call: {contact.phoneAdmissions[0]}
          </a>
        </div>
      </div>
    </div>
  );
};
