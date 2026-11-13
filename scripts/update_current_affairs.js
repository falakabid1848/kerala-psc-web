const fs = require('fs');
const path = require('path');

const newEntries = [
  {
    id: "ca-2026-11-13",
    date: "2026-11-13",
    display_date: "13 November 2026",
    year: 2026,
    month: "November 2026",
    month_slug: "2026-11",
    title: "World Kindness Day 2026: Kerala Responsible Tourism Mission Wins UN Tourism Sustainability Accolade",
    malayalam_title: "ലോക കാരുണ്യ ദിനം 2026: കേരള റെസ്‌പോൺസിബിൾ ടൂറിസം മിഷന് യു.എൻ. പുരസ്കാരം",
    category: "Kerala",
    summary: "On World Kindness Day (13 November), Kerala's pioneering Responsible Tourism (RT) Mission Society received global recognition from UN Tourism for its community-led sustainable tourism initiatives that empower local artisans, farmers, and women self-help groups across Kumarakom, Wayanad, and Maravanthuruthu.",
    key_points: [
      "World Kindness Day is observed globally on 13 November to promote goodwill and community harmony.",
      "Kerala Responsible Tourism Mission was established to foster sustainable tourism with grassroots community benefits.",
      "The 'STREET' project (Sustainable, Tangible, Responsible, Experiential, Ethnic Tourism) won praise for rural economic upliftment.",
      "Kerala is the first state in India to transform Responsible Tourism into an autonomous state-registered society."
    ],
    psc_potential_question: {
      question_text: "Which initiative of Kerala Tourism won the UN Tourism global recognition for community-led grassroots sustainable tourism?",
      options: [
        { id: "A", text: "Kerala Eco-Tourism Board" },
        { id: "B", text: "Kerala Responsible Tourism (RT) Mission Society" },
        { id: "C", text: "Malabar Heritage Circuit" },
        { id: "D", text: "Grand Kerala Shopping Festival" }
      ],
      correct_option: "B",
      explanation: "Kerala Responsible Tourism (RT) Mission was converted into an autonomous society to implement sustainable, eco-friendly, and community-empowering tourism initiatives like the STREET project across rural Kerala."
    },
    tags: ["#KeralaTourism", "#ResponsibleTourism", "#WorldKindnessDay", "#STREETProject"],
    is_trending: true
  },
  {
    id: "ca-2026-11-11",
    date: "2026-11-11",
    display_date: "11 November 2026",
    year: 2026,
    month: "November 2026",
    month_slug: "2026-11",
    title: "National Education Day: Kerala Launches AI-Assisted Smart Classrooms Across 2,000 Government Schools",
    malayalam_title: "ദേശീയ വിദ്യാഭ്യാസ ദിനം: കേരളത്തിലെ 2,000 സ്കൂളുകളിൽ എ.ഐ. അസിസ്റ്റഡ് സ്മാർട്ട് ക്ലാസ്റൂമുകൾ",
    category: "Kerala",
    summary: "Observed on 11 November to mark the birth anniversary of Maulana Abul Kalam Azad, independent India's first Education Minister, Kerala's General Education Department inaugurated phase 2 of the AI-integrated curriculum through KITE (Kerala Infrastructure and Technology for Education) across higher secondary schools.",
    key_points: [
      "National Education Day is celebrated every year on 11 November.",
      "Commemorates the birth anniversary of Bharat Ratna Maulana Abul Kalam Azad (first Union Minister of Education).",
      "KITE has trained over 80,000 high school teachers in ethical AI and educational prompting.",
      "Kerala is the first state in India to introduce generative AI basics in high school ICT textbooks."
    ],
    psc_potential_question: {
      question_text: "National Education Day is celebrated on 11 November in India to commemorate the birth anniversary of which visionary leader?",
      options: [
        { id: "A", text: "Dr. Sarvepalli Radhakrishnan" },
        { id: "B", text: "Maulana Abul Kalam Azad" },
        { id: "C", text: "Dr. B.R. Ambedkar" },
        { id: "D", text: "Zakir Husain" }
      ],
      correct_option: "B",
      explanation: "National Education Day is celebrated annually on 11 November to honor the birth anniversary of Maulana Abul Kalam Azad, independent India's first Education Minister who served from 1947 to 1958."
    },
    tags: ["#NationalEducationDay", "#MaulanaAbulKalamAzad", "#KITE", "#AIEducation"],
    is_trending: true
  },
  {
    id: "ca-2026-11-10",
    date: "2026-11-10",
    display_date: "10 November 2026",
    year: 2026,
    month: "November 2026",
    month_slug: "2026-11",
    title: "World Science Day for Peace & Development: Cochin Shipyard Delivers India's First Fully Autonomous Electric Cargo Ferry",
    malayalam_title: "ലോക ശാസ്ത്ര ദിനം: ആദ്യ സമ്പൂർണ്ണ ഓട്ടോണമസ് ഇലക്ട്രിക് ചരക്ക് ഫെറി കൊച്ചിൻ ഷിപ്പ്‌യാർഡ് കൈമാറി",
    category: "National",
    summary: "Marking World Science Day for Peace and Development (10 November), Cochin Shipyard Limited (CSL) delivered India's first zero-emission autonomous electric cargo vessel equipped with indigenously developed battery energy storage and AI navigation systems under the Sagarmala Green Fleet Initiative.",
    key_points: [
      "World Science Day for Peace and Development is observed annually on 10 November by UNESCO.",
      "Cochin Shipyard is a Miniratna Public Sector Undertaking established in 1972.",
      "The zero-emission cargo ferry operates on inland national waterways NW-3 (Kottapuram to Kollam).",
      "Reduces carbon emissions by over 1,200 metric tonnes annually compared to conventional diesel barges."
    ],
    psc_potential_question: {
      question_text: "Which shipyard developed India's first indigenous aircraft carrier INS Vikrant and zero-emission electric water metro vessels?",
      options: [
        { id: "A", text: "Mazagon Dock Shipbuilders Limited" },
        { id: "B", text: "Garden Reach Shipbuilders & Engineers" },
        { id: "C", text: "Cochin Shipyard Limited (CSL)" },
        { id: "D", text: "Hindustan Shipyard Limited" }
      ],
      correct_option: "C",
      explanation: "Cochin Shipyard Limited (CSL), located in Kochi, built India's first indigenous aircraft carrier INS Vikrant as well as pioneering electric water metro boats and green inland vessels."
    },
    tags: ["#WorldScienceDay", "#CochinShipyard", "#WaterMetro", "#GreenHydrogen"],
    is_trending: false
  },
  {
    id: "ca-2026-11-09",
    date: "2026-11-09",
    display_date: "9 November 2026",
    year: 2026,
    month: "November 2026",
    month_slug: "2026-11",
    title: "National Legal Services Day: KELSA Achieves Record Disposal of Over 1.2 Lakh Pre-Litigation Disputes in Mega Lok Adalat",
    malayalam_title: "ദേശീയ നിയമ സേവന ദിനം: മെഗാ ലോക് അദാലത്തിലൂടെ 1.2 ലക്ഷം കേസുകൾ തീർപ്പാക്കി കെൽസ",
    category: "Kerala",
    summary: "On National Legal Services Day (9 November), Kerala State Legal Services Authority (KELSA) recorded an all-time high settlement of 1,20,000 disputes through statewide hybrid National Lok Adalats organized in High Court benches, district courts, and taluk legal services committees.",
    key_points: [
      "National Legal Services Day was established to commemorate the enactment of the Legal Services Authorities Act, 1987.",
      "The Legal Services Authorities Act came into force on 9 November 1995.",
      "Constitutional mandate under Article 39A guarantees free legal aid and equal justice to economically weaker sections.",
      "Patron-in-Chief of KELSA is the Chief Justice of the High Court of Kerala."
    ],
    psc_potential_question: {
      question_text: "Which Article of the Constitution of India provides for 'Equal justice and free legal aid' to all citizens?",
      options: [
        { id: "A", text: "Article 32" },
        { id: "B", text: "Article 39A" },
        { id: "C", text: "Article 44" },
        { id: "D", text: "Article 51A" }
      ],
      correct_option: "B",
      explanation: "Article 39A was inserted into the Directive Principles of State Policy (DPSP) by the 42nd Constitutional Amendment Act, 1976, directing the State to provide free legal aid by suitable legislation or schemes."
    },
    tags: ["#LegalServicesDay", "#KELSA", "#Article39A", "#LokAdalat"],
    is_trending: false
  },
  {
    id: "ca-2026-11-07",
    date: "2026-11-07",
    display_date: "7 November 2026",
    year: 2026,
    month: "November 2026",
    month_slug: "2026-11",
    title: "National Cancer Awareness Day: Regional Cancer Centre (RCC) Thiruvananthapuram Expands CyberKnife Robotic Radiosurgery",
    malayalam_title: "ദേശീയ കാൻസർ ബോധവൽക്കരണ ദിനം: ആർ.സി.സി.യിൽ സൈബർ നൈഫ് റോബോട്ടിക് റേഡിയോ സർജറി",
    category: "Kerala",
    summary: "Observed annually on 7 November to coincide with the birth anniversary of Nobel laureate Madame Marie Curie, Kerala's Regional Cancer Centre (RCC) launched advanced robotic radiation oncology suites ensuring ultra-precision treatment for pediatric and neurological oncology patients free of cost under KASP.",
    key_points: [
      "National Cancer Awareness Day was first announced by Union Health Minister Dr. Harsh Vardhan in September 2014.",
      "Marie Curie won the Nobel Prize twice (Physics in 1903 and Chemistry in 1911) for her groundbreaking work on radioactivity.",
      "RCC Thiruvananthapuram was established in 1981 as an autonomous center of excellence.",
      "KASP (Karunya Arogya Suraksha Padhathi) covers tertiary cancer treatment across Kerala government empanelled hospitals."
    ],
    psc_potential_question: {
      question_text: "National Cancer Awareness Day on 7 November commemorates the birth anniversary of which legendary scientist?",
      options: [
        { id: "A", text: "Alexander Fleming" },
        { id: "B", text: "Marie Curie" },
        { id: "C", text: "Louis Pasteur" },
        { id: "D", text: "Edward Jenner" }
      ],
      correct_option: "B",
      explanation: "National Cancer Awareness Day is observed on 7 November in memory of Madame Marie Curie, whose discoveries of radium and polonium laid the foundation of nuclear medicine and radiotherapy."
    },
    tags: ["#NationalCancerAwarenessDay", "#MarieCurie", "#RCC", "#KASP"],
    is_trending: false
  },
  {
    id: "ca-2026-10-24",
    date: "2026-10-24",
    display_date: "24 October 2026",
    year: 2026,
    month: "October 2026",
    month_slug: "2026-10",
    title: "United Nations Day 2026: UN Commemorates 81st Anniversary of the UN Charter",
    malayalam_title: "ഐക്യരാഷ്ട്ര ദിനം 2026: യു.എൻ. ചാർട്ടറിന്റെ 81-ാം വാർഷികം ആഘോഷിച്ചു",
    category: "International",
    summary: "United Nations Day marks the anniversary of the entry into force of the UN Charter in 1945. India is one of the original 51 founding member nations that signed the United Nations Charter at the San Francisco Conference.",
    key_points: [
      "The UN Charter came into force on 24 October 1945.",
      "Headquarters of the United Nations is situated in New York City, USA.",
      "India signed the UN Declaration in Washington on 1 January 1942 and was represented by Sir A. Ramaswami Mudaliar in 1945.",
      "Official languages of the UN: Arabic, Chinese, English, French, Russian, and Spanish (6 languages)."
    ],
    psc_potential_question: {
      question_text: "Who led the Indian delegation that signed the United Nations Charter at the San Francisco Conference in 1945?",
      options: [
        { id: "A", text: "Jawaharlal Nehru" },
        { id: "B", text: "Sir A. Ramaswami Mudaliar" },
        { id: "C", text: "V.K. Krishna Menon" },
        { id: "D", text: "Sarojini Naidu" }
      ],
      correct_option: "B",
      explanation: "Sir Arcot Ramaswami Mudaliar led the Indian delegation to the historic San Francisco Conference in 1945 and signed the UN Charter on behalf of India."
    },
    tags: ["#UNDay", "#UnitedNations", "#UNCharter", "#InternationalOrganizations"],
    is_trending: false
  },
  {
    id: "ca-2026-10-16",
    date: "2026-10-16",
    display_date: "16 October 2026",
    year: 2026,
    month: "October 2026",
    month_slug: "2026-10",
    title: "World Food Day 2026: Kerala Subhiksha Keralam Crosses 1.5 Lakh Hectares of Fallow Land Farming",
    malayalam_title: "ലോക ഭക്ഷ്യ ദിനം 2026: സുഭിക്ഷ കേരളം പദ്ധതിയിലൂടെ തരിശുഭൂമി കൃഷിയിൽ പുതിയ നേട്ടം",
    category: "Kerala",
    summary: "Marking World Food Day (16 October), celebrated by the Food and Agriculture Organization (FAO) of the United Nations, Kerala's Agriculture Department honored farming cooperatives and Kudumbashree groups that revitalized barren lands under the Subhiksha Keralam integrated food security project.",
    key_points: [
      "World Food Day commemorates the founding date of the Food and Agriculture Organization (FAO) in 1945 at Quebec, Canada.",
      "Headquarters of FAO is in Rome, Italy.",
      "Subhiksha Keralam promotes multi-tier integrated farming (Paddy, Vegetables, Animal Husbandry, Fisheries).",
      "Kudumbashree's 'Joint Liability Groups' (JLGs) cultivate over 50,000 hectares of fallow land in Kerala."
    ],
    psc_potential_question: {
      question_text: "Where is the global headquarters of the Food and Agriculture Organization (FAO) located?",
      options: [
        { id: "A", text: "Geneva, Switzerland" },
        { id: "B", text: "Rome, Italy" },
        { id: "C", text: "Paris, France" },
        { id: "D", text: "Vienna, Austria" }
      ],
      correct_option: "B",
      explanation: "The Food and Agriculture Organization (FAO) of the United Nations has its permanent headquarters in Rome, Italy. It was founded on 16 October 1945."
    },
    tags: ["#WorldFoodDay", "#FAO", "#SubhikshaKeralam", "#Kudumbashree"],
    is_trending: false
  },
  {
    id: "ca-2026-09-15",
    date: "2026-09-15",
    display_date: "15 September 2026",
    year: 2026,
    month: "September 2026",
    month_slug: "2026-09",
    title: "National Engineers Day: Kerala Digital University Inks Quantum Technology Research Pact with C-DAC",
    malayalam_title: "ദേശീയ എൻജിനീയേഴ്സ് ദിനം: ഡിജിറ്റൽ യൂണിവേഴ്സിറ്റിയും സി-ഡാക്കും തമ്മിൽ ക്വാണ്ടം ഗവേഷണ ധാരണാപത്രം",
    category: "Kerala",
    summary: "Observed on 15 September in tribute to Bharat Ratna Sir M. Visvesvaraya, India's first digital university—Digital University Kerala (DUK, Technocity Mangalapuram)—signed a tripartite agreement with C-DAC and ISRO for supercomputing and cryogenic quantum computing simulations.",
    key_points: [
      "National Engineers Day commemorates the birth anniversary of Sir Mokshagundam Visvesvaraya (born 15 September 1861).",
      "Sir M. Visvesvaraya designed the Krishna Raja Sagara (KRS) dam across the Kaveri in Karnataka.",
      "Digital University Kerala (DUK) was upgraded from IIITM-K in 2020 by the Government of Kerala.",
      "Located at Technocity, Mangalapuram, Thiruvananthapuram."
    ],
    psc_potential_question: {
      question_text: "India celebrates National Engineers Day on 15 September in memory of which eminent engineer and statesman?",
      options: [
        { id: "A", text: "Dr. A.P.J. Abdul Kalam" },
        { id: "B", text: "Sir M. Visvesvaraya" },
        { id: "C", text: "E. Sreedharan" },
        { id: "D", text: "Satish Dhawan" }
      ],
      correct_option: "B",
      explanation: "National Engineers Day is celebrated every year on 15 September to commemorate the birth anniversary of Bharat Ratna Sir M. Visvesvaraya (1861–1962), revered as India's preeminent civil engineer."
    },
    tags: ["#EngineersDay", "#Visvesvaraya", "#DigitalUniversityKerala", "#CDAC"],
    is_trending: false
  },
  {
    id: "ca-2026-08-29",
    date: "2026-08-29",
    display_date: "29 August 2026",
    year: 2026,
    month: "August 2026",
    month_slug: "2026-08",
    title: "National Sports Day 2026: Kerala Government Awards G.V. Raja Sports Awards at Jimmy George Stadium",
    malayalam_title: "ദേശീയ കായിക ദിനം: ജി.വി. രാജ പുരസ്കാരങ്ങൾ തിരുവനന്തപുരത്ത് സമ്മാനിച്ചു",
    category: "Sports",
    summary: "Celebrated on 29 August in honor of hockey legend Major Dhyan Chand's birth anniversary, the Kerala State Sports Council conferred the prestigious G.V. Raja Award, the highest sporting honor instituted by the Kerala Government, acknowledging outstanding national and international medal winners.",
    key_points: [
      "National Sports Day is celebrated every year on 29 August to honor Major Dhyan Chand (The Wizard of Hockey).",
      "Major Dhyan Chand led India to Olympic Gold medals in 1928 (Amsterdam), 1932 (Los Angeles), and 1936 (Berlin).",
      "Colonel Goda Varma Raja (G.V. Raja) is considered the 'Father of Kerala Sports and Tourism'.",
      "G.V. Raja Award carries a cash prize of ₹3 lakh, a citation, and a statuette."
    ],
    psc_potential_question: {
      question_text: "Who is revered as the 'Father of Sports and Tourism in Kerala' after whom the highest sports award of Kerala is named?",
      options: [
        { id: "A", text: "Jimmy George" },
        { id: "B", text: "Col. Goda Varma Raja (G.V. Raja)" },
        { id: "C", text: "P.T. Usha" },
        { id: "D", text: "K.P. Thomas" }
      ],
      correct_option: "B",
      explanation: "Colonel Goda Varma Raja (G.V. Raja), prince consort of Travancore Maharani Karthika Thirunal Lakshmi Bayi, is revered as the father of sports and modern tourism in Kerala. The G.V. Raja Award is Kerala's highest sporting accolade."
    },
    tags: ["#NationalSportsDay", "#MajorDhyanChand", "#GVRajaAward", "#KeralaSports"],
    is_trending: false
  },
  {
    id: "ca-2026-06-05",
    date: "2026-06-05",
    display_date: "5 June 2026",
    year: 2026,
    month: "June 2026",
    month_slug: "2026-06",
    title: "World Environment Day 2026: Haritha Keralam Mission Launches 100% Green Campus Protocol Across Kerala",
    malayalam_title: "ലോക പരിസ്ഥിതി ദിനം 2026: ഹരിത കേരളം മിഷൻ പുതിയ ഗ്രീൻ കാമ്പസ് പ്രോട്ടോക്കോൾ പുറത്തിറക്കി",
    category: "Kerala",
    summary: "On World Environment Day (5 June), Haritha Keralam Mission and Suchitwa Mission instituted mandatory Green Campus certifications across all universities, technical colleges, and collectorates, featuring decentralised waste management and Miyawaki urban micro-forests.",
    key_points: [
      "World Environment Day was established by the UN General Assembly on 5 June 1972 at the Stockholm Conference on Human Environment.",
      "Haritha Keralam Mission integrates water conservation (Jalasamridhi), sanitation (Malinya Muktham), and organic farming.",
      "Suchitwa Mission serves as the nodal agency for sanitation and waste management in Kerala.",
      "Haritha Karma Sena collects segregated non-biodegradable plastic waste at the household level across all local bodies."
    ],
    psc_potential_question: {
      question_text: "The historic United Nations Conference on the Human Environment that led to the declaration of World Environment Day (5 June) was held at which city in 1972?",
      options: [
        { id: "A", text: "Rio de Janeiro" },
        { id: "B", text: "Stockholm" },
        { id: "C", text: "Kyoto" },
        { id: "D", text: "Paris" }
      ],
      correct_option: "B",
      explanation: "The 1972 United Nations Conference on the Human Environment held in Stockholm, Sweden, designated 5 June as World Environment Day to stimulate worldwide awareness and political action for environmental preservation."
    },
    tags: ["#WorldEnvironmentDay", "#HarithaKeralam", "#Stockholm1972", "#HarithaKarmaSena"],
    is_trending: false
  }
];

function updateCurrentAffairs() {
  const targetFiles = [
    path.resolve('/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/apps/student-quiz-web/data/current_affairs.json'),
    path.resolve('/Users/abidkt/.gemini/antigravity/scratch/kerala-psc-quiz/data/current_affairs.json')
  ];

  for (const filePath of targetFiles) {
    if (fs.existsSync(filePath)) {
      console.log(`Updating ${filePath}...`);
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const existingIds = new Set(existing.map(e => e.id));

      const itemsToAdd = newEntries.filter(e => !existingIds.has(e.id));
      console.log(`Adding ${itemsToAdd.length} new current affairs items.`);

      // Prepend newest entries so they appear chronologically at top
      const updated = [...itemsToAdd, ...existing];
      // Sort descending by date
      updated.sort((a, b) => b.date.localeCompare(a.date));

      fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), 'utf-8');
      console.log(`Successfully updated ${filePath}. Total entries now: ${updated.length}`);
    } else {
      console.log(`File not found: ${filePath}`);
    }
  }
}

updateCurrentAffairs();
