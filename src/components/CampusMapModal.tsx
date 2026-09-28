import React, { useState } from 'react';
import {
  X,
  MapPin,
  Compass,
  Search,
  BookOpen,
  Home,
  Award,
  Sparkles,
  ExternalLink,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Navigation,
  Coffee,
  Bus,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { COLLEGE_DATA } from '../data/collegeData.ts';

interface CampusMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAiTopic: (topic: string) => void;
}

export interface CampusZone {
  id: string;
  name: string;
  category: 'Academics' | 'Hostels & Dining' | 'Sports & Amenities' | 'Admin & Transport';
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  subtext: string;
  departments?: string[];
  facilities?: string[];
  description: string;
  hours?: string;
}

export const CAMPUS_ZONES: CampusZone[] = [
  {
    id: 'admin-block',
    name: 'Main Administrative & Heritage Block',
    category: 'Admin & Transport',
    color: '#0284c7', // Sky blue
    x: 410,
    y: 430,
    width: 170,
    height: 100,
    label: 'Administrative Block',
    subtext: 'Principal Office & Admissions Cell',
    departments: ['Central Admissions Desk', "Principal's Secretariat", 'Exam Cell & COE', 'Accounts & Fee Office'],
    facilities: ['TNEA Code 3806 Counselling Helpdesk', 'Boardroom', 'Visitor Lounge', 'Academic Records Section'],
    description: 'The central nerve center of E.G.S. Pillay Engineering College, housing the Admissions Cell, Principal Dr. S. Ramabalan’s office, Controller of Examinations, and administrative secretariats.',
    hours: '8:30 AM - 5:30 PM'
  },
  {
    id: 'computing-block',
    name: 'Computing & Artificial Intelligence Complex',
    category: 'Academics',
    color: '#3b82f6', // Indigo/Blue
    x: 230,
    y: 280,
    width: 160,
    height: 120,
    label: 'Computing & AI Complex',
    subtext: 'CSE, AI&DS, IT & Cyber Security',
    departments: ['B.E. Computer Science & Engineering', 'B.Tech Artificial Intelligence & Data Science', 'B.Tech Information Technology', 'B.Tech CSE (Cyber Security)'],
    facilities: ['NVIDIA GPU AI Lab', 'Cloud Computing & AWS Academy', 'Software Engineering Lab', 'Cybersecurity SOC Simulator'],
    description: 'High-tech academic block dedicated to cutting-edge software engineering, deep learning, data science, and cloud computing with high-speed fiber-optic connectivity.',
    hours: '8:30 AM - 6:00 PM'
  },
  {
    id: 'ece-eee-block',
    name: 'Electronics, Electrical & Biomedical Block',
    category: 'Academics',
    color: '#8b5cf6', // Violet
    x: 420,
    y: 270,
    width: 150,
    height: 110,
    label: 'ECE, EEE & BME Complex',
    subtext: 'Electronics, EV & Biomedical Labs',
    departments: ['B.E. Electronics & Communication (ECE)', 'B.E. Electrical & Electronics (EEE)', 'B.E. Biomedical Engineering (BME)', 'M.E. Power Electronics'],
    facilities: ['VLSI & Embedded Systems Lab', 'Electric Vehicle (EV) Testbed', 'Biomedical Diagnostic Lab', '5G Wireless Communication Lab'],
    description: 'Specialized laboratories for circuit design, robotics microcontrollers, biomedical hospital instrumentation, and renewable energy test systems.',
    hours: '8:30 AM - 5:30 PM'
  },
  {
    id: 'mech-civil-block',
    name: 'Mechanical & Civil Engineering Center',
    category: 'Academics',
    color: '#ef4444', // Red / Coral
    x: 600,
    y: 270,
    width: 160,
    height: 120,
    label: 'Mechanical & Civil Block',
    subtext: 'CNC Machining & Robotics Lab',
    departments: ['B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.E. Manufacturing Engineering', 'M.E. Environmental Engineering'],
    facilities: ['Advanced CNC Machining Center', '3D Prototyping & Additive Lab', 'Structural Engineering & Concrete Lab', 'Fluid Mechanics & Thermal Lab'],
    description: 'Heavy machinery and core engineering workshops, featuring industrial CNC lathe machines, 3D printers, Total Station survey gear, and robotics test cells.',
    hours: '8:30 AM - 5:30 PM'
  },
  {
    id: 'management-block',
    name: 'MBA & MCA Management Studies Wing',
    category: 'Academics',
    color: '#d97706', // Amber
    x: 230,
    y: 430,
    width: 150,
    height: 90,
    label: 'MBA & MCA Wing',
    subtext: 'Management & Computer Applications',
    departments: ['MBA (HR, Finance, Marketing, Systems, Operations)', 'MCA (Master of Computer Applications)', 'B.Tech CSBS'],
    facilities: ['Executive Smart Seminar Hall', 'Business Analytics Lab', 'Group Discussion & Interview Suite', 'Case Study Theater'],
    description: 'Corporate-styled postgraduate management wing fostering entrepreneurship, financial modeling, soft skills, and enterprise IT development.',
    hours: '8:30 AM - 5:30 PM'
  },
  {
    id: 'library-block',
    name: 'Central Digital Library & Research Centre',
    category: 'Academics',
    color: '#10b981', // Emerald
    x: 610,
    y: 420,
    width: 140,
    height: 100,
    label: 'Central Library',
    subtext: '50,000+ Volumes & IEEE Digital',
    departments: ['Research & Innovation Hub', 'Anna University Ph.D. Nodal Center'],
    facilities: ['IEEE Xplore & DELNET Digital Gateway', 'Air-Conditioned Quiet Study Commons', 'e-Journal Terminals', 'Multimedia Resource Section'],
    description: 'A two-story scholarly reservoir containing over 50,000 reference volumes, international conference proceedings, and subscribed scientific databases.',
    hours: '8:00 AM - 7:30 PM'
  },
  {
    id: 'auditorium',
    name: 'Chevalier G. S. Pillay Mega Auditorium',
    category: 'Sports & Amenities',
    color: '#f59e0b', // Gold / Amber
    x: 410,
    y: 130,
    width: 170,
    height: 100,
    label: 'Auditorium (1200 Seats)',
    subtext: 'Air-Conditioned Cultural & Event Hall',
    departments: ['Centre for Cultural Affairs', 'Placement Hiring Drives Center'],
    facilities: ['1,200 Cushioned Push-Back Seats', 'Acoustic Surround Sound System', 'Dual Green Rooms', 'High-Lumen Projector Screen'],
    description: 'Named after the founder Chevalier G. S. Pillay, this state-of-the-art auditorium hosts international symposiums, campus recruitment drives by TCS/Zoho, and annual cultural celebrations.',
    hours: 'Open during events & seminars'
  },
  {
    id: 'boys-hostel',
    name: 'Boys Hostel Residence (Kaveri & Vaigai Blocks)',
    category: 'Hostels & Dining',
    color: '#0284c7', // Sky
    x: 80,
    y: 130,
    width: 120,
    height: 180,
    label: 'Boys Hostel (600+)',
    subtext: 'Kaveri & Vaigai Residential Blocks',
    departments: ['Resident Warden Office', 'Hostel Council'],
    facilities: ['2/3/4 Sharing Furnished Rooms', 'Pure Veg & Non-Veg Steam Mess', 'High-Speed 24/7 Wi-Fi', 'Gymnasium & TV Lounge'],
    description: 'Spacious on-campus residential block for 600+ male students with 24/7 power backup, pure RO drinking water, hot water geysers, and security surveillance.',
    hours: '24/7 (Gate closes at 8:30 PM)'
  },
  {
    id: 'girls-hostel',
    name: 'Girls Hostel Residence (Thamarai & Malligai Blocks)',
    category: 'Hostels & Dining',
    color: '#ec4899', // Pink
    x: 800,
    y: 130,
    width: 120,
    height: 180,
    label: 'Girls Hostel (450+)',
    subtext: 'Thamarai & Malligai Blocks',
    departments: ['Resident Lady Warden Office', 'Health & Safety Desk'],
    facilities: ['Dedicated Gated Compound', 'Hygienic Mess with Balanced Diet', 'Indoor Recreation Room', 'Medical First Aid Station'],
    description: 'Secure, gated hostel compound providing safe accommodation for 450+ female students with resident lady wardens, biometric turnstiles, and landscaped courtyard.',
    hours: '24/7 (Gate closes at 7:30 PM)'
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex & Athletic Grounds',
    category: 'Sports & Amenities',
    color: '#10b981', // Green
    x: 790,
    y: 350,
    width: 160,
    height: 220,
    label: 'Sports Stadium & Turf',
    subtext: 'Cricket, Football & Courts',
    departments: ['Department of Physical Education'],
    facilities: ['Full-sized Cricket Ground', 'Football Turf', 'Floodlit Basketball & Volleyball Courts', 'Kabaddi Mats & Track/Field'],
    description: 'Sprawling athletic complex fostering university champions in athletics, cricket, football, and kabaddi, supporting our Sports Excellence Quota athletes.',
    hours: '6:00 AM - 8:00 AM & 4:30 PM - 7:00 PM'
  },
  {
    id: 'canteen',
    name: 'Cafeteria & Student Amenities Plaza',
    category: 'Sports & Amenities',
    color: '#f97316', // Orange
    x: 230,
    y: 160,
    width: 120,
    height: 80,
    label: 'Canteen & Food Plaza',
    subtext: 'Multi-Cuisine Snacks & Meals',
    departments: ['Student Welfare Services'],
    facilities: ['South Indian Meals & Chinese Snacks', 'Fresh Juice & Bakery Counter', 'Stationery & Photocopying Shop', 'Bank ATM Kiosk'],
    description: 'Bustling social hub offering nutritious, affordable meals, refreshments, tea/coffee, snacks, stationery essentials, and an on-campus ATM.',
    hours: '7:30 AM - 7:00 PM'
  },
  {
    id: 'transport-bay',
    name: 'Transport Bay & Fleet Terminal',
    category: 'Admin & Transport',
    color: '#64748b', // Slate
    x: 220,
    y: 560,
    width: 250,
    height: 90,
    label: 'Transport Bay (52+ Buses)',
    subtext: 'Boarding Point 1-10 for 12 Towns',
    departments: ['Transport Department Office'],
    facilities: ['52+ GPS Tracked Buses', 'Designated Route Boarding Platforms', 'Bus Maintenance Bay', 'Emergency Transport Helpdesk'],
    description: 'Central departure and arrival hub for 52+ college buses serving Nagapattinam, Karaikal, Thiruvarur, Mayiladuthurai, Velankanni, and Mannargudi.',
    hours: 'Arrival 8:40 AM | Departure 5:00 PM'
  },
  {
    id: 'main-gate',
    name: 'Main Campus Entrance & Security Plaza',
    category: 'Admin & Transport',
    color: '#0f172a', // Dark Navy
    x: 480,
    y: 600,
    width: 150,
    height: 60,
    label: 'Main Gate & Security',
    subtext: 'Old Nagore Main Road Entrance',
    departments: ['Campus Security & Vigilance'],
    facilities: ['Visitor Registration Desk', 'Vehicle Parking Plaza', 'Drop-off Portico', '24/7 CCTV Monitoring Station'],
    description: 'The grand ornamental entrance arch facing the Old Nagore Main Road (Highway). All visitors, parents, and students enter through strict security check.',
    hours: 'Open 24/7'
  }
];

export const CampusMapModal: React.FC<CampusMapModalProps> = ({
  isOpen,
  onClose,
  onAskAiTopic,
}) => {
  const [selectedZone, setSelectedZone] = useState<CampusZone>(CAMPUS_ZONES[0]);
  const [hoveredZone, setHoveredZone] = useState<CampusZone | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const categories = ['All', 'Academics', 'Hostels & Dining', 'Sports & Amenities', 'Admin & Transport'];

  const filteredZones = CAMPUS_ZONES.filter((z) => {
    const matchesCategory = filterCategory === 'All' || z.category === filterCategory;
    const matchesSearch =
      searchQuery === '' ||
      z.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      z.subtext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      z.departments?.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      z.facilities?.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activeZone = hoveredZone || selectedZone;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden text-slate-100">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-sky-950 via-indigo-950 to-slate-900 border-b border-sky-800/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Navigation className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white tracking-wide">
                  EGSPEC Interactive Campus Map
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  40+ Acre Campus
                </span>
              </div>
              <p className="text-xs text-sky-200">
                Old Nagore Main Road, Thethi Village, Nagore, Nagapattinam - 611 002
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={COLLEGE_DATA.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-900/60 hover:bg-sky-800/60 border border-sky-700/60 text-xs text-sky-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls & Filter Toolbar */}
        <div className="px-6 py-2.5 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-800/80 p-1 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  filterCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box and Zoom Controls */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search building, lab, or hostel..."
                className="pl-8 pr-3 py-1 text-xs rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 w-44 sm:w-56"
              />
            </div>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
                title="Zoom In"
                className="p-1 hover:bg-slate-700 text-slate-300 rounded"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                title="Zoom Out"
                className="p-1 hover:bg-slate-700 text-slate-300 rounded"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                title="Reset Zoom"
                className="p-1 hover:bg-slate-700 text-slate-300 rounded"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Main Body (Map SVG + Details Panel) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Interactive SVG Canvas Column (8 cols) */}
          <div className="lg:col-span-8 p-4 bg-slate-950 flex flex-col items-center justify-center overflow-auto relative min-h-[380px] lg:min-h-[520px]">
            {/* SVG Viewport */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg
                viewBox="0 0 1000 680"
                className="w-full max-w-[900px] h-auto select-none drop-shadow-2xl"
              >
                <defs>
                  {/* Grass/Campus Turf Gradient */}
                  <linearGradient id="campusGround" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#061c14" />
                    <stop offset="50%" stopColor="#0a2a1e" />
                    <stop offset="100%" stopColor="#081e16" />
                  </linearGradient>

                  {/* Road Gradient */}
                  <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>

                  {/* Sports Turf Gradient */}
                  <linearGradient id="turfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#166534" />
                    <stop offset="100%" stopColor="#14532d" />
                  </linearGradient>
                </defs>

                {/* 1. Base Campus Boundary & Greenery */}
                <rect x="20" y="20" width="960" height="640" rx="30" fill="url(#campusGround)" stroke="#1e3a2b" strokeWidth="3" />

                {/* Campus Pathway Walkways */}
                {/* Main central avenue from gate */}
                <path d="M 500 640 L 500 480 Q 500 400 500 240 L 500 100" stroke="#334155" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M 500 640 L 500 480 Q 500 400 500 240 L 500 100" stroke="#475569" strokeWidth="2" strokeDasharray="8 8" fill="none" />

                {/* Horizontal East-West connector avenues */}
                <path d="M 140 220 L 860 220" stroke="#334155" strokeWidth="16" strokeLinecap="round" fill="none" />
                <path d="M 140 370 L 860 370" stroke="#334155" strokeWidth="16" strokeLinecap="round" fill="none" />
                <path d="M 140 500 L 860 500" stroke="#334155" strokeWidth="16" strokeLinecap="round" fill="none" />

                {/* Ring Road Perimeter loop */}
                <rect x="60" y="50" width="880" height="570" rx="20" fill="none" stroke="#1e293b" strokeWidth="14" />

                {/* Decorative Trees / Greenery Sprinkles */}
                {[
                  [100, 80], [170, 75], [260, 80], [330, 80], [670, 80], [740, 75], [820, 80],
                  [100, 600], [160, 600], [720, 600], [800, 600], [860, 600],
                  [390, 360], [390, 420], [600, 360], [600, 420]
                ].map(([tx, ty], idx) => (
                  <g key={`tree-${idx}`} transform={`translate(${tx}, ${ty})`}>
                    <circle cx="0" cy="0" r="10" fill="#14532d" opacity="0.8" />
                    <circle cx="-2" cy="-2" r="7" fill="#15803d" />
                    <circle cx="2" cy="2" r="5" fill="#22c55e" opacity="0.6" />
                  </g>
                ))}

                {/* Sports Ground Field Markings */}
                <g transform="translate(800, 370)">
                  {/* Cricket Pitch & Boundary */}
                  <rect x="-10" y="-10" width="150" height="190" rx="16" fill="url(#turfGrad)" stroke="#16a34a" strokeWidth="2" />
                  <ellipse cx="65" cy="70" rx="55" ry="55" fill="none" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 4" />
                  <rect x="60" y="45" width="10" height="50" fill="#ca8a04" rx="2" />
                  {/* Basketball Court */}
                  <rect x="10" y="135" width="110" height="35" rx="4" fill="#0284c7" opacity="0.5" stroke="#38bdf8" strokeWidth="1" />
                </g>

                {/* 2. Interactive Campus Zones & Buildings */}
                {CAMPUS_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  const isHovered = hoveredZone?.id === zone.id;
                  const isHighlighted = filteredZones.some((fz) => fz.id === zone.id);

                  return (
                    <g
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      onMouseEnter={() => setHoveredZone(zone)}
                      onMouseLeave={() => setHoveredZone(null)}
                      className="cursor-pointer transition-all duration-200"
                      opacity={isHighlighted ? 1 : 0.25}
                    >
                      {/* Building Drop Shadow */}
                      <rect
                        x={zone.x + 6}
                        y={zone.y + 8}
                        width={zone.width}
                        height={zone.height}
                        rx="12"
                        fill="#000000"
                        opacity="0.45"
                      />

                      {/* Main Building Base Block */}
                      <rect
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height}
                        rx="12"
                        fill={zone.color}
                        stroke={isSelected ? '#f59e0b' : (isHovered ? '#ffffff' : '#0f172a')}
                        strokeWidth={isSelected ? 3.5 : (isHovered ? 2.5 : 1.5)}
                        className="transition-all"
                      />

                      {/* Building Roof Grid / Architectural Detail */}
                      <rect
                        x={zone.x + 8}
                        y={zone.y + 8}
                        width={zone.width - 16}
                        height={zone.height - 16}
                        rx="6"
                        fill="#ffffff"
                        opacity={isHovered || isSelected ? 0.22 : 0.12}
                      />

                      {/* Text Label Inside Building */}
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 - 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize={zone.width < 140 ? '11' : '13'}
                        fontWeight="bold"
                        className="pointer-events-none drop-shadow-md tracking-tight"
                      >
                        {zone.label}
                      </text>

                      {/* Subtitle / Department summary text */}
                      <text
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2 + 13}
                        textAnchor="middle"
                        fill="#fef08a"
                        fontSize="9.5"
                        fontWeight="600"
                        className="pointer-events-none drop-shadow-sm opacity-90"
                      >
                        {zone.subtext.slice(0, 24)}
                      </text>

                      {/* Selected / Hover Beacon Indicator Pin */}
                      {(isSelected || isHovered) && (
                        <g transform={`translate(${zone.x + zone.width / 2}, ${zone.y - 12})`}>
                          <circle cx="0" cy="0" r="10" fill="#f59e0b" className="animate-ping" opacity="0.6" />
                          <circle cx="0" cy="0" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                          <polygon points="-4,-2 4,-2 0,5" fill="#f59e0b" />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* 3. Compass Rose Indicator */}
                <g transform="translate(900, 75)">
                  <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#334155" strokeWidth="2" opacity="0.9" />
                  <path d="M 0 -22 L 6 -2 L 0 4 L -6 -2 Z" fill="#ef4444" />
                  <path d="M 0 22 L 6 2 L 0 -4 L -6 2 Z" fill="#94a3b8" />
                  <text x="0" y="-12" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">N</text>
                  <text x="0" y="18" textAnchor="middle" fill="#94a3b8" fontSize="8">S</text>
                  <text x="18" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8">E</text>
                  <text x="-18" y="3" textAnchor="middle" fill="#94a3b8" fontSize="8">W</text>
                </g>

                {/* 4. Legend Key */}
                <g transform="translate(50, 605)">
                  <rect x="0" y="0" width="180" height="24" rx="6" fill="#0f172a" opacity="0.8" />
                  <circle cx="15" cy="12" r="5" fill="#3b82f6" />
                  <text x="25" y="15" fill="#cbd5e1" fontSize="9">Academic</text>
                  <circle cx="75" cy="12" r="5" fill="#0284c7" />
                  <text x="85" y="15" fill="#cbd5e1" fontSize="9">Hostels</text>
                  <circle cx="130" cy="12" r="5" fill="#10b981" />
                  <text x="140" y="15" fill="#cbd5e1" fontSize="9">Sports</text>
                </g>
              </svg>
            </div>

            {/* Quick helper tip banner */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Click any building block to view departments, laboratories, and facilities
              </span>
              <span className="font-semibold text-amber-400 hidden sm:inline">
                Nagapattinam - Nagore Main Road Campus
              </span>
            </div>
          </div>

          {/* Details Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between overflow-y-auto max-h-[500px] lg:max-h-none">
            <div className="space-y-4">
              {/* Category Pill */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: `${activeZone.color}20`,
                    color: activeZone.color,
                    border: `1px solid ${activeZone.color}40`,
                  }}
                >
                  {activeZone.category}
                </span>

                {activeZone.hours && (
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {activeZone.hours}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {activeZone.name}
                </h4>
                <p className="text-xs text-amber-400 font-semibold mt-1">
                  {activeZone.subtext}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                {activeZone.description}
              </p>

              {/* Departments List (if academic) */}
              {activeZone.departments && activeZone.departments.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                    Resident Departments & Units:
                  </h5>
                  <div className="space-y-1">
                    {activeZone.departments.map((dept, i) => (
                      <div
                        key={i}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                        <span className="truncate">{dept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities / Labs List */}
              {activeZone.facilities && activeZone.facilities.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Key Labs & Facilities:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeZone.facilities.map((fac, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons Footer */}
            <div className="pt-4 border-t border-slate-800 mt-6 space-y-2">
              <button
                onClick={() => {
                  onAskAiTopic(`Tell me about the facilities, laboratories, and departments located in ${activeZone.name}`);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Ask AI Counselor About This Zone
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={COLLEGE_DATA.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  Directions
                </a>

                <a
                  href={`tel:${COLLEGE_DATA.contact.phoneOffice}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
                >
                  Campus Office
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
