import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { COLLEGE_DATA } from './src/data/collegeData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory store for student admission inquiries
interface StudentEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  coursePreference: string;
  cutoffScore?: number;
  city: string;
  notes?: string;
  createdAt: string;
}

const enquiries: StudentEnquiry[] = [];

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('[Gemini API] Client initialized successfully.');
  } catch (err) {
    console.error('[Gemini API] Error initializing client:', err);
  }
} else {
  console.warn('[Gemini API] GEMINI_API_KEY is not set. Intelligent grounded fallback responses will be used.');
}

// System instruction grounding the model in full EGS Pillay Engineering College details
const SYSTEM_INSTRUCTION = `
You are "EGSPEC AI Counselor", the official AI Admissions & College Enquiry Assistant for E.G.S. Pillay Engineering College (Autonomous), Nagapattinam, Tamil Nadu, India (official portal: https://egspec.org/).

INSTITUTION FACTS:
- Full Name: E.G.S. Pillay Engineering College (Autonomous)
- Established: 1995 by Chevalier G. S. Pillay. Located in Nagore, Nagapattinam, Tamil Nadu.
- Principal: Dr. S. Ramabalan, M.E., Ph.D.
- Autonomous Status: UGC Autonomous since 2017. Permanent Affiliation with Anna University, Chennai.
- Accreditations: NAAC 'A++' Grade (highest tier), NBA Accredited departments (CSE, MECH, ECE, EEE, IT), AICTE approved, ISO 9001:2015.
- TNEA Counselling Code: 3806 (Crucial for Tamil Nadu Engineering Admissions).
- Contact Info:
  - Phone: 04365-251112 / 251114
  - Admissions Hotline: +91 99768 88999 / +91 86809 54537 / +91 97886 54537
  - Emails: admission@egspec.org, enquiry@egspec.org, principal@egspec.org
  - Website: https://egspec.org

COURSES OFFERED:
1. UNDERGRADUATE (B.E. / B.Tech - 4 Years):
   - B.E. Computer Science and Engineering (CSE) - 180 seats (NBA Accredited)
   - B.Tech Artificial Intelligence and Data Science (AI & DS) - 120 seats
   - B.Tech Information Technology (IT) - 60 seats (NBA Accredited)
   - B.Tech Computer Science and Business Systems (CSBS) - 60 seats
   - B.Tech CSE (Cyber Security) - 60 seats
   - B.E. Electronics and Communication Engineering (ECE) - 120 seats (NBA Accredited)
   - B.E. Electrical and Electronics Engineering (EEE) - 60 seats (NBA Accredited)
   - B.E. Mechanical Engineering (MECH) - 120 seats (NBA Accredited)
   - B.E. Civil Engineering (CIVIL) - 60 seats
   - B.E. Biomedical Engineering (BME) - 60 seats
2. POSTGRADUATE (M.E. / MBA / MCA - 2 Years):
   - MBA (Master of Business Administration) - 120 seats (HR, Finance, Marketing, Systems, Operations)
   - MCA (Master of Computer Applications) - 60 seats
   - M.E. Computer Science & Engineering (18 seats)
   - M.E. Communication Systems (18 seats)
   - M.E. Manufacturing Engineering (18 seats)
   - M.E. Environmental Engineering (18 seats)
   - M.E. Power Electronics and Drives (18 seats)
3. DOCTORAL (Ph.D.): Anna University recognized research centers in Mech, CSE, ECE, EEE, Science.

ADMISSION & ELIGIBILITY:
- UG (B.E./B.Tech): 10+2 / HSC pass with PCM. Minimum 45% marks for General, 40% for BC/BCM/MBC/DNC/SC/SCA/ST.
  - TNEA Cutoff: Out of 200 (Maths = 100, Physics = 50, Chemistry = 50).
  - TNEA Code: 3806. Also direct management admissions available.
- Lateral Entry: Direct 2nd year admission for 3-year Diploma holders or B.Sc. with Maths.
- PG: TANCET / CEETA-PG / GATE or Direct admission for MBA/MCA/M.E.

FEES & SCHOLARSHIPS:
- Government Quota TNEA Tuition fee: ~₹50,000 to ₹55,000 / year.
- Management Quota: ~₹85,000 to ₹1,20,000 / year depending on course.
- Scholarships:
  - First Graduate (FG): ₹25,000 - ₹27,500 govt tuition fee reduction.
  - SC/ST/SCA Post-Matric: 100% Tuition fee waiver by TN Govt.
  - BC/MBC/Minority government scholarships.
  - Merit scholarship for 10+2 scores > 75%, 85%, 90%+.
  - Sports quota with free tuition & hostel.
- Hostel: Separate for Boys and Girls on campus (~₹42,000 - ₹46,000/year including mess with veg & non-veg meals, Wi-Fi, electricity, 24/7 security).
- Transport: 52+ college buses covering Nagapattinam, Karaikal, Thiruvarur, Mayiladuthurai, Velankanni, Vedaranyam, Sirkazhi, Mannargudi, etc.

PLACEMENTS:
- 782+ Offers in recent year.
- Highest Package: 12.00 LPA. Average: 4.20 LPA.
- Top Recruiters: TCS, Infosys, Wipro, Cognizant (CTS), L&T Technology Services, Zoho, HCL, Mindtree, Tech Mahindra, Appranix, Jasmine Infotech, Mallow Technologies, Foxconn.

TONE & BEHAVIOR:
- Warm, professional, helpful, and encouraging.
- Support both English and Tamil (Tanglish or Tamil script) gracefully. If the user writes in Tamil or Tanglish, answer clearly in supportive friendly language.
- Structure answers with bullet points, bold key stats, and clear next steps (such as applying online at egspec.org or calling the admission helpline: 99768 88999).
- When discussing courses or admissions, highlight the TNEA Counselling Code 3806.
`;

// Helper: fallback response generator based on keywords
function generateGroundedFallbackResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes('tnea') || query.includes('code') || query.includes('counseling') || query.includes('counselling')) {
    return `### **TNEA Counselling Code: 3806**\n\n` +
      `**E.G.S. Pillay Engineering College (Autonomous)** participates in the Tamil Nadu Engineering Admissions (TNEA) under **Counselling Code 3806**.\n\n` +
      `- **Accreditation**: NAAC 'A++' Grade & NBA Accredited programs.\n` +
      `- **Affiliation**: Anna University, Chennai (Autonomous status since 2017).\n` +
      `- **Eligibility**: 10+2 with PCM (Minimum 45% for General, 40% for BC/BCM/MBC/SC/ST).\n` +
      `- **TNEA Cutoff Calculation**: Maths (100) + Physics (50) + Chemistry (50) = Max 200 marks.\n\n` +
      `Need guidance on cutoff trends or branch allocation? Call our Admission Desk: **+91 99768 88999** or visit [egspec.org](https://egspec.org).`;
  }

  if (query.includes('course') || query.includes('branch') || query.includes('department') || query.includes('b.e') || query.includes('b.tech') || query.includes('mba') || query.includes('mca')) {
    return `### **Courses Offered at E.G.S. Pillay Engineering College (TNEA Code: 3806)**\n\n` +
      `#### **Undergraduate Programs (B.E. / B.Tech - 4 Years):**\n` +
      `- **B.E. Computer Science and Engineering (CSE)** - 180 seats (NBA Accredited)\n` +
      `- **B.Tech Artificial Intelligence & Data Science (AI & DS)** - 120 seats\n` +
      `- **B.Tech Information Technology (IT)** - 60 seats (NBA Accredited)\n` +
      `- **B.Tech Computer Science & Business Systems (CSBS)** - 60 seats\n` +
      `- **B.Tech CSE (Cyber Security)** - 60 seats\n` +
      `- **B.E. Electronics & Communication Engineering (ECE)** - 120 seats (NBA Accredited)\n` +
      `- **B.E. Electrical & Electronics Engineering (EEE)** - 60 seats (NBA Accredited)\n` +
      `- **B.E. Mechanical Engineering (MECH)** - 120 seats (NBA Accredited)\n` +
      `- **B.E. Civil Engineering (CIVIL)** - 60 seats\n` +
      `- **B.E. Biomedical Engineering (BME)** - 60 seats\n\n` +
      `#### **Postgraduate Programs (PG - 2 Years):**\n` +
      `- **MBA** (HR, Finance, Marketing, Systems, Operations) - 120 seats\n` +
      `- **MCA** (Master of Computer Applications) - 60 seats\n` +
      `- **M.E.** in CSE, Communication Systems, Manufacturing, Environmental, Power Electronics & Drives.\n\n` +
      `Direct & Lateral Entry admissions are open! For enquiries: **+91 86809 54537**.`;
  }

  if (query.includes('fee') || query.includes('fees') || query.includes('cost') || query.includes('scholarship') || query.includes('first graduate')) {
    return `### **Fee Structure & Scholarship Schemes**\n\n` +
      `#### **Tuition Fees:**\n` +
      `- **Government Quota (via TNEA 3806)**: ~₹50,000 – ₹55,000 / year (as fixed by the State Fee Committee).\n` +
      `- **Management Quota**: ~₹85,000 – ₹1,20,000 / year (varies by specialization).\n` +
      `- **Hostel & Mess**: ~₹42,000 – ₹46,000 / year (including room, Wi-Fi, electricity, RO water, and delicious veg/non-veg food).\n\n` +
      `#### **Government & Institutional Scholarships:**\n` +
      `1. **First Graduate (FG) Concession**: ₹25,000 – ₹27,500 annual tuition fee reduction.\n` +
      `2. **Post-Matric SC / ST / SCA Scheme**: 100% full tuition fee waiver.\n` +
      `3. **BC / MBC / DNC Welfare Grants**: Government fee support.\n` +
      `4. **EGS Pillay Merit Scholarship**: Concessions for students scoring >75%, 85%, or 90%+ in 10+2.\n` +
      `5. **Sports Quota**: Full or partial fee waiver for district/state/national athletes.`;
  }

  if (query.includes('placement') || query.includes('package') || query.includes('recruiter') || query.includes('job') || query.includes('salary')) {
    return `### **Training & Placement Highlights**\n\n` +
      `- **Total Offers**: 782+ Offers in the latest academic drive\n` +
      `- **Highest Package**: **12.00 LPA**\n` +
      `- **Average Package**: **4.20 LPA**\n` +
      `- **Placement Rate**: 92%+\n` +
      `- **Recruiting Partners (120+)**: TCS, Infosys, Wipro, Cognizant, L&T Technology Services, Zoho, HCL, Mindtree, Tech Mahindra, Appranix, Jasmine Infotech, Mallow Tech, Avalon, Foxconn, and Capgemini.\n` +
      `- **4-Year Structured Training**: Soft skills, aptitude, coding bootcamps (C, Java, Python), HackerRank preparation, and mock corporate interviews.`;
  }

  if (query.includes('hostel') || query.includes('room') || query.includes('mess') || query.includes('food') || query.includes('transport') || query.includes('bus')) {
    return `### **Hostel & Transport Amenities**\n\n` +
      `#### **Hostel Living:**\n` +
      `- Separate secure on-campus hostels for **Boys (600+ capacity)** and **Girls (450+ capacity)**.\n` +
      `- High-speed 24/7 Wi-Fi, gym, reading rooms, solar water heating, and RO purified drinking water.\n` +
      `- Modern hygienic steam mess serving both **pure vegetarian and non-vegetarian** South Indian cuisine.\n` +
      `- Annual Fee: Approximately ₹42,000 to ₹46,000.\n\n` +
      `#### **College Bus Transport (52+ Buses):**\n` +
      `- Daily routes covering **Nagapattinam, Nagore, Karaikal, Thiruvarur, Mayiladuthurai, Velankanni, Vedaranyam, Sirkazhi, Mannargudi, Kumbakonam, and Thiruthuraipoondi**.\n` +
      `- GPS tracked with safe certified drivers.`;
  }

  if (query.includes('contact') || query.includes('phone') || query.includes('address') || query.includes('location') || query.includes('where')) {
    return `### **Contact & Campus Location**\n\n` +
      `- **Campus Address**: Old Nagore Main Road, Thethi Village, Nagore, Nagapattinam - 611 002, Tamil Nadu, India.\n` +
      `- **Admissions Helpline**: **+91 99768 88999** / **+91 86809 54537** / **+91 97886 54537**\n` +
      `- **Landline**: 04365-251112 / 251114\n` +
      `- **Email**: admission@egspec.org / enquiry@egspec.org\n` +
      `- **Website**: [https://egspec.org](https://egspec.org)\n` +
      `- **TNEA Counselling Code**: **3806**\n\n` +
      `You can also request an instant counselor callback using the "Request Callback" form in this portal!`;
  }

  return `### **Welcome to E.G.S. Pillay Engineering College (Autonomous)**\n\n` +
    `Established in 1995, accredited with **NAAC 'A++' Grade**, and recognized as an autonomous institution affiliated with Anna University (TNEA Code: **3806**).\n\n` +
    `I can assist you with:\n` +
    `1. **TNEA Code 3806 & Cutoff Estimator**\n` +
    `2. **UG/PG Courses & Syllabus** (AI & DS, CSE, Cyber Security, ECE, MECH, MBA, MCA, etc.)\n` +
    `3. **Fee Structure & Scholarships** (First Graduate, SC/ST 100% waiver, Merit)\n` +
    `4. **Placements & Top Recruiters** (12 LPA Highest Package, TCS, Zoho, L&T)\n` +
    `5. **Campus Life, Hostels & 50+ Bus Routes**\n\n` +
    `What would you like to know today? You can ask in English or தமிழ்!`;
}

// API: Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    if (ai) {
      try {
        // Build conversational contents
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }

        // Add current user prompt
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: contents as any,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.9,
          },
        });

        const replyText = response.text || generateGroundedFallbackResponse(message);
        res.json({ reply: replyText });
        return;
      } catch (geminiError: any) {
        console.error('[Gemini API] Request error:', geminiError?.message || geminiError);
        // Fallback gracefully to grounded knowledge
        const fallbackText = generateGroundedFallbackResponse(message);
        res.json({ reply: fallbackText });
        return;
      }
    } else {
      // Use grounded knowledge base
      const fallbackText = generateGroundedFallbackResponse(message);
      res.json({ reply: fallbackText });
      return;
    }
  } catch (error: any) {
    console.error('[Chat Endpoint] Unexpected error:', error);
    res.status(500).json({ error: 'Failed to process inquiry. Please try again.' });
  }
});

// API: Submit College Enquiry / Callback Request
app.post('/api/enquiry', (req: Request, res: Response) => {
  try {
    const { name, phone, email, coursePreference, cutoffScore, city, notes } = req.body;

    if (!name || !phone) {
      res.status(400).json({ error: 'Student name and phone number are required.' });
      return;
    }

    const newEnquiry: StudentEnquiry = {
      id: `ENQ-${Date.now().toString(36).toUpperCase()}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email || '').trim(),
      coursePreference: String(coursePreference || 'General Enquiry'),
      cutoffScore: cutoffScore ? Number(cutoffScore) : undefined,
      city: String(city || '').trim(),
      notes: String(notes || '').trim(),
      createdAt: new Date().toISOString(),
    };

    enquiries.unshift(newEnquiry);
    console.log(`[Admission Enquiry Received] ID: ${newEnquiry.id}, Student: ${newEnquiry.name}, Phone: ${newEnquiry.phone}, Course: ${newEnquiry.coursePreference}`);

    res.json({
      success: true,
      message: 'Thank you for your enquiry! An admissions counselor from EGS Pillay Engineering College will contact you shortly.',
      enquiryId: newEnquiry.id,
      helpline: '+91 99768 88999',
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to record enquiry.' });
  }
});

// API: Get College Metadata & Quick Stats
app.get('/api/college-info', (_req: Request, res: Response) => {
  res.json(COLLEGE_DATA);
});

// Setup Vite in development or static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EGS Pillay College Enquiry Portal running at http://localhost:${PORT}`);
  });
}

startServer();
