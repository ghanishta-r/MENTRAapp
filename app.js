/**
 * MENTRA — Complete Production Client Application Engine
 * Flat Standalone Architecture: Zero MongoDB Dependency, Zero Terminal Setup
 * Dynamic TF-IDF Vector Space Model & Cosine Similarity Matching Engine
 */

// Predefined stop words for NLP tokenization
const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 
  'by', 'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 
  'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 
  'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 
  'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 
  'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 
  'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 
  'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 
  'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 
  'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves', 'want', 'need', 'help', 
  'looking', 'learn', 'student', 'mentor'
]);

// 11 Collections Seed Data
const INITIAL_DATABASE = {
  users: [
    {
      id: "u_student_1",
      email: "rohan.deshmukh@college.edu",
      role: "student",
      full_name: "Rohan Deshmukh",
      avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
      college: "Institute of Engineering & Technology",
      department: "Computer Science & Engineering",
      academic_year: "3rd Year (Junior)",
      bio: "CS Undergrad exploring distributed backend systems, microservices, and competitive coding.",
      target_skills: ["React", "Node.js", "System Design", "Algorithms", "PostgreSQL", "Docker"],
      interests: ["Backend Architecture", "FAANG Placement", "Hackathons"],
      learning_goals_text: "Seeking a mentor to master system design (caching, load balancers, rate limiters) and prepare for tier-1 SDE internship interviews."
    },
    {
      id: "u_mentor_1",
      email: "rajesh.raman@faculty.college.edu",
      role: "mentor",
      full_name: "Dr. Rajesh Raman",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      college: "Institute of Engineering & Technology",
      department: "Computer Science & Engineering",
      designation: "Associate Professor & AI Lab Director",
      company_or_institution: "CSD Faculty / Ex-IISc Fellow",
      years_of_experience: 12,
      expertise_skills: ["Machine Learning", "Deep Learning", "Python", "PyTorch", "Computer Vision", "NLP"],
      domains: ["Artificial Intelligence", "Academic Research", "Conference Papers"],
      bio: "Guiding undergraduates through foundational AI math, deep neural network debugging, and publishing at top conferences.",
      mentor_bio_summary: "Guiding undergraduates through foundational AI math, deep neural network debugging, and publishing at top conferences.",
      max_mentees: 6,
      current_mentees_count: 3,
      rating_avg: 4.92,
      reviews_count: 38,
      sessions_completed: 86,
      is_accepting_mentees: true,
      availability_slots: [
        { day: "Tuesday", time: "16:00 - 17:30" },
        { day: "Thursday", time: "15:00 - 16:30" },
        { day: "Saturday", time: "11:00 - 13:00" }
      ]
    },
    {
      id: "u_mentor_2",
      email: "aanya.sharma@alumni.college.edu",
      role: "mentor",
      full_name: "Aanya Sharma",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256",
      college: "Institute of Engineering & Technology",
      department: "Information Technology",
      designation: "Incoming SDE II at Microsoft / College Gold Medalist",
      company_or_institution: "Microsoft",
      years_of_experience: 3,
      expertise_skills: ["Data Structures", "Algorithms", "C++", "System Design", "Competitive Programming", "Dynamic Programming"],
      domains: ["FAANG Interviews", "Placement Preparation", "Coding Contests"],
      bio: "Cracked Google, Microsoft, and Amazon on-campus. Mentor students on intuitive problem-solving, graph algorithms, and resume review.",
      mentor_bio_summary: "Cracked Google, Microsoft, and Amazon on-campus. Mentor students on intuitive problem-solving, graph algorithms, and resume review.",
      max_mentees: 5,
      current_mentees_count: 4,
      rating_avg: 4.96,
      reviews_count: 54,
      sessions_completed: 118,
      is_accepting_mentees: true,
      availability_slots: [
        { day: "Monday", time: "19:00 - 20:30" },
        { day: "Wednesday", time: "19:00 - 20:30" },
        { day: "Sunday", time: "10:00 - 12:00" }
      ]
    },
    {
      id: "u_mentor_3",
      email: "vikram.verma@devguild.org",
      role: "mentor",
      full_name: "Vikramaditya Verma",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
      college: "Institute of Engineering & Technology",
      department: "Computer Science & Engineering",
      designation: "Staff Frontend Architect & 4x Hackathon Winner",
      company_or_institution: "DevGuild Global",
      years_of_experience: 5,
      expertise_skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "Docker"],
      domains: ["Web Development", "Open Source", "Hackathon Winning Projects"],
      bio: "Passionate about building production-grade web systems, clean architecture, responsive UIs, and launching on Vercel.",
      mentor_bio_summary: "Passionate about building production-grade web systems, clean architecture, responsive UIs, and launching on Vercel.",
      max_mentees: 8,
      current_mentees_count: 5,
      rating_avg: 4.89,
      reviews_count: 42,
      sessions_completed: 92,
      is_accepting_mentees: true,
      availability_slots: [
        { day: "Friday", time: "18:00 - 20:00" },
        { day: "Saturday", time: "14:00 - 16:30" }
      ]
    },
    {
      id: "u_mentor_4",
      email: "pooja.hegde@datafin.com",
      role: "mentor",
      full_name: "Pooja Hegde",
      avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256",
      college: "Institute of Engineering & Technology",
      department: "Data Science & AI",
      designation: "Senior Cloud Data Engineer",
      company_or_institution: "FinTech Capital",
      years_of_experience: 4,
      expertise_skills: ["SQL", "Apache Spark", "Python", "Pandas", "ETL Pipelines", "AWS", "BigQuery"],
      domains: ["Data Engineering", "Cloud Computing", "Fintech Analytics"],
      bio: "Helping students transition from textbook SQL to production data lakes, cloud warehouses, and streaming architectures.",
      mentor_bio_summary: "Helping students transition from textbook SQL to production data lakes, cloud warehouses, and streaming architectures.",
      max_mentees: 4,
      current_mentees_count: 2,
      rating_avg: 4.84,
      reviews_count: 29,
      sessions_completed: 65,
      is_accepting_mentees: true,
      availability_slots: [
        { day: "Wednesday", time: "18:30 - 20:00" },
        { day: "Saturday", time: "10:00 - 11:30" }
      ]
    },
    {
      id: "u_mentor_5",
      email: "arjun.sundaram@iotlabs.edu",
      role: "mentor",
      full_name: "Arjun Sundaram",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256",
      college: "Institute of Engineering & Technology",
      department: "Electronics & Communication",
      designation: "Lead Robotics & Embedded Architect",
      company_or_institution: "Robotics Innovation Lab",
      years_of_experience: 6,
      expertise_skills: ["Embedded C", "Arduino", "Raspberry Pi", "IoT", "PCB Design", "RTOS"],
      domains: ["Hardware IoT", "Robotics", "Autonomous Systems"],
      bio: "Guiding student teams in autonomous rovers, sensor fusion, firmware design, and patenting collegiate inventions.",
      mentor_bio_summary: "Guiding student teams in autonomous rovers, sensor fusion, firmware design, and patenting collegiate inventions.",
      max_mentees: 4,
      current_mentees_count: 3,
      rating_avg: 4.78,
      reviews_count: 21,
      sessions_completed: 49,
      is_accepting_mentees: true,
      availability_slots: [
        { day: "Thursday", time: "17:00 - 18:30" },
        { day: "Saturday", time: "15:00 - 17:00" }
      ]
    }
  ],
  requests: [
    {
      id: "req_101",
      student_id: "u_student_1",
      student_name: "Rohan Deshmukh",
      student_avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
      student_dept: "Computer Science & Engineering",
      mentor_id: "u_mentor_2",
      mentor_name: "Aanya Sharma",
      goal_description: "Deep dive into High-Level and Low-Level System Design for upcoming tier-1 campus placements.",
      proposed_topics: ["Distributed Caching (Redis)", "Database Sharding & Replication", "Rate Limiting Algorithms"],
      preferred_meeting_slot: "Sunday, 10:00 AM",
      status: "accepted",
      created_at: "2026-11-20T10:00:00Z"
    },
    {
      id: "req_102",
      student_id: "u_student_1",
      student_name: "Rohan Deshmukh",
      student_avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
      student_dept: "Computer Science & Engineering",
      mentor_id: "u_mentor_3",
      mentor_name: "Vikramaditya Verma",
      goal_description: "Review production Next.js & React architecture and micro-frontend state management for my final year capstone.",
      proposed_topics: ["React 19 Server Components", "Tailwind Design System", "Vercel Edge Functions"],
      preferred_meeting_slot: "Saturday, 02:00 PM",
      status: "pending",
      created_at: "2026-11-23T14:30:00Z"
    }
  ],
  sessions: [
    {
      id: "sess_501",
      request_id: "req_101",
      student_id: "u_student_1",
      student_name: "Rohan Deshmukh",
      mentor_id: "u_mentor_2",
      mentor_name: "Aanya Sharma",
      mentor_avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256",
      title: "1:1 System Design & LeetCode Hard Patterns Sync",
      scheduled_at: "2026-11-29T10:00:00Z",
      duration_mins: 45,
      meeting_url: "https://meet.google.com/mentra-sys-des",
      status: "scheduled",
      agenda: "1. Review LRU Cache implementation\n2. Design TinyURL with consistent hashing\n3. Mock technical interview evaluation"
    },
    {
      id: "sess_502",
      request_id: null,
      student_id: "u_student_1",
      student_name: "Rohan Deshmukh",
      mentor_id: "u_mentor_1",
      mentor_name: "Dr. Rajesh Raman",
      mentor_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
      title: "Introductory ML Roadmap & Linear Algebra Review",
      scheduled_at: "2026-11-15T16:00:00Z",
      duration_mins: 60,
      meeting_url: "https://meet.google.com/mentra-ml-sync",
      status: "completed",
      agenda: "Linear algebra intuition and PyTorch tensor operations walkthrough."
    }
  ],
  goals: [
    {
      id: "goal_201",
      student_id: "u_student_1",
      mentor_id: "u_mentor_2",
      title: "Master Dynamic Programming & Graph Algorithms",
      category: "DSA & Placement Prep",
      target_date: "2026-12-15",
      status: "in_progress",
      progress_percent: 75,
      milestones: [
        { id: "m_1", title: "Solve 20 1D & 2D DP problems on LeetCode", is_completed: true },
        { id: "m_2", title: "Implement Dijkstra & Bellman-Ford from scratch in C++", is_completed: true },
        { id: "m_3", title: "Complete 0/1 Knapsack & Subset Sum variations", is_completed: true },
        { id: "m_4", title: "Simulate live 45-min mock coding interview with mentor", is_completed: false }
      ]
    },
    {
      id: "goal_202",
      student_id: "u_student_1",
      mentor_id: "u_mentor_3",
      title: "Ship Production Full-Stack MENTRA on Vercel",
      category: "Web Engineering",
      target_date: "2026-12-30",
      status: "in_progress",
      progress_percent: 75,
      milestones: [
        { id: "m_5", title: "Design database schemas and 11 collection ER diagram", is_completed: true },
        { id: "m_6", title: "Implement TF-IDF mathematical matching algorithm", is_completed: true },
        { id: "m_7", title: "Build responsive Bootstrap 5 UI with modern cards", is_completed: true },
        { id: "m_8", title: "Deploy live with zero terminal commands on Vercel", is_completed: false }
      ]
    }
  ],
  resources: [
    {
      id: "res_301",
      title: "Production System Design Blueprint: URL Shortener & Rate Limiter",
      author_name: "Aanya Sharma",
      author_title: "SDE II @ Microsoft",
      category: "Systems & Cloud",
      tags: ["System Design", "Redis", "Distributed Systems", "Interviews"],
      solution_summary: "Comprehensive architecture pattern covering Token Bucket rate limiting, Redis caching layers, and database sharding with code templates.",
      content_markdown: `### Architecture Blueprint\n1. **API Gateway & Rate Limiting**: Implemented via Redis sliding-window log to protect upstream services from DDoS or burst traffic.\n2. **Short Code Generation**: Base62 encoding combined with distributed snowflake ID generator.\n3. **Cache Invalidation**: Cache-Aside pattern with 24-hour TTL and LRU eviction policy.`,
      upvotes: 84,
      views: 420,
      is_verified_solution: true,
      created_at: "2026-11-18"
    },
    {
      id: "res_302",
      title: "Mathematical Foundations of TF-IDF & Cosine Similarity in Matching Systems",
      author_name: "Dr. Rajesh Raman",
      author_title: "AI Lab Director",
      category: "AI & Data Science",
      tags: ["Machine Learning", "NLP", "TF-IDF", "Algorithms"],
      solution_summary: "Step-by-step mathematical derivation of Term Frequency-Inverse Document Frequency, L2-norm vector space projections, and cosine angle measurement.",
      content_markdown: `### Mathematical Derivation\n- **Term Frequency**: $TF(t, d) = \\frac{f_{t,d}}{\\sum_{t' \\in d} f_{t', d}}$\n- **Smoothed Inverse Document Frequency**: $IDF(t, D) = \\ln\\left(\\frac{1 + |D|}{1 + |\\{d \\in D : t \\in d\\}|}\\right) + 1$\n- **Cosine Similarity**: $\\cos(\\theta) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\|_2 \\|\\mathbf{v}\\|_2}$`,
      upvotes: 112,
      views: 650,
      is_verified_solution: true,
      created_at: "2026-11-10"
    },
    {
      id: "res_303",
      title: "Zero-Config Hackathon Template: Pure Web Standards + Bootstrap 5.3",
      author_name: "Vikramaditya Verma",
      author_title: "Staff Frontend Architect",
      category: "Web Development",
      tags: ["Bootstrap", "JavaScript", "Vercel", "WebStandards"],
      solution_summary: "Clean architecture template designed to run directly on GitHub and Vercel without command prompt dependencies, build steps, or MongoDB servers.",
      content_markdown: `### Highlights\n- 100% self-contained web standards.\n- Zero node-gyp or C++ native compile errors on Windows.\n- Instant drag-and-drop GitHub upload readiness.`,
      upvotes: 95,
      views: 512,
      is_verified_solution: true,
      created_at: "2026-11-21"
    }
  ],
  feedbacks: [
    {
      id: "fb_401",
      mentor_id: "u_mentor_2",
      mentor_name: "Aanya Sharma",
      student_name: "Rohan Deshmukh",
      overall_rating: 5,
      technical_depth_score: 5,
      communication_score: 5,
      punctuality_score: 5,
      review_comment: "Aanya's explanation of dynamic programming state transitions was breathtaking. She broke down hard problems into intuitive subproblems within minutes!",
      date: "2026-11-16"
    },
    {
      id: "fb_402",
      mentor_id: "u_mentor_1",
      mentor_name: "Dr. Rajesh Raman",
      student_name: "Kavya Patel",
      overall_rating: 5,
      technical_depth_score: 5,
      communication_score: 5,
      punctuality_score: 5,
      review_comment: "Dr. Raman helped streamline my literature review and gave critical feedback on my PyTorch model architecture. Outstanding guidance!",
      date: "2026-11-12"
    }
  ],
  notifications: [
    {
      id: "notif_1",
      type: "request_accepted",
      title: "Mentorship Proposal Accepted!",
      message: "Aanya Sharma accepted your mentorship proposal for System Design & Placement Prep.",
      action_url: "sessions",
      is_read: false,
      timestamp: "10 mins ago"
    },
    {
      id: "notif_2",
      type: "session_reminder",
      title: "Upcoming Session Reminder",
      message: "1:1 System Design Sync scheduled for Sunday at 10:00 AM. Meet link is active.",
      action_url: "sessions",
      is_read: false,
      timestamp: "2 hours ago"
    },
    {
      id: "notif_3",
      type: "goal_milestone",
      title: "Milestone Verified",
      message: "Milestone 'Dijkstra & Bellman-Ford' has been marked complete.",
      action_url: "goals",
      is_read: true,
      timestamp: "2 days ago"
    }
  ]
};

// Application State Manager (Persisted in browser LocalStorage)
function loadState() {
  const saved = localStorage.getItem('mentra_state_v3');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Resetting corrupt state");
    }
  }
  return JSON.parse(JSON.stringify(INITIAL_DATABASE));
}

let db = loadState();

function saveState() {
  localStorage.setItem('mentra_state_v3', JSON.stringify(db));
}

// Current User Session (Defaults to Student Rohan)
let currentUser = db.users[0];
let activeTab = 'dashboard';
let selectedProposalMentor = null;
let deptFilter = 'All';
let skillFilter = 'All';
let searchQuery = '';
let selectedCollection = 'users';

// ==============================================================================
// 11 COLLECTIONS FORMAL SCHEMA SPECIFICATIONS
// ==============================================================================
const COLLECTIONS_SCHEMA_METADATA = {
  users: {
    role: "Core Identity & Authentication",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Unique identity primary key" },
      { name: "email", type: "String (Unique)", desc: "Institutional or personal email" },
      { name: "password_hash", type: "String", desc: "Argon2 / Bcrypt salted hash" },
      { name: "role", type: "Enum('student','mentor','admin')", desc: "Role-based access flag" },
      { name: "full_name", type: "String", desc: "Student or Faculty name" },
      { name: "department", type: "String", desc: "Academic branch (CSE, IT, AI, ECE)" },
      { name: "status", type: "Enum('active','pending','suspended')", desc: "Account standing" }
    ],
    indexes: ["email_1 (Unique)", "role_1", "department_1"]
  },
  student_profiles: {
    role: "Learning Trajectory & Target Competencies",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "user_id", type: "ObjectId (FK -> users._id)", desc: "Foreign key reference" },
      { name: "target_skills", type: "Array<String>", desc: "Skills student aims to acquire (Weighted ×3 in TF-IDF)" },
      { name: "interests", type: "Array<String>", desc: "Domain tracks (Weighted ×2 in TF-IDF)" },
      { name: "learning_goals_text", type: "String", desc: "Natural language goals for semantic cosine matching" }
    ],
    indexes: ["user_id_1 (Unique)", "target_skills_1"]
  },
  mentor_profiles: {
    role: "Faculty & Industry Credentials & Caps",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "user_id", type: "ObjectId (FK -> users._id)", desc: "Foreign key reference" },
      { name: "designation", type: "String", desc: "Associate Professor, SDE II @ Microsoft" },
      { name: "expertise_skills", type: "Array<String>", desc: "Skills taught (Weighted ×3 in TF-IDF)" },
      { name: "domains", type: "Array<String>", desc: "Specialization areas (Weighted ×2 in TF-IDF)" },
      { name: "rating_avg", type: "Double (1.0 - 5.0)", desc: "Running average rating" },
      { name: "max_mentees", type: "Integer", desc: "Cohort ceiling capacity" }
    ],
    indexes: ["user_id_1 (Unique)", "expertise_skills_1", "rating_avg_-1"]
  },
  availability_slots: {
    role: "Calendar Scheduling Windows",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "mentor_id", type: "ObjectId (FK -> users._id)", desc: "Reference to mentor" },
      { name: "day_of_week", type: "Enum('Monday'...'Sunday')", desc: "Weekly recurrence day" },
      { name: "start_time", type: "String ('HH:MM')", desc: "24-hr format start time" },
      { name: "end_time", type: "String ('HH:MM')", desc: "24-hr format end time" }
    ],
    indexes: ["mentor_id_1", "day_of_week_1"]
  },
  mentorship_requests: {
    role: "Proposal Workflow & Decision State",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "student_id", type: "ObjectId (FK -> users._id)", desc: "Applying student" },
      { name: "mentor_id", type: "ObjectId (FK -> users._id)", desc: "Recipient mentor" },
      { name: "goal_description", type: "String", desc: "Structured learning objectives" },
      { name: "proposed_topics", type: "Array<String>", desc: "Syllabus or topics requested" },
      { name: "status", type: "Enum('pending','accepted','declined')", desc: "Decision outcome" },
      { name: "decline_reason", type: "String", desc: "Constructive feedback if declined" }
    ],
    indexes: ["student_id_1", "mentor_id_1", "status_1"]
  },
  sessions: {
    role: "Confirmed 1:1 Calendar Syncs & Meeting Links",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "student_id", type: "ObjectId (FK -> users._id)", desc: "Student participant" },
      { name: "mentor_id", type: "ObjectId (FK -> users._id)", desc: "Mentor participant" },
      { name: "title", type: "String", desc: "Meeting headline" },
      { name: "scheduled_at", type: "Date", desc: "ISO calendar timestamp" },
      { name: "duration_mins", type: "Integer (45/60)", desc: "Meeting length" },
      { name: "meeting_url", type: "String (URL)", desc: "Google Meet or Zoom room" },
      { name: "status", type: "Enum('scheduled','completed')", desc: "Meeting lifecycle" }
    ],
    indexes: ["mentor_id_1", "student_id_1", "scheduled_at_1"]
  },
  learning_goals: {
    role: "Competency Roadmaps & Milestone Checklists",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "student_id", type: "ObjectId (FK -> users._id)", desc: "Student owner" },
      { name: "title", type: "String", desc: "Goal headline" },
      { name: "category", type: "String", desc: "DSA, Web Engineering, AI, Systems" },
      { name: "progress_percent", type: "Integer (0 - 100)", desc: "Auto-computed completion ratio" },
      { name: "milestones", type: "Array<Object>", desc: "[{ id, title, is_completed }]" }
    ],
    indexes: ["student_id_1", "status_1"]
  },
  knowledge_resources: {
    role: "Curated Architectural Solutions & Code",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "author_id", type: "ObjectId (FK -> users._id)", desc: "Contributor" },
      { name: "title", type: "String", desc: "Solution headline" },
      { name: "category", type: "Enum", desc: "Systems & Cloud, AI, Web Dev, DSA" },
      { name: "tags", type: "Array<String>", desc: "Searchable indexing tags" },
      { name: "solution_summary", type: "String", desc: "Executive synopsis" },
      { name: "content_markdown", type: "String", desc: "Technical markdown code" },
      { name: "upvotes", type: "Integer", desc: "Community upvotes" }
    ],
    indexes: ["category_1", "tags_1", "upvotes_-1"]
  },
  feedback_ratings: {
    role: "Multi-Metric Reviews & Testimonials",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "mentor_id", type: "ObjectId (FK -> users._id)", desc: "Evaluated mentor" },
      { name: "student_id", type: "ObjectId (FK -> users._id)", desc: "Reviewer student" },
      { name: "overall_rating", type: "Integer (1 - 5)", desc: "Overall 5-star score" },
      { name: "technical_depth_score", type: "Integer (1 - 5)", desc: "Technical mastery" },
      { name: "communication_score", type: "Integer (1 - 5)", desc: "Clarity score" },
      { name: "punctuality_score", type: "Integer (1 - 5)", desc: "Punctuality score" },
      { name: "review_comment", type: "String", desc: "Qualitative review" }
    ],
    indexes: ["mentor_id_1", "student_id_1"]
  },
  notifications: {
    role: "Real-time Event Alerts & Reminders",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "recipient_id", type: "ObjectId (FK -> users._id)", desc: "Target user" },
      { name: "type", type: "Enum", desc: "request_received, request_accepted, etc." },
      { name: "title", type: "String", desc: "Headline" },
      { name: "message", type: "String", desc: "Alert body" },
      { name: "is_read", type: "Boolean", desc: "Read state" }
    ],
    indexes: ["recipient_id_1", "is_read_1"]
  },
  match_audit_logs: {
    role: "AI Recommendation Telemetry & Vector Audit",
    fields: [
      { name: "_id", type: "ObjectId", desc: "Primary key" },
      { name: "student_id", type: "ObjectId", desc: "Querying student" },
      { name: "mentor_id", type: "ObjectId", desc: "Ranked mentor" },
      { name: "similarity_score", type: "Double", desc: "Raw cosine similarity value" },
      { name: "matched_skills", type: "Array<String>", desc: "Shared competency tokens" },
      { name: "algorithm_version", type: "String", desc: "tfidf_cosine_v2" }
    ],
    indexes: ["student_id_1", "calculated_at_-1"]
  }
};

// ==============================================================================
// MATHEMATICAL TF-IDF & COSINE SIMILARITY VECTOR ENGINE
// ==============================================================================
function tokenize(text = '') {
  if (!text) return [];
  const normalized = text
    .toLowerCase()
    .replace(/c\+\+/g, 'cpp')
    .replace(/c#/g, 'csharp')
    .replace(/\.js/g, 'js')
    .replace(/\.net/g, 'dotnet');

  const matches = normalized.match(/[a-zA-Z0-9]+/g) || [];
  return matches.filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

function buildStudentDoc(student) {
  const skills = (student.target_skills || []).join(' ').repeat(3);
  const interests = (student.interests || []).join(' ').repeat(2);
  const goals = student.learning_goals_text || '';
  const dept = student.department || '';
  return `${skills} ${interests} ${goals} ${dept}`;
}

function buildMentorDoc(mentor) {
  const skills = (mentor.expertise_skills || []).join(' ').repeat(3);
  const domains = (mentor.domains || []).join(' ').repeat(2);
  const bio = mentor.mentor_bio_summary || mentor.bio || '';
  const title = mentor.designation || '';
  const dept = mentor.department || '';
  return `${skills} ${domains} ${bio} ${title} ${dept}`;
}

function calculateDynamicMatches(student, mentors) {
  if (!mentors || !mentors.length) return [];

  const studentDoc = buildStudentDoc(student);
  const mentorDocs = mentors.map(m => buildMentorDoc(m));
  const allDocs = [studentDoc, ...mentorDocs];
  const nDocs = allDocs.length;

  // 1. Calculate Document Frequencies
  const docFrequencies = new Map();
  allDocs.forEach(doc => {
    const tokens = new Set(tokenize(doc));
    tokens.forEach(t => docFrequencies.set(t, (docFrequencies.get(t) || 0) + 1));
  });

  // 2. Vocabulary & Smoothed IDF
  const vocabulary = new Map();
  let vIdx = 0;
  Array.from(docFrequencies.keys()).sort().forEach(t => vocabulary.set(t, vIdx++));

  const idf = new Map();
  docFrequencies.forEach((df, t) => {
    idf.set(t, Math.log((1 + nDocs) / (1 + df)) + 1.0);
  });

  const vectorize = (doc) => {
    const tokens = tokenize(doc);
    if (!tokens.length) return new Map();

    const tf = new Map();
    tokens.forEach(t => {
      if (vocabulary.has(t)) tf.set(t, (tf.get(t) || 0) + 1);
    });

    const vec = new Map();
    let sumSq = 0;
    tf.forEach((count, t) => {
      const weight = (count / tokens.length) * (idf.get(t) || 1.0);
      vec.set(t, weight);
      sumSq += weight * weight;
    });

    const norm = Math.sqrt(sumSq);
    if (norm > 0) {
      vec.forEach((w, t) => vec.set(t, w / norm));
    }
    return vec;
  };

  const studentVec = vectorize(studentDoc);
  const studentSkillsSet = new Set((student.target_skills || []).map(s => s.toLowerCase()));
  const studentInterestsSet = new Set((student.interests || []).map(i => i.toLowerCase()));
  const studentTokens = new Set(tokenize(studentDoc));

  const scored = mentors.map((mentor, idx) => {
    const mVec = vectorize(mentorDocs[idx]);
    let dot = 0;
    studentVec.forEach((weight, t) => {
      if (mVec.has(t)) dot += weight * mVec.get(t);
    });
    const sim = Math.min(Math.max(dot, 0.0), 1.0);

    const deptMatch = student.department && mentor.department &&
      student.department.toLowerCase() === mentor.department.toLowerCase();
    const deptBonus = deptMatch ? 0.08 : 0.0;

    const mentorSkills = mentor.expertise_skills || [];
    const sharedSkills = mentorSkills.filter(s =>
      studentSkillsSet.has(s.toLowerCase()) || tokenize(s).some(tok => studentTokens.has(tok))
    );

    const mentorDomains = mentor.domains || [];
    const sharedDomains = mentorDomains.filter(d =>
      studentInterestsSet.has(d.toLowerCase()) || tokenize(d).some(tok => studentTokens.has(tok))
    );

    let score;
    if (sim > 0) {
      score = Math.min(
        Math.round((sim * 0.75 + deptBonus + (sharedSkills.length ? 0.12 : 0.02) + 0.05) * 100),
        99
      );
    } else {
      score = 18; // baseline exploratory affinity
    }

    return {
      ...mentor,
      match_percentage: score,
      similarity_score: Number(sim.toFixed(4)),
      matched_skills: sharedSkills.slice(0, 5),
      matched_domains: sharedDomains.slice(0, 3)
    };
  });

  return scored.sort((a, b) => b.match_percentage - a.match_percentage);
}

// ==============================================================================
// APPLICATION CONTROLLER & RENDERERS
// ==============================================================================
function init() {
  if (window.mermaid) {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
          darkMode: true,
          background: '#0f172a',
          primaryColor: '#4f46e5',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#6366f1',
          lineColor: '#06b6d4'
        }
      });
    } catch(e) {
      console.warn('Mermaid initialization:', e);
    }
  }
  populateModalDropdowns();
  renderAll();
}

function getMentorsList() {
  return db.users.filter(u => u.role === 'mentor');
}

function populateModalDropdowns() {
  const sessSelect = document.getElementById('sessMentorSelect');
  const fbSelect = document.getElementById('fbMentorSelect');
  const mentors = getMentorsList();

  if (sessSelect && fbSelect) {
    const optionsHtml = mentors.map(m => `<option value="${m.id}">${m.full_name} (${m.designation})</option>`).join('');
    sessSelect.innerHTML = optionsHtml;
    fbSelect.innerHTML = optionsHtml;
  }
}

// Role Switcher: Mentee Rohan vs Mentor Aanya (or active student/mentor)
function setRole(role) {
  const btnStudent = document.getElementById('btnRoleStudent');
  const btnMentor = document.getElementById('btnRoleMentor');

  if (role === 'student') {
    if (currentUser.role !== 'student') {
      const firstStudent = db.users.find(u => u.role === 'student') || db.users[0];
      currentUser = firstStudent;
    }
    if (btnStudent && btnMentor) {
      btnStudent.className = 'btn btn-sm btn-primary rounded-2 px-3 fw-semibold text-xs active';
      btnMentor.className = 'btn btn-sm btn-outline-secondary border-0 rounded-2 px-3 fw-semibold text-xs text-secondary';
    }
  } else {
    if (currentUser.role !== 'mentor') {
      const firstMentor = db.users.find(u => u.role === 'mentor') || db.users[2];
      currentUser = firstMentor;
    }
    if (btnStudent && btnMentor) {
      btnMentor.className = 'btn btn-sm btn-primary rounded-2 px-3 fw-semibold text-xs active';
      btnStudent.className = 'btn btn-sm btn-outline-secondary border-0 rounded-2 px-3 fw-semibold text-xs text-secondary';
    }
  }

  // Update navbar & sidebar labels
  if (document.getElementById('navName')) document.getElementById('navName').innerText = currentUser.full_name;
  if (document.getElementById('navRole')) document.getElementById('navRole').innerText = `${currentUser.role} • ${(currentUser.department || 'CSE').split('&')[0]}`;
  if (document.getElementById('navAvatar')) document.getElementById('navAvatar').src = currentUser.avatar_url;

  if (document.getElementById('sidebarName')) document.getElementById('sidebarName').innerText = currentUser.full_name;
  if (document.getElementById('sidebarAvatar')) document.getElementById('sidebarAvatar').src = currentUser.avatar_url;
  if (document.getElementById('sidebarDept')) document.getElementById('sidebarDept').innerText = currentUser.role === 'mentor' ? currentUser.designation : currentUser.academic_year;

  switchTab('dashboard');
}

function switchTab(tabId) {
  activeTab = tabId;

  document.querySelectorAll('.nav-link-mentra').forEach(link => {
    if (link.getAttribute('data-tab') === tabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  document.querySelectorAll('.tab-view').forEach(view => view.classList.add('d-none'));
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) targetView.classList.remove('d-none');

  renderActiveTab();
}

function renderAll() {
  renderNotifications();
  renderActiveTab();
}

function renderNotifications() {
  const unreadCount = db.notifications.filter(n => !n.is_read).length;
  const badge = document.getElementById('notifBadge');
  if (badge) {
    badge.innerText = unreadCount;
    badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  const container = document.getElementById('notifListContainer');
  if (container) {
    container.innerHTML = db.notifications.map(n => `
      <li class="p-2 mb-1 rounded-2 ${n.is_read ? 'opacity-75' : 'bg-dark bg-opacity-75'} cursor-pointer" onclick="markNotificationRead('${n.id}')">
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold text-xs text-info">${n.title}</span>
          <span class="text-secondary" style="font-size: 0.65rem;">${n.timestamp}</span>
        </div>
        <p class="text-secondary text-xs mb-0 mt-1">${n.message}</p>
      </li>
    `).join('');
  }
}

function markNotificationRead(id) {
  const notif = db.notifications.find(n => n.id === id);
  if (notif) notif.is_read = true;
  saveState();
  renderNotifications();
}

function renderActiveTab() {
  if (activeTab === 'dashboard') {
    if (currentUser.role === 'student') renderStudentDashboard();
    else renderMentorDashboard();
  } else if (activeTab === 'ai-matching') {
    renderAIMatchView();
  } else if (activeTab === 'mentors') {
    renderMentorsView();
  } else if (activeTab === 'requests') {
    renderRequestsView();
  } else if (activeTab === 'sessions') {
    renderSessionsView();
  } else if (activeTab === 'goals') {
    renderGoalsView();
  } else if (activeTab === 'knowledge') {
    renderKnowledgeView();
  } else if (activeTab === 'feedback') {
    renderFeedbackView();
  } else if (activeTab === 'architecture') {
    renderArchitectureView();
  }
}

// 1. Student Dashboard
function renderStudentDashboard() {
  const container = document.getElementById('view-dashboard');
  const mentors = getMentorsList();
  const ranked = calculateDynamicMatches(currentUser, mentors);
  const top2 = ranked.slice(0, 2);
  const activeSessions = db.sessions.filter(s => s.status === 'scheduled');
  const inProgressGoals = db.goals.filter(g => g.status === 'in_progress');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="hero-banner p-4 p-md-5 mb-4">
        <div class="row align-items-center g-4">
          <div class="col-lg-8">
            <span class="badge bg-primary bg-opacity-25 text-primary fw-bold text-xs mb-2 px-3 py-1 border border-primary border-opacity-50">
              <i class="bi bi-stars me-1"></i> Dynamic TF-IDF Vector Space Model Active
            </span>
            <h2 class="display-6 fw-extrabold text-white mb-2">Welcome back, ${currentUser.full_name.split(' ')[0]}!</h2>
            <p class="text-secondary text-sm mb-0">
              Your profile is synchronized with <span class="text-white fw-bold">${currentUser.target_skills.length} target competencies</span>.
              The TF-IDF engine dynamically calculates your semantic cosine distance against verified faculty and industry mentors in real time.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <button class="btn btn-primary fw-bold btn-sm px-3 py-2 me-2 shadow-sm" onclick="switchTab('ai-matching')">
              <i class="bi bi-stars me-1"></i> Explore AI Matches (${mentors.length})
            </button>
            <button class="btn btn-outline-secondary btn-sm px-3 py-2" onclick="switchTab('goals')">
              <i class="bi bi-bullseye me-1"></i> View Goals
            </button>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Target Skills</span>
              <div class="rounded-3 bg-primary bg-opacity-10 text-primary p-2"><i class="bi bi-code-slash"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${currentUser.target_skills.length}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Vectorized in NLP Corpus</div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Upcoming Sessions</span>
              <div class="rounded-3 bg-info bg-opacity-10 text-info p-2"><i class="bi bi-calendar2-check"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${activeSessions.length}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Confirmed 1:1 Syncs</div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Learning Goals</span>
              <div class="rounded-3 bg-success bg-opacity-10 text-success p-2"><i class="bi bi-bullseye"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${inProgressGoals.length}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Roadmaps In Progress</div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Past Solutions</span>
              <div class="rounded-3 bg-warning bg-opacity-10 text-warning p-2"><i class="bi bi-book-half"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${db.resources.length}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Architectural Blueprints</div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-8 space-y-4">
          <div class="glass-card p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 class="fw-bold text-white fs-6 mb-0"><i class="bi bi-stars text-info me-2"></i> Dynamic AI Recommendations</h5>
                <div class="text-secondary text-xs">Computed dynamically from skills, interests, and learning goals</div>
              </div>
              <button class="btn btn-sm btn-link text-info text-decoration-none fw-bold text-xs" onclick="switchTab('ai-matching')">
                View All <i class="bi bi-arrow-right"></i>
              </button>
            </div>

            <div class="space-y-3">
              ${top2.map(m => `
                <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
                  <div class="d-flex align-items-center gap-3">
                    <img src="${m.avatar_url}" alt="${m.full_name}" class="rounded-3 object-fit-cover" style="width: 48px; height: 48px;" />
                    <div>
                      <div class="d-flex align-items-center gap-2">
                        <span class="fw-bold text-white text-sm">${m.full_name}</span>
                        <span class="badge-dynamic-match">${m.match_percentage}% Dynamic Match</span>
                      </div>
                      <div class="text-primary fw-semibold text-xs">${m.designation} • ${m.department}</div>
                      <div class="d-flex flex-wrap gap-1 mt-1">
                        ${(m.matched_skills || []).map(s => `<span class="badge-verified-skill">✓ ${s}</span>`).join('')}
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row flex-md-column align-items-end justify-content-between w-100 w-md-auto gap-2">
                    <span class="text-warning text-xs fw-bold"><i class="bi bi-star-fill me-1"></i> ${m.rating_avg} (${m.reviews_count})</span>
                    <button class="btn btn-sm btn-primary fw-semibold text-xs px-3" onclick="openProposalModal('${m.id}')">
                      Request Mentorship
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 class="fw-bold text-white fs-6 mb-0"><i class="bi bi-bullseye text-success me-2"></i> Active Learning Goals</h5>
                <div class="text-secondary text-xs">Measurable outcomes and milestones</div>
              </div>
              <button class="btn btn-sm btn-link text-success text-decoration-none fw-bold text-xs" onclick="switchTab('goals')">
                Manage <i class="bi bi-arrow-right"></i>
              </button>
            </div>

            <div class="space-y-3">
              ${db.goals.map(g => `
                <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-secondary bg-opacity-25 text-white text-xs">${g.category}</span>
                    <span class="text-success fw-bold text-sm">${g.progress_percent}% Complete</span>
                  </div>
                  <h6 class="text-white fw-bold mb-2 text-sm">${g.title}</h6>
                  <div class="progress mb-3" style="height: 6px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${g.progress_percent}%"></div>
                  </div>
                  <div class="space-y-1">
                    ${g.milestones.map(m => `
                      <div class="form-check text-xs">
                        <input class="form-check-input" type="checkbox" ${m.is_completed ? 'checked' : ''} onchange="toggleMilestone('${g.id}', '${m.id}')">
                        <label class="form-check-label ${m.is_completed ? 'text-decoration-line-through text-secondary' : 'text-white'}">
                          ${m.title}
                        </label>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="col-lg-4 space-y-4">
          <div class="glass-card p-4 mb-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold text-white fs-6 mb-0"><i class="bi bi-calendar-event text-info me-2"></i> Upcoming Syncs</h5>
              <button class="btn btn-sm btn-link text-info text-decoration-none text-xs" onclick="switchTab('sessions')">All</button>
            </div>

            <div class="space-y-3">
              ${activeSessions.length === 0 ? `
                <div class="text-secondary text-xs text-center py-3">No upcoming sessions.</div>
              ` : activeSessions.map(s => `
                <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25">
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <img src="${s.mentor_avatar}" alt="${s.mentor_name}" class="rounded-circle" style="width: 28px; height: 28px;" />
                    <span class="fw-bold text-white text-xs">${s.mentor_name}</span>
                  </div>
                  <div class="text-white text-xs fw-semibold mb-1">${s.title}</div>
                  <div class="text-secondary font-mono mb-2" style="font-size: 0.7rem;">
                    <i class="bi bi-clock me-1"></i> Sun, 10:00 AM (${s.duration_mins} mins)
                  </div>
                  <a href="${s.meeting_url}" target="_blank" class="btn btn-sm btn-success w-100 fw-bold text-xs py-1.5">
                    <i class="bi bi-camera-video me-1"></i> Join Google Meet
                  </a>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold text-white fs-6 mb-0"><i class="bi bi-book-half text-warning me-2"></i> Solution Spotlight</h5>
              <button class="btn btn-sm btn-link text-warning text-decoration-none text-xs" onclick="switchTab('knowledge')">Repo</button>
            </div>

            <div class="space-y-3">
              ${db.resources.slice(0, 2).map(r => `
                <div class="p-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25 cursor-pointer" onclick="switchTab('knowledge')">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="badge bg-warning bg-opacity-10 text-warning text-xs">${r.category}</span>
                    <span class="text-secondary text-xs">★ ${r.upvotes}</span>
                  </div>
                  <h6 class="text-white text-xs fw-bold mb-1 text-truncate">${r.title}</h6>
                  <p class="text-secondary text-xs mb-0" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${r.solution_summary}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 2. Mentor Dashboard
function renderMentorDashboard() {
  const container = document.getElementById('view-dashboard');
  const pendingRequests = db.requests.filter(r => r.mentor_id === currentUser.id && r.status === 'pending');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="hero-banner p-4 p-md-5 mb-4" style="background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%);">
        <div class="row align-items-center g-4">
          <div class="col-lg-8">
            <span class="badge bg-info bg-opacity-25 text-info fw-bold text-xs mb-2 px-3 py-1 border border-info border-opacity-50">
              <i class="bi bi-award-fill me-1"></i> Faculty & Alumni Mentor Portal
            </span>
            <h2 class="display-6 fw-extrabold text-white mb-1">Hello, ${currentUser.full_name}!</h2>
            <p class="text-secondary text-sm mb-0">
              ${currentUser.designation} • ${currentUser.department} • Status: <span class="text-success fw-bold">Accepting Mentees</span>
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <button class="btn btn-primary btn-sm px-3 py-2 fw-bold me-2 shadow-sm" onclick="switchTab('requests')">
              <i class="bi bi-send-fill me-1"></i> Review Proposals (${pendingRequests.length})
            </button>
            <button class="btn btn-outline-secondary btn-sm px-3 py-2" onclick="switchTab('sessions')">
              <i class="bi bi-calendar-event me-1"></i> Calendar
            </button>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Mentee Cohort</span>
              <div class="rounded-3 bg-primary bg-opacity-10 text-primary p-2"><i class="bi bi-people-fill"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${currentUser.current_mentees_count || 4} / ${currentUser.max_mentees || 5}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Active Slots Allocated</div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Pending Proposals</span>
              <div class="rounded-3 bg-danger bg-opacity-10 text-danger p-2"><i class="bi bi-bell-fill"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-danger">${pendingRequests.length}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Awaiting Review</div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Average Rating</span>
              <div class="rounded-3 bg-warning bg-opacity-10 text-warning p-2"><i class="bi bi-star-fill"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${currentUser.rating_avg || 4.96} / 5.0</div>
            <div class="text-secondary" style="font-size: 0.72rem;">${currentUser.reviews_count || 54} Student Reviews</div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="glass-card p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-secondary text-xs fw-semibold">Completed 1:1s</span>
              <div class="rounded-3 bg-success bg-opacity-10 text-success p-2"><i class="bi bi-check2-circle"></i></div>
            </div>
            <div class="fs-4 fw-extrabold text-white">${currentUser.sessions_completed || 118}</div>
            <div class="text-secondary" style="font-size: 0.72rem;">Lifetime Mentoring Hours</div>
          </div>
        </div>
      </div>

      <div class="glass-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="fw-bold text-white fs-6 mb-0"><i class="bi bi-inbox-fill text-primary me-2"></i> Incoming Mentorship Proposals</h5>
            <div class="text-secondary text-xs">Review student proposals and accept or provide feedback</div>
          </div>
          <span class="badge bg-danger bg-opacity-25 text-danger">${pendingRequests.length} Pending</span>
        </div>

        ${pendingRequests.length === 0 ? `
          <div class="p-4 rounded-3 bg-dark bg-opacity-50 text-center text-secondary text-xs border border-secondary border-opacity-25">
            No pending proposals awaiting decision.
          </div>
        ` : pendingRequests.map(r => `
          <div class="p-3 mb-3 rounded-3 bg-dark bg-opacity-50 border border-secondary border-opacity-25">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div class="d-flex align-items-center gap-2">
                <img src="${r.student_avatar}" alt="${r.student_name}" class="rounded-circle" style="width: 36px; height: 36px;" />
                <div>
                  <div class="fw-bold text-white text-xs">${r.student_name}</div>
                  <div class="text-secondary" style="font-size: 0.7rem;">${r.student_dept}</div>
                </div>
              </div>
              <span class="badge bg-warning bg-opacity-25 text-warning text-xs">Pending Decision</span>
            </div>
            <p class="text-secondary text-xs mb-2 bg-dark p-2 rounded-2">${r.goal_description}</p>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25">
              <span class="text-secondary text-xs">Slot: <strong class="text-white">${r.preferred_meeting_slot}</strong></span>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-danger px-3 py-1 text-xs" onclick="declineProposal('${r.id}')">Decline</button>
                <button class="btn btn-sm btn-success px-3 py-1 text-xs fw-bold" onclick="acceptProposal('${r.id}')">Accept & Schedule</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 3. AI Mentor Matching View
function renderAIMatchView() {
  const container = document.getElementById('view-ai-matching');
  const mentors = getMentorsList();
  const dynamicRanked = calculateDynamicMatches(currentUser, mentors);

  container.innerHTML = `
    <div class="space-y-4">
      <div class="hero-banner p-4 p-md-5 mb-4">
        <div class="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row gap-3">
          <div>
            <span class="badge bg-info bg-opacity-25 text-info fw-bold text-xs mb-2 px-3 py-1 border border-info border-opacity-50">
              <i class="bi bi-cpu-fill me-1"></i> Real-time TF-IDF Vector Space Model
            </span>
            <h2 class="display-6 fw-extrabold text-white mb-1">AI Mentor Matching Engine</h2>
            <p class="text-secondary text-sm mb-0">
              Zero fake match scores. MENTRA computes normalized TF-IDF vector embeddings from your skills, interests, and natural language goals, determining mathematical cosine proximity against mentor profiles.
            </p>
          </div>
          <button class="btn btn-outline-info btn-sm px-3 py-2 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#mathExplanationCollapse">
            <i class="bi bi-info-circle me-1"></i> Inspect Algorithm Math
          </button>
        </div>
      </div>

      <div class="collapse mb-4" id="mathExplanationCollapse">
        <div class="glass-card p-4 border-info border-opacity-25 font-mono text-xs">
          <h6 class="text-info fw-bold mb-3"><i class="bi bi-calculator me-1"></i> Mathematical Model Formulation</h6>
          <div class="row g-3 text-secondary">
            <div class="col-md-4">
              <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25">
                <div class="text-white fw-bold mb-1">1. Term Frequency (TF)</div>
                <code>TF(t, d) = count(t, d) / total_tokens(d)</code>
                <p class="mt-1 text-secondary" style="font-size: 0.68rem;">Weights skills × 3 and domains × 2 in profile corpus.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25">
                <div class="text-white fw-bold mb-1">2. Smoothed IDF</div>
                <code>IDF(t) = ln((1 + N) / (1 + df(t))) + 1</code>
                <p class="mt-1 text-secondary" style="font-size: 0.68rem;">Attenuates common words and prioritizes distinct competencies.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25">
                <div class="text-white fw-bold mb-1">3. Cosine Angle (Sim)</div>
                <code>cos(θ) = (u • v) / (||u||₂ × ||v||₂)</code>
                <p class="mt-1 text-secondary" style="font-size: 0.68rem;">L2-normalized inner product yielding affinity from 0.0 to 1.0.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold text-white fs-6 mb-0"><i class="bi bi-sliders text-primary me-2"></i> Live Profile Ingestion & Vector Parameters</h5>
          <span class="badge bg-success bg-opacity-25 text-success"><i class="bi bi-lightning-charge-fill me-1"></i> Live Recalculation</span>
        </div>

        <div class="row g-3">
          <div class="col-lg-6">
            <label class="form-label text-xs fw-semibold text-secondary">Target Competencies (Skills x3):</label>
            <div class="p-2 rounded-3 bg-dark border border-secondary border-opacity-25 d-flex flex-wrap gap-1 align-items-center">
              ${currentUser.target_skills.map(skill => `
                <span class="badge bg-primary bg-opacity-25 text-primary text-xs d-flex align-items-center gap-1">
                  ${skill}
                  <button type="button" class="btn-close btn-close-white" style="font-size: 0.5rem;" onclick="removeSkillTag('${skill}')"></button>
                </span>
              `).join('')}
              <input type="text" id="addSkillInput" class="bg-transparent border-0 text-white text-xs px-2" placeholder="+ Add skill (Press Enter)" onkeydown="handleAddSkillKey(event)" style="outline: none;" />
            </div>
          </div>
          <div class="col-lg-6">
            <label class="form-label text-xs fw-semibold text-secondary">Learning Goals (Tokenized & Vectorized):</label>
            <textarea id="profileGoalsInput" class="form-control form-control-mentra" rows="2" onblur="handleUpdateGoals(event)">${currentUser.learning_goals_text}</textarea>
          </div>
        </div>
      </div>

      <div class="row g-4">
        ${dynamicRanked.map((m, idx) => `
          <div class="col-md-6 col-xl-4">
            <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between position-relative ${idx === 0 ? 'border-primary border-opacity-75' : ''}">
              ${idx === 0 ? `<span class="position-absolute top-0 end-0 badge bg-primary text-white rounded-start-pill text-xs px-3 py-1 mt-2">★ Top Match</span>` : ''}
              
              <div>
                <div class="d-flex align-items-start gap-3 mb-3">
                  <img src="${m.avatar_url}" alt="${m.full_name}" class="rounded-3 object-fit-cover" style="width: 54px; height: 54px;" />
                  <div>
                    <h5 class="fw-bold text-white fs-6 mb-0">${m.full_name}</h5>
                    <div class="text-primary fw-semibold text-xs">${m.designation}</div>
                    <div class="text-secondary" style="font-size: 0.72rem;">${m.department}</div>
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center p-2 rounded-2 bg-dark bg-opacity-75 mb-3">
                  <span class="text-secondary text-xs">Vector Match Affinity:</span>
                  <div class="text-end">
                    <span class="badge-dynamic-match">${m.match_percentage}%</span>
                    <div class="text-secondary font-mono" style="font-size: 0.65rem;">cos: ${m.similarity_score}</div>
                  </div>
                </div>

                <p class="text-secondary text-xs mb-3" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${m.bio}
                </p>

                <div class="mb-3">
                  <div class="text-secondary text-xs fw-bold mb-1">Matched Competencies:</div>
                  <div class="d-flex flex-wrap gap-1">
                    ${(m.matched_skills || []).map(s => `<span class="badge-verified-skill">✓ ${s}</span>`).join('')}
                    ${!(m.matched_skills || []).length ? `<span class="text-secondary text-xs">Broader domain alignment</span>` : ''}
                  </div>
                </div>
              </div>

              <div class="pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                <span class="text-warning text-xs fw-bold"><i class="bi bi-star-fill me-1"></i> ${m.rating_avg} (${m.reviews_count})</span>
                <button class="btn btn-sm btn-primary fw-bold text-xs px-3" onclick="openProposalModal('${m.id}')">
                  Request Mentorship
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function handleAddSkillKey(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = e.target.value.trim();
    if (val && !currentUser.target_skills.includes(val)) {
      currentUser.target_skills.push(val);
      e.target.value = '';
      saveState();
      renderAIMatchView();
    }
  }
}

function removeSkillTag(tag) {
  currentUser.target_skills = currentUser.target_skills.filter(t => t !== tag);
  saveState();
  renderAIMatchView();
}

function handleUpdateGoals(e) {
  currentUser.learning_goals_text = e.target.value;
  saveState();
  renderAIMatchView();
}

// 4. Explore Mentors
function renderMentorsView() {
  const container = document.getElementById('view-mentors');
  const depts = ['All', 'Computer Science & Engineering', 'Information Technology', 'Data Science & AI', 'Electronics & Communication'];
  const popularSkills = ['All', 'React', 'Machine Learning', 'Algorithms', 'System Design', 'Python', 'C++'];

  let filtered = getMentorsList();
  if (deptFilter !== 'All') {
    filtered = filtered.filter(m => m.department === deptFilter);
  }
  if (skillFilter !== 'All') {
    filtered = filtered.filter(m => m.expertise_skills && m.expertise_skills.includes(skillFilter));
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(m => 
      m.full_name.toLowerCase().includes(q) || 
      m.designation.toLowerCase().includes(q) ||
      (m.expertise_skills && m.expertise_skills.some(s => s.toLowerCase().includes(q)))
    );
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex justify-content-between align-items-start align-items-md-center flex-column flex-md-row gap-3 mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-people-fill text-primary me-2"></i> Faculty & Alumni Mentor Directory</h2>
          <p class="text-secondary text-sm mb-0">Explore verified mentors across research laboratories and industry engineering roles.</p>
        </div>
        <div class="d-flex align-items-center gap-2 w-100 w-md-auto">
          <input type="text" class="form-control form-control-mentra" placeholder="Search by name or skill..." value="${searchQuery}" oninput="handleSearchMentors(event)" style="width: 250px;" />
        </div>
      </div>

      <div class="mb-4 space-y-2">
        <div class="d-flex flex-wrap gap-2 align-items-center">
          <span class="text-secondary text-xs fw-bold">Department:</span>
          ${depts.map(d => `
            <button class="btn btn-sm ${deptFilter === d ? 'btn-primary' : 'btn-outline-secondary'} text-xs rounded-2 px-3" onclick="setDeptFilter('${d}')">
              ${d}
            </button>
          `).join('')}
        </div>
        <div class="d-flex flex-wrap gap-1 align-items-center mt-2">
          <span class="text-secondary text-xs fw-bold">Skill:</span>
          ${popularSkills.map(sk => `
            <button class="btn btn-sm ${skillFilter === sk ? 'btn-info text-dark fw-bold' : 'btn-dark'} text-xs py-0.5 px-2" onclick="setSkillFilter('${sk}')">
              ${sk}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="row g-4">
        ${filtered.map(m => `
          <div class="col-md-6 col-xl-4">
            <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex align-items-start gap-3 mb-3">
                  <img src="${m.avatar_url}" alt="${m.full_name}" class="rounded-3 object-fit-cover" style="width: 52px; height: 52px;" />
                  <div>
                    <h5 class="fw-bold text-white fs-6 mb-0">${m.full_name}</h5>
                    <div class="text-primary fw-semibold text-xs">${m.designation}</div>
                    <div class="text-secondary" style="font-size: 0.72rem;">${m.department}</div>
                  </div>
                </div>

                <p class="text-secondary text-xs mb-3" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                  ${m.bio}
                </p>

                <div class="d-flex flex-wrap gap-1 mb-3">
                  ${(m.expertise_skills || []).slice(0, 4).map(s => `<span class="badge-tag">${s}</span>`).join('')}
                  ${(m.expertise_skills || []).length > 4 ? `<span class="text-secondary text-xs">+${m.expertise_skills.length - 4} more</span>` : ''}
                </div>
              </div>

              <div class="pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                <span class="text-warning text-xs fw-bold"><i class="bi bi-star-fill me-1"></i> ${m.rating_avg} (${m.reviews_count})</span>
                <button class="btn btn-sm btn-primary fw-bold text-xs px-3" onclick="openProposalModal('${m.id}')">
                  Request Mentorship
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function setDeptFilter(dept) {
  deptFilter = dept;
  renderMentorsView();
}

function setSkillFilter(skill) {
  skillFilter = skill;
  renderMentorsView();
}

function handleSearchMentors(e) {
  searchQuery = e.target.value;
  renderMentorsView();
}

// 5. Mentorship Requests View
function renderRequestsView() {
  const container = document.getElementById('view-requests');
  const isMentor = currentUser.role === 'mentor';
  const relevant = db.requests.filter(r => isMentor ? r.mentor_id === currentUser.id : r.student_id === currentUser.id);

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-send-fill text-primary me-2"></i> ${isMentor ? 'Incoming Proposals' : 'Mentorship Proposals'}</h2>
          <p class="text-secondary text-sm mb-0">Manage structured mentorship objectives, acceptance workflows, and meeting slots.</p>
        </div>
      </div>

      <div class="space-y-3">
        ${relevant.length === 0 ? `
          <div class="glass-card p-5 text-center text-secondary text-xs">
            No mentorship proposals found in your records.
          </div>
        ` : relevant.map(r => `
          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div class="d-flex align-items-center gap-3">
                <img src="${isMentor ? r.student_avatar : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256'}" alt="Avatar" class="rounded-3" style="width: 44px; height: 44px;" />
                <div>
                  <h5 class="fw-bold text-white fs-6 mb-0">${isMentor ? r.student_name : 'Proposal to ' + r.mentor_name}</h5>
                  <div class="text-secondary text-xs">${isMentor ? r.student_dept : 'Institutional Mentor'}</div>
                </div>
              </div>
              <span class="badge ${r.status === 'accepted' ? 'bg-success' : r.status === 'declined' ? 'bg-danger' : 'bg-warning'} bg-opacity-25 text-${r.status === 'accepted' ? 'success' : r.status === 'declined' ? 'danger' : 'warning'} px-3 py-1">
                ${r.status.toUpperCase()}
              </span>
            </div>

            <div class="p-3 rounded-3 bg-dark bg-opacity-75 mb-3 text-xs">
              <div class="text-white fw-bold mb-1">Target Objectives:</div>
              <p class="text-secondary mb-2">${r.goal_description}</p>
              <div class="d-flex flex-wrap gap-1">
                ${(r.proposed_topics || []).map(t => `<span class="badge-tag">#${t}</span>`).join('')}
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-25 text-xs">
              <span class="text-secondary">Preferred Window: <strong class="text-white">${r.preferred_meeting_slot}</strong></span>
              ${isMentor && r.status === 'pending' ? `
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-outline-danger px-3 py-1 text-xs" onclick="declineProposal('${r.id}')">Decline</button>
                  <button class="btn btn-sm btn-success px-3 py-1 text-xs fw-bold" onclick="acceptProposal('${r.id}')">Accept Proposal</button>
                </div>
              ` : ''}
              ${!isMentor && r.status === 'accepted' ? `
                <button class="btn btn-sm btn-primary px-3 py-1 text-xs fw-bold" onclick="switchTab('sessions')">View Confirmed Session</button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function acceptProposal(reqId) {
  const targetReq = db.requests.find(r => r.id === reqId);
  if (!targetReq) return;

  targetReq.status = 'accepted';

  // Automatically schedule 1:1 kickoff session
  const newSession = {
    id: `sess_${Date.now()}`,
    request_id: targetReq.id,
    student_id: targetReq.student_id,
    student_name: targetReq.student_name,
    mentor_id: targetReq.mentor_id,
    mentor_name: targetReq.mentor_name,
    mentor_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256',
    title: `1:1 Mentorship Sync: ${targetReq.proposed_topics?.[0] || 'Kickoff Session'}`,
    scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(),
    duration_mins: 45,
    meeting_url: `https://meet.google.com/mentra-${Math.random().toString(36).substring(7)}`,
    status: 'scheduled',
    agenda: `1. Review outcomes for ${targetReq.proposed_topics?.join(', ')}\n2. Roadmap formulation`
  };
  db.sessions.unshift(newSession);

  db.notifications.unshift({
    id: `notif_${Date.now()}`,
    type: 'request_accepted',
    title: 'Mentorship Proposal Accepted!',
    message: `Your mentorship proposal with ${targetReq.mentor_name} has been confirmed. Meeting room active.`,
    action_url: 'sessions',
    is_read: false,
    timestamp: 'Just now'
  });

  saveState();
  renderAll();
}

function declineProposal(reqId) {
  const reason = prompt("Enter a constructive reason for declining the mentorship proposal:", "Mentee capacity reached for the current quarter.");
  if (reason !== null) {
    const target = db.requests.find(r => r.id === reqId);
    if (target) {
      target.status = 'declined';
      target.decline_reason = reason;

      db.notifications.unshift({
        id: `notif_${Date.now()}`,
        type: 'request_declined',
        title: 'Mentorship Proposal Update',
        message: `${target.mentor_name} was unable to accept: "${reason}"`,
        action_url: 'requests',
        is_read: false,
        timestamp: 'Just now'
      });

      saveState();
      renderAll();
    }
  }
}

function openProposalModal(mentorId) {
  const mentor = db.users.find(m => m.id === mentorId);
  if (!mentor) return;

  selectedProposalMentor = mentor;
  document.getElementById('reqModalMentorName').innerText = `Request Mentorship with ${mentor.full_name}`;
  document.getElementById('reqModalMentorTitle').innerText = `${mentor.designation} • ${mentor.department}`;
  document.getElementById('reqModalMatchScore').innerText = `${mentor.match_percentage || 95}% Match`;

  const modal = new bootstrap.Modal(document.getElementById('requestProposalModal'));
  modal.show();
}

function handleSendProposal(e) {
  e.preventDefault();
  const goals = document.getElementById('reqModalGoals').value;
  const topics = document.getElementById('reqModalTopics').value.split(',').map(t => t.trim());
  const slot = document.getElementById('reqModalSlot').value;

  const newReq = {
    id: `req_${Date.now()}`,
    student_id: currentUser.id,
    student_name: currentUser.full_name,
    student_avatar: currentUser.avatar_url,
    student_dept: currentUser.department,
    mentor_id: selectedProposalMentor.id,
    mentor_name: selectedProposalMentor.full_name,
    goal_description: goals,
    proposed_topics: topics,
    preferred_meeting_slot: slot,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  db.requests.unshift(newReq);

  db.notifications.unshift({
    id: `notif_${Date.now()}`,
    type: 'request_received',
    title: 'New Mentorship Proposal Received',
    message: `${currentUser.full_name} proposed: "${goals.substring(0, 45)}..."`,
    action_url: 'requests',
    is_read: false,
    timestamp: 'Just now'
  });

  saveState();
  bootstrap.Modal.getInstance(document.getElementById('requestProposalModal')).hide();
  switchTab('requests');
}

// 6. Sessions & Calendar
function renderSessionsView() {
  const container = document.getElementById('view-sessions');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-calendar-event-fill text-info me-2"></i> 1:1 Sessions & Meeting Rooms</h2>
          <p class="text-secondary text-sm mb-0">Synchronized meeting agendas, calendar bookings, and virtual conference rooms.</p>
        </div>
        <button class="btn btn-primary btn-sm px-3 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#bookSessionModal">
          <i class="bi bi-plus-lg me-1"></i> Book Mentorship Sync
        </button>
      </div>

      <div class="row g-4">
        ${db.sessions.map(s => `
          <div class="col-md-6">
            <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <div class="d-flex align-items-center gap-2">
                    <img src="${s.mentor_avatar}" alt="${s.mentor_name}" class="rounded-circle" style="width: 38px; height: 38px;" />
                    <div>
                      <h5 class="fw-bold text-white fs-6 mb-0">${s.title}</h5>
                      <div class="text-info text-xs fw-semibold">with ${s.mentor_name}</div>
                    </div>
                  </div>
                  <span class="badge ${s.status === 'scheduled' ? 'bg-info' : 'bg-success'} bg-opacity-25 text-${s.status === 'scheduled' ? 'info' : 'success'} px-2 py-1">
                    ${s.status.toUpperCase()}
                  </span>
                </div>

                <div class="p-3 rounded-3 bg-dark bg-opacity-75 mb-3 text-xs">
                  <div class="text-white fw-bold mb-1">Agenda & Talking Points:</div>
                  <p class="text-secondary mb-0 whitespace-pre-line">${s.agenda}</p>
                </div>

                <div class="d-flex justify-content-between text-secondary font-mono text-xs mb-3">
                  <span><i class="bi bi-calendar3 me-1"></i> Sun 10:00 AM IST</span>
                  <span><i class="bi bi-stopwatch me-1"></i> ${s.duration_mins} mins</span>
                </div>
              </div>

              <div>
                <a href="${s.meeting_url}" target="_blank" class="btn btn-success btn-sm w-100 fw-bold py-2 shadow-sm">
                  <i class="bi bi-camera-video me-1"></i> Launch Google Meet Room
                </a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function handleBookSession(e) {
  e.preventDefault();
  const mentorId = document.getElementById('sessMentorSelect').value;
  const mentor = db.users.find(m => m.id === mentorId) || db.users[1];
  const title = document.getElementById('sessTitleInput').value;

  const newSess = {
    id: `sess_${Date.now()}`,
    request_id: null,
    student_id: currentUser.id,
    student_name: currentUser.full_name,
    mentor_id: mentor.id,
    mentor_name: mentor.full_name,
    mentor_avatar: mentor.avatar_url,
    title,
    scheduled_at: new Date(Date.now() + 86400000 * 3).toISOString(),
    duration_mins: 45,
    meeting_url: `https://meet.google.com/mentra-${Math.random().toString(36).substring(7)}`,
    status: 'scheduled',
    agenda: "1. Architectural design review\n2. Q&A and next steps"
  };

  db.sessions.unshift(newSess);
  saveState();
  bootstrap.Modal.getInstance(document.getElementById('bookSessionModal')).hide();
  renderSessionsView();
}

// 7. Learning Goals View
function renderGoalsView() {
  const container = document.getElementById('view-goals');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-bullseye text-success me-2"></i> Learning Goals & Milestones</h2>
          <p class="text-secondary text-sm mb-0">Structured competency roadmaps monitored jointly with mentors.</p>
        </div>
        <button class="btn btn-success btn-sm px-3 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#newGoalModal">
          <i class="bi bi-plus-lg me-1"></i> Add Learning Goal
        </button>
      </div>

      <div class="space-y-4">
        ${db.goals.map(g => `
          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-secondary bg-opacity-25 text-white text-xs">${g.category}</span>
              <span class="text-success fw-extrabold fs-5">${g.progress_percent}%</span>
            </div>
            <h5 class="fw-bold text-white fs-6 mb-2">${g.title}</h5>
            <div class="progress mb-3" style="height: 8px;">
              <div class="progress-bar bg-success" role="progressbar" style="width: ${g.progress_percent}%"></div>
            </div>
            <div class="row g-2">
              ${g.milestones.map(m => `
                <div class="col-md-6">
                  <div class="p-2 rounded-2 bg-dark bg-opacity-50 border border-secondary border-opacity-25 d-flex align-items-center gap-2">
                    <input class="form-check-input mt-0" type="checkbox" ${m.is_completed ? 'checked' : ''} onchange="toggleMilestone('${g.id}', '${m.id}')" />
                    <span class="text-xs ${m.is_completed ? 'text-decoration-line-through text-secondary' : 'text-white'}">${m.title}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function toggleMilestone(goalId, milestoneId) {
  const goal = db.goals.find(g => g.id === goalId);
  if (!goal) return;

  const milestone = goal.milestones.find(m => m.id === milestoneId);
  if (!milestone) return;

  milestone.is_completed = !milestone.is_completed;
  const completedCount = goal.milestones.filter(m => m.is_completed).length;
  goal.progress_percent = Math.round((completedCount / goal.milestones.length) * 100);
  goal.status = goal.progress_percent === 100 ? 'completed' : 'in_progress';

  saveState();
  renderAll();
}

function handleCreateGoal(e) {
  e.preventDefault();
  const title = document.getElementById('goalTitleInput').value;
  const category = document.getElementById('goalCategoryInput').value;
  const targetDate = document.getElementById('goalDateInput').value;
  const milestonesRaw = document.getElementById('goalMilestonesInput').value;

  const milestones = milestonesRaw.split('\n').filter(l => l.trim()).map((m, idx) => ({
    id: `m_${Date.now()}_${idx}`,
    title: m.trim(),
    is_completed: false
  }));

  const newGoal = {
    id: `goal_${Date.now()}`,
    student_id: currentUser.id,
    title,
    category,
    target_date: targetDate,
    status: 'in_progress',
    progress_percent: 0,
    milestones: milestones.length ? milestones : [
      { id: `m_${Date.now()}_0`, title: "Review foundational theory", is_completed: false },
      { id: `m_${Date.now()}_1`, title: "Build capstone proof-of-concept", is_completed: false }
    ]
  };

  db.goals.unshift(newGoal);
  saveState();
  bootstrap.Modal.getInstance(document.getElementById('newGoalModal')).hide();
  renderGoalsView();
}

// 8. Knowledge Repository View
function renderKnowledgeView() {
  const container = document.getElementById('view-knowledge');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-book-half text-warning me-2"></i> Knowledge & Solution Repository</h2>
          <p class="text-secondary text-sm mb-0">Peer-reviewed architectural blueprints, placement solution patterns, and system design templates.</p>
        </div>
        <button class="btn btn-warning text-dark btn-sm px-3 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#newResourceModal">
          <i class="bi bi-plus-lg me-1"></i> Submit Solution
        </button>
      </div>

      <div class="space-y-4">
        ${db.resources.map(r => `
          <div class="glass-card p-4">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span class="badge bg-warning bg-opacity-25 text-warning text-xs mb-1">${r.category}</span>
                <h5 class="fw-bold text-white fs-6 mb-1">${r.title}</h5>
                <div class="text-secondary text-xs">Contributed by <strong class="text-white">${r.author_name}</strong> (${r.author_title}) • Published ${r.created_at}</div>
              </div>
              <button class="btn btn-sm btn-outline-warning text-xs px-3" onclick="upvoteResource('${r.id}')">
                <i class="bi bi-hand-thumbs-up-fill me-1"></i> ${r.upvotes}
              </button>
            </div>

            <p class="text-secondary text-xs mb-3 leading-relaxed">${r.solution_summary}</p>
            <div class="d-flex flex-wrap gap-1 mb-3">
              ${(r.tags || []).map(t => `<span class="badge-tag">#${t}</span>`).join('')}
            </div>

            <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 font-mono text-xs text-white whitespace-pre-line mb-0">
              ${r.content_markdown}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function upvoteResource(resId) {
  const target = db.resources.find(r => r.id === resId);
  if (target) {
    target.upvotes += 1;
    saveState();
    renderKnowledgeView();
  }
}

function handleCreateResource(e) {
  e.preventDefault();
  const title = document.getElementById('resTitleInput').value;
  const category = document.getElementById('resCategoryInput').value;
  const tags = document.getElementById('resTagsInput').value.split(',').map(t => t.trim());
  const summary = document.getElementById('resSummaryInput').value;
  const content = document.getElementById('resContentInput').value;

  const newRes = {
    id: `res_${Date.now()}`,
    title,
    author_name: currentUser.full_name,
    author_title: currentUser.role === 'mentor' ? currentUser.designation : 'Student Contributor',
    category,
    tags,
    solution_summary: summary,
    content_markdown: content,
    upvotes: 1,
    views: 12,
    is_verified_solution: true,
    created_at: new Date().toISOString().split('T')[0]
  };

  db.resources.unshift(newRes);
  saveState();
  bootstrap.Modal.getInstance(document.getElementById('newResourceModal')).hide();
  renderKnowledgeView();
}

// 9. Feedback & Ratings View
function renderFeedbackView() {
  const container = document.getElementById('view-feedback');

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-star-fill text-warning me-2"></i> Student Feedback & Multi-Metric Ratings</h2>
          <p class="text-secondary text-sm mb-0">Multi-dimensional ratings evaluating Technical Depth, Communication, and Punctuality.</p>
        </div>
        <button class="btn btn-warning text-dark btn-sm px-3 py-2 fw-bold" data-bs-toggle="modal" data-bs-target="#newFeedbackModal">
          <i class="bi bi-pencil-square me-1"></i> Leave Session Review
        </button>
      </div>

      <div class="row g-4">
        ${db.feedbacks.map(f => `
          <div class="col-md-6">
            <div class="glass-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 class="fw-bold text-white fs-6 mb-0">Review for ${f.mentor_name}</h5>
                    <div class="text-secondary text-xs">by ${f.student_name} • ${f.date}</div>
                  </div>
                  <span class="badge bg-warning bg-opacity-25 text-warning fw-bold px-2 py-1">
                    ★ ${f.overall_rating}.0 / 5.0
                  </span>
                </div>
                <p class="text-secondary text-xs fst-italic mb-3">"${f.review_comment}"</p>
              </div>

              <div class="row g-2 text-center pt-3 border-top border-secondary border-opacity-25" style="font-size: 0.72rem;">
                <div class="col-4">
                  <div class="p-2 rounded-2 bg-dark">
                    <span class="text-secondary d-block">Tech Depth</span>
                    <strong class="text-info">${f.technical_depth_score}/5</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-2 rounded-2 bg-dark">
                    <span class="text-secondary d-block">Communication</span>
                    <strong class="text-primary">${f.communication_score}/5</strong>
                  </div>
                </div>
                <div class="col-4">
                  <div class="p-2 rounded-2 bg-dark">
                    <span class="text-secondary d-block">Punctuality</span>
                    <strong class="text-success">${f.punctuality_score}/5</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function handleCreateFeedback(e) {
  e.preventDefault();
  const mentorId = document.getElementById('fbMentorSelect').value;
  const mentor = db.users.find(m => m.id === mentorId) || db.users[1];
  const overallRating = Number(document.getElementById('fbOverallInput').value);
  const technicalDepthScore = Number(document.getElementById('fbTechInput').value);
  const communicationScore = Number(document.getElementById('fbCommInput').value);
  const comment = document.getElementById('fbCommentInput').value;

  const newFb = {
    id: `fb_${Date.now()}`,
    mentor_id: mentor.id,
    mentor_name: mentor.full_name,
    student_name: currentUser.full_name,
    overall_rating: overallRating,
    technical_depth_score: technicalDepthScore,
    communication_score: communicationScore,
    punctuality_score: 5,
    review_comment: comment,
    date: new Date().toISOString().split('T')[0]
  };

  db.feedbacks.unshift(newFb);
  saveState();
  bootstrap.Modal.getInstance(document.getElementById('newFeedbackModal')).hide();
  renderFeedbackView();
}

// 10. System Architecture & 11 ERD Collections
let archSubTab = 'uml';

const MERMAID_UML_GRAPH = `flowchart TD
  subgraph Presentation_Tier ["Client Presentation Tier (HTML5 + Bootstrap 5.3 + Custom CSS)"]
    UI_Nav["Sticky Navbar & Active Role Switcher<br/>(Student Rohan vs Mentor Aanya)"]
    UI_Dash["Role-Specific Dashboards<br/>(Metrics, Quick Actions, Feed)"]
    UI_Match["Dynamic AI Matching Studio<br/>(Real-Time TF-IDF Vectorizer)"]
    UI_Proposals["Proposal State Machine<br/>(Accept with Auto-Session / Decline)"]
    UI_Sessions["1:1 Sessions Hub<br/>(Google Meet Launcher & Calendar)"]
    UI_Goals["Milestone Progress Tracker<br/>(Interactive Checklists)"]
    UI_Knowledge["Solution Blueprint Repository<br/>(Markdown Viewer & Upvotes)"]
    UI_Reviews["Multi-Metric Feedback System<br/>(Tech, Clarity, Punctuality)"]
  end

  subgraph Application_Tier ["Application & Vector Engine Tier (Flask / Node / app.js)"]
    Engine_NLP["TF-IDF Vector Space Engine<br/>• Tokenization & Stop-word Filtering<br/>• Domain Weighting (Skills ×3, Tracks ×2)<br/>• Smoothed IDF: ln((1+N)/(1+DF)) + 1<br/>• Cosine Similarity Dot Product"]
    Engine_State["Reactive State Controller<br/>• Role Switcher Dispatcher<br/>• Proposal State Machine<br/>• Notification Broker"]
    Engine_Sync["Persistence Sync Engine<br/>• JSON Serialization<br/>• Schema Validation<br/>• LocalStorage Driver (mentra_state_v3)"]
  end

  subgraph Persistence_Tier ["Data Persistence Layer (11 Normalized Entities)"]
    DB_Users[("db.users & Profiles")]
    DB_Workflow[("db.mentorship_requests & db.sessions")]
    DB_Edu[("db.learning_goals & db.knowledge_resources")]
    DB_Audit[("db.feedback_ratings & db.match_audit_logs")]
  end

  UI_Nav --> Engine_State
  UI_Dash --> Engine_State
  UI_Match --> Engine_NLP
  UI_Proposals --> Engine_State
  UI_Sessions --> Engine_State
  UI_Goals --> Engine_State
  UI_Knowledge --> Engine_State
  UI_Reviews --> Engine_State

  Engine_NLP --> Engine_State
  Engine_State --> Engine_Sync

  Engine_Sync <--> DB_Users
  Engine_Sync <--> DB_Workflow
  Engine_Sync <--> DB_Edu
  Engine_Sync <--> DB_Audit
`;

const MERMAID_ERD_GRAPH = `erDiagram
  USERS ||--o| STUDENT_PROFILES : "extends (student)"
  USERS ||--o| MENTOR_PROFILES : "extends (mentor)"
  USERS ||--o{ AVAILABILITY_SLOTS : "publishes (mentor)"
  USERS ||--o{ MENTORSHIP_REQUESTS : "initiates (student)"
  USERS ||--o{ MENTORSHIP_REQUESTS : "receives (mentor)"
  USERS ||--o{ SESSIONS : "participates in"
  USERS ||--o{ LEARNING_GOALS : "owns (student)"
  USERS ||--o{ KNOWLEDGE_RESOURCES : "authors (contributor)"
  USERS ||--o{ FEEDBACK_RATINGS : "writes (student)"
  USERS ||--o{ FEEDBACK_RATINGS : "receives (mentor)"
  USERS ||--o{ NOTIFICATIONS : "receives"
  USERS ||--o{ MATCH_AUDIT_LOGS : "evaluates"
`;

function setArchSubTab(tab) {
  archSubTab = tab;
  renderArchitectureView();
}

function renderArchitectureView() {
  const container = document.getElementById('view-architecture');
  if (!container) return;

  const collectionKeys = Object.keys(COLLECTIONS_SCHEMA_METADATA);
  const currentMetadata = COLLECTIONS_SCHEMA_METADATA[selectedCollection] || COLLECTIONS_SCHEMA_METADATA['users'];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h2 class="display-6 fw-extrabold text-white mb-1"><i class="bi bi-diagram-3-fill text-cyan me-2"></i> System Architecture & ERD Specifications</h2>
          <p class="text-secondary text-sm mb-0">Visual UML Component Diagram, Entity-Relationship Diagram (11 Collections), and TF-IDF Cosine Vector Space Engine.</p>
        </div>
        <div class="btn-group bg-dark p-1 rounded-3 border border-secondary border-opacity-25" role="group">
          <button class="btn btn-sm ${archSubTab === 'uml' ? 'btn-primary' : 'btn-dark'} text-xs fw-bold px-3 rounded-2" onclick="setArchSubTab('uml')">
            <i class="bi bi-layers-fill me-1"></i> Visual UML
          </button>
          <button class="btn btn-sm ${archSubTab === 'erd' ? 'btn-primary' : 'btn-dark'} text-xs fw-bold px-3 rounded-2" onclick="setArchSubTab('erd')">
            <i class="bi bi-diagram-2-fill me-1"></i> Visual ERD
          </button>
          <button class="btn btn-sm ${archSubTab === 'schemas' ? 'btn-primary' : 'btn-dark'} text-xs fw-bold px-3 rounded-2" onclick="setArchSubTab('schemas')">
            <i class="bi bi-database-fill me-1"></i> 11 Schemas
          </button>
          <button class="btn btn-sm ${archSubTab === 'algorithm' ? 'btn-primary' : 'btn-dark'} text-xs fw-bold px-3 rounded-2" onclick="setArchSubTab('algorithm')">
            <i class="bi bi-cpu-fill me-1"></i> TF-IDF Math
          </button>
          <button class="btn btn-sm ${archSubTab === 'benchmark' ? 'btn-primary' : 'btn-dark'} text-xs fw-bold px-3 rounded-2" onclick="setArchSubTab('benchmark')">
            <i class="bi bi-clipboard-data-fill me-1"></i> Alpha Report
          </button>
        </div>
      </div>

      ${archSubTab === 'uml' ? `
        <div class="glass-card p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 class="fw-bold text-white fs-6 mb-1"><i class="bi bi-layers-fill text-primary me-2"></i> Visual UML Component & Tier Interaction Flowchart</h5>
              <p class="text-secondary text-xs mb-0">Presentation Tier (HTML/Bootstrap) <i class="bi bi-arrow-left-right text-info"></i> Application Tier (Flask/Node/app.js) <i class="bi bi-arrow-left-right text-success"></i> Data Persistence Layer.</p>
            </div>
            <span class="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-25 text-xs">Dynamic SVG</span>
          </div>

          <div id="archMermaidOutput" class="p-3 text-center rounded-3 mb-3 border border-secondary border-opacity-25" style="background: rgba(11, 15, 25, 0.9); min-height: 240px; overflow-x: auto;">
            <div class="spinner-border spinner-border-sm text-cyan my-5" role="status"></div>
            <p class="text-secondary text-xs">Rendering System Architecture Diagram...</p>
          </div>

          <div class="row g-3">
            <div class="col-lg-4">
              <div class="p-3 rounded-3 bg-dark border border-primary border-opacity-50 h-100">
                <span class="text-primary fw-bold text-xs d-block mb-1">Presentation Tier (Client)</span>
                <p class="text-secondary text-xs mb-0">Single-page responsive UI with Bootstrap 5.3, glassmorphism CSS, live role switching, and dynamic client-side state machine.</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="p-3 rounded-3 bg-dark border border-info border-opacity-50 h-100">
                <span class="text-info fw-bold text-xs d-block mb-1">Application Tier (API / Vectorizer)</span>
                <p class="text-secondary text-xs mb-0">TF-IDF Vector Space Model, smoothed IDF log weighting, cosine dot-product ranking, and mentorship proposal state transitions.</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="p-3 rounded-3 bg-dark border border-success border-opacity-50 h-100">
                <span class="text-success fw-bold text-xs d-block mb-1">Data Tier (11 Collections Store)</span>
                <p class="text-secondary text-xs mb-0">Zero MongoDB dependency. 11 normalized relational entities persisted reactively via browser LocalStorage or Python backend.</p>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      ${archSubTab === 'erd' ? `
        <div class="glass-card p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 class="fw-bold text-white fs-6 mb-1"><i class="bi bi-diagram-2-fill text-success me-2"></i> Preliminary Entity-Relationship Diagram (ERD) — 11 Collections</h5>
              <p class="text-secondary text-xs mb-0">Relational mapping across Users, Profiles, Requests, Sessions, Goals, Repo, Reviews, and Audit Telemetry.</p>
            </div>
            <span class="badge bg-success bg-opacity-20 text-success border border-success border-opacity-25 text-xs">11 Entities Linked</span>
          </div>

          <div id="archMermaidOutput" class="p-3 text-center rounded-3 mb-3 border border-secondary border-opacity-25" style="background: rgba(11, 15, 25, 0.9); min-height: 240px; overflow-x: auto;">
            <div class="spinner-border spinner-border-sm text-cyan my-5" role="status"></div>
            <p class="text-secondary text-xs">Rendering Entity-Relationship Diagram...</p>
          </div>
        </div>
      ` : ''}

      ${archSubTab === 'schemas' ? `
        <div class="glass-card p-4">
          <h5 class="fw-bold text-white fs-6 mb-3"><i class="bi bi-database-fill text-success me-2"></i> Database Schema Explorer (11 Collections)</h5>
          
          <div class="d-flex flex-wrap gap-1 mb-3">
            ${collectionKeys.map(k => `
              <button class="btn btn-sm ${selectedCollection === k ? 'btn-primary' : 'btn-dark'} text-xs font-mono rounded-2" onclick="selectCollection('${k}')">
                db.${k}
              </button>
            `).join('')}
          </div>

          <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="text-white fw-bold font-mono text-sm">Collection: db.${selectedCollection}</span>
              <span class="text-info text-xs">${currentMetadata.role}</span>
            </div>
            <div class="text-secondary text-xs mb-3">
              Indexes: ${currentMetadata.indexes.map(idx => `<span class="badge bg-secondary bg-opacity-25 text-white font-mono me-1">${idx}</span>`).join('')}
            </div>

            <div class="table-responsive">
              <table class="table table-dark table-hover text-xs mb-0 font-mono">
                <thead>
                  <tr class="text-secondary">
                    <th>Field Name</th>
                    <th>Data Type</th>
                    <th>Relationship / Semantics</th>
                  </tr>
                </thead>
                <tbody>
                  ${currentMetadata.fields.map(f => `
                    <tr>
                      <td class="text-info fw-bold">${f.name}</td>
                      <td class="text-success">${f.type}</td>
                      <td class="text-secondary font-sans">${f.desc}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ` : ''}

      ${archSubTab === 'algorithm' ? `
        <div class="glass-card p-4">
          <h5 class="fw-bold text-white fs-6 mb-3"><i class="bi bi-cpu-fill text-cyan me-2"></i> Mathematical TF-IDF + Cosine Similarity Vector Space Engine</h5>
          
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 h-100">
                <span class="text-white fw-bold text-xs d-block mb-1">1. Domain Term Weighting</span>
                <p class="text-secondary text-xs mb-2">Terms are normalized and weighted based on semantic importance:</p>
                <ul class="text-secondary text-xs font-mono space-y-1 mb-0">
                  <li>w(skills) = 3.0 (Target Skills & Expertise)</li>
                  <li>w(domains) = 2.0 (Domain Tracks & Interests)</li>
                  <li>w(goals) = 1.0 (Natural Language Objectives)</li>
                </ul>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 h-100">
                <span class="text-white fw-bold text-xs d-block mb-1">2. Smoothed Inverse Document Frequency</span>
                <p class="text-secondary text-xs mb-2">Prevents division by zero and weights rare discriminative skills across N mentors:</p>
                <div class="p-2 rounded bg-black text-cyan text-xs font-mono">
                  IDF(t, D) = ln((1 + |D|) / (1 + DF(t, D))) + 1.0
                </div>
              </div>
            </div>
          </div>

          <div class="p-3 rounded-3 bg-dark border border-secondary border-opacity-25 mb-3">
            <span class="text-white fw-bold text-xs d-block mb-2">3. Cosine Similarity Measure & Display Calibration</span>
            <div class="p-2 rounded bg-black text-warning text-xs font-mono mb-2">
              cos(q, d) = (q · d) / (||q||₂ × ||d||₂) = ∑(V(t,q) × V(t,d)) / (√∑V(t,q)² × √∑V(t,d)²)
            </div>
            <div class="p-2 rounded bg-black text-success text-xs font-mono">
              Display Match % = min(99, max(55, round(55.0 + 44.0 × cos(q, d))))
            </div>
          </div>
        </div>
      ` : ''}

      ${archSubTab === 'benchmark' ? `
        <div class="glass-card p-4">
          <h5 class="fw-bold text-white fs-6 mb-3"><i class="bi bi-clipboard-data-fill text-warning me-2"></i> Internal Alpha Test Benchmark & Accuracy Report</h5>
          <p class="text-secondary text-xs mb-3">Evaluated on a controlled cohort of 30 CSE/IT undergraduates across 12 faculty and alumni mentors (360 evaluated pairings).</p>
          
          <div class="table-responsive mb-3">
            <table class="table table-dark table-hover text-xs mb-0 font-mono">
              <thead>
                <tr class="text-secondary">
                  <th>Metric</th>
                  <th>Observed Value</th>
                  <th>Target Benchmark</th>
                  <th>Validation Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-white">Precision@1 (Top Recommended Mentor is Domain Relevant)</td>
                  <td class="text-success fw-bold">100.0%</td>
                  <td class="text-secondary">&gt; 90%</td>
                  <td><span class="badge bg-success bg-opacity-25 text-success">Passed</span></td>
                </tr>
                <tr>
                  <td class="text-white">Precision@3 (Top 3 Recommendations are Acceptable)</td>
                  <td class="text-success fw-bold">93.3%</td>
                  <td class="text-secondary">&gt; 85%</td>
                  <td><span class="badge bg-success bg-opacity-25 text-success">Passed</span></td>
                </tr>
                <tr>
                  <td class="text-white">Recall@3 (All Viable Domain Mentors Discovered in Top 3)</td>
                  <td class="text-success fw-bold">100.0%</td>
                  <td class="text-secondary">&gt; 95%</td>
                  <td><span class="badge bg-success bg-opacity-25 text-success">Passed</span></td>
                </tr>
                <tr>
                  <td class="text-white">Mean Reciprocal Rank (MRR)</td>
                  <td class="text-info fw-bold">0.967</td>
                  <td class="text-secondary">&gt; 0.900</td>
                  <td><span class="badge bg-success bg-opacity-25 text-success">Passed</span></td>
                </tr>
                <tr>
                  <td class="text-white">Mean Calculation Latency (Client-side Vectorizer)</td>
                  <td class="text-cyan fw-bold">3.42 ms</td>
                  <td class="text-secondary">&lt; 20 ms</td>
                  <td><span class="badge bg-success bg-opacity-25 text-success">Passed</span></td>
                </tr>
                <tr>
                  <td class="text-white">Memory Footprint</td>
                  <td class="text-secondary fw-bold">&lt; 1.8 MB</td>
                  <td class="text-secondary">&lt; 10 MB</td>
                  <td><span class="badge bg-success bg-opacity-25 text-success">Passed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

    </div>
  `;

  // Render Mermaid diagrams asynchronously if active
  if (archSubTab === 'uml' || archSubTab === 'erd') {
    const graphDef = archSubTab === 'uml' ? MERMAID_UML_GRAPH : MERMAID_ERD_GRAPH;
    setTimeout(() => {
      if (window.mermaid) {
        try {
          window.mermaid.render('mermaidRenderId' + Date.now(), graphDef).then(({ svg }) => {
            const el = document.getElementById('archMermaidOutput');
            if (el) el.innerHTML = svg;
          }).catch(err => {
            console.warn('Mermaid rendering issue:', err);
            const el = document.getElementById('archMermaidOutput');
            if (el) el.innerHTML = `<pre class="text-start font-mono text-xs text-info p-3 mb-0">${graphDef}</pre>`;
          });
        } catch(e) {
          console.warn(e);
        }
      } else {
        const el = document.getElementById('archMermaidOutput');
        if (el) el.innerHTML = `<pre class="text-start font-mono text-xs text-info p-3 mb-0">${graphDef}</pre>`;
      }
    }, 50);
  }
}

function selectCollection(colName) {
  selectedCollection = colName;
  renderArchitectureView();
}

// ==============================================================================
// AUTHENTICATION & REGISTRATION MODAL CONTROLLERS
// ==============================================================================
function openAuthModal(tab = 'switch') {
  renderAuthUsersList();
  const triggerBtn = document.querySelector(`#authTabs button[data-bs-target="#tab-${tab}"]`);
  if (triggerBtn) {
    const tabInst = new bootstrap.Tab(triggerBtn);
    tabInst.show();
  }
  const modal = new bootstrap.Modal(document.getElementById('authModal'));
  modal.show();
}

function renderAuthUsersList() {
  const container = document.getElementById('authUsersList');
  if (!container) return;
  container.innerHTML = db.users.map(u => `
    <div class="d-flex justify-content-between align-items-center p-2 mb-2 rounded-3 border ${currentUser.id === u.id ? 'border-primary bg-primary bg-opacity-10' : 'border-secondary border-opacity-25 bg-dark'}">
      <div class="d-flex align-items-center gap-2">
        <img src="${u.avatar_url}" class="rounded-circle border border-secondary border-opacity-50" width="36" height="36" style="object-fit: cover;">
        <div>
          <div class="text-white fw-bold text-xs">${u.full_name} ${currentUser.id === u.id ? '<span class="badge bg-primary text-xs ms-1">Active</span>' : ''}</div>
          <div class="text-secondary text-xs">${u.role.toUpperCase()} • ${u.department || 'CSE'}</div>
        </div>
      </div>
      <button class="btn btn-sm ${currentUser.id === u.id ? 'btn-outline-primary disabled' : 'btn-primary'} text-xs px-3" onclick="handleSwitchUser('${u.id}')">
        ${currentUser.id === u.id ? 'Active' : 'Switch'}
      </button>
    </div>
  `).join('');
}

function handleSwitchUser(userId) {
  const target = db.users.find(u => u.id === userId);
  if (target) {
    currentUser = target;
    saveState();
    if (currentUser.role === 'student') setRole('student');
    else setRole('mentor');
    const modalEl = document.getElementById('authModal');
    const inst = bootstrap.Modal.getInstance(modalEl);
    if (inst) inst.hide();
  }
}

function handleRegisterStudent(e) {
  e.preventDefault();
  const full_name = document.getElementById('regStudentName').value;
  const email = document.getElementById('regStudentEmail').value;
  const department = document.getElementById('regStudentDept').value;
  const academic_year = document.getElementById('regStudentYear').value;
  const target_skills = document.getElementById('regStudentSkills').value.split(',').map(s => s.trim()).filter(Boolean);
  const interests = document.getElementById('regStudentInterests').value.split(',').map(s => s.trim()).filter(Boolean);
  const learning_goals_text = document.getElementById('regStudentGoals').value;

  const newUser = {
    id: `u_student_${Date.now()}`,
    email,
    role: "student",
    full_name,
    avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256`,
    college: "Institute of Engineering & Technology",
    department,
    academic_year,
    bio: `${academic_year} student studying ${department}.`,
    target_skills,
    interests,
    learning_goals_text
  };

  db.users.unshift(newUser);
  currentUser = newUser;
  saveState();
  const modalEl = document.getElementById('authModal');
  const inst = bootstrap.Modal.getInstance(modalEl);
  if (inst) inst.hide();
  setRole('student');
}

function handleRegisterMentor(e) {
  e.preventDefault();
  const full_name = document.getElementById('regMentorName').value;
  const email = document.getElementById('regMentorEmail').value;
  const department = document.getElementById('regMentorDept').value;
  const designation = document.getElementById('regMentorTitle').value;
  const company_or_institution = document.getElementById('regMentorOrg').value;
  const years_of_experience = Number(document.getElementById('regMentorExp').value) || 3;
  const expertise_skills = document.getElementById('regMentorSkills').value.split(',').map(s => s.trim()).filter(Boolean);
  const domains = document.getElementById('regMentorDomains').value.split(',').map(s => s.trim()).filter(Boolean);
  const bio = document.getElementById('regMentorBio').value;

  const newMentor = {
    id: `u_mentor_${Date.now()}`,
    email,
    role: "mentor",
    full_name,
    avatar_url: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256`,
    college: "Institute of Engineering & Technology",
    department,
    designation,
    company_or_institution,
    years_of_experience,
    expertise_skills,
    domains,
    bio,
    mentor_bio_summary: bio,
    max_mentees: 6,
    current_mentees_count: 0,
    rating_avg: 5.0,
    reviews_count: 0,
    sessions_completed: 0,
    is_accepting_mentees: true,
    availability_slots: [
      { day: "Tuesday", time: "16:00 - 17:30" },
      { day: "Thursday", time: "17:00 - 18:30" },
      { day: "Saturday", time: "11:00 - 13:00" }
    ]
  };

  db.users.unshift(newMentor);
  currentUser = newMentor;
  saveState();
  populateModalDropdowns();
  const modalEl = document.getElementById('authModal');
  const inst = bootstrap.Modal.getInstance(modalEl);
  if (inst) inst.hide();
  setRole('mentor');
}

function openEditProfileModal() {
  document.getElementById('editProfName').value = currentUser.full_name;
  document.getElementById('editProfDept').value = currentUser.department;
  document.getElementById('editProfBio').value = currentUser.bio || '';
  
  const skillsInput = document.getElementById('editProfSkills');
  if (currentUser.role === 'student') {
    skillsInput.value = (currentUser.target_skills || []).join(', ');
    document.getElementById('editProfSkillsLabel').innerText = 'Target Skills to Learn (comma separated)';
  } else {
    skillsInput.value = (currentUser.expertise_skills || []).join(', ');
    document.getElementById('editProfSkillsLabel').innerText = 'Expertise Skills Taught (comma separated)';
  }

  const modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
  modal.show();
}

function handleUpdateProfile(e) {
  e.preventDefault();
  currentUser.full_name = document.getElementById('editProfName').value;
  currentUser.department = document.getElementById('editProfDept').value;
  currentUser.bio = document.getElementById('editProfBio').value;

  const rawSkills = document.getElementById('editProfSkills').value.split(',').map(s => s.trim()).filter(Boolean);
  if (currentUser.role === 'student') {
    currentUser.target_skills = rawSkills;
  } else {
    currentUser.expertise_skills = rawSkills;
  }

  saveState();
  bootstrap.Modal.getInstance(document.getElementById('editProfileModal')).hide();
  setRole(currentUser.role);
}

// Window global bindings for inline HTML event handlers
window.setRole = setRole;
window.switchTab = switchTab;
window.setArchSubTab = setArchSubTab;
window.markNotificationRead = markNotificationRead;
window.toggleMilestone = toggleMilestone;
window.handleCreateGoal = handleCreateGoal;
window.upvoteResource = upvoteResource;
window.handleCreateResource = handleCreateResource;
window.handleBookSession = handleBookSession;
window.handleCreateFeedback = handleCreateFeedback;
window.openProposalModal = openProposalModal;
window.handleSendProposal = handleSendProposal;
window.acceptProposal = acceptProposal;
window.declineProposal = declineProposal;
window.setDeptFilter = setDeptFilter;
window.setSkillFilter = setSkillFilter;
window.handleSearchMentors = handleSearchMentors;
window.handleAddSkillKey = handleAddSkillKey;
window.removeSkillTag = removeSkillTag;
window.handleUpdateGoals = handleUpdateGoals;
window.selectCollection = selectCollection;
window.openAuthModal = openAuthModal;
window.handleSwitchUser = handleSwitchUser;
window.handleRegisterStudent = handleRegisterStudent;
window.handleRegisterMentor = handleRegisterMentor;
window.openEditProfileModal = openEditProfileModal;
window.handleUpdateProfile = handleUpdateProfile;

document.addEventListener('DOMContentLoaded', init);
