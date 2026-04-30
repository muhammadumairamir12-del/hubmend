// ══════════════════════════════════════
// HUBMEND — MOCK DATA
// Replace with Firebase Firestore calls
// ══════════════════════════════════════

const COLORS = ['#0A2463','#1E3A8A','#0D9488','#7C3AED','#DB2777','#D97706','#059669','#DC2626'];

const VENDORS = [
  { id:1, name:'Dr. Ayesha Malik', initials:'AM', title:'MBBS, FCPS — General Physician', category:'Medical', city:'Lahore', rating:4.9, reviews:312, bookings:890, price:2000, bio:'15+ years of clinical experience. Specialist in internal medicine and preventive care. Available for online and in-person consultations.', type:'both', verified:true, top:true, color:'#0A2463', tags:['Online','In-Person','Emergency'] },
  { id:2, name:'Usman Tariq', initials:'UT', title:'Licensed Electrician — 10 Years Exp', category:'Home Services', city:'Karachi', rating:4.8, reviews:201, bookings:534, price:1500, bio:'Expert in residential and commercial electrical work. Available 24/7 for emergencies. All work comes with 30-day guarantee.', type:'both', verified:true, top:false, color:'#D97706', tags:['Emergency','Guaranteed','24/7'] },
  { id:3, name:'Advocate Sana Rizvi', initials:'SR', title:'LLB — Corporate & Family Law', category:'Legal', city:'Islamabad', rating:4.7, reviews:89, bookings:210, price:5000, bio:'10 years of legal practice. Specializing in corporate law, family disputes, and property cases. Free initial consultation.', type:'fixed', verified:true, top:false, color:'#7C3AED', tags:['Free Consult','Property','Corporate'] },
  { id:4, name:'Eng. Bilal Hussain', initials:'BH', title:'Civil Engineer — Structures & Design', category:'Engineering', city:'Faisalabad', rating:4.9, reviews:156, bookings:320, price:8000, bio:'Structural engineer with 12 years experience in residential and commercial projects. Licensed by PEC.', type:'both', verified:true, top:true, color:'#059669', tags:['PEC Licensed','Structural','Commercial'] },
  { id:5, name:'Zara Ahmed', initials:'ZA', title:'UI/UX & Graphic Designer', category:'Design', city:'Lahore', rating:4.8, reviews:445, bookings:678, price:3000, bio:'Award-winning designer with 8 years of experience. Worked with 50+ brands across Pakistan and UAE.', type:'bid', verified:true, top:false, color:'#DB2777', tags:['Branding','UI/UX','Logos'] },
  { id:6, name:'Ahmed Khan', initials:'AK', title:'Expert Plumber — All Services', category:'Home Services', city:'Multan', rating:4.6, reviews:178, bookings:412, price:800, bio:'Professional plumbing services for residential and commercial properties. Pipe fitting, leak repair, bathroom installation.', type:'both', verified:true, top:false, color:'#0D9488', tags:['Leak Repair','Installation','Fast'] },
  { id:7, name:'Prof. Nadia Hassan', initials:'NH', title:'Mathematics & Physics Tutor', category:'Education', city:'Rawalpindi', rating:5.0, reviews:234, bookings:567, price:1200, bio:'10 years of teaching experience. PhD in Mathematics. Specializing in O/A-level and university level students.', type:'fixed', verified:true, top:true, color:'#DC2626', tags:['O-Level','A-Level','University'] },
  { id:8, name:'Imran Sheikh', initials:'IS', title:'Full Stack Developer — React/Node', category:'Technology', city:'Karachi', rating:4.7, reviews:112, bookings:289, price:5000, bio:'5+ years in web and mobile development. Built 40+ projects. Expertise in React, Node.js, Firebase, and React Native.', type:'bid', verified:true, top:false, color:'#1E3A8A', tags:['React','Node.js','Mobile Apps'] },
  { id:9, name:'CA Farhan Ali', initials:'FA', title:'Chartered Accountant — Tax & Finance', category:'Finance', city:'Lahore', rating:4.8, reviews:67, bookings:145, price:4000, bio:'ICAP member. 8 years in taxation, audit, and financial planning. GST, income tax, corporate filings.', type:'fixed', verified:true, top:false, color:'#0A2463', tags:['Tax Filing','GST','Audit'] },
  { id:10, name:'Dr. Hamid Nawaz', initials:'HN', title:'Pediatrician — Child Specialist', category:'Medical', city:'Peshawar', rating:4.9, reviews:289, bookings:720, price:2500, bio:'MBBS, DCH. 18 years of experience. Specialist in child health, vaccination, and growth monitoring.', type:'fixed', verified:true, top:false, color:'#059669', tags:['Children','Vaccination','Online'] },
  { id:11, name:'Rizwan Carpenter', initials:'RC', title:'Master Carpenter & Furniture Maker', category:'Home Services', city:'Quetta', rating:4.5, reviews:98, bookings:210, price:1000, bio:'20+ years making custom furniture and doing woodwork. Kitchens, wardrobes, doors, and more.', type:'both', verified:true, top:false, color:'#D97706', tags:['Custom','Kitchen','Wardrobes'] },
  { id:12, name:'Sara Malik', initials:'SM', title:'Interior Designer — Residential & Commercial', category:'Design', city:'Islamabad', rating:4.8, reviews:134, bookings:198, price:10000, bio:'Award-winning interior designer. Transformed 100+ homes and offices across Pakistan.', type:'bid', verified:false, top:false, color:'#DB2777', tags:['Residential','3D Design','Renovation'] },
];

const BOOKINGS_DATA = [
  { id:'BK-001', customer:'Fatima Zahra', vendor:'Dr. Ayesha Malik', service:'Medical Consultation', amount:'Rs. 2,000', status:'completed', date:'2026-04-28' },
  { id:'BK-002', customer:'Omar Farooq', vendor:'Usman Tariq', service:'Electrical Repair', amount:'Rs. 1,500', status:'active', date:'2026-04-29' },
  { id:'BK-003', customer:'Aisha Bibi', vendor:'Advocate Sana Rizvi', service:'Legal Consultation', amount:'Rs. 5,000', status:'pending', date:'2026-04-30' },
  { id:'BK-004', customer:'Tariq Mehmood', vendor:'Eng. Bilal Hussain', service:'Construction Design', amount:'Rs. 8,000', status:'active', date:'2026-04-27' },
  { id:'BK-005', customer:'Mehreen Khan', vendor:'Zara Ahmed', service:'Logo Design', amount:'Rs. 3,500', status:'completed', date:'2026-04-26' },
  { id:'BK-006', customer:'Shahzad Ali', vendor:'Ahmed Khan', service:'Plumbing Fix', amount:'Rs. 1,000', status:'cancelled', date:'2026-04-25' },
];

const VENDORS_TABLE_DATA = [
  { name:'Dr. Ayesha Malik', category:'Medical', city:'Lahore', rating:'4.9★', bookings:890, status:'active' },
  { name:'Usman Tariq', category:'Home Services', city:'Karachi', rating:'4.8★', bookings:534, status:'active' },
  { name:'New Vendor (Pending)', category:'Technology', city:'Lahore', rating:'New', bookings:0, status:'pending' },
  { name:'Advocate Sana Rizvi', category:'Legal', city:'Islamabad', rating:'4.7★', bookings:210, status:'active' },
  { name:'Suspended User', category:'Design', city:'Karachi', rating:'2.1★', bookings:12, status:'banned' },
];

const PAYMENTS_DATA = [
  { id:'TXN-001', vendor:'Dr. Ayesha Malik', amount:'Rs. 2,000', cut:'Rs. 300', method:'Raast', status:'released' },
  { id:'TXN-002', vendor:'Usman Tariq', amount:'Rs. 1,500', cut:'Rs. 225', method:'NayaPay', status:'in-escrow' },
  { id:'TXN-003', vendor:'Eng. Bilal Hussain', amount:'Rs. 8,000', cut:'Rs. 1,200', method:'Raast', status:'released' },
  { id:'TXN-004', vendor:'Zara Ahmed', amount:'Rs. 3,500', cut:'Rs. 525', method:'JazzCash', status:'released' },
  { id:'TXN-005', vendor:'Prof. Nadia Hassan', amount:'Rs. 1,200', cut:'Rs. 180', method:'Raast', status:'in-escrow' },
];

const DISPUTES_DATA = [
  { id:'DSP-001', title:'Work not completed — Plumbing', customer:'Shahzad Ali', vendor:'Ahmed Khan', amount:'Rs. 1,000', reason:'Vendor left midway through the job. Pipe still leaking.', date:'2026-04-25' },
  { id:'DSP-002', title:'Quality issue — Electrical', customer:'Sara Noor', vendor:'Usman Tariq', amount:'Rs. 1,500', reason:'Short circuit happened 2 days after electrical work. Needs redo.', date:'2026-04-27' },
];

const BIDS_DATA = [
  { title:'Website Development for Restaurant', customer:'Kamran Foods', budget:'Rs. 50,000', bids:7, status:'open' },
  { title:'Interior Design — 3 Bedroom Apartment', customer:'Hina Malik', budget:'Rs. 120,000', bids:4, status:'open' },
  { title:'Legal Help — Property Dispute', customer:'Tariq Hussain', budget:'Rs. 15,000', bids:2, status:'open' },
  { title:'Logo + Brand Identity', customer:'TechStart PK', budget:'Rs. 8,000', bids:11, status:'closing' },
];

const CUSTOMERS_DATA = [
  { name:'Fatima Zahra', email:'fatima@email.com', city:'Lahore', bookings:8, joined:'Jan 2026', status:'active' },
  { name:'Omar Farooq', email:'omar@email.com', city:'Karachi', bookings:3, joined:'Feb 2026', status:'active' },
  { name:'Aisha Bibi', email:'aisha@email.com', city:'Islamabad', bookings:1, joined:'Apr 2026', status:'active' },
  { name:'Tariq Mehmood', email:'tariq@email.com', city:'Faisalabad', bookings:12, joined:'Nov 2025', status:'active' },
];
