export interface CourseInfo {
  id: string;
  name: string;
  degree: 'B.E.' | 'B.Tech' | 'M.E.' | 'MBA' | 'MCA';
  level: 'UG' | 'PG';
  duration: string;
  intake: number;
  description: string;
  keyTopics: string[];
  careerProspects: string[];
  eligibility: string;
  nbaAccredited?: boolean;
}

export interface RecruiterInfo {
  name: string;
  category: 'IT / Software' | 'Core Engineering' | 'Consulting / Analytics' | 'Product';
  logoText: string;
}

export interface CollegeDetail {
  name: string;
  shortName: string;
  tagline: string;
  established: number;
  founder: string;
  principal: string;
  autonomousSince: number;
  tneaCode: string;
  naacGrade: string;
  affiliatingUniversity: string;
  approvals: string[];
  address: {
    street: string;
    village: string;
    town: string;
    district: string;
    state: string;
    pincode: string;
    full: string;
    mapsUrl: string;
  };
  contact: {
    phoneOffice: string;
    phoneAdmissions: string[];
    emailAdmissions: string;
    emailEnquiry: string;
    emailPrincipal: string;
    website: string;
  };
  placements: {
    totalOffers: number;
    highestPackage: string;
    averagePackage: string;
    placementRate: string;
    recruitersCount: number;
  };
  hostel: {
    feeAnnual: string;
    amenities: string[];
    boysCapacity: string;
    girlsCapacity: string;
    food: string;
  };
  transport: {
    busFleet: number;
    coverageCities: string[];
    features: string[];
  };
  scholarships: {
    name: string;
    benefit: string;
    eligibility: string;
  }[];
  courses: CourseInfo[];
  topRecruiters: RecruiterInfo[];
  facilities: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const COLLEGE_DATA: CollegeDetail = {
  name: "E.G.S. Pillay Engineering College (Autonomous)",
  shortName: "EGSPEC",
  tagline: "Empowering Minds, Engineering the Future Since 1995",
  established: 1995,
  founder: "Chevalier G. S. Pillay",
  principal: "Dr. S. Ramabalan, M.E., Ph.D.",
  autonomousSince: 2017,
  tneaCode: "3806",
  naacGrade: "A++ Grade (Highest Tier Accreditation)",
  affiliatingUniversity: "Anna University, Chennai (Permanent Affiliation)",
  approvals: [
    "UGC Autonomous Status under Section 2(f) & 12(B)",
    "AICTE Approved (All India Council for Technical Education)",
    "NAAC Accredited with 'A++' Grade",
    "NBA Accredited Departments (CSE, MECH, ECE, EEE, IT)",
    "ISO 9001:2015 Certified Institution"
  ],
  address: {
    street: "Old Nagore Main Road",
    village: "Thethi Village",
    town: "Nagore",
    district: "Nagapattinam",
    state: "Tamil Nadu",
    pincode: "611002",
    full: "Old Nagore Main Road, Thethi Village, Nagore, Nagapattinam - 611 002, Tamil Nadu, India",
    mapsUrl: "https://maps.google.com/?q=E.G.S.+Pillay+Engineering+College+Nagapattinam"
  },
  contact: {
    phoneOffice: "04365-251112 / 251114",
    phoneAdmissions: ["+91 99768 88999", "+91 86809 54537", "+91 97886 54537"],
    emailAdmissions: "admission@egspec.org",
    emailEnquiry: "enquiry@egspec.org",
    emailPrincipal: "principal@egspec.org",
    website: "https://egspec.org"
  },
  placements: {
    totalOffers: 782,
    highestPackage: "12.00 LPA",
    averagePackage: "4.20 LPA",
    placementRate: "92%+",
    recruitersCount: 120
  },
  hostel: {
    feeAnnual: "₹42,000 - ₹46,000 / year (Inclusive of Accommodation, RO Water, Electricity & Mess)",
    amenities: [
      "Separate gated hostels for Boys and Girls on campus",
      "High-speed 24/7 Wi-Fi Internet connectivity",
      "Hygienic steam-cooking mess providing delicious South Indian Veg & Non-Veg meals",
      "24/7 Resident Wardens and security surveillance with CCTV",
      "Solar water heaters, modern recreation halls, indoor games & reading rooms",
      "Emergency medical assistance and tie-up with local multi-specialty hospitals"
    ],
    boysCapacity: "600+ Residents",
    girlsCapacity: "450+ Residents",
    food: "Pure vegetarian & quality non-vegetarian food prepared under strict hygienic conditions. Daily special snacks and packed lunches during events."
  },
  transport: {
    busFleet: 52,
    coverageCities: [
      "Nagapattinam", "Nagore", "Karaikal", "Thiruvarur", "Mayiladuthurai",
      "Velankanni", "Vedaranyam", "Sirkazhi", "Mannargudi", "Kumbakonam", "Thiruthuraipoondi", "Kuthalam"
    ],
    features: [
      "GPS tracked fleet with mobile tracking for parents & students",
      "Covering all rural and urban routes across 60 km radius",
      "Well-experienced licensed drivers and speed-governed buses for safety",
      "Affordable annual bus fee with flexible term payments"
    ]
  },
  scholarships: [
    {
      name: "First Graduate (FG) Concession",
      benefit: "₹25,000 - ₹27,500 tuition fee waiver per year (Govt. of Tamil Nadu)",
      eligibility: "Students who are the first person in their family to pursue graduation, admitted via TNEA counselling."
    },
    {
      name: "Post-Matric SC / ST / SCA Scholarship",
      benefit: "100% Tuition fee waiver + Maintenance allowance",
      eligibility: "SC, ST, and SCA community students through government quota with family annual income under ₹2.5 Lakhs."
    },
    {
      name: "BC / MBC / DNC Welfare Scholarship",
      benefit: "Tuition and exam fee support through State Welfare Department",
      eligibility: "BC/MBC/DNC students with family annual income less than ₹2.0 Lakhs."
    },
    {
      name: "EGS Pillay Merit Scholarship",
      benefit: "Up to 50% - 100% Tuition Fee waiver",
      eligibility: "Students scoring 90%+ in 10+2 State Board / CBSE or exemplary rank in entrance examinations."
    },
    {
      name: "Sports Excellence Quota",
      benefit: "Free education and hostel for state/national athletic achievers",
      eligibility: "Students who represented District, State or National levels in cricket, athletics, football, volleyball, or kabaddi."
    },
    {
      name: "Minority Scholarship",
      benefit: "Merit-cum-Means financial grant",
      eligibility: "Muslim, Christian, Sikh, Buddhist, Jain students scoring >50% marks with low family income."
    }
  ],
  courses: [
    {
      id: "btech-aids",
      name: "Artificial Intelligence and Data Science (AI & DS)",
      degree: "B.Tech",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 120,
      description: "Cutting-edge curriculum blending machine learning, deep learning, NLP, computer vision, big data analytics, and cloud AI systems.",
      keyTopics: ["Machine Learning", "Deep Learning", "Data Engineering", "Cloud Computing", "Python & PyTorch", "Generative AI"],
      careerProspects: ["AI Engineer", "Data Scientist", "ML Specialist", "Business Intelligence Analyst", "Big Data Architect"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "be-cse",
      name: "Computer Science and Engineering",
      degree: "B.E.",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 180,
      nbaAccredited: true,
      description: "Flagship NBA-accredited program focusing on algorithmic problem solving, software engineering, cloud systems, and full-stack development.",
      keyTopics: ["Data Structures & Algorithms", "Full Stack Web Dev", "Distributed Systems", "Database Systems", "Operating Systems"],
      careerProspects: ["Software Development Engineer (SDE)", "Cloud Architect", "Full Stack Developer", "Systems Analyst", "Database Administrator"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "btech-it",
      name: "Information Technology",
      degree: "B.Tech",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 60,
      nbaAccredited: true,
      description: "Comprehensive software, enterprise networking, mobile app development, and cybersecurity framework designed for tech product companies.",
      keyTopics: ["Mobile Application Dev", "Network Security", "Cloud Technologies", "Web Technologies", "Software Testing"],
      careerProspects: ["IT Consultant", "Mobile App Developer", "DevOps Engineer", "Network Administrator", "Quality Assurance Lead"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "btech-csbs",
      name: "Computer Science and Business Systems",
      degree: "B.Tech",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 60,
      description: "Interdisciplinary program designed in consultation with corporate leaders to combine computer science rigor with business analytics and fintech.",
      keyTopics: ["Computational Thinking", "Business Analytics", "Financial Management", "Enterprise IT Architecture", "Design Thinking"],
      careerProspects: ["Fintech Analyst", "Technology Consultant", "Product Manager", "Business Analyst", "Solutions Architect"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "btech-cyber",
      name: "Computer Science and Engineering (Cyber Security)",
      degree: "B.Tech",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 60,
      description: "Specialized engineering program covering ethical hacking, digital forensics, cryptography, SOC operations, and network defense.",
      keyTopics: ["Ethical Hacking", "Cryptography", "Digital Forensics", "Network Security", "Cloud Security", "Cyber Law"],
      careerProspects: ["Cyber Security Analyst", "Penetration Tester", "SOC Analyst", "Information Security Officer", "Security Architect"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "be-ece",
      name: "Electronics and Communication Engineering",
      degree: "B.E.",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 120,
      nbaAccredited: true,
      description: "NBA-accredited program covering VLSI design, embedded systems, 5G wireless communication, signal processing, and IoT devices.",
      keyTopics: ["VLSI Design", "Embedded Systems", "5G & Wireless Networks", "Digital Signal Processing", "Microcontrollers & IoT"],
      careerProspects: ["VLSI Design Engineer", "Embedded Firmware Developer", "Telecom Engineer", "IoT Solutions Specialist", "Hardware Engineer"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "be-eee",
      name: "Electrical and Electronics Engineering",
      degree: "B.E.",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 60,
      nbaAccredited: true,
      description: "High-demand branch focusing on Electric Vehicles (EV), smart grids, renewable solar/wind energy, power electronics, and industrial automation.",
      keyTopics: ["Electric Vehicle Tech", "Power Electronics", "Renewable Energy Systems", "PLC & SCADA Automation", "Control Systems"],
      careerProspects: ["EV Powertrain Engineer", "Power Systems Engineer", "Automation Engineer", "Renewable Energy Consultant", "Electrical Designer"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "be-mech",
      name: "Mechanical Engineering",
      degree: "B.E.",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 120,
      nbaAccredited: true,
      description: "Renowned NBA-accredited department with advanced CNC machine centers, 3D printing labs, robotics, thermal dynamics, and CAD/CAM software.",
      keyTopics: ["CAD/CAM/CAE", "Robotics & Automation", "Thermodynamics", "Manufacturing Processes", "Computational Fluid Dynamics"],
      careerProspects: ["Mechanical Design Engineer", "Automotive Engineer", "Production Lead", "Robotics Specialist", "Quality Control Manager"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "be-civil",
      name: "Civil Engineering",
      degree: "B.E.",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 60,
      description: "Focus on modern infrastructure, structural analysis, smart building materials, green construction, surveying with Total Station & GIS.",
      keyTopics: ["Structural Analysis", "Total Station & GIS Surveying", "Concrete Technology", "Geotechnical Engineering", "AutoCAD & Revit"],
      careerProspects: ["Structural Engineer", "Site Engineer", "Urban Planner", "Quantity Surveyor", "Govt Civil Services (PWD/Highways)"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics (PCM). TNEA Code: 3806."
    },
    {
      id: "be-bme",
      name: "Biomedical Engineering",
      degree: "B.E.",
      level: "UG",
      duration: "4 Years (8 Semesters)",
      intake: 60,
      description: "Interdisciplinary healthcare engineering covering medical device design, hospital equipment calibration, biosensors, and medical imaging.",
      keyTopics: ["Medical Instrumentation", "Biomaterials", "Biosignal Processing", "Medical Imaging (CT/MRI)", "Healthcare IoT"],
      careerProspects: ["Biomedical Equipment Engineer", "Clinical Specialist", "Medical Device R&D", "Hospital Technology Manager"],
      eligibility: "Pass in 10+2 / HSC with Physics, Chemistry, and Mathematics/Biology. TNEA Code: 3806."
    },
    {
      id: "mba",
      name: "Master of Business Administration (MBA)",
      degree: "MBA",
      level: "PG",
      duration: "2 Years (4 Semesters)",
      intake: 120,
      description: "Premier management program with specializations in Human Resource, Finance, Marketing, Systems & Operations, and Business Analytics.",
      keyTopics: ["Strategic Management", "Digital Marketing", "Corporate Finance", "HR Analytics", "Supply Chain Management"],
      careerProspects: ["Marketing Manager", "Financial Analyst", "HR Business Partner", "Operations Executive", "Entrepreneur"],
      eligibility: "Any recognized Bachelor's Degree with minimum 50% marks (45% for reserved categories). TANCET / MAT or Management Quota."
    },
    {
      id: "mca",
      name: "Master of Computer Applications (MCA)",
      degree: "MCA",
      level: "PG",
      duration: "2 Years (4 Semesters)",
      intake: 60,
      description: "Advanced computing degree covering enterprise software architecture, full-stack frameworks, cloud computing, and AI engineering.",
      keyTopics: ["Enterprise Java & Python", "Advanced Cloud Services", "Modern Web Frameworks", "Cybersecurity", "Data Analytics"],
      careerProspects: ["Software Engineer", "Technical Consultant", "Database Administrator", "Full Stack Developer", "Systems Architect"],
      eligibility: "Passed BCA / B.Sc (CS/IT) or any Bachelor's degree with Mathematics at 10+2 or Graduation level with 50% (45% reserved)."
    },
    {
      id: "me-cse",
      name: "M.E. Computer Science and Engineering",
      degree: "M.E.",
      level: "PG",
      duration: "2 Years (4 Semesters)",
      intake: 18,
      description: "Research-driven postgraduate degree in high performance computing, cloud architectures, advanced machine learning, and cryptography.",
      keyTopics: ["High Performance Computing", "Advanced Machine Learning", "Distributed Systems", "Information Security"],
      careerProspects: ["Senior Software Architect", "Research Scientist", "University Professor", "Lead AI Engineer"],
      eligibility: "B.E./B.Tech in CSE / IT / relevant branch with 50% marks. TANCET / CEETA-PG / GATE."
    },
    {
      id: "me-comm",
      name: "M.E. Communication Systems",
      degree: "M.E.",
      level: "PG",
      duration: "2 Years (4 Semesters)",
      intake: 18,
      description: "Postgraduate specialization in wireless MIMO networks, satellite communications, optical fiber networks, and RF engineering.",
      keyTopics: ["Wireless Communication", "RF & Microwave Engineering", "Optical Networks", "Advanced DSP"],
      careerProspects: ["Telecom Specialist", "RF Systems Engineer", "Wireless Network Architect", "R&D Scientist"],
      eligibility: "B.E./B.Tech in ECE / EEE / relevant branch with 50% marks. TANCET / GATE."
    },
    {
      id: "me-mfg",
      name: "M.E. Manufacturing Engineering",
      degree: "M.E.",
      level: "PG",
      duration: "2 Years (4 Semesters)",
      intake: 18,
      description: "Advanced manufacturing systems, Industry 4.0, additive manufacturing, smart factories, and lean manufacturing principles.",
      keyTopics: ["Industry 4.0", "Additive Manufacturing", "Lean & Six Sigma", "Advanced Materials"],
      careerProspects: ["Manufacturing Lead", "Plant Manager", "R&D Engineer in Automotive & Aerospace"],
      eligibility: "B.E./B.Tech in Mechanical / Production / Manufacturing / Automobile with 50% marks."
    }
  ],
  topRecruiters: [
    { name: "Tata Consultancy Services (TCS)", category: "IT / Software", logoText: "TCS" },
    { name: "Infosys", category: "IT / Software", logoText: "INFOSYS" },
    { name: "Wipro", category: "IT / Software", logoText: "WIPRO" },
    { name: "Cognizant (CTS)", category: "IT / Software", logoText: "CTS" },
    { name: "L&T Technology Services", category: "Core Engineering", logoText: "L&T" },
    { name: "HCL Technologies", category: "IT / Software", logoText: "HCL" },
    { name: "Zoho Corporation", category: "Product", logoText: "ZOHO" },
    { name: "Mindtree", category: "IT / Software", logoText: "MINDTREE" },
    { name: "Tech Mahindra", category: "IT / Software", logoText: "TECH M" },
    { name: "Appranix", category: "Product", logoText: "APPRANIX" },
    { name: "Jasmine Infotech", category: "Core Engineering", logoText: "JASMINE" },
    { name: "Mallow Technologies", category: "IT / Software", logoText: "MALLOW" },
    { name: "Avalon Technologies", category: "Core Engineering", logoText: "AVALON" },
    { name: "Foxconn", category: "Core Engineering", logoText: "FOXCONN" },
    { name: "Sutherland Global", category: "Consulting / Analytics", logoText: "SUTHERLAND" },
    { name: "Capgemini", category: "IT / Software", logoText: "CAPGEMINI" }
  ],
  facilities: [
    {
      title: "UGC Autonomous Curriculum",
      description: "Industry-aligned syllabus updated annually in consultation with tech titans, allowing credit transfers and flexible electives.",
      icon: "Award"
    },
    {
      title: "Centres of Excellence & Labs",
      description: "State-of-the-art laboratories including AI & Cloud Computing, CNC Machining, Robotics & Automation, and Electric Vehicle Testbeds.",
      icon: "Cpu"
    },
    {
      title: "High Placement Track Record",
      description: "780+ offers per year with top companies like TCS, Zoho, Infosys, and L&T, backed by 4-year structured training.",
      icon: "Briefcase"
    },
    {
      title: "Central Digital Library",
      description: "Air-conditioned repository with 50,000+ volumes, e-journals from IEEE, DELNET, ScienceDirect, and high-speed multimedia access.",
      icon: "BookOpen"
    },
    {
      title: "Comprehensive Transport",
      description: "Fleet of 50+ college buses connecting Nagapattinam, Karaikal, Thiruvarur, Mayiladuthurai, Velankanni, and beyond.",
      icon: "Bus"
    },
    {
      title: "Separate Secure Hostels",
      description: "Well-furnished on-campus hostels for boys & girls with Wi-Fi, hygienic steam mess (veg/non-veg), gym, and 24/7 security.",
      icon: "Home"
    },
    {
      title: "1,200-Seat Auditorium",
      description: "Air-conditioned mega-auditorium equipped with cutting-edge acoustics for national symposiums, hackathons, and cultural festivals.",
      icon: "Users"
    },
    {
      title: "Innovation & Incubation Cell",
      description: "MoE IIC approved incubation center offering seed funding, patenting assistance, and mentorship for student entrepreneurs.",
      icon: "Lightbulb"
    }
  ]
};

export const QUICK_ENQUIRY_TOPICS = [
  { label: "TNEA Code & Cutoff", prompt: "What is the TNEA counselling code and cutoff eligibility for EGS Pillay Engineering College?" },
  { label: "Courses Offered", prompt: "List all UG and PG courses available at EGS Pillay Engineering College with seat intake." },
  { label: "Fee Structure & Scholarships", prompt: "What is the fee structure for B.E./B.Tech, hostel fees, and what scholarships (like First Graduate / SC-ST) are available?" },
  { label: "Placements & Top Recruiters", prompt: "Tell me about placement statistics, highest package, and top recruiting companies at EGS Pillay Engineering College." },
  { label: "Hostel & Transport", prompt: "What are the hostel facilities, mess food options, and bus routes for EGS Pillay?" },
  { label: "How to Apply / Admissions", prompt: "How can I apply for admission at EGS Pillay Engineering College for the 2026-2027 academic session?" }
];
