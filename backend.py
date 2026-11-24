"""
MENTRA — Python Backend & Dynamic TF-IDF AI Matching Engine
CSD EDTECH EDITION v3.0

Zero MongoDB Dependency: Persists data cleanly in JSON/SQLite format.
Universal Python Execution: Runs via Flask if available, or falls back to
Python's built-in http.server so faculty can run it with zero pip installations!

Run instructions:
    python backend.py
    Server boots on: http://localhost:5000
"""

import sys
import os
import json
import math
import re
from datetime import datetime
from typing import List, Dict, Tuple, Set, Any

# Predefined Stop Words for NLP Tokenization
STOP_WORDS: Set[str] = {
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
}

# In-memory Store (Seed Data for 11 Collections)
DATA_FILE = "mentra_db.json"

INITIAL_DATA = {
    "users": [
        {
            "id": "u_student_1",
            "email": "rohan.deshmukh@college.edu",
            "role": "student",
            "full_name": "Rohan Deshmukh",
            "avatar_url": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
            "college": "Institute of Engineering & Technology",
            "department": "Computer Science & Engineering",
            "academic_year": "3rd Year (Junior)",
            "bio": "CS Undergrad exploring distributed backend systems, microservices, and competitive coding.",
            "target_skills": ["React", "Node.js", "System Design", "Algorithms", "PostgreSQL", "Docker"],
            "interests": ["Backend Architecture", "FAANG Placement", "Hackathons"],
            "learning_goals_text": "Seeking a mentor to master system design (caching, load balancers, rate limiters) and prepare for tier-1 SDE internship interviews."
        },
        {
            "id": "u_mentor_1",
            "email": "rajesh.raman@faculty.college.edu",
            "role": "mentor",
            "full_name": "Dr. Rajesh Raman",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
            "college": "Institute of Engineering & Technology",
            "department": "Computer Science & Engineering",
            "designation": "Associate Professor & AI Lab Director",
            "company_or_institution": "CSD Faculty / Ex-IISc Fellow",
            "years_of_experience": 12,
            "expertise_skills": ["Machine Learning", "Deep Learning", "Python", "PyTorch", "Computer Vision", "NLP"],
            "domains": ["Artificial Intelligence", "Academic Research", "Conference Papers"],
            "bio": "Guiding undergraduates through foundational AI math, deep neural network debugging, and publishing at top conferences.",
            "max_mentees": 6,
            "current_mentees_count": 3,
            "rating_avg": 4.92,
            "reviews_count": 38,
            "sessions_completed": 86,
            "is_accepting_mentees": True,
            "availability_slots": [
                {"day": "Tuesday", "time": "16:00 - 17:30"},
                {"day": "Thursday", "time": "15:00 - 16:30"},
                {"day": "Saturday", "time": "11:00 - 13:00"}
            ]
        },
        {
            "id": "u_mentor_2",
            "email": "aanya.sharma@alumni.college.edu",
            "role": "mentor",
            "full_name": "Aanya Sharma",
            "avatar_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256",
            "college": "Institute of Engineering & Technology",
            "department": "Information Technology",
            "designation": "Incoming SDE II at Microsoft / College Gold Medalist",
            "company_or_institution": "Microsoft",
            "years_of_experience": 3,
            "expertise_skills": ["Data Structures", "Algorithms", "C++", "System Design", "Competitive Programming", "Dynamic Programming"],
            "domains": ["FAANG Interviews", "Placement Preparation", "Coding Contests"],
            "bio": "Cracked Google, Microsoft, and Amazon on-campus. Mentor students on intuitive problem-solving, graph algorithms, and resume review.",
            "max_mentees": 5,
            "current_mentees_count": 4,
            "rating_avg": 4.96,
            "reviews_count": 54,
            "sessions_completed": 118,
            "is_accepting_mentees": True,
            "availability_slots": [
                {"day": "Monday", "time": "19:00 - 20:30"},
                {"day": "Wednesday", "time": "19:00 - 20:30"},
                {"day": "Sunday", "time": "10:00 - 12:00"}
            ]
        },
        {
            "id": "u_mentor_3",
            "email": "vikram.verma@devguild.org",
            "role": "mentor",
            "full_name": "Vikramaditya Verma",
            "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
            "college": "Institute of Engineering & Technology",
            "department": "Computer Science & Engineering",
            "designation": "Staff Frontend Architect & 4x Hackathon Winner",
            "company_or_institution": "DevGuild Global",
            "years_of_experience": 5,
            "expertise_skills": ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "Docker"],
            "domains": ["Web Development", "Open Source", "Hackathon Winning Projects"],
            "bio": "Passionate about building production-grade web systems, clean architecture, responsive UIs, and launching on Vercel.",
            "max_mentees": 8,
            "current_mentees_count": 5,
            "rating_avg": 4.89,
            "reviews_count": 42,
            "sessions_completed": 92,
            "is_accepting_mentees": True,
            "availability_slots": [
                {"day": "Friday", "time": "18:00 - 20:00"},
                {"day": "Saturday", "time": "14:00 - 16:30"}
            ]
        }
    ],
    "mentorship_requests": [
        {
            "id": "req_101",
            "student_id": "u_student_1",
            "student_name": "Rohan Deshmukh",
            "student_avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
            "student_dept": "Computer Science & Engineering",
            "mentor_id": "u_mentor_2",
            "mentor_name": "Aanya Sharma",
            "goal_description": "Seeking mentorship to master graph algorithms, segment trees, and prepare for upcoming SDE hiring rounds.",
            "proposed_topics": ["Graph Algorithms", "System Design", "Mock Interviews"],
            "preferred_meeting_slot": "Monday 19:00 - 20:30",
            "status": "pending",
            "created_at": "2026-11-20T10:15:00Z"
        }
    ],
    "sessions": [
        {
            "id": "sess_201",
            "student_id": "u_student_1",
            "student_name": "Rohan Deshmukh",
            "mentor_id": "u_mentor_2",
            "mentor_name": "Aanya Sharma",
            "mentor_avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256",
            "title": "System Design & Distributed Caching Walkthrough",
            "scheduled_at": "2026-11-26T18:00:00Z",
            "duration_mins": 45,
            "meeting_url": "https://meet.google.com/mentra-sys-arch",
            "status": "scheduled",
            "agenda": "1. Review cache-aside vs write-through patterns\n2. Walk through Redis clustering\n3. Q&A and next assignments"
        }
    ],
    "learning_goals": [
        {
            "id": "goal_301",
            "student_id": "u_student_1",
            "title": "Master High-Level System Architecture & Redis",
            "category": "System Design",
            "target_date": "2026-12-15",
            "progress_percent": 66,
            "status": "active",
            "milestones": [
                {"id": "m1", "title": "Understand CAP Theorem & Consistency Models", "is_completed": True},
                {"id": "m2", "title": "Implement Cache-Aside Pattern in Node.js", "is_completed": True},
                {"id": "m3", "title": "Design a Distributed Rate Limiter with Sliding Window", "is_completed": False}
            ]
        }
    ],
    "knowledge_resources": [
        {
            "id": "res_401",
            "author_id": "u_mentor_3",
            "author_name": "Vikramaditya Verma",
            "author_role": "Staff Frontend Architect",
            "title": "Production Microservices Blueprint: Distributed Rate Limiter",
            "category": "Systems & Cloud",
            "tags": ["Redis", "Express", "Concurrency", "System Design"],
            "solution_summary": "Comprehensive architectural blueprint for sliding-window log rate limiting under high concurrency.",
            "content_markdown": "### Architectural Overview\nRate limiters protect downstream API gateways from cascading thundering herd failures.",
            "upvotes": 48,
            "published_at": "2026-11-12"
        }
    ],
    "feedback_ratings": [
        {
            "id": "fb_501",
            "mentor_id": "u_mentor_2",
            "student_id": "u_student_1",
            "student_name": "Rohan Deshmukh",
            "student_avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256",
            "overall_rating": 5,
            "technical_depth_score": 5,
            "communication_score": 5,
            "punctuality_score": 5,
            "review_comment": "Aanya's dynamic programming session completely clarified transition functions. She gave actionable feedback on my mock interview code.",
            "created_at": "2026-11-18"
        }
    ],
    "notifications": [
        {
            "id": "notif_601",
            "recipient_id": "u_student_1",
            "type": "welcome",
            "title": "Welcome to MENTRA Platform",
            "message": "Your CSD profile has been validated. Explore AI Mentor recommendations and submit your first proposal.",
            "is_read": False,
            "timestamp": "Just now"
        }
    ]
}

def load_database() -> Dict[str, Any]:
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return INITIAL_DATA

def save_database(data: Dict[str, Any]):
    try:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving database: {e}")

DB = load_database()

# ==============================================================================
# TF-IDF & COSINE SIMILARITY VECTOR ENGINE
# ==============================================================================
def tokenize(text: str) -> List[str]:
    if not text:
        return []
    clean = re.sub(r'c\+\+', 'cpp', str(text).lower())
    clean = re.sub(r'\.js', 'js', clean)
    clean = re.sub(r'[^a-z0-9\s]', ' ', clean)
    tokens = clean.split()
    return [t for t in tokens if len(t) > 1 and t not in STOP_WORDS]

def build_student_tokens(student: dict) -> List[Tuple[str, float]]:
    weighted_tokens = []
    for s in student.get("target_skills", []):
        for tok in tokenize(s):
            weighted_tokens.append((tok, 3.0))  # Skills: 3x weight
    for interest in student.get("interests", []):
        for tok in tokenize(interest):
            weighted_tokens.append((tok, 2.0))  # Interests: 2x weight
    for tok in tokenize(student.get("learning_goals_text", "")):
        weighted_tokens.append((tok, 1.0))     # Goals text: 1x weight
    return weighted_tokens

def compute_dynamic_matches(student: dict, mentors: List[dict]) -> List[dict]:
    query_tokens = build_student_tokens(student)

    # 1. Build mentor corpus
    corpus = []
    for mentor in mentors:
        doc_tokens = []
        for s in mentor.get("expertise_skills", []):
            for tok in tokenize(s):
                doc_tokens.append((tok, 3.0))
        for d in mentor.get("domains", []):
            for tok in tokenize(d):
                doc_tokens.append((tok, 2.0))
        for tok in tokenize(mentor.get("bio", "")):
            doc_tokens.append((tok, 1.0))
        corpus.append(doc_tokens)

    n_docs = len(corpus)
    df: Dict[str, int] = {}
    for doc in corpus:
        seen = set(t for t, _ in doc)
        for t in seen:
            df[t] = df.get(t, 0) + 1

    def get_idf(term: str) -> float:
        doc_freq = df.get(term, 0)
        return math.log((1.0 + n_docs) / (1.0 + doc_freq)) + 1.0

    # 2. Vectorize student query
    q_vec: Dict[str, float] = {}
    for term, weight in query_tokens:
        q_vec[term] = q_vec.get(term, 0.0) + (weight * get_idf(term))

    q_norm = math.sqrt(sum(v ** 2 for v in q_vec.values())) or 1.0

    # 3. Vectorize and score each mentor
    scored_mentors = []
    for idx, mentor in enumerate(mentors):
        doc_tokens = corpus[idx]
        d_vec: Dict[str, float] = {}
        matched_tokens = set()

        for term, weight in doc_tokens:
            d_vec[term] = d_vec.get(term, 0.0) + (weight * get_idf(term))
            if term in q_vec:
                matched_tokens.add(term)

        d_norm = math.sqrt(sum(v ** 2 for v in d_vec.values())) or 1.0
        dot_product = sum(q_vec[t] * d_vec[t] for t in q_vec if t in d_vec)
        raw_cosine = dot_product / (q_norm * d_norm)
        percentage = min(99, max(55, round(55.0 + 44.0 * raw_cosine)))

        mentor_copy = dict(mentor)
        mentor_copy["cosine_score"] = round(raw_cosine, 4)
        mentor_copy["match_percentage"] = percentage
        mentor_copy["matched_skills"] = sorted(list(matched_tokens))
        scored_mentors.append(mentor_copy)

    return sorted(scored_mentors, key=lambda m: m["cosine_score"], reverse=True)


# ==============================================================================
# HTTP DISPATCHER & REST API ROUTES
# ==============================================================================
def handle_api_request(method: str, path: str, body_bytes: bytes) -> Tuple[int, Dict[str, Any]]:
    global DB
    body = {}
    if body_bytes:
        try:
            body = json.loads(body_bytes.decode("utf-8"))
        except Exception:
            body = {}

    # Routes
    if path == "/api/health":
        return 200, {
            "status": "healthy",
            "platform": "MENTRA CSD Edition",
            "version": "3.0",
            "vector_engine": "TF-IDF + Cosine Similarity",
            "database_mode": "Zero-MongoDB JSON Persistence",
            "total_users": len(DB.get("users", []))
        }

    elif path == "/api/users" and method == "GET":
        return 200, {"users": DB.get("users", [])}

    elif path == "/api/register" and method == "POST":
        new_user = body.get("user")
        if not new_user or "email" not in new_user or "role" not in new_user:
            return 400, {"error": "Missing user payload, email or role"}
        
        new_user["id"] = f"u_{new_user['role']}_{int(datetime.now().timestamp())}"
        DB["users"].append(new_user)
        save_database(DB)
        return 201, {"message": "User registered successfully", "user": new_user}

    elif path == "/api/mentors" and method == "GET":
        mentors = [u for u in DB.get("users", []) if u.get("role") == "mentor"]
        return 200, {"mentors": mentors}

    elif path == "/api/match" and method == "POST":
        student = body.get("student")
        if not student:
            # Fallback to first student in DB
            students = [u for u in DB.get("users", []) if u.get("role") == "student"]
            student = students[0] if students else DB["users"][0]

        mentors = [u for u in DB.get("users", []) if u.get("role") == "mentor"]
        matches = compute_dynamic_matches(student, mentors)
        return 200, {
            "algorithm": "tfidf_cosine_v2",
            "student_id": student.get("id"),
            "matches": matches
        }

    elif path == "/api/requests":
        if method == "GET":
            return 200, {"requests": DB.get("mentorship_requests", [])}
        elif method == "POST":
            new_req = body.get("request")
            if not new_req:
                return 400, {"error": "Missing request object"}
            new_req["id"] = f"req_{int(datetime.now().timestamp())}"
            new_req["created_at"] = datetime.utcnow().isoformat() + "Z"
            new_req["status"] = "pending"
            DB["mentorship_requests"].insert(0, new_req)
            save_database(DB)
            return 201, {"message": "Request submitted", "request": new_req}

    elif path.startswith("/api/requests/") and method == "PUT":
        req_id = path.split("/")[-1]
        action = body.get("action", "accept")
        target_req = next((r for r in DB.get("mentorship_requests", []) if r.get("id") == req_id), None)
        if not target_req:
            return 404, {"error": "Request not found"}

        if action == "accept":
            target_req["status"] = "accepted"
            # Auto-generate 1:1 session
            new_sess = {
                "id": f"sess_{int(datetime.now().timestamp())}",
                "student_id": target_req.get("student_id"),
                "student_name": target_req.get("student_name"),
                "mentor_id": target_req.get("mentor_id"),
                "mentor_name": target_req.get("mentor_name"),
                "title": f"Initial Mentorship Sync: {', '.join(target_req.get('proposed_topics', ['Orientation']))}",
                "scheduled_at": datetime.utcnow().isoformat() + "Z",
                "duration_mins": 45,
                "meeting_url": f"https://meet.google.com/mentra-{req_id[:6]}",
                "status": "scheduled",
                "agenda": "1. Learning goals review\n2. Weekly cadence alignment\n3. Action items"
            }
            DB["sessions"].insert(0, new_sess)
        else:
            target_req["status"] = "declined"
            target_req["decline_reason"] = body.get("reason", "Mentor capacity ceiling reached for current academic term.")

        save_database(DB)
        return 200, {"message": f"Proposal {action}ed", "request": target_req}

    elif path == "/api/sessions":
        if method == "GET":
            return 200, {"sessions": DB.get("sessions", [])}
        elif method == "POST":
            new_sess = body.get("session")
            if not new_sess:
                return 400, {"error": "Missing session object"}
            new_sess["id"] = f"sess_{int(datetime.now().timestamp())}"
            DB["sessions"].insert(0, new_sess)
            save_database(DB)
            return 201, {"message": "Session created", "session": new_sess}

    elif path == "/api/goals":
        if method == "GET":
            return 200, {"goals": DB.get("learning_goals", [])}
        elif method == "POST":
            new_goal = body.get("goal")
            if not new_goal:
                return 400, {"error": "Missing goal object"}
            new_goal["id"] = f"goal_{int(datetime.now().timestamp())}"
            DB["learning_goals"].insert(0, new_goal)
            save_database(DB)
            return 201, {"message": "Goal created", "goal": new_goal}

    elif path == "/api/resources":
        if method == "GET":
            return 200, {"resources": DB.get("knowledge_resources", [])}
        elif method == "POST":
            new_res = body.get("resource")
            if not new_res:
                return 400, {"error": "Missing resource object"}
            new_res["id"] = f"res_{int(datetime.now().timestamp())}"
            new_res["upvotes"] = 0
            new_res["published_at"] = datetime.utcnow().strftime("%Y-%m-%d")
            DB["knowledge_resources"].insert(0, new_res)
            save_database(DB)
            return 201, {"message": "Resource published", "resource": new_res}

    elif path.startswith("/api/resources/") and path.endswith("/upvote") and method == "POST":
        res_id = path.split("/")[3]
        target_res = next((r for r in DB.get("knowledge_resources", []) if r.get("id") == res_id), None)
        if not target_res:
            return 404, {"error": "Resource not found"}
        target_res["upvotes"] = target_res.get("upvotes", 0) + 1
        save_database(DB)
        return 200, {"message": "Upvoted", "upvotes": target_res["upvotes"]}

    elif path == "/api/feedback":
        if method == "GET":
            return 200, {"feedback": DB.get("feedback_ratings", [])}
        elif method == "POST":
            new_fb = body.get("feedback")
            if not new_fb:
                return 400, {"error": "Missing feedback object"}
            new_fb["id"] = f"fb_{int(datetime.now().timestamp())}"
            new_fb["created_at"] = datetime.utcnow().strftime("%Y-%m-%d")
            DB["feedback_ratings"].insert(0, new_fb)
            save_database(DB)
            return 201, {"message": "Feedback submitted", "feedback": new_fb}

    return 404, {"error": f"Endpoint not found: {method} {path}"}


# ==============================================================================
# SERVER BOOTSTRAP (Flask with built-in http.server fallback)
# ==============================================================================
def run_flask_server(port=5000):
    from flask import Flask, request, jsonify, make_response
    app = Flask(__name__)

    @app.after_request
    def add_cors_headers(response):
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    @app.route("/", defaults={"path": ""}, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    @app.route("/<path:path>", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    def catch_all(path):
        if request.method == "OPTIONS":
            return make_response("", 204)
        full_path = "/" + path
        code, resp = handle_api_request(request.method, full_path, request.get_data())
        return jsonify(resp), code

    print(f"🚀 MENTRA Flask Backend API listening on http://localhost:{port}")
    print("✨ Dynamic TF-IDF Vector Space Model & Cosine Similarity Engine Active.")
    print("📦 Zero MongoDB Setup: Storage synced with mentra_db.json.")
    app.run(host="0.0.0.0", port=port, debug=False)

def run_builtin_server(port=5000):
    from http.server import HTTPServer, BaseHTTPRequestHandler

    class MentraHandler(BaseHTTPRequestHandler):
        def _set_headers(self, status_code=200):
            self.send_response(status_code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
            self.end_headers()

        def do_OPTIONS(self):
            self._set_headers(204)

        def do_GET(self):
            code, resp = handle_api_request("GET", self.path, b"")
            self._set_headers(code)
            self.wfile.write(json.dumps(resp).encode("utf-8"))

        def do_POST(self):
            length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(length) if length > 0 else b""
            code, resp = handle_api_request("POST", self.path, body_bytes)
            self._set_headers(code)
            self.wfile.write(json.dumps(resp).encode("utf-8"))

        def do_PUT(self):
            length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(length) if length > 0 else b""
            code, resp = handle_api_request("PUT", self.path, body_bytes)
            self._set_headers(code)
            self.wfile.write(json.dumps(resp).encode("utf-8"))

    print(f"🚀 MENTRA Standalone Python API Server listening on http://localhost:{port}")
    print("✨ Running with Python built-in HTTP server (zero pip dependencies required).")
    print("📦 Storage synced with mentra_db.json.")
    httpd = HTTPServer(("0.0.0.0", port), MentraHandler)
    httpd.serve_forever()

if __name__ == "__main__":
    PORT = 5000
    try:
        import flask
        run_flask_server(PORT)
    except ImportError:
        run_builtin_server(PORT)
