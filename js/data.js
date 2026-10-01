// =============================================
//  UTSAV 2026 — Event Data
// =============================================

const ACTIVITIES = [
  // ---- DANCE ----
  {
    id: 1,
    title: "Groove Battle",
    category: "dance",
    emoji: "💃",
    date: "October 15, 2026",
    time: "10:00 AM – 1:00 PM",
    venue: "Open Air Amphitheatre",
    capacity: 200,
    registered: 142,
    whoCanAttend: "All AU Students & Faculty",
    whoCanParticipate: "Solo or groups up to 6 members, AU students only",
    description: "An electrifying freestyle dance battle across genres — Hip-Hop, Contemporary, Bollywood, and Classical Fusion. Show your moves and battle for the top spot!",
    rules: [
      "Each performance: max 5 minutes.",
      "Pre-recorded tracks must be submitted 24 hrs before.",
      "No props that may damage the stage.",
      "Team must register collectively."
    ]
  },
  {
    id: 2,
    title: "Natyanjali — Classical Dance",
    category: "dance",
    emoji: "🪷",
    date: "October 16, 2026",
    time: "3:00 PM – 6:00 PM",
    venue: "University Auditorium",
    capacity: 350,
    registered: 89,
    whoCanAttend: "All AU Students, Faculty & Guests",
    whoCanParticipate: "Solo performers, AU students (any year)",
    description: "A showcase of classical Indian dance forms — Bharatanatyam, Kathak, Odissi, Mohiniyattam. Celebrate India's rich dance heritage.",
    rules: [
      "Performance duration: 3–8 minutes.",
      "Traditional attire is mandatory.",
      "Judged on technique, expression, and presentation."
    ]
  },

  // ---- SING ----
  {
    id: 3,
    title: "Sur Sangam — Solo Singing",
    category: "sing",
    emoji: "🎤",
    date: "October 15, 2026",
    time: "2:00 PM – 5:00 PM",
    venue: "University Auditorium",
    capacity: 350,
    registered: 210,
    whoCanAttend: "All AU Students & Faculty",
    whoCanParticipate: "Solo singers, AU students only",
    description: "A melodious singing competition spanning Bollywood classics, Indie, Ghazals, and Pop. Bring your voice and own the mic!",
    rules: [
      "Each participant gets 5 minutes.",
      "Karaoke / instrumental track must be submitted 12 hrs before.",
      "Live instruments are welcome.",
      "Judges score on pitch, rhythm, and stage presence."
    ]
  },
  {
    id: 4,
    title: "Battle of Bands",
    category: "sing",
    emoji: "🎸",
    date: "October 17, 2026",
    time: "5:00 PM – 9:00 PM",
    venue: "Open Air Amphitheatre",
    capacity: 500,
    registered: 68,
    whoCanAttend: "Open to Public (limited seating)",
    whoCanParticipate: "Bands of 3–8 members, AU students",
    description: "Rock the stage with original compositions or covers. The ultimate band showdown at UTSAV 2026!",
    rules: [
      "Set duration: 15–20 minutes per band.",
      "At least 1 original song required.",
      "Equipment list must be submitted 48 hrs before.",
      "Profanity or inappropriate content will disqualify."
    ]
  },

  // ---- COMEDY ----
  {
    id: 5,
    title: "Laugh Factory — Stand-Up Night",
    category: "comedy",
    emoji: "🎭",
    date: "October 15, 2026",
    time: "6:00 PM – 9:00 PM",
    venue: "Central Lawn",
    capacity: 300,
    registered: 185,
    whoCanAttend: "All AU Students & Faculty",
    whoCanParticipate: "Solo comedians, AU students (18+ only)",
    description: "Hit the mic and make 'em laugh! From observational humour to situational comedy — 7 minutes to crack up the crowd.",
    rules: [
      "Set duration: 5–7 minutes strictly.",
      "No offensive, casteist, or discriminatory content.",
      "Content must be screened by the committee beforehand.",
      "Props are allowed."
    ]
  },
  {
    id: 6,
    title: "Improv Wars",
    category: "comedy",
    emoji: "🃏",
    date: "October 16, 2026",
    time: "4:00 PM – 6:30 PM",
    venue: "Central Lawn",
    capacity: 200,
    registered: 56,
    whoCanAttend: "All AU Students & Faculty",
    whoCanParticipate: "Teams of 2–4, AU students",
    description: "Spontaneous, fast-paced improvisation comedy battles where the audience calls the shots on scenarios. Think fast, act faster!",
    rules: [
      "Teams given a scenario on the spot.",
      "Each round: 3 minutes.",
      "Audience laughter-meter determines the winner.",
      "No pre-scripted material allowed."
    ]
  },

  // ---- DARE ----
  {
    id: 7,
    title: "YOLO Dare Challenge",
    category: "dare",
    emoji: "🔥",
    date: "October 16, 2026",
    time: "11:00 AM – 2:00 PM",
    venue: "Sports Ground",
    capacity: 100,
    registered: 97,
    whoCanAttend: "All AU Students",
    whoCanParticipate: "Individual, AU students (18+, sign waiver)",
    description: "Think you're brave? Face our curated list of dares — from eating challenges to blindfolded obstacle courses. Not for the faint-hearted!",
    rules: [
      "Participants must sign a consent waiver.",
      "Safety marshals present at all times.",
      "You may forfeit a dare with a point penalty.",
      "Medical team on standby."
    ]
  },
  {
    id: 8,
    title: "Treasure Hunt Extreme",
    category: "dare",
    emoji: "🗺️",
    date: "October 17, 2026",
    time: "9:00 AM – 12:00 PM",
    venue: "Entire Campus",
    capacity: 120,
    registered: 44,
    whoCanAttend: "All AU Students",
    whoCanParticipate: "Teams of 4–5, AU students",
    description: "A multi-stage campus-wide treasure hunt with puzzles, physical challenges, and cryptic clues. Race against other teams to find the hidden treasure!",
    rules: [
      "Team must stay together at all times.",
      "No mobile maps — printed maps provided.",
      "Solving each clue earns points.",
      "First team to complete all stages wins."
    ]
  },

  // ---- CULTURAL ----
  {
    id: 9,
    title: "Rang Utsav — Art Exhibition",
    category: "cultural",
    emoji: "🎨",
    date: "October 15–17, 2026",
    time: "9:00 AM – 8:00 PM",
    venue: "Art Gallery, Block B",
    capacity: 999,
    registered: 320,
    whoCanAttend: "Open to All — Students, Faculty & Public",
    whoCanParticipate: "Any AU student can exhibit artwork",
    description: "A 3-day open art exhibition showcasing paintings, sculptures, digital art, and installations by AU students and faculty.",
    rules: [
      "Artwork must be original and submitted for review.",
      "Exhibits remain for all 3 days.",
      "No live painting on Day 1.",
      "Visitors may vote for the People's Choice Award."
    ]
  },
  {
    id: 10,
    title: "Nukkad Natak — Street Play",
    category: "cultural",
    emoji: "🎬",
    date: "October 16, 2026",
    time: "10:00 AM – 1:00 PM",
    venue: "Main Plaza",
    capacity: 500,
    registered: 130,
    whoCanAttend: "Open to All",
    whoCanParticipate: "Groups of 5–15, AU students",
    description: "Street plays (Nukkad Natak) on social themes. No stage, no mic — just raw talent, a message, and your audience.",
    rules: [
      "Duration: 10–15 minutes.",
      "Social theme must be declared at registration.",
      "Props must be self-carried.",
      "Judges evaluate message clarity, performance, and audience engagement."
    ]
  },
  {
    id: 11,
    title: "Fashion Walk — Traditional Attire",
    category: "cultural",
    emoji: "👗",
    date: "October 17, 2026",
    time: "3:00 PM – 5:30 PM",
    venue: "University Auditorium",
    capacity: 300,
    registered: 88,
    whoCanAttend: "All AU Students & Faculty",
    whoCanParticipate: "Solo or pairs, AU students",
    description: "Celebrate India's diversity through a traditional fashion walk. Walk the ramp in attire representing any Indian state or culture.",
    rules: [
      "Attire must be traditional; modern fusion allowed.",
      "Participants may carry cultural props.",
      "Brief 30-second introduction required.",
      "Judged on presentation, coordination, and cultural authenticity."
    ]
  },
  {
    id: 12,
    title: "Food Festival & Cultural Stalls",
    category: "cultural",
    emoji: "🍲",
    date: "October 15–17, 2026",
    time: "12:00 PM – 9:00 PM",
    venue: "University Central Garden",
    capacity: 999,
    registered: 500,
    whoCanAttend: "Open to All",
    whoCanParticipate: "Any student/department can set up a stall",
    description: "Taste the flavours of India and the world! Stalls run by students from various departments serving dishes from their home states and cultures.",
    rules: [
      "Stall setup by 11:00 AM daily.",
      "Food safety guidelines must be followed.",
      "All ingredients must be declared.",
      "Stalls voted for the Best Stall Award by visitors."
    ]
  }
];

// ---- SCHEDULE DATA ----
const SCHEDULE = {
  1: [
    { time: "9:00 AM", event: "Inauguration Ceremony", venue: "Main Auditorium", category: "cultural", capacity: "500", who: "All AU Students & Faculty" },
    { time: "10:00 AM", event: "Groove Battle — Dance", venue: "Open Air Amphitheatre", category: "dance", capacity: "200", who: "All Students" },
    { time: "12:00 PM", event: "Food Festival Opens", venue: "Central Garden", category: "cultural", capacity: "Open", who: "Open to All" },
    { time: "2:00 PM", event: "Sur Sangam — Solo Singing", venue: "University Auditorium", category: "sing", capacity: "350", who: "All Students & Faculty" },
    { time: "5:00 PM", event: "Art Exhibition (Rang Utsav)", venue: "Art Gallery, Block B", category: "cultural", capacity: "Open", who: "Open to All" },
    { time: "6:00 PM", event: "Laugh Factory — Stand-Up Night", venue: "Central Lawn", category: "comedy", capacity: "300", who: "All Students & Faculty" },
    { time: "8:30 PM", event: "DJ Night — Day 1 Closing", venue: "Open Air Amphitheatre", category: "cultural", capacity: "500", who: "All Students" }
  ],
  2: [
    { time: "9:00 AM", event: "Morning Yoga & Zumba", venue: "Sports Ground", category: "cultural", capacity: "200", who: "All Students & Faculty" },
    { time: "11:00 AM", event: "YOLO Dare Challenge", venue: "Sports Ground", category: "dare", capacity: "100", who: "Students (18+)" },
    { time: "10:00 AM", event: "Nukkad Natak — Street Play", venue: "Main Plaza", category: "cultural", capacity: "Open", who: "Open to All" },
    { time: "3:00 PM", event: "Natyanjali — Classical Dance", venue: "University Auditorium", category: "dance", capacity: "350", who: "All Students & Guests" },
    { time: "4:00 PM", event: "Improv Wars — Comedy", venue: "Central Lawn", category: "comedy", capacity: "200", who: "All Students & Faculty" },
    { time: "6:00 PM", event: "Cultural Stalls Evening", venue: "Central Garden", category: "cultural", capacity: "Open", who: "Open to All" },
    { time: "8:00 PM", event: "Star Night Performance", venue: "Open Air Amphitheatre", category: "cultural", capacity: "500", who: "All Students & Guests" }
  ],
  3: [
    { time: "9:00 AM", event: "Treasure Hunt Extreme", venue: "Entire Campus", category: "dare", capacity: "120", who: "All Students" },
    { time: "10:00 AM", event: "Inter-Dept Quiz", venue: "Seminar Hall", category: "cultural", capacity: "150", who: "All Students" },
    { time: "1:00 PM", event: "Food Festival Closing Awards", venue: "Central Garden", category: "cultural", capacity: "Open", who: "Open to All" },
    { time: "3:00 PM", event: "Fashion Walk", venue: "University Auditorium", category: "cultural", capacity: "300", who: "All Students & Faculty" },
    { time: "5:00 PM", event: "Battle of Bands", venue: "Open Air Amphitheatre", category: "sing", capacity: "500", who: "Open to Public" },
    { time: "8:00 PM", event: "Prize Distribution & Closing Ceremony", venue: "Main Auditorium", category: "cultural", capacity: "500", who: "All Students & Faculty" }
  ]
};

// ---- GALLERY DATA ----
const GALLERY = [
  { emoji: "💃", label: "Dance Battle Finals 2025", color: "#6c63ff" },
  { emoji: "🎤", label: "Sur Sangam Night", color: "#ffdd40" },
  { emoji: "🎸", label: "Battle of Bands 2025", color: "#ff6b35" },
  { emoji: "🎨", label: "Rang Utsav Art Show", color: "#2dd4bf" },
  { emoji: "🎭", label: "Stand-Up Night Highlights", color: "#ff6b35" },
  { emoji: "🍲", label: "Food Festival Crowd", color: "#f7c59f" },
  { emoji: "🔥", label: "Dare Night Moments", color: "#ff5050" },
  { emoji: "👗", label: "Fashion Walk 2025", color: "#a89eff" },
  { emoji: "🥁", label: "Percussion Showcase", color: "#ffdd40" },
  { emoji: "🌟", label: "Closing Ceremony Fireworks", color: "#6c63ff" },
  { emoji: "🤣", label: "Improv Comedy Highlights", color: "#2dd4bf" },
  { emoji: "🎬", label: "Nukkad Natak Performance", color: "#f7c59f" }
];
