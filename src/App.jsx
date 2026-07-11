import { useState } from "react";

const CLASSES = [
  { id:"1",  label:"پہلی",           level:"primary", group:"🏫 پرائمری (1-5)" },
  { id:"2",  label:"دوسری",          level:"primary", group:"🏫 پرائمری (1-5)" },
  { id:"3",  label:"تیسری",          level:"primary", group:"🏫 پرائمری (1-5)" },
  { id:"4",  label:"چوتھی",          level:"primary", group:"🏫 پرائمری (1-5)" },
  { id:"5",  label:"پانچویں",        level:"primary", group:"🏫 پرائمری (1-5)" },
  { id:"6",  label:"چھٹی",           level:"middle",  group:"📚 مڈل (6-8)" },
  { id:"7",  label:"ساتویں",         level:"middle",  group:"📚 مڈل (6-8)" },
  { id:"8",  label:"آٹھویں",         level:"middle",  group:"📚 مڈل (6-8)" },
  { id:"9",  label:"نہم",            level:"high",    group:"🎯 ہائی (9-10)" },
  { id:"10", label:"دہم (میٹرک)",    level:"high",    group:"🎯 ہائی (9-10)" },
  { id:"11", label:"گیارہویں",       level:"inter",   group:"🏆 انٹر (11-12)" },
  { id:"12", label:"بارہویں (انٹر)", level:"inter",   group:"🏆 انٹر (11-12)" },
];

const SUBJECTS = {
  primary: [
    {id:"urdu",name:"اردو",icon:"📝"},{id:"english",name:"English",icon:"🔤"},
    {id:"math",name:"ریاضی",icon:"📐"},{id:"islamiat",name:"اسلامیات",icon:"☪️"},
    {id:"science",name:"جنرل سائنس",icon:"🔬"},{id:"social",name:"معاشرتی علوم",icon:"🌍"},
    {id:"nazra",name:"ناظرہ قرآن",icon:"📖"},
  ],
  middle: [
    {id:"urdu",name:"اردو",icon:"📝"},{id:"english",name:"English",icon:"🔤"},
    {id:"math",name:"ریاضی",icon:"📐"},{id:"islamiat",name:"اسلامیات",icon:"☪️"},
    {id:"science",name:"جنرل سائنس",icon:"🔬"},{id:"social",name:"معاشرتی علوم",icon:"🌍"},
    {id:"computer",name:"کمپیوٹر",icon:"💻"},{id:"arabic",name:"عربی",icon:"🕌"},
  ],
  high: [
    {id:"urdu",name:"اردو",icon:"📝"},{id:"english",name:"English",icon:"🔤"},
    {id:"math",name:"ریاضی",icon:"📐"},{id:"physics",name:"فزکس",icon:"⚛️"},
    {id:"chem",name:"کیمسٹری",icon:"🧪"},{id:"bio",name:"بیالوجی",icon:"🌿"},
    {id:"islamiat",name:"اسلامیات",icon:"☪️"},{id:"pak",name:"پاک اسٹڈیز",icon:"🇵🇰"},
    {id:"computer",name:"کمپیوٹر",icon:"💻"},{id:"gmath",name:"جنرل ریاضی",icon:"🔢"},
    {id:"science",name:"جنرل سائنس",icon:"🔬"},
  ],
  inter: [
    {id:"urdu",name:"اردو",icon:"📝"},{id:"english",name:"English",icon:"🔤"},
    {id:"physics",name:"فزکس",icon:"⚛️"},{id:"chem",name:"کیمسٹری",icon:"🧪"},
    {id:"bio",name:"بیالوجی",icon:"🌿"},{id:"math",name:"ریاضی",icon:"📐"},
    {id:"computer",name:"کمپیوٹر",icon:"💻"},{id:"islamiat",name:"اسلامیات",icon:"☪️"},
    {id:"pak",name:"پاک اسٹڈیز",icon:"🇵🇰"},{id:"econ",name:"معاشیات",icon:"📊"},
    {id:"stats",name:"شماریات",icon:"📈"},
  ],
};

const EXAM_TYPES = [
  {id:"monthly",  label:"ماہانہ",        icon:"📅", marks:25,  time:"1 گھنٹہ"},
  {id:"mid",      label:"وسط سالی",      icon:"📋", marks:50,  time:"2 گھنٹے"},
  {id:"quarterly",label:"سہ ماہی",       icon:"🏛️", marks:75,  time:"2:30 گھنٹے"},
  {id:"annual",   label:"سالانہ",        icon:"🎓", marks:100, time:"3 گھنٹے"},
  {id:"practice", label:"مشق",           icon:"🔄", marks:20,  time:"45 منٹ"},
  {id:"custom",   label:"اپنی مرضی",     icon:"⚙️", marks:50,  time:"2 گھنٹے"},
];

const USER_ROLES = [
  {id:"student",label:"طالب علم",icon:"🎒",color:"#42A5F5"},
  {id:"parent", label:"والدین",  icon:"👨‍👩‍👧",color:"#82E0AA"},
  {id:"teacher",label:"استاد",   icon:"👨‍🏫",color:"#E8A87C"},
  {id:"school", label:"اسکول",   icon:"🏫", color:"#BB8FCE"},
];

const QTYPES = [
  {id:"mcq",       urdu:"کثیر انتخابی (MCQ)",icon:"🔘"},
  {id:"short",     urdu:"مختصر سوالات",       icon:"✏️"},
  {id:"long",      urdu:"طویل سوالات",        icon:"📄"},
  {id:"fill",      urdu:"خالی جگہ پُر کریں",  icon:"🔲"},
  {id:"true_false",urdu:"صحیح / غلط",         icon:"✅"},
];

const LEVEL_COL = {primary:"#82E0AA",middle:"#85C1E9",high:"#E8A87C",inter:"#BB8FCE"};

function buildHTML(paper, withAns=false) {
  const secs = (paper.sections||[]).map(sec=>{
    const qs = (sec.questions||[]).map(q=>{
      let ex="";
      if(q.options){
        ex+=`<div class="opts">${q.options.map((o,i)=>{
          const ok=withAns&&q.answer&&o.startsWith(q.answer);
          return `<div class="opt${ok?" ok":""}">${o}${ok?" ✓":""}</div>`;
        }).join("")}</div>`;
      }
      if(q.subparts) ex+=`<div class="subs">${q.subparts.map(s=>`<div class="sub">${s}</div>`).join("")}</div>`;
      if(withAns&&q.answer_hint) ex+=`<div class="hint">جواب: ${q.answer_hint}</div>`;
      if(!withAns&&sec.type==="SHORT") ex+=`<div class="line">جواب: _________________________________________</div><div class="line">___________________________________________________</div>`;
      return `<div class="q"><div class="qr"><span class="qn">${q.no}.</span><span class="qt">${q.text}</span>${q.marks?`<span class="qm">(${q.marks})</span>`:""}</div>${ex}</div>`;
    }).join("");
    return `<div class="sec"><div class="sh"><b>${sec.title}</b><span>(${sec.marks} نمبر)</span></div>${sec.instruction?`<div class="si">${sec.instruction}</div>`:""}${qs}</div>`;
  }).join("");

  return `<!DOCTYPE html><html dir="rtl" lang="ur"><head><meta charset="UTF-8">
<title>${paper.subject} پیپر</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Noto Nastaliq Urdu',Georgia,serif;background:#f5f5f5;padding:20px;max-width:800px;margin:0 auto;color:#222;}
.hdr{background:#fff;border:2px solid #1565C0;border-radius:10px;padding:18px;text-align:center;margin-bottom:14px;}
.htitle{font-size:20px;font-weight:900;color:#1565C0;margin:8px 0;}
.hmeta{display:flex;justify-content:center;gap:16px;font-size:13px;color:#666;flex-wrap:wrap;margin:6px 0;}
.htopic{font-size:13px;color:#444;margin-top:6px;}
.sec{background:#fff;border:1px solid #ddd;border-radius:8px;padding:14px;margin-bottom:12px;}
.sh{display:flex;justify-content:space-between;font-size:15px;color:#1565C0;margin-bottom:8px;}
.si{font-size:12px;color:#888;border-right:2px solid #ddd;padding-right:8px;margin-bottom:10px;line-height:1.8;}
.q{margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid #f0f0f0;}
.q:last-child{border-bottom:none;margin-bottom:0;}
.qr{display:flex;gap:8px;line-height:1.8;}
.qn{color:#1565C0;font-weight:700;min-width:22px;}
.qt{flex:1;font-size:14px;}
.qm{color:#aaa;font-size:12px;}
.opts{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:8px 0 0 22px;}
.opt{font-size:13px;background:#f8f8f8;border:1px solid #eee;border-radius:5px;padding:5px 8px;}
.opt.ok{background:#e8f5e9;border-color:#4caf50;color:#2e7d32;font-weight:700;}
.subs{margin:6px 0 0 22px;}
.sub{font-size:13px;color:#555;line-height:2;}
.hint{margin:6px 0 0 22px;background:#e8f5e9;border-radius:6px;padding:5px 10px;font-size:12px;color:#2e7d32;}
.line{font-size:11px;color:#ccc;margin:3px 0 0 22px;line-height:2.5;}
.footer{text-align:center;font-size:11px;color:#bbb;padding:12px;}
${withAns?".badge{display:inline-block;background:#e8f5e9;border:1px solid #4caf50;color:#2e7d32;border-radius:15px;padding:3px 10px;font-size:12px;margin-bottom:8px;}":""}
@media print{button{display:none!important;}}
</style></head><body>
<div class="hdr">
<div style="font-size:12px;color:#888">${paper.school||"گورنمنٹ اسکول پاکستان"}</div>
<div style="font-size:11px;color:#aaa;margin-bottom:8px">پنجاب کریکولم اینڈ ٹیکسٹ بک بورڈ</div>
${withAns?'<div class="badge">🔑 جوابات سمیت — ٹیچر کاپی</div>':""}
<div class="htitle">${paper.subject} — ${paper.examType||"امتحانی پرچہ"}</div>
<div class="hmeta"><span>📚 ${paper.class}</span><span>📊 کل نمبر: ${paper.totalMarks}</span><span>⏱️ ${paper.time}</span></div>
<div class="htopic">موضوع: ${paper.topic}</div>
</div>
${secs}
<div class="footer">*** پرچہ ختم *** — PaperMaster AI — مفت سروس</div>
</body></html>`;
}

const css = `
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#090B10;}
.btn{background:linear-gradient(135deg,#1565C0,#42A5F5);color:#fff;border:none;border-radius:14px;
  padding:14px 20px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;
  transition:all 0.2s;width:100%;}
.btn:hover{filter:brightness(1.1);}
.btn:active{transform:scale(0.97);}
.btn:disabled{background:#1a1c24!important;color:#444;cursor:not-allowed;}
.bsm{background:#12141C;border:1px solid #1E2130;color:#9090A8;border-radius:10px;
  padding:8px 14px;font-size:13px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
.bsm:hover{border-color:#42A5F533;color:#42A5F5;}
.bgreen{background:linear-gradient(135deg,#1B5E20,#43A047);color:#fff;border:none;
  border-radius:12px;padding:12px 18px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;}
.boutline{background:none;border:1.5px solid #42A5F5;color:#42A5F5;border-radius:12px;
  padding:12px 18px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;}
.boutline:hover{background:#42A5F510;}
.chip{background:#0E1018;border:1.5px solid #1A1D2A;color:#777;border-radius:20px;
  padding:8px 14px;font-size:13px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
.chip.on{background:#1565C022;border-color:#42A5F5;color:#42A5F5;}
.subj{background:#10121A;border:1.5px solid #1A1D2A;border-radius:12px;padding:10px 6px;
  cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:inherit;transition:all 0.2s;}
.subj:hover{transform:scale(1.04);}
.subj.on{background:#1565C015;border-color:#42A5F5;}
.inp{background:#10121A;border:1.5px solid #1A1D2A;border-radius:12px;color:#E0E0E0;
  font-size:15px;padding:13px 16px;width:100%;font-family:inherit;outline:none;transition:border 0.2s;}
.inp:focus{border-color:#42A5F566;}
.rcard{background:#10121A;border:2px solid #1A1D2A;border-radius:18px;padding:18px 12px;
  cursor:pointer;text-align:center;transition:all 0.2s;}
.rcard:hover{transform:translateY(-2px);}
.mopt{background:#10121A;border:1.5px solid #1A1D2A;border-radius:10px;padding:10px 14px;
  cursor:pointer;font-size:13px;color:#A0A0B8;transition:all 0.2s;font-family:inherit;text-align:right;direction:auto;}
.mopt:hover{border-color:#42A5F533;}
.mopt.sel{background:#1565C022;border-color:#42A5F5;color:#42A5F5;}
.mopt.ok{background:#1B5E2022;border-color:#43A047;color:#81C784;}
.mopt.bad{background:#B71C1C22;border-color:#EF5350;color:#EF9A9A;}
@keyframes spin{to{transform:rotate(360deg);}}
.spin{display:inline-block;width:16px;height:16px;border:2px solid #fff4;
  border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.up{animation:up 0.3s ease;}
@media print{.noprint{display:none!important;}}
`;

const S = {
  root:{minHeight:"100vh",background:"#090B10",color:"#E0E0E0",
    fontFamily:"'Georgia','Noto Nastaliq Urdu',serif",maxWidth:500,margin:"0 auto",display:"flex",flexDirection:"column"},
  bar:{display:"flex",alignItems:"center",justifyContent:"space-between",
    padding:"13px 16px",borderBottom:"1px solid #10121A"},
  body:{padding:"14px",flex:1,overflowY:"auto"},
  lbl:{fontSize:13,fontWeight:700,color:"#5060A0",marginBottom:9,display:"block",direction:"rtl"},
  sec:{marginBottom:20},
  row:{display:"flex",flexWrap:"wrap",gap:8},
  err:{background:"#2a0808",border:"1px solid #ef4444",color:"#ef4444",
    borderRadius:10,padding:"10px 14px",fontSize:13,marginBottom:12,direction:"rtl"},
  acc:"#42A5F5",
};

function Ad() {
  const msgs = [
    "📢 یہ ایپ مکمل مفت ہے!",
    "💡 WhatsApp پر شیئر کریں",
    "🎓 پاکستان کے ہر بچے کی تعلیم ہمارا مقصد",
  ];
  return <div style={{background:"#1C2A1C",border:"1px solid #2A4A2A",borderRadius:10,
    padding:"9px 14px",fontSize:12,color:"#82E0AA",textAlign:"center",marginBottom:14}}>
    {msgs[Math.floor(Date.now()/10000)%msgs.length]}
  </div>;
}

export default function App() {
  const [screen,      setScreen]      = useState("splash");
  const [role,        setRole]        = useState(null);
  const [classId,     setClassId]     = useState(null);
  const [subject,     setSubject]     = useState(null);
  const [chapters,    setChapters]    = useState([]);
  const [chapter,     setChapter]     = useState(null);
  const [chapLoading, setChapLoading] = useState(false);
  const [examType,    setExamType]    = useState(null);
  const [topic,       setTopic]       = useState("");
  const [sylMode,     setSylMode]     = useState("topic");
  const [covered,     setCovered]     = useState("");
  const [qtypes,      setQtypes]      = useState(["mcq","short"]);
  const [diff,        setDiff]        = useState("medium");
  const [marks,       setMarks]       = useState(50);
  const [schoolName,  setSchoolName]  = useState("");
  const [loading,     setLoading]     = useState(false);
  const [paper,       setPaper]       = useState(null);
  const [history,     setHistory]     = useState([]);
  const [error,       setError]       = useState("");
  const [showAns,     setShowAns]     = useState(false);
  const [practiceMode,setPracticeMode]= useState(false);
  const [answers,     setAnswers]     = useState({});
  const [submitted,   setSubmitted]   = useState(false);
  const [score,       setScore]       = useState(null);

  const classInfo = CLASSES.find(c=>c.id===classId);
  const level     = classInfo?.level;
  const subs      = SUBJECTS[level]||[];
  const groups    = [...new Set(CLASSES.map(c=>c.group))];
  const roleInfo  = USER_ROLES.find(r=>r.id===role);

  const toggleQ = id => setQtypes(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  // Fetch chapters from Supabase when subject is selected
  const fetchChapters = async (classId, subjectId) => {
    setChapters([]); setChapter(null); setChapLoading(true);
    try {
      const SUPA_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPA_KEY = import.meta.env.VITE_SUPABASE_KEY;
      if(!SUPA_URL || !SUPA_KEY) { setChapLoading(false); return; }
      const res = await fetch(
        `${SUPA_URL}/rest/v1/chapters?class=eq.${classId}&subject=eq.${subjectId}&order=chapter_no.asc`,
        { headers: {
          "apikey": SUPA_KEY,
          "Authorization": `Bearer ${SUPA_KEY}`,
          "Content-Type": "application/json"
        }}
      );
      const data = await res.json();
      if(Array.isArray(data)) setChapters(data);
    } catch(e) { console.error("Chapters fetch error:", e); }
    setChapLoading(false);
  };

  // Robust JSON repair - fixes truncated/malformed JSON from AI responses
  const repairJSON = (text) => {
    if(!text||!text.trim()) throw new Error("AI نے خالی جواب دیا — دوبارہ کوشش کریں");
    let s = text.replace(/```json|```/g,"").trim();
    // Find the start of the actual JSON (array or object)
    const firstBrace = s.indexOf("{");
    const firstBracket = s.indexOf("[");
    let start = -1;
    if(firstBrace>=0 && firstBracket>=0) start = Math.min(firstBrace, firstBracket);
    else if(firstBrace>=0) start = firstBrace;
    else if(firstBracket>=0) start = firstBracket;
    if(start>0) s = s.substring(start);

    // Try direct parse first
    try { return JSON.parse(s); } catch(e) {}

    // Repair: if string is cut off mid-value, close it properly
    // Count unescaped quotes to know if we're inside a string
    let inString = false, escape = false;
    let lastSafeIdx = -1;
    const stack = [];
    for(let i=0;i<s.length;i++){
      const c = s[i];
      if(escape){ escape=false; continue; }
      if(c==="\\"){ escape=true; continue; }
      if(c==='"'){ inString=!inString; continue; }
      if(inString) continue;
      if(c==="{"||c==="[") stack.push(c);
      if(c==="}"||c==="]") stack.pop();
      if((c===","||c==="}"||c==="]") && stack.length>=0) lastSafeIdx = i;
    }
    // If we ended inside a string, cut back to last safe comma/brace and close it
    if(inString && lastSafeIdx>=0){
      s = s.substring(0, lastSafeIdx+1);
    }
    // Remove trailing comma before closing
    s = s.replace(/,\s*$/, "");
    // Close any remaining open brackets/braces
    const stack2 = [];
    inString=false; escape=false;
    for(let i=0;i<s.length;i++){
      const c = s[i];
      if(escape){ escape=false; continue; }
      if(c==="\\"){ escape=true; continue; }
      if(c==='"'){ inString=!inString; continue; }
      if(inString) continue;
      if(c==="{"||c==="[") stack2.push(c);
      if(c==="}"||c==="]") stack2.pop();
    }
    while(stack2.length>0){
      const open = stack2.pop();
      s += open==="{" ? "}" : "]";
    }
    try { return JSON.parse(s); } catch(e) {
      throw new Error("AI کا جواب نامکمل تھا — دوبارہ کوشش کریں");
    }
  };

  const generate = async () => {
    const topicStr = chapter 
      ? `${chapter.chapter_name} (باب ${chapter.chapter_no})`
      : sylMode==="custom" ? covered : topic;
    if(!classId||!subject||!topicStr.trim()){setError("کلاس، مضمون اور موضوع لازمی ہیں");return;}
    if(qtypes.length===0){setError("کم از کم ایک سوال کی قسم چنیں");return;}

    setError(""); setLoading(true); setPaper(null);

    const subName  = subs.find(s=>s.id===subject)?.name||subject;
    const clsLabel = classInfo?.label||classId;
    const lvlName  = {primary:"پرائمری",middle:"مڈل",high:"ہائی اسکول",inter:"انٹرمیڈیٹ"}[level]||"";
    const examLabel= EXAM_TYPES.find(e=>e.id===examType)?.label||"امتحان";
    const totalM   = (examType&&examType!=="custom")?EXAM_TYPES.find(e=>e.id===examType)?.marks:marks;
    const timeStr  = (examType&&examType!=="custom")?EXAM_TYPES.find(e=>e.id===examType)?.time:"2 گھنٹے";
    const diffStr  = diff==="easy"?"easy":diff==="medium"?"medium":"hard";

    // Marks split evenly
    const n = qtypes.length;
    const baseM = Math.floor(totalM/n);
    const marksFor = {};
    qtypes.forEach((qt,i)=>{marksFor[qt]=i===n-1?(totalM-baseM*(n-1)):baseM;});

    try {
      const GEMINI_KEY = [
        import.meta.env.VITE_GEMINI_KEY,
      ].filter(Boolean);
      const ANTHROPIC_KEY = import.meta.env.VITE_ANTHROPIC_KEY;

      if(!GEMINI_KEYS.length && !ANTHROPIC_KEY){
        setError("❌ کوئی API Key نہیں ملی — Vercel Settings میں ڈالیں");
        setLoading(false); return;
      }

      // Smart API caller — Gemini first (free), Anthropic as backup
      let geminiKeyIdx = 0;
      const callAI = async (prompt, maxTok=1200) => {
        // Try Gemini first (free)
        if(GEMINI_KEYS.length > 0) {
          for(let attempt=0; attempt < GEMINI_KEYS.length; attempt++) {
            const key = GEMINI_KEYS[geminiKeyIdx % GEMINI_KEYS.length];
            geminiKeyIdx++;
            try {
              const r = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
                {
                  method:"POST",
                  headers:{"Content-Type":"application/json"},
                  body:JSON.stringify({
                    contents:[{parts:[{text:prompt}]}],
                    generationConfig:{temperature:0.4, maxOutputTokens:maxTok}
                  })
                }
              );
              const d = await r.json();
              if(d.error && d.error.code===429) continue; // try next key
              if(d.error) throw new Error(d.error.message);
              const txt = d.candidates?.[0]?.content?.parts?.[0]?.text||"";
              if(txt) return txt;
              // Empty response - try next key
              continue;
            } catch(e) {
              if(attempt === GEMINI_KEYS.length-1 && !ANTHROPIC_KEY) throw e;
            }
          }
        }
        // Fallback to Anthropic
        if(ANTHROPIC_KEY) {
          const r = await fetch("https://api.anthropic.com/v1/messages",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "x-api-key":ANTHROPIC_KEY,
              "anthropic-version":"2023-06-01",
              "anthropic-dangerous-direct-browser-access":"true"
            },
            body:JSON.stringify({
              model:"claude-haiku-4-5-20251001",
              max_tokens:maxTok,
              messages:[{role:"user",content:prompt}]
            })
          });
          const d = await r.json();
          if(d.error) throw new Error(d.error.message||"Anthropic Error");
          return d.content?.[0]?.text||"";
        }
        throw new Error("تمام API keys ناکام — دوبارہ کوشش کریں");
      };

      const sections = [];
      const mcqCnt = totalM<=25?4:totalM<=50?5:7;
      const shCnt  = totalM<=25?3:totalM<=50?4:5;

      // CALL 1: Header + MCQ (if selected) — combined to save tokens
      const hasMCQ = qtypes.includes("mcq");
      const hasTF  = qtypes.includes("true_false");
      const hasFill= qtypes.includes("fill");
      const hasSh  = qtypes.includes("short");
      const hasLong= qtypes.includes("long");

      const call1Parts = [];
      if(hasMCQ) call1Parts.push(`"mcq":[${Array.from({length:mcqCnt},(_,i)=>`{"no":${i+1},"text":"Q","options":["A. ","B. ","C. ","D. "],"answer":"A","marks":1}`).join(",")}]`);
      if(hasTF)  call1Parts.push(`"tf":[${Array.from({length:5},(_,i)=>`{"no":${i+1},"text":"statement","answer":"صحیح","marks":1}`).join(",")}]`);
      if(hasFill)call1Parts.push(`"fill":[${Array.from({length:5},(_,i)=>`{"no":${i+1},"text":"sentence with ______","answer_hint":"word","marks":1}`).join(",")}]`);

      const pdfPath = chapter ? chapter.pdf_path : null;
    const prompt1 = `Pakistani school exam. Topic:"${topicStr}" Class:${clsLabel} Subject:${subName} Difficulty:${diffStr}.
Return ONLY JSON (no markdown): {"subject":"${subName}","class":"${clsLabel}","level":"${lvlName}","examType":"${examLabel}","topic":"${topicStr}","school":"${schoolName||"گورنمنٹ اسکول"}","totalMarks":${totalM},"time":"${timeStr}","instructions":["تمام سوالات حل کریں","صاف لکھیں"]${call1Parts.length?","+call1Parts.join(","):""}}.
Replace placeholder questions with REAL Urdu questions about "${topicStr}". Keep JSON valid and complete.`;

      const txt1 = await callAI(prompt1, 2000);
      const data1 = repairJSON(txt1);

      // Extract header
      const header = {
        subject:data1.subject||subName,
        class:data1.class||clsLabel,
        level:data1.level||lvlName,
        examType:data1.examType||examLabel,
        topic:data1.topic||topicStr,
        school:data1.school||(schoolName||"گورنمنٹ اسکول"),
        totalMarks:data1.totalMarks||totalM,
        time:data1.time||timeStr,
        instructions:data1.instructions||["تمام سوالات حل کریں","صاف لکھیں"]
      };

      // Extract MCQ/TF/Fill from first call
      if(hasMCQ && Array.isArray(data1.mcq)) {
        sections.push({type:"MCQ",title:"حصہ الف — کثیر انتخابی سوالات",
          marks:marksFor.mcq,instruction:"درست جواب کے سامنے دائرہ لگائیں",
          questions:data1.mcq});
      }
      if(hasTF && Array.isArray(data1.tf)) {
        sections.push({type:"TF",title:"حصہ — صحیح / غلط",
          marks:marksFor.true_false,instruction:"صحیح یا غلط لکھیں",
          questions:data1.tf});
      }
      if(hasFill && Array.isArray(data1.fill)) {
        sections.push({type:"FILL",title:"حصہ — خالی جگہ پُر کریں",
          marks:marksFor.fill,instruction:"مناسب لفظ سے خالی جگہ پُر کریں",
          questions:data1.fill});
      }

      // CALL 2: Short + Long (if selected) — combined
      if(hasSh || hasLong) {
        const call2Parts = [];
        if(hasSh)  call2Parts.push(`"short":[${Array.from({length:shCnt},(_,i)=>`{"no":${i+1},"text":"Q","marks":${Math.round(marksFor.short/shCnt)},"answer_hint":"ans"}`).join(",")}]`);
        if(hasLong)call2Parts.push(`"long":[{"no":1,"text":"Q","marks":${Math.round(marksFor.long/2)},"subparts":["(الف)","(ب)"],"answer_hint":"ans"},{"no":2,"text":"Q","marks":${Math.round(marksFor.long/2)},"subparts":["(الف)","(ب)"],"answer_hint":"ans"}]`);

        const prompt2 = `Pakistani school exam questions. Topic:"${topicStr}" Class:${clsLabel} Subject:${subName} Difficulty:${diffStr}.
Return ONLY JSON (no markdown): {${call2Parts.join(",")}}.
Replace placeholder Q with REAL Urdu questions about "${topicStr}". Keep short. JSON must be complete and valid.`;

        const txt2 = await callAI(prompt2, 1500);
        const data2 = repairJSON(txt2);

        if(hasSh && Array.isArray(data2.short)) {
          sections.push({type:"SHORT",title:"حصہ ب — مختصر سوالات",
            marks:marksFor.short,instruction:"مختصر جواب لکھیں",
            questions:data2.short});
        }
        if(hasLong && Array.isArray(data2.long)) {
          sections.push({type:"LONG",title:"حصہ ج — تفصیلی سوالات",
            marks:marksFor.long,instruction:"تفصیلی جواب لکھیں",
            questions:data2.long});
        }
      }

      const parsed = {...header, sections};
      setPaper(parsed);
      setAnswers({}); setSubmitted(false); setScore(null);
      setShowAns(false); setPracticeMode(false);
      setHistory(h=>[{...parsed,id:Date.now(),
        date:new Date().toLocaleDateString("ur-PK"),role},...h.slice(0,9)]);
      setScreen("preview");

    } catch(e) {
      setError("❌ مسئلہ: "+(e.message||"نامعلوم")+" — دوبارہ کوشش کریں");
    }
    setLoading(false);
  };

  const downloadPaper = (withAns=false) => {
    if(!paper) return;
    const html = buildHTML(paper, withAns);
    const blob = new Blob([html], {type:"text/html;charset=utf-8"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `${paper.subject}_${paper.class}_${withAns?"جوابات_سمیت":""}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const submitPractice = () => {
    let correct=0, total=0;
    paper.sections?.forEach(sec=>{
      if(sec.type==="MCQ") sec.questions?.forEach(q=>{
        total++;
        if(answers[`q${q.no}`]===q.answer) correct++;
      });
    });
    setScore({correct,total,pct:total?Math.round(correct/total*100):0});
    setSubmitted(true); setShowAns(true);
  };

  // ── SPLASH ─────────────────────────────────────────────
  if(screen==="splash") return (
    <div style={{...S.root,alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 20px"}}>
      <style>{css}</style>
      <div style={{fontSize:64,marginBottom:14}}>📋</div>
      <div style={{fontSize:26,fontWeight:900,
        background:"linear-gradient(135deg,#1565C0,#42A5F5,#82E0AA)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>
        PaperMaster AI
      </div>
      <div style={{color:"#444",fontSize:13,marginBottom:24}}>پاکستان کا مفت تعلیمی پلیٹ فارم</div>
      <div style={{display:"flex",gap:8,marginBottom:36,flexWrap:"wrap",justifyContent:"center"}}>
        {["🆓 بالکل مفت","📚 کلاس 1-12","🏛️ پنجاب بورڈ","⬇️ ڈاؤنلوڈ","🖥️ آن لائن مشق"].map(t=>(
          <span key={t} style={{background:"#10121A",border:"1px solid #1A1D2A",
            borderRadius:20,padding:"5px 11px",fontSize:11,color:"#606080"}}>{t}</span>
        ))}
      </div>
      <button className="btn" onClick={()=>setScreen("role")} style={{maxWidth:260}}>
        شروع کریں ✨
      </button>
      <div style={{marginTop:12,color:"#2a2a3a",fontSize:11}}>کوئی رجسٹریشن نہیں • کوئی پیسہ نہیں</div>
    </div>
  );

  // ── ROLE ───────────────────────────────────────────────
  if(screen==="role") return (
    <div style={S.root}>
      <style>{css}</style>
      <div style={S.bar}>
        <button className="bsm" onClick={()=>setScreen("splash")}>← واپس</button>
        <div style={{fontSize:16,fontWeight:700}}>آپ کون ہیں؟</div>
        <div/>
      </div>
      <div style={S.body}>
        <Ad/>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:20,fontWeight:900,color:S.acc,marginBottom:4}}>اپنا کردار چنیں</div>
          <div style={{color:"#444",fontSize:13}}>تاکہ پیپر آپ کی ضرورت کے مطابق بنے</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
          {USER_ROLES.map(r=>(
            <div key={r.id} className="rcard"
              onClick={()=>setRole(r.id)}
              style={{borderColor:role===r.id?r.color:"#1A1D2A",
                background:role===r.id?r.color+"12":"#10121A"}}>
              <div style={{fontSize:36,marginBottom:8}}>{r.icon}</div>
              <div style={{fontSize:14,fontWeight:700,
                color:role===r.id?r.color:"#C0C0C0",marginBottom:3}}>{r.label}</div>
            </div>
          ))}
        </div>
        {role==="school"&&(
          <div style={{...S.sec}} className="up">
            <label style={S.lbl}>🏫 اسکول کا نام</label>
            <input className="inp" value={schoolName}
              onChange={e=>setSchoolName(e.target.value)}
              placeholder="گورنمنٹ ہائی اسکول" dir="rtl"/>
          </div>
        )}
        {role&&(
          <button className="btn up" onClick={()=>setScreen("builder")}>آگے بڑھیں →</button>
        )}
      </div>
    </div>
  );

  // ── BUILDER ────────────────────────────────────────────
  if(screen==="builder") return (
    <div style={S.root}>
      <style>{css}</style>
      <div style={S.bar}>
        <button className="bsm" onClick={()=>setScreen("role")}>← واپس</button>
        <div style={{fontSize:15,fontWeight:700}}>{roleInfo?.icon} پیپر بنائیں</div>
        {history.length>0&&<button className="bsm" onClick={()=>setScreen("history")}>📂 {history.length}</button>}
      </div>
      <div style={S.body}>
        <Ad/>

        {/* EXAM TYPE */}
        <div style={S.sec}>
          <label style={S.lbl}>🏛️ امتحان کی قسم</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {EXAM_TYPES.map(e=>(
              <button key={e.id} className={`chip${examType===e.id?" on":""}`}
                onClick={()=>{setExamType(e.id);if(e.id!=="custom")setMarks(e.marks);}}
                style={{display:"flex",alignItems:"center",gap:7,padding:"10px 12px",
                  borderRadius:12,justifyContent:"flex-start",height:"auto"}}>
                <span style={{fontSize:18,flexShrink:0}}>{e.icon}</span>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,fontWeight:700}}>{e.label}</div>
                  {e.id!=="custom"&&<div style={{fontSize:10,color:"#555"}}>{e.marks}نمبر</div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CLASS */}
        <div style={S.sec}>
          <label style={S.lbl}>📚 کلاس</label>
          {groups.map(grp=>{
            const gc=CLASSES.filter(c=>c.group===grp);
            const col=LEVEL_COL[gc[0].level];
            return(
              <div key={grp} style={{marginBottom:12}}>
                <div style={{fontSize:11,color:col,marginBottom:7,fontWeight:700}}>{grp}</div>
                <div style={S.row}>
                  {gc.map(c=>(
                    <button key={c.id} className={`chip${classId===c.id?" on":""}`}
                      onClick={()=>{setClassId(c.id);setSubject(null);setChapter(null);setChapters([]);}}
                      style={classId===c.id?{borderColor:col,color:col,background:col+"15"}:{}}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* SUBJECT */}
        {classId&&(
          <div style={S.sec} className="up">
            <label style={S.lbl}>📖 مضمون</label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {subs.map(s=>(
                <button key={s.id} className={`subj${subject===s.id?" on":""}`}
                  onClick={()=>{setSubject(s.id);fetchChapters(classId,s.id);}}>
                  <span style={{fontSize:22}}>{s.icon}</span>
                  <span style={{fontSize:11,color:"#777"}}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHAPTERS */}
        {subject&&(
          <div style={S.sec} className="up">
            <label style={S.lbl}>📖 باب منتخب کریں</label>
            {chapLoading&&(
              <div style={{textAlign:"center",color:"#42A5F5",padding:"10px"}}>
                <span className="spin"/> ابواب لوڈ ہو رہے ہیں...
              </div>
            )}
            {!chapLoading&&chapters.length>0&&(
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                <button
                  className={`chip${chapter===null?" on":""}`}
                  onClick={()=>setChapter(null)}
                  style={{textAlign:"right",padding:"10px 14px",borderRadius:12,
                    ...(chapter===null?{borderColor:"#42A5F5",color:"#42A5F5",background:"#1565C022"}:{})}}>
                  📚 تمام کتاب (سب ابواب سے)
                </button>
                {chapters.map(ch=>(
                  <button key={ch.id}
                    className={`chip${chapter?.id===ch.id?" on":""}`}
                    onClick={()=>setChapter(ch)}
                    style={{textAlign:"right",padding:"10px 14px",borderRadius:12,
                      display:"flex",alignItems:"center",gap:10,
                      ...(chapter?.id===ch.id?{borderColor:"#42A5F5",color:"#42A5F5",background:"#1565C022"}:{})}}>
                    <span style={{color:"#555",fontSize:12,flexShrink:0}}>{ch.chapter_no}.</span>
                    <span style={{flex:1}}>{ch.chapter_name}</span>
                  </button>
                ))}
              </div>
            )}
            {!chapLoading&&chapters.length===0&&(
              <div style={{color:"#555",fontSize:12,textAlign:"center",padding:"10px",direction:"rtl"}}>
                ابھی اس مضمون کے ابواب دستیاب نہیں — موضوع خود لکھیں
              </div>
            )}
          </div>
        )}

        {/* SYLLABUS */}
        {subject&&(
          <div style={S.sec} className="up">
            <label style={S.lbl}>📋 نصاب کا طریقہ</label>
            <div style={{display:"flex",gap:8,marginBottom:12}}>
              {[{id:"topic",label:"🎯 ایک موضوع"},{id:"custom",label:"📚 جو پڑھا وہ"}].map(t=>(
                <button key={t.id} className={`chip${sylMode===t.id?" on":""}`}
                  onClick={()=>setSylMode(t.id)}
                  style={{flex:1,padding:"10px",borderRadius:12}}>
                  {t.label}
                </button>
              ))}
            </div>
            {sylMode==="topic"?(
              <input className="inp" value={topic} onChange={e=>setTopic(e.target.value)}
                placeholder="مثلاً: نظم آزادی، Fractions، Newton Laws..."
                dir="auto"/>
            ):(
              <div>
                <div style={{fontSize:12,color:"#5060A0",marginBottom:8,direction:"rtl",lineHeight:1.8}}>
                  ✏️ ابھی تک پڑھے گئے ابواب لکھیں — صرف انہی میں سے سوالات بنیں گے:
                </div>
                <textarea className="inp" value={covered}
                  onChange={e=>setCovered(e.target.value)}
                  placeholder={"باب 1: حمد و نعت\nباب 2: آزادی\nباب 3: وطن کی محبت"}
                  dir="auto" rows={5}
                  style={{resize:"vertical",lineHeight:1.8}}/>
              </div>
            )}
          </div>
        )}

        {/* Q TYPES */}
        <div style={S.sec}>
          <label style={S.lbl}>📝 سوالات کی اقسام</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {QTYPES.map(q=>(
              <button key={q.id} className={`chip${qtypes.includes(q.id)?" on":""}`}
                onClick={()=>toggleQ(q.id)}
                style={{display:"flex",alignItems:"center",gap:6,justifyContent:"center",padding:"10px 8px"}}>
                <span>{q.icon}</span><span style={{fontSize:12}}>{q.urdu}</span>
              </button>
            ))}
          </div>
        </div>

        {/* DIFFICULTY */}
        <div style={S.sec}>
          <label style={S.lbl}>⚖️ مشکل کا درجہ</label>
          <div style={S.row}>
            {[["easy","آسان 🟢","#82E0AA"],["medium","درمیانہ 🟡","#F7DC6F"],["hard","مشکل 🔴","#F1948A"]].map(([id,lbl,col])=>(
              <button key={id} className="chip" onClick={()=>setDiff(id)}
                style={diff===id?{background:col+"22",borderColor:col,color:col}:{}}>
                {lbl}
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOM MARKS */}
        {examType==="custom"&&(
          <div style={S.sec} className="up">
            <label style={{...S.lbl,display:"flex",justifyContent:"space-between"}}>
              <span>📊 کل نمبر</span>
              <span style={{color:S.acc,fontWeight:900,fontSize:18}}>{marks}</span>
            </label>
            <input type="range" style={{width:"100%",accentColor:S.acc,cursor:"pointer"}}
              min={10} max={100} step={5} value={marks}
              onChange={e=>setMarks(Number(e.target.value))}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#333",marginTop:4}}>
              {[10,25,50,75,100].map(n=><span key={n}>{n}</span>)}
            </div>
          </div>
        )}

        {error&&<div style={S.err}>{error}</div>}

        <button className="btn" onClick={generate} disabled={loading}>
          {loading
            ?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
               <span className="spin"/>AI پیپر بنا رہا ہے...
             </span>
            :"⚡ مفت پیپر بنائیں"}
        </button>
        <div style={{textAlign:"center",fontSize:11,color:"#252530",marginTop:8}}>
          مفت • کوئی رجسٹریشن نہیں
        </div>
      </div>
    </div>
  );

  // ── HISTORY ────────────────────────────────────────────
  if(screen==="history") return (
    <div style={S.root}>
      <style>{css}</style>
      <div style={S.bar}>
        <button className="bsm" onClick={()=>setScreen("builder")}>← واپس</button>
        <div style={{fontSize:16,fontWeight:700}}>📂 پچھلے پیپر</div>
        <div/>
      </div>
      <div style={S.body}>
        <Ad/>
        {history.length===0&&(
          <div style={{textAlign:"center",color:"#333",padding:"40px 0"}}>
            <div style={{fontSize:40,marginBottom:12}}>📭</div>
            <div>ابھی تک کوئی پیپر نہیں بنا</div>
          </div>
        )}
        {history.map(h=>(
          <div key={h.id} style={{background:"#10121A",border:"1px solid #1A1D2A",
            borderRadius:14,padding:"14px",marginBottom:10,cursor:"pointer"}}
            onClick={()=>{setPaper(h);setAnswers({});setSubmitted(false);
              setScore(null);setShowAns(false);setPracticeMode(false);setScreen("preview");}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{color:S.acc,fontWeight:700,fontSize:13}}>{h.subject} — {h.class}</span>
              <span style={{color:"#333",fontSize:11}}>{h.date}</span>
            </div>
            <div style={{fontSize:13,color:"#B0B0C0",direction:"rtl",marginBottom:4}}>{h.topic}</div>
            <div style={{fontSize:11,color:"#444"}}>{h.examType} • {h.totalMarks}نمبر</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PREVIEW ────────────────────────────────────────────
  if(screen==="preview"&&paper) {
    const hasMCQ = paper.sections?.some(s=>s.type==="MCQ"&&s.questions?.some(q=>q.answer));
    return (
      <div style={S.root}>
        <style>{css}</style>
        <div style={S.bar} className="noprint">
          <button className="bsm" onClick={()=>setScreen("builder")}>← واپس</button>
          <div style={{fontSize:14,fontWeight:700,color:"#82E0AA"}}>✅ پیپر تیار!</div>
          <button className="bsm" onClick={()=>window.print()}>🖨️</button>
        </div>

        <Ad/>

        {/* Action buttons */}
        <div style={{padding:"0 14px 10px",display:"flex",gap:8,flexWrap:"wrap"}} className="noprint">
          {hasMCQ&&!submitted&&(
            <button className={practiceMode?"bgreen":"boutline"}
              onClick={()=>{setPracticeMode(p=>!p);setAnswers({});}}
              style={{flex:1,padding:"10px",fontSize:13}}>
              {practiceMode?"❌ مشق بند":"🖥️ آن لائن مشق"}
            </button>
          )}
          {(role==="teacher"||role==="school"||role==="parent")&&!practiceMode&&(
            <button className="bsm"
              onClick={()=>setShowAns(a=>!a)}
              style={{flex:1,padding:"10px",
                color:showAns?"#82E0AA":"#9090A8",
                borderColor:showAns?"#82E0AA44":"#1A1D2A"}}>
              {showAns?"🔑 چھپائیں":"🔑 جوابات"}
            </button>
          )}
        </div>

        {/* Download buttons */}
        <div style={{padding:"0 14px 10px",display:"flex",gap:8}} className="noprint">
          <button className="bsm" onClick={()=>downloadPaper(false)}
            style={{flex:1,padding:"10px",color:"#42A5F5",borderColor:"#42A5F533"}}>
            ⬇️ پیپر ڈاؤنلوڈ
          </button>
          {(role==="teacher"||role==="school")&&(
            <button className="bsm" onClick={()=>downloadPaper(true)}
              style={{flex:1,padding:"10px",color:"#82E0AA",borderColor:"#82E0AA33"}}>
              ⬇️ جوابات سمیت
            </button>
          )}
          <button className="bsm" onClick={()=>setScreen("history")}
            style={{padding:"10px 12px"}}>📂</button>
        </div>

        {/* Score */}
        {submitted&&score&&(
          <div style={{margin:"0 14px 10px",
            background:score.pct>=60?"#1B5E2022":"#B71C1C22",
            border:`1px solid ${score.pct>=60?"#43A04744":"#EF535044"}`,
            borderRadius:14,padding:"14px",textAlign:"center"}} className="up">
            <div style={{fontSize:36,marginBottom:6}}>
              {score.pct>=80?"🏆":score.pct>=60?"👍":"💪"}
            </div>
            <div style={{fontSize:22,fontWeight:900,
              color:score.pct>=60?"#81C784":"#EF9A9A",marginBottom:4}}>
              {score.correct}/{score.total} صحیح
            </div>
            <div style={{fontSize:14,color:"#888"}}>{score.pct}% نمبر</div>
          </div>
        )}

        {/* Paper */}
        <div style={{flex:1,overflowY:"auto",padding:"0 14px 14px"}}>
          <div style={{background:"#10121A",border:"1px solid #1A1D2A",
            borderRadius:14,padding:"16px",marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:11,color:"#333",marginBottom:3}}>{paper.school}</div>
            <div style={{height:1,background:"#1A1D2A",margin:"8px 0"}}/>
            <div style={{fontSize:18,fontWeight:900,color:S.acc,marginBottom:8,direction:"rtl"}}>
              {paper.subject} — {paper.examType}
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:10,
              fontSize:11,color:"#666",flexWrap:"wrap",marginBottom:8}}>
              <span>📚 {paper.class}</span>
              <span>📊 {paper.totalMarks} نمبر</span>
              <span>⏱️ {paper.time}</span>
            </div>
            <div style={{height:1,background:"#1A1D2A",margin:"8px 0"}}/>
            <div style={{fontSize:12,color:"#5060A0",direction:"rtl"}}>نصاب: {paper.topic}</div>
            {paper.instructions?.length>0&&(
              <div style={{marginTop:10,background:"#090B10",borderRadius:8,padding:"10px",textAlign:"right"}}>
                <div style={{fontSize:11,color:S.acc,fontWeight:700,marginBottom:5}}>📌 ہدایات</div>
                {paper.instructions.map((ins,i)=>(
                  <div key={i} style={{fontSize:11,color:"#555",lineHeight:1.9}}>{i+1}. {ins}</div>
                ))}
              </div>
            )}
          </div>

          {paper.sections?.map((sec,si)=>(
            <div key={si} style={{background:"#10121A",border:"1px solid #1A1D2A",
              borderRadius:14,padding:"13px",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"center",marginBottom:7}}>
                <span style={{fontSize:14,fontWeight:700,color:S.acc,direction:"rtl"}}>{sec.title}</span>
                <span style={{fontSize:12,color:"#444",flexShrink:0,marginLeft:6}}>({sec.marks}نمبر)</span>
              </div>
              {sec.instruction&&(
                <div style={{fontSize:11,color:"#444",marginBottom:9,direction:"rtl",
                  borderRight:"2px solid #1A1D2A",paddingRight:8,lineHeight:1.8}}>
                  {sec.instruction}
                </div>
              )}
              {sec.questions?.map((q,qi)=>(
                <div key={qi} style={{marginBottom:13,paddingBottom:13,
                  borderBottom:qi<(sec.questions.length-1)?"1px solid #090B10":"none"}}>
                  <div style={{display:"flex",gap:7,lineHeight:1.8,direction:"auto"}}>
                    <span style={{color:S.acc,fontWeight:700,flexShrink:0,minWidth:22,fontSize:13}}>{q.no}.</span>
                    <span style={{flex:1,fontSize:13,color:"#D0D0D0"}}>{q.text}</span>
                    {q.marks&&<span style={{color:"#333",fontSize:11,flexShrink:0}}>({q.marks})</span>}
                  </div>

                  {q.options&&(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8,marginRight:22}}>
                      {q.options.map((opt,oi)=>{
                        const letter=opt.split(".")[0].trim();
                        const isSel=answers[`q${q.no}`]===letter;
                        const isOk=submitted&&q.answer===letter;
                        const isBad=submitted&&isSel&&!isOk;
                        const showOk=showAns&&q.answer===letter;
                        return(
                          <button key={oi}
                            className={`mopt${isSel&&!submitted?" sel":""}${isOk||showOk?" ok":""}${isBad?" bad":""}`}
                            onClick={()=>{
                              if(submitted||!practiceMode) return;
                              setAnswers(a=>({...a,[`q${q.no}`]:letter}));
                            }}
                            style={{cursor:practiceMode&&!submitted?"pointer":"default"}}>
                            {opt}{(isOk||showOk)&&" ✓"}{isBad&&" ✗"}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.subparts&&(
                    <div style={{marginRight:22,marginTop:6}}>
                      {q.subparts.map((sp,i)=>(
                        <div key={i} style={{fontSize:12,color:"#5060A0",lineHeight:2}}>{sp}</div>
                      ))}
                    </div>
                  )}

                  {showAns&&q.answer_hint&&(
                    <div style={{marginRight:22,marginTop:6,background:"#0A1A0A",
                      border:"1px solid #43A04722",borderRadius:8,padding:"6px 10px"}}>
                      <span style={{fontSize:11,color:"#43A047"}}>✏️ جواب: </span>
                      <span style={{fontSize:12,color:"#81C784"}}>{q.answer_hint}</span>
                    </div>
                  )}

                  {!showAns&&!practiceMode&&sec.type==="SHORT"&&(
                    <div style={{marginRight:22,marginTop:7}}>
                      <div style={{fontSize:11,color:"#1E1E2A"}}>جواب: _________________________________________________</div>
                      <div style={{fontSize:11,color:"#1E1E2A",marginTop:4}}>________________________________________________________</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div style={{textAlign:"center",fontSize:10,color:"#1E1E2A",padding:"10px 0"}}>
            *** پرچہ ختم *** — PaperMaster AI
          </div>
        </div>

        {/* Bottom */}
        <div style={{display:"flex",gap:8,padding:"10px 14px 16px",
          borderTop:"1px solid #10121A"}} className="noprint">
          {practiceMode&&!submitted&&(
            <button className="bgreen" onClick={submitPractice} style={{flex:2}}>
              ✅ جمع کریں اور نتیجہ دیکھیں
            </button>
          )}
          {(!practiceMode||submitted)&&(
            <button className="btn" onClick={()=>{
              setPaper(null);setTopic("");setCovered("");
              setExamType(null);setScreen("builder");
            }} style={{flex:1}}>✨ نیا پیپر</button>
          )}
          {submitted&&(
            <button className="bsm" onClick={()=>{
              setAnswers({});setSubmitted(false);
              setScore(null);setShowAns(false);setPracticeMode(true);
            }} style={{padding:"13px 14px"}}>🔄</button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
