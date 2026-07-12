export const activities = [
  {
    id: 1,
    title: 'Football Academy',
    icon: 'football',
    description: 'Professional football training for boys aged 6-20 with structured age-group programs and competitive matches.',
    titleKey: 'home.programs.items.football.title',
    descriptionKey: 'home.programs.items.football.description',
    link: '/football-academy/football',
    color: 'bg-green-50',
  },
  {
    id: 2,
    title: "Women's Football",
    icon: 'football',
    description: 'Empowering young women through football with dedicated coaching, training facilities, and competitive opportunities.',
    titleKey: 'home.programs.items.womensFootball.title',
    descriptionKey: 'home.programs.items.womensFootball.description',
    link: '/football-academy/womens-football',
    color: 'bg-purple-50',
  },
  {
    id: 3,
    title: 'Basketball',
    icon: 'basketball',
    description: 'High-performance basketball program focusing on skill development, teamwork, and competitive play.',
    titleKey: 'home.programs.items.basketball.title',
    descriptionKey: 'home.programs.items.basketball.description',
    link: '/football-academy/basketball',
    color: 'bg-orange-50',
  },
  {
    id: 4,
    title: 'Volleyball',
    icon: 'volleyball',
    description: 'Comprehensive volleyball training with experienced coaches and opportunities to compete at various levels.',
    titleKey: 'home.programs.items.volleyball.title',
    descriptionKey: 'home.programs.items.volleyball.description',
    link: '/football-academy/volleyball',
    color: 'bg-blue-50',
  },
  {
    id: 5,
    title: 'Table Tennis',
    icon: 'table-tennis',
    description: 'Precision and strategy meet in our table tennis program, suitable for beginners to advanced players.',
    titleKey: 'home.programs.items.tableTennis.title',
    descriptionKey: 'home.programs.items.tableTennis.description',
    link: '/football-academy/table-tennis',
    color: 'bg-red-50',
  },
  {
    id: 6,
    title: 'German Classes',
    icon: 'language',
    description: 'Learn German language from beginner to advanced levels with qualified instructors and modern teaching methods.',
    titleKey: 'home.programs.items.germanClasses.title',
    descriptionKey: 'home.programs.items.germanClasses.description',
    link: '/football-academy/german-classes',
    color: 'bg-yellow-50',
  },
];

export const stats = [
  { labelKey: 'home.stats.items.students', value: 500, suffix: '+' },
  { labelKey: 'home.stats.items.coaches', value: 2, suffix: '' },
  { labelKey: 'home.stats.items.sports', value: 6, suffix: '' },
  { labelKey: 'home.stats.items.years', value: 15, suffix: '+' },
];

export const testimonials = [
  {
    id: 1,
    name: 'jules.',
    role: 'Parent of U15 Player',
    content: 'Esperance FC has transformed my son\'s life. The discipline, training quality, and values they instill are remarkable.',
    roleKey: 'home.testimonials.items.jules.role',
    contentKey: 'home.testimonials.items.jules.content',
    rating: 5,
  },
  {
    id: 2,
    name: 'Beker.',
    role: 'Basketball Athlete',
    content: 'The coaching staff truly cares about each athlete\'s development. I\'ve improved more here than anywhere else.',
    roleKey: 'home.testimonials.items.beker.role',
    contentKey: 'home.testimonials.items.beker.content',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lennard.',
    role: 'German Class Student',
    content: 'The German language program is excellent. Small class sizes and passionate teachers make learning enjoyable.',
    roleKey: 'home.testimonials.items.lennard.role',
    contentKey: 'home.testimonials.items.lennard.content',
    rating: 5,
  },
];

export const galleryImages = [
  { id: 1, src: null, alt: 'Football training session', category: 'Football', title: 'Football Training' },
  { id: 2, src: null, alt: 'Women\'s football match', category: 'Women\'s Football', title: 'Women\'s Match Day' },
  { id: 3, src: null, alt: 'Basketball game action', category: 'Basketball', title: 'Basketball Game' },
  { id: 4, src: null, alt: 'Volleyball tournament', category: 'Volleyball', title: 'Volleyball Tournament' },
  { id: 5, src: null, alt: 'Table tennis competition', category: 'Table Tennis', title: 'Table Tennis' },
  { id: 6, src: null, alt: 'German class in session', category: 'German Classes', title: 'German Class' },
  { id: 7, src: null, alt: 'Awards ceremony', category: 'Events', title: 'Awards Ceremony' },
  { id: 8, src: null, alt: 'Team celebration', category: 'Events', title: 'Team Celebration' },
  { id: 9, src: null, alt: 'Youth football drill', category: 'Football', title: 'Youth Drill' },
  { id: 10, src: null, alt: 'Basketball dribbling drill', category: 'Basketball', title: 'Dribbling Drill' },
  { id: 11, src: null, alt: 'Volleyball spike practice', category: 'Volleyball', title: 'Spike Practice' },
  { id: 12, src: null, alt: 'German language workshop', category: 'German Classes', title: 'Language Workshop' },
];

export const galleryCategories = [
  'All',
  'Football',
  'Women\'s Football',
  'Basketball',
  'Volleyball',
  'Table Tennis',
  'German Classes',
  'Events',
];

export const students = {
  football: [
    { id: 1, name: 'Kenny', age: 14, position: 'Forward', image: null },
    { id: 2, name: 'Bruno', age: 16, position: 'Midfielder', image: null },
    { id: 3, name: 'Gad', age: 12, position: 'Goalkeeper', image: null },
    { id: 4, name: 'Kevin', age: 15, position: 'Defender', image: null },
  ],
  womenFootball: [
    { id: 1, name: 'Deborah', age: 16, position: 'Striker', image: null },
    { id: 2, name: 'queen', age: 15, position: 'Midfielder', image: null },
    { id: 3, name: 'Raissa', age: 17, position: 'Defender', image: null },
    { id: 4, name: 'honnete', age: 14, position: 'Goalkeeper', image: null },
  ],
  basketball: [
    { id: 1, name: 'Paul', age: 16, position: 'Point Guard', image: null },
    { id: 2, name: 'Beker', age: 17, position: 'Power Forward', image: null },
    { id: 3, name: 'Ntwari', age: 15, position: 'Shooting Guard', image: null },
    { id: 4, name: 'Nele', age: 14, position: 'Center', image: null },
  ],
  volleyball: [
    { id: 1, name: 'fabrice', age: 16, position: 'Outside Hitter', image: null },
    { id: 2, name: 'domy', age: 15, position: 'Setter', image: null },
    { id: 3, name: 'thierry', age: 17, position: 'Middle Blocker', image: null },
    { id: 4, name: 'fab', age: 14, position: 'Libero', image: null },
  ],
  tableTennis: [
    { id: 1, name: 'Bruno', age: 15, position: 'Right Hand Shake', image: null },
    { id: 2, name: 'James', age: 16, position: 'Left Hand Penhold', image: null },
    { id: 3, name: 'eric', age: 14, position: 'Right Hand Shake', image: null },
    { id: 4, name: 'answaru', age: 17, position: 'Right Hand Shake', image: null },
  ],
};

export const ageGroups = [
  {
    title: 'U6 - U10',
    age: 'Ages 6-10',
    description: 'Introduction to football fundamentals through fun activities. Focus on basic motor skills, coordination, and love for the game.',
    titleKey: 'football.ageGroups.groups.u6u10.title',
    ageKey: 'football.ageGroups.groups.u6u10.age',
    descriptionKey: 'football.ageGroups.groups.u6u10.description',
    highlights: ['Basic ball control', 'Fun drills & games', 'Teamwork basics', 'Weekly sessions'],
    highlightKeys: ['football.ageGroups.groups.u6u10.highlights.0', 'football.ageGroups.groups.u6u10.highlights.1', 'football.ageGroups.groups.u6u10.highlights.2', 'football.ageGroups.groups.u6u10.highlights.3'],
  },
  {
    title: 'U11 - U15',
    age: 'Ages 11-15',
    description: 'Advanced skill development with increased tactical awareness. Players begin position-specific training.',
    titleKey: 'football.ageGroups.groups.u11u15.title',
    ageKey: 'football.ageGroups.groups.u11u15.age',
    descriptionKey: 'football.ageGroups.groups.u11u15.description',
    highlights: ['Technical skills', 'Tactical awareness', 'Position training', 'Competitive matches'],
    highlightKeys: ['football.ageGroups.groups.u11u15.highlights.0', 'football.ageGroups.groups.u11u15.highlights.1', 'football.ageGroups.groups.u11u15.highlights.2', 'football.ageGroups.groups.u11u15.highlights.3'],
  },
  {
    title: 'U16 - U20',
    age: 'Ages 16-20',
    description: 'Elite level preparation for professional football. Advanced tactics, strength conditioning, and match preparation.',
    titleKey: 'football.ageGroups.groups.u16u20.title',
    ageKey: 'football.ageGroups.groups.u16u20.age',
    descriptionKey: 'football.ageGroups.groups.u16u20.description',
    highlights: ['Elite training', 'Strength & conditioning', 'Match analysis', 'Scouting opportunities'],
    highlightKeys: ['football.ageGroups.groups.u16u20.highlights.0', 'football.ageGroups.groups.u16u20.highlights.1', 'football.ageGroups.groups.u16u20.highlights.2', 'football.ageGroups.groups.u16u20.highlights.3'],
  },
];

export const germanLevels = [
  { level: 'A1 - Beginner', description: 'No prior knowledge needed. Learn basic greetings, introductions, and simple conversations.', levelKey: 'germanClasses.levels.a1.level', descriptionKey: 'germanClasses.levels.a1.description' },
  { level: 'A2 - Elementary', description: 'Expand vocabulary and learn to communicate in everyday situations with simple phrases.', levelKey: 'germanClasses.levels.a2.level', descriptionKey: 'germanClasses.levels.a2.description' },
  { level: 'B1 - Intermediate', description: 'Independent language use. Discuss familiar topics and handle most travel situations.', levelKey: 'germanClasses.levels.b1.level', descriptionKey: 'germanClasses.levels.b1.description' },
  { level: 'B2 - Upper Intermediate', description: 'Fluently communicate with native speakers. Understand complex texts and express opinions.', levelKey: 'germanClasses.levels.b2.level', descriptionKey: 'germanClasses.levels.b2.description' },
];

export const contactInfo = {
  phone: '+250 789 123 456',
  email: 'info@esperancefc.com',
  address: 'GS kimisagara, Kigali, Rwanda',
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    whatsapp: '#',
  },
};