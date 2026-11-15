import { Question } from '@/types';

// Deterministic Pseudo-Random Number Generator (PRNG) based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const CATEGORIES = [
  'Kerala History & Culture',
  'Indian Polity & Constitution',
  'Geography of Kerala & India',
  'General Science & Technology',
  'Malayalam Language & Literature',
  'Current Affairs & Schemes',
  'Banking & Financial Awareness',
  'Quantitative Aptitude & Mental Ability',
  'General English',
  'Information Technology & Cyber Laws'
];

const KERALA_TOPICS = [
  { name: 'ശ്രീനാരായണഗുരു', facts: ['1888-ൽ അരുവിപ്പുറം പ്രതിഷ്ഠ നടത്തി.', '1903-ൽ SNDP യോഗം സ്ഥാപിതമായി.', '1924-ൽ ആലുവ സർവ്വമത സമ്മേളനം സംഘടിപ്പിച്ചു.'] },
  { name: 'അയ്യങ്കാളി', facts: ['1893-ൽ വില്ലുവണ്ടി സമരം നയിച്ചു.', '1907-ൽ സാധുജന പരിപാലന സംഘം രൂപീകരിച്ചു.', '1915-ൽ കല്ലുമാല സമരം നയിച്ചു.'] },
  { name: 'ചട്ടമ്പിസ്വാമികൾ', facts: ['വേദാധികാര നിരൂപണം, പ്രാചീന മലയാളം എന്നീ ഗ്രന്ഥങ്ങൾ രചിച്ചു.', 'കണ്ണമ്മൂലയിൽ ജനിച്ചു; പന്മനയിൽ സമാധിയായി.', 'ജാതിവ്യവസ്ഥയ്ക്കെതിരെ ശക്തമായി പോരാടി.'] },
  { name: 'വൈക്കം സത്യാഗ്രഹം', facts: ['1924 മാർച്ച് 30-ന് ആരംഭിച്ചു.', 'സഞ്ചാരസ്വാതന്ത്ര്യത്തിനായുള്ള പോരാട്ടമായിരുന്നു.', 'ഗാന്ധിജി 1925-ൽ സന്ദർശനം നടത്തി.'] },
  { name: 'ക്ഷേത്രപ്രവേശന വിളംബരം', facts: ['1936 നവംബർ 12-ന് ശ്രീചിത്തിര തിരുനാൾ പുറപ്പെടുവിച്ചു.', 'ആധുനിക കാലത്തെ അത്ഭുതമെന്ന് ഗാന്ധിജി വിശേഷിപ്പിച്ചു.', 'ദിവാൻ സർ സി.പി. രാമസ്വാമി അയ്യർ പ്രധാന പങ്കുവഹിച്ചു.'] },
  { name: 'കുളച്ചൽ യുദ്ധം', facts: ['1741 ആഗസ്റ്റ് 10-ന് മാർത്താണ്ഡവർമ്മ ഡച്ച് സൈന്യത്തെ തോൽപ്പിച്ചു.', 'ഡച്ച് കമാൻഡർ ഡിലനോയ് തിരുവിതാംകൂറിന് കീഴടങ്ങി.', 'ഏഷ്യയിൽ ഒരു യൂറോപ്യൻ ശക്തിയെ പരാജയപ്പെടുത്തിയ അപൂർവ്വ യുദ്ധം.'] }
];

const POLITY_TOPICS = [
  { name: 'ഭരണഘടനാ നിർമ്മാണ സഭ', facts: ['1946 ഡിസംബർ 9-ന് ആദ്യ യോഗം ചേർന്നു.', 'ഡോ. രാജേന്ദ്രപ്രസാദ് സ്ഥിരം അധ്യക്ഷനായിരുന്നു.', 'ഡ്രാഫ്റ്റിംഗ് കമ്മിറ്റി ചെയർമാൻ ബി.ആർ. അംബേദ്കറായിരുന്നു.'] },
  { name: 'മൗലികാവകാശങ്ങൾ', facts: ['അനുച്ഛേദം 12 മുതൽ 35 വരെ പ്രതിപാദിക്കുന്നു.', 'അനുച്ഛേദം 32 പ്രകാരം സുപ്രീം കോടതി റിട്ടുകൾ പുറപ്പെടുവിക്കുന്നു.', 'അനുച്ഛേദം 21 ജീവനും വ്യക്തിസ്വാതന്ത്ര്യത്തിനും സംരക്ഷണം നൽകുന്നു.'] },
  { name: 'നിർദ്ദേശക തത്ത്വങ്ങൾ', facts: ['അയർലണ്ട് ഭരണഘടനയിൽ നിന്ന് കടമെടുത്തു.', 'അനുച്ഛേദം 40 ഗ്രാമപഞ്ചായത്തുകളുടെ രൂപീകരണത്തെക്കുറിച്ച് പറയുന്നു.', 'അനുച്ഛേദം 44 ഏകീകൃത സിവിൽ കോഡിനെക്കുറിച്ച് നിർദ്ദേശിക്കുന്നു.'] },
  { name: 'പാർലമെന്റ് & ലോക്‌സഭ', facts: ['ധനബിൽ (Money Bill) ലോക്‌സഭയിൽ മാത്രമേ ആദ്യം അവതരിപ്പിക്കാവൂ.', 'സംയുക്ത സമ്മേളനത്തിൽ സ്പീക്കർ അധ്യക്ഷത വഹിക്കുന്നു.', 'അനുച്ഛേദം 110 പ്രകാരം ധനബിൽ സാക്ഷ്യപ്പെടുത്തുന്നത് സ്പീക്കറാണ്.'] }
];

const SCIENCE_TOPICS = [
  { name: 'ന്യൂട്ടന്റെ ചലനനിയമങ്ങൾ', facts: ['ഒന്നാം നിയമം ജഡത്വത്തെയും ബലത്തിന്റെ നിർവ്വചനത്തെയും വ്യക്തമാക്കുന്നു.', 'രണ്ടാം നിയമം അനുസരിച്ച് F = ma.', 'മൂന്നാം നിയമം അനുസരിച്ച് ഓരോ പ്രവർത്തനത്തിനും തുല്യവും വിപരീതവുമായ പ്രതിപ്രവർത്തനമുണ്ട്.'] },
  { name: 'പ്രകാശശാസ്ത്രം', facts: ['പൂർണ്ണ ആന്തര പ്രതിഫലനം ഒപ്റ്റിക്കൽ ഫൈബറിൽ പ്രയോജനപ്പെടുത്തുന്നു.', 'ഹ്രസ്വദൃഷ്ടിക്ക് കോൺകേവ് ലെൻസും ദീർഘദൃഷ്ടിക്ക് കോൺവെക്സ് ലെൻസും ഉപയോഗിക്കുന്നു.', 'ആകാശത്തിന്റെ നീലനിറത്തിന് കാരണം പ്രകാശ വിസരണമാണ്.'] },
  { name: 'രക്തചംക്രമണ വ്യവസ്ഥ', facts: ['വില്യം ഹാർവി 1628-ൽ രക്തചംക്രമണം കണ്ടെത്തി.', 'സാർവ്വത്രിക ദാതാവ് O നെഗറ്റീവ് ആണ്.', 'ഹൃദയത്തിന്റെ പേസ്മേക്കർ വലത് എട്രിയത്തിലെ SA Node ആണ്.'] }
];

export function generateSyntheticQuestion(index: number, categoryFilter?: string | null, typeFilter?: string | null): Question {
  const seed = index + 1001;
  const cat = categoryFilter && categoryFilter !== 'All' 
    ? categoryFilter 
    : CATEGORIES[Math.floor(seededRandom(seed) * CATEGORIES.length)];

  const isStatement = typeFilter === 'statement' || (typeFilter !== 'mcq' && seededRandom(seed + 1) > 0.45);
  const year = 2024 + Math.floor(seededRandom(seed + 2) * 3); // 2024, 2025, or 2026

  let topicPool = KERALA_TOPICS;
  if (cat.includes('Polity')) topicPool = POLITY_TOPICS;
  else if (cat.includes('Science')) topicPool = SCIENCE_TOPICS;

  const topic = topicPool[Math.floor(seededRandom(seed + 3) * topicPool.length)];

  if (isStatement) {
    const s1 = `1. ${topic.facts[0]}`;
    const s2 = `2. ${topic.facts[1]}`;
    const s3 = `3. ${topic.facts[2]}`;

    return {
      id: `KPSC-SYN-${index}`,
      year,
      category: cat,
      sub_category: 'പ്രധാന പരീക്ഷാ ചോദ്യങ്ങൾ',
      exam_name: 'Kerala PSC Degree Level Preliminary / Mains 2025-2026',
      exam_code: 'DLP-SYN/2026',
      language: 'ml',
      question_type: 'statement',
      question_text: `'${topic.name}' എന്ന വിഷയവുമായി ബന്ധപ്പെട്ട താഴെ പറയുന്ന പ്രസ്താവനകൾ പരിശോധിച്ച് ശരിയായവ കണ്ടെത്തുക:`,
      statements: [s1, s2, s3],
      options: [
        { id: 'A', text: '1, 2 എന്നിവ മാത്രം ശരിയാണ്' },
        { id: 'B', text: '1, 2, 3 എന്നിവയെല്ലാം ശരിയാണ്' },
        { id: 'C', text: '2, 3 എന്നിവ മാത്രം ശരിയാണ്' },
        { id: 'D', text: '1, 3 എന്നിവ മാത്രം ശരിയാണ്' }
      ],
      correct_option: 'B',
      explanation: `നൽകിയിരിക്കുന്ന മൂന്ന് പ്രസ്താവനകളും പൂർണ്ണമായും ശരിയാണ്. ${topic.name} കേരള പി.എസ്.സി. പരീക്ഷകളിൽ ആവർത്തിച്ചു ചോദിക്കുന്ന പ്രധാന വിഷയമാണ്.`,
      difficulty: seededRandom(seed + 4) > 0.5 ? 'hard' : 'medium',
      status: 'approved'
    };
  } else {
    return {
      id: `KPSC-SYN-${index}`,
      year,
      category: cat,
      sub_category: 'ആവർത്തന ചോദ്യങ്ങൾ',
      exam_name: 'Kerala PSC 100-Mark OMR Simulator 2026',
      exam_code: 'OMR-SYN/2026',
      language: 'ml',
      question_type: 'mcq',
      question_text: `'${topic.name}' എന്നതുമായി ബന്ധപ്പെട്ട ശരിയായ വസ്തുത ഏതാണ്?`,
      options: [
        { id: 'A', text: topic.facts[0] },
        { id: 'B', text: 'ഇത് തെറ്റായ പ്രസ്താവനയാണ്' },
        { id: 'C', text: 'മറ്റൊരു കാലഘട്ടത്തിൽ നടന്ന സംഭവമാണ്' },
        { id: 'D', text: 'മേൽപ്പറഞ്ഞവയൊന്നുമല്ല' }
      ],
      correct_option: 'A',
      explanation: `ശരിയായ ഉത്തരം: ${topic.facts[0]}. ${topic.name} സംബന്ധിച്ച പ്രധാന വിവരമാണിത്.`,
      difficulty: 'medium',
      status: 'approved'
    };
  }
}
