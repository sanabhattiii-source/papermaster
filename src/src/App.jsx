import { useState, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────
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
    {id:"urdu",    name:"اردو",         icon:"📝"},
    {id:"english", name:"English",      icon:"🔤"},
    {id:"math",    name:"ریاضی",        icon:"📐"},
    {id:"islamiat",name:"اسلامیات",     icon:"☪️"},
    {id:"science", name:"جنرل سائنس",   icon:"🔬"},
    {id:"social",  name:"معاشرتی علوم", icon:"🌍"},
    {id:"nazra",   name:"ناظرہ قرآن",   icon:"📖"},
  ],
  middle: [
    {id:"urdu",    name:"اردو",         icon:"📝"},
    {id:"english", name:"English",      icon:"🔤"},
    {id:"math",    name:"ریاضی",        icon:"📐"},
    {id:"islamiat",name:"اسلامیات",     icon:"☪️"},
    {id:"science", name:"جنرل سائنس",   icon:"🔬"},
    {id:"social",  name:"معاشرتی علوم", icon:"🌍"},
    {id:"computer",name:"کمپیوٹر",      icon:"💻"},
    {id:"arabic",  name:"عربی",         icon:"🕌"},
  ],
  high: [
    {id:"urdu",    name:"اردو",         icon:"📝"},
    {id:"english", name:"English",      icon:"🔤"},
    {id:"math",    name:"ریاضی",        icon:"📐"},
    {id:"physics", name:"فزکس",         icon:"⚛️"},
    {id:"chem",    name:"کیمسٹری",      icon:"🧪"},
    {id:"bio",     name:"بیالوجی",      icon:"🌿"},
    {id:"islamiat",name:"اسلامیات",     icon:"☪️"},
    {id:"pak",     name:"پاک اسٹڈیز",  icon:"🇵🇰"},
    {id:"computer",name:"کمپیوٹر",      icon:"💻"},
    {id:"gmath",   name:"جنرل ریاضی",  icon:"🔢"},
    {id:"science", name:"جنرل سائنس",   icon:"🔬"},
  ],
  inter: [
    {id:"urdu",    name:"اردو",         icon:"📝"},
    {id:"english", name:"English",      icon:"🔤"},
    {id:"physics", name:"فزکس",         icon:"⚛️"},
    {id:"chem",    name:"کیمسٹری",      icon:"🧪"},
    {id:"bio",     name:"بیالوجی",      icon:"🌿"},
    {id:"math",    name:"ریاضی",        icon:"📐"},
    {id:"computer",name:"کمپیوٹر",      icon:"💻"},
    {id:"islamiat",name:"اسلامیات",     icon:"☪️"},
    {id:"pak",     name:"پاک اسٹڈیز",  icon:"🇵🇰"},
    {id:"econ",    name:"معاشیات",      icon:"📊"},
    {id:"stats",   name:"شماریات",      icon:"📈"},
  ],
};

const EXAM_TYPES = [
  {id:"monthly",   label:"ماہانہ",       icon:"📅", marks:25,  time:"1 گھنٹہ"},
  {id:"mid",       label:"وسط سالی",     icon:"📋", marks:50,  time:"2 گھنٹے"},
  {id:"quarterly", label:"سہ ماہی",      icon:"🏛️", marks:75,  time:"2:30 گھنٹے"},
  {id:"annual",    label:"سالانہ",       icon:"🎓", marks:100, time:"3 گھنٹے"},
  {id:"practice",  label:"مشق (Practice)",icon:"🔄",marks:20,  time:"45 منٹ"},
  {id:"custom",    label:"اپنی مرضی",    icon:"⚙️", marks:50,  time:"2 گھنٹے"},
];

const USER_ROLES = [
  {id:"student", label:"طالب علم", icon:"🎒", color:"#42A5F5"},
  {id:"parent",  label:"والدین",   icon:"👨‍👩‍👧", color:"#82E0AA"},
  {id:"teacher", label:"استاد",    icon:"👨‍🏫", color:"#E8A87C"},
  {id:"school",  label:"اسکول",    icon:"🏫",  color:"#BB8FCE"},
];

const QTYPES = [
  {id:"mcq",        urdu:"کثیر انتخابی (MCQ)", icon:"🔘"},
  {id:"short",      urdu:"مختصر سوالات",        icon:"✏️"},
  {id:"long",       urdu:"طویل سوالات",         icon:"📄"},
  {id:"fill",       urdu:"خالی جگہ پُر کریں",   icon:"🔲"},
  {id:"true_false", urdu:"صحیح / غلط",          icon:"✅"},
  {id:"definition", urdu:"تعریف لکھیں",         icon:"📖"},
];

const LEVEL_COL = {primary:"#82E0AA",middle:"#85C1E9",high:"#E8A87C",inter:"#BB8FCE"};
const ADS = [
  "📢 یہ ایپ مکمل مفت ہے — ہمیشہ رہے گی!",
  "💡 دوستوں کو بھی بتائیں — WhatsApp پر شیئر کریں",
  "🎓 پاکستان کے ہر بچے کی تعلیم ہمارا مقصد",
  "📱 اپنے اسکول گروپ میں لنک بھیجیں!",
];
function Ad({mt=0,mb=14}){
  const m=ADS[Math.floor(Math.random()*ADS.length)];
  return <div style={{background:"#1C2A1C",border:"1px solid #2A4A2A",borderRadius:10,
    padding:"9px 14px",fontSize:12,color:"#82E0AA",textAlign:"center",direction:"rtl",
    marginTop:mt,marginBottom:mb}}>{m}</div>;
}

// ─── GENERATE HTML for download ──────────────────────────
function buildHTML(paper, showAnswers=false) {
  const sections = (paper.sections||[]).map(sec=>{
    const qs = (sec.questions||[]).map((q,qi)=>{
      let extra="";
      if(q.options){
        const opts=q.options.map((opt,oi)=>{
          const correct=showAnswers&&q.answer&&opt.startsWith(q.answer);
          return `<div class="opt${correct?" correct":""}">${opt}${correct?" ✓":""}</div>`;
        }).join("");
        extra=`<div class="opts">${opts}</div>`;
      }
      if(q.subparts) extra+=`<div class="subparts">${q.subparts.map(sp=>`<div class="sp">${sp}</div>`).join("")}</div>`;
      if(showAnswers&&q.answer_hint) extra+=`<div class="hint">✏️ جواب: ${q.answer_hint}</div>`;
      if(!showAnswers&&sec.type==="SHORT") extra+=`<div class="ansline">جواب: _________________________________________________<br/>__________________________________________________________</div>`;
      return `<div class="q"><div class="qrow"><span class="qno">${q.no}.</span><span class="qtext">${q.text}</span>${q.marks?`<span class="qm">(${q.marks})</span>`:""}</div>${extra}</div>`;
    }).join("");
    return `<div class="section">
      <div class="sechdr"><span class="sectitle">${sec.title}</span><span class="secm">(${sec.marks} نمبر)</span></div>
      ${sec.instruction?`<div class="instr">${sec.instruction}</div>`:""}
      ${qs}
    </div>`;
  }).join("");

  return `<!DOCTYPE html><html dir="rtl" lang="ur">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${paper.subject} — ${paper.examType||"پیپر"}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Noto Nastaliq Urdu','Georgia',serif;background:#f8f8f8;color:#222;padding:20px;max-width:800px;margin:0 auto;}
  .header{background:#fff;border:2px solid #1565C0;border-radius:12px;padding:20px;text-align:center;margin-bottom:16px;}
  .school{font-size:13px;color:#666;margin-bottom:4px;}
  .board{font-size:12px;color:#888;margin-bottom:12px;}
  .divider{height:1px;background:#ddd;margin:10px 0;}
  .title{font-size:22px;font-weight:900;color:#1565C0;margin-bottom:12px;}
  .meta{display:flex;justify-content:center;gap:20px;font-size:13px;color:#666;flex-wrap:wrap;margin-bottom:10px;}
  .topic{font-size:14px;color:#444;}
  .instrs{background:#f0f7ff;border-radius:8px;padding:10px 14px;margin-top:10px;text-align:right;}
  .instrs-title{font-size:12px;color:#1565C0;font-weight:700;margin-bottom:6px;}
  .instr-item{font-size:12px;color:#555;line-height:2;}
  .section{background:#fff;border:1px solid #ddd;border-radius:10px;padding:14px;margin-bottom:12px;}
  .sechdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
  .sectitle{font-size:15px;font-weight:700;color:#1565C0;}
  .secm{font-size:13px;color:#888;}
  .instr{font-size:12px;color:#888;margin-bottom:10px;border-right:2px solid #ddd;padding-right:8px;line-height:1.8;}
  .q{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0f0f0;}
  .q:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
  .qrow{display:flex;gap:8px;line-height:1.8;}
  .qno{color:#1565C0;font-weight:700;min-width:24px;flex-shrink:0;}
  .qtext{flex:1;font-size:14px;}
  .qm{color:#aaa;font-size:12px;flex-shrink:0;}
  .opts{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px;margin-right:24px;}
  .opt{font-size:13px;background:#f8f8f8;border:1px solid #eee;border-radius:6px;padding:5px 10px;}
  .opt.correct{background:#e8f5e9;border-color:#4caf50;color:#2e7d32;font-weight:700;}
  .subparts{margin-right:24px;margin-top:6px;}
  .sp{font-size:13px;color:#666;line-height:2;}
  .hint{margin-right:24px;margin-top:6px;background:#e8f5e9;border-radius:6px;padding:6px 10px;font-size:12px;color:#2e7d32;}
  .ansline{margin-right:24px;margin-top:8px;font-size:12px;color:#ccc;line-height:2.5;}
  .footer{text-align:center;font-size:11px;color:#bbb;padding:14px;margin-top:8px;}
  ${showAnswers?".answer-key-badge{display:inline-block;background:#e8f5e9;border:1px solid #4caf50;color:#2e7d32;border-radius:20px;padding:4px 12px;font-size:12px;margin-bottom:10px;}":""}
  @media print{body{padding:10px;}button{display:none!important;}}
</style></head><body>
<div class="header">
  <div class="school">${paper.school||"گورنمنٹ اسکول پاکستان"}</div>
  <div class="board">پنجاب کریکولم اینڈ ٹیکسٹ بک بورڈ</div>
  <div class="divider"></div>
  ${showAnswers?'<div class="answer-key-badge">🔑 جوابات سمیت (ٹیچر کاپی)</div>':""}
  <div class="title">${paper.subject} — ${paper.examType||"امتحانی پرچہ"}</div>
  <div class="meta">
    <span>📚 ${paper.class} (${paper.level})</span>
    <span>📊 کل نمبر: ${paper.totalMarks}</span>
    <span>⏱️ وقت: ${paper.time}</span>
  </div>
  <div class="divider"></div>
  <div class="topic">موضوع / نصاب: ${paper.topic}</div>
  ${paper.instructions?.length?`<div class="instrs"><div class="instrs-title">📌 ہدایات</div>${paper.instructions.map((ins,i)=>`<div class="instr-item">${i+1}. ${ins}</div>`).join("")}</div>`:""}
</div>
${sections}
<div class="footer">*** پرچہ ختم *** — PaperMaster AI — مفت سروس</div>
</body></html>`;
}

// ─── MAIN ────────────────────────────────────────────────
export default function PaperMaster() {
  const [screen,     setScreen]     = useState("splash");
  const [role,       setRole]       = useState(null);
  const [classId,    setClassId]    = useState(null);
  const [subject,    setSubject]    = useState(null);
  const [examType,   setExamType]   = useState(null);
  const [syllabus,   setSyllabus]   = useState(""); // custom syllabus text
  const [syllabusMode, setSyllabusMode] = useState("topic"); // topic | custom | chapters
  const [topic,      setTopic]      = useState("");
  const [chapters,   setChapters]   = useState([]); // selected chapter checkboxes
  const [customChaps,setCustomChaps]= useState(""); // free text chapters covered
  const [qtypes,     setQtypes]     = useState(["mcq","short"]);
  const [diff,       setDiff]       = useState("medium");
  const [marks,      setMarks]      = useState(50);
  const [schoolName, setSchoolName] = useState("");
  const [loading,    setLoading]    = useState(false);
  const [paper,      setPaper]      = useState(null);
  const [history,    setHistory]    = useState([]);
  const [error,      setError]      = useState("");
  const [showAns,    setShowAns]    = useState(false);
  const [practiceMode, setPracticeMode] = useState(false); // online practice
  const [answers,    setAnswers]    = useState({});
  const [submitted,  setSubmitted]  = useState(false);
  const [score,      setScore]      = useState(null);
  const dlRef = useRef(null);

  const classInfo = CLASSES.find(c=>c.id===classId);
  const level = classInfo?.level;
  const subs  = SUBJECTS[level]||[];
  const groups= [...new Set(CLASSES.map(c=>c.group))];
  const roleInfo = USER_ROLES.find(r=>r.id===role);

  const toggleQ = id => setQtypes(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);

  // Build the prompt based on syllabus mode
  const buildTopicStr = () => {
    if(syllabusMode==="topic") return topic;
    if(syllabusMode==="custom") return customChaps;
    return topic;
  };

  const generate = async () => {
    const topicStr = buildTopicStr();
    if(!classId||!subject||!topicStr.trim()){
      setError("کلاس، مضمون اور نصاب لازمی ہیں"); return;
    }
    if(qtypes.length===0){setError("کم از کم ایک سوال کی قسم چنیں"); return;}
    setError(""); setLoading(true); setPaper(null);

    const subName  = subs.find(s=>s.id===subject)?.name||subject;
    const clsLabel = classInfo?.label||classId;
    const lvlName  = {primary:"پرائمری",middle:"مڈل",high:"ہائی اسکول",inter:"انٹرمیڈیٹ"}[level];
    const examLabel= EXAM_TYPES.find(e=>e.id===examType)?.label||"امتحان";
    const qtNames  = qtypes.map(q=>QTYPES.find(x=>x.id===q)?.urdu).join("، ");
    const totalM   = (examType&&examType!=="custom") ? EXAM_TYPES.find(e=>e.id===examType)?.marks : marks;
    const timeStr  = (examType&&examType!=="custom") ? EXAM_TYPES.find(e=>e.id===examType)?.time  : "2 گھنٹے";

    const syllabusNote = syllabusMode==="custom"
      ? `IMPORTANT: Only make questions from these specific chapters/topics covered: "${topicStr}". Do NOT ask anything outside this covered syllabus.`
      : `Topic/Chapter: "${topicStr}"`;

    const prompt=`You are an expert Pakistani government school examination paper setter.
User: ${roleInfo?.label||"ٹیچر"} | Exam: ${examLabel} | Class: ${clsLabel} (${lvlName}) | Subject: ${subName}
${syllabusNote}
Question types: ${qtNames}
Difficulty: ${diff==="easy"?"آسان (age-appropriate easy)":diff==="medium"?"درمیانہ":diff==="hard"?"مشکل (challenging)":""}
Total Marks: ${totalM} | Time: ${timeStr}
School: ${schoolName||"گورنمنٹ اسکول پاکستان"}

Return ONLY valid JSON (no markdown):
{
  "title": "عنوان اردو میں",
  "school": "${schoolName||"گورنمنٹ اسکول"}",
  "subject": "${subName}",
  "class": "${clsLabel}",
  "level": "${lvlName}",
  "examType": "${examLabel}",
  "topic": "${topicStr}",
  "totalMarks": ${totalM},
  "time": "${timeStr}",
  "instructions": ["ہدایت 1","ہدایت 2","ہدایت 3"],
  "sections": [
    {
      "type": "MCQ",
      "title": "حصہ الف — کثیر انتخابی سوالات",
      "marks": 10,
      "instruction": "درست جواب پر دائرہ لگائیں",
      "questions": [
        {"no":1,"text":"سوال","options":["A. ","B. ","C. ","D. "],"answer":"A","marks":1}
      ]
    }
  ]
}
Only include sections for: ${qtypes.join(",")}
Make it age-appropriate for ${clsLabel}. Pakistan Punjab/Federal Board curriculum.
Every question MUST be strictly from the covered syllabus: "${topicStr}"
Include answer_hint for all non-MCQ questions.`;

    try{
      const apiKey = import.meta.env.VITE_GEMINI_KEY;
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contents:[{parts:[{text:prompt}]}],
          generationConfig:{temperature:0.7,maxOutputTokens:2000}})
      });
      const data=await res.json();
      const txt=data.candidates?.[0]?.content?.parts?.[0]?.text||"";
      const clean=txt.replace(/```json|```/g,"").trim();
      const parsed=JSON.parse(clean);
      setPaper(parsed);
      setAnswers({}); setSubmitted(false); setScore(null); setShowAns(false);
      setPracticeMode(false);
      setHistory(h=>[{...parsed,id:Date.now(),date:new Date().toLocaleDateString("ur-PK"),role},...h.slice(0,9)]);
      setScreen("preview");
    }catch(e){
      setError("دوبارہ کوشش کریں — انٹرنیٹ چیک کریں");
    }
    setLoading(false);
  };

  // Download paper as HTML
  const downloadPaper = (withAnswers=false) => {
    const html = buildHTML(paper, withAnswers);
    const blob = new Blob([html], {type:"text/html;charset=utf-8"});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url;
    a.download = `${paper.subject}_${paper.class}_${paper.examType||"paper"}_${withAnswers?"جوابات_سمیت":""}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Submit online practice
  const submitPractice = () => {
    let correct=0, total=0;
    paper.sections?.forEach(sec=>{
      if(sec.type==="MCQ"){
        sec.questions?.forEach(q=>{
          total++;
          const userAns = answers[`mcq_${q.no}`];
          if(userAns && q.answer && userAns===q.answer) correct++;
        });
      }
    });
    setScore({correct,total,pct:total>0?Math.round((correct/total)*100):0});
    setSubmitted(true);
    setShowAns(true);
  };

  const css=`
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#090B10;}
    .btn{background:linear-gradient(135deg,#1565C0,#42A5F5);color:#fff;border:none;border-radius:14px;
      padding:14px 20px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;
      transition:all 0.2s;width:100%;}
    .btn:hover{filter:brightness(1.1);transform:translateY(-1px);}
    .btn:active{transform:scale(0.97);}
    .btn:disabled{background:#1a1c24!important;color:#444;cursor:not-allowed;transform:none;}
    .btn-sm{background:#12141C;border:1px solid #1E2130;color:#9090A8;border-radius:10px;
      padding:8px 14px;font-size:13px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
    .btn-sm:hover{border-color:#42A5F533;color:#42A5F5;}
    .btn-green{background:linear-gradient(135deg,#1B5E20,#43A047);color:#fff;border:none;border-radius:12px;
      padding:12px 18px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;}
    .btn-green:hover{filter:brightness(1.1);}
    .btn-outline{background:none;border:1.5px solid #42A5F5;color:#42A5F5;border-radius:12px;
      padding:12px 18px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:all 0.2s;}
    .btn-outline:hover{background:#42A5F510;}
    .chip{background:#0E1018;border:1.5px solid #1A1D2A;color:#777;border-radius:20px;
      padding:8px 14px;font-size:13px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
    .chip.on{background:#1565C022;border-color:#42A5F5;color:#42A5F5;}
    .chip:hover{border-color:#42A5F530;}
    .card{background:#10121A;border:1px solid #1A1D2A;border-radius:16px;padding:16px;margin-bottom:10px;}
    .role-card{background:#10121A;border:2px solid #1A1D2A;border-radius:18px;padding:18px 12px;
      cursor:pointer;text-align:center;transition:all 0.2s;flex:1;}
    .role-card:hover{transform:translateY(-3px);}
    .subj{background:#10121A;border:1.5px solid #1A1D2A;border-radius:12px;padding:10px 6px;
      cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;
      font-family:inherit;transition:all 0.2s;}
    .subj:hover{transform:scale(1.04);}
    .subj.on{background:#1565C015;border-color:#42A5F5;}
    .inp{background:#10121A;border:1.5px solid #1A1D2A;border-radius:12px;color:#E0E0E0;
      font-size:15px;padding:13px 16px;width:100%;font-family:inherit;outline:none;transition:border 0.2s;}
    .inp:focus{border-color:#42A5F566;}
    .tab{background:#10121A;border:1px solid #1A1D2A;color:#777;border-radius:10px;
      padding:8px 16px;font-size:13px;cursor:pointer;font-family:inherit;transition:all 0.2s;}
    .tab.on{background:#1565C022;border-color:#42A5F5;color:#42A5F5;}
    .mcq-opt{background:#10121A;border:1.5px solid #1A1D2A;border-radius:10px;padding:10px 14px;
      cursor:pointer;font-size:13px;color:#A0A0B8;transition:all 0.2s;font-family:inherit;text-align:right;direction:auto;}
    .mcq-opt:hover{border-color:#42A5F533;}
    .mcq-opt.selected{background:#1565C022;border-color:#42A5F5;color:#42A5F5;}
    .mcq-opt.correct{background:#1B5E2022;border-color:#43A047;color:#81C784;}
    .mcq-opt.wrong{background:#B71C1C22;border-color:#EF5350;color:#EF9A9A;}
    @keyframes spin{to{transform:rotate(360deg);}}
    .spin{display:inline-block;width:16px;height:16px;border:2px solid #fff4;
      border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;}
    @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .up{animation:up 0.3s ease;}
    @media print{.noprint{display:none!important;}}
  `;

  const S={
    root:{minHeight:"100vh",background:"#090B10",color:"#E0E0E0",
      fontFamily:"'Georgia','Noto Nastaliq Urdu',serif",maxWidth:500,margin:"0 auto",
      display:"flex",flexDirection:"column"},
    bar:{display:"flex",alignItems:"center",justifyContent:"space-between",
      padding:"13px 16px",borderBottom:"1px solid #10121A"},
    barT:{fontSize:16,fontWeight:700},
    body:{padding:"14px",flex:1,overflowY:"auto"},
    lbl:{fontSize:13,fontWeight:700,color:"#5060A0",marginBottom:9,display:"block",direction:"rtl"},
    sec:{marginBottom:20},
    row:{display:"flex",flexWrap:"wrap",gap:8},
    err:{background:"#2a0808",border:"1px solid #ef4444",color:"#ef4444",
      borderRadius:10,padding:"10px 14px",fontSize:13,marginBottom:12,direction:"rtl"},
    acc:"#42A5F5",
  };

  // ── SPLASH ─────────────────────────────────────────────
  if(screen==="splash") return(
    <div style={{...S.root,alignItems:"center",justifyContent:"center",textAlign:"center",padding:"0 20px"}}>
      <style>{css}</style>
      <div style={{fontSize:68,marginBottom:14}}>📋</div>
      <div style={{fontSize:28,fontWeight:900,
        background:"linear-gradient(135deg,#1565C0,#42A5F5,#82E0AA)",
        WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:6}}>
        PaperMaster AI
      </div>
      <div style={{color:"#444",fontSize:13,marginBottom:6}}>پاکستان کا مفت تعلیمی پلیٹ فارم</div>
      <div style={{display:"flex",gap:8,marginBottom:36,flexWrap:"wrap",justifyContent:"center"}}>
        {["🆓 بالکل مفت","📚 کلاس 1-12","🏛️ پنجاب بورڈ","⬇️ ڈاؤنلوڈ","🖥️ آن لائن مشق"].map(t=>(
          <span key={t} style={{background:"#10121A",border:"1px solid #1A1D2A",
            borderRadius:20,padding:"5px 11px",fontSize:11,color:"#606080"}}>{t}</span>
        ))}
      </div>
      <button className="btn" onClick={()=>setScreen("role")} style={{maxWidth:260}}>شروع کریں ✨</button>
      <div style={{marginTop:12,color:"#2a2a3a",fontSize:11}}>کوئی رجسٹریشن نہیں • کوئی پیسہ نہیں</div>
    </div>
  );

  // ── ROLE ───────────────────────────────────────────────
  if(screen==="role") return(
    <div style={S.root}>
      <style>{css}</style>
      <div style={S.bar}>
        <button className="btn-sm" onClick={()=>setScreen("splash")}>← واپس</button>
        <div style={S.barT}>آپ کون ہیں؟</div>
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
            <div key={r.id} className="role-card"
              onClick={()=>setRole(r.id)}
              style={{borderColor:role===r.id?r.color:"#1A1D2A",
                background:role===r.id?r.color+"12":"#10121A"}}>
              <div style={{fontSize:36,marginBottom:8}}>{r.icon}</div>
              <div style={{fontSize:14,fontWeight:700,
                color:role===r.id?r.color:"#C0C0C0",marginBottom:3}}>{r.label}</div>
              <div style={{fontSize:10,color:"#444"}}>
                {r.id==="student"?"اپنی مشق کے لیے":r.id==="parent"?"گھر میں ٹیسٹ لیں":
                 r.id==="teacher"?"کلاس ٹیسٹ بنائیں":"باقاعدہ امتحان"}
              </div>
            </div>
          ))}
        </div>
        {role==="school"&&(
          <div style={{...S.sec}} className="up">
            <label style={S.lbl}>🏫 اسکول کا نام</label>
            <input className="inp" value={schoolName} onChange={e=>setSchoolName(e.target.value)}
              placeholder="گورنمنٹ ہائی اسکول لاہور" dir="rtl"/>
          </div>
        )}
        {role&&(
          <button className="btn up" onClick={()=>setScreen("builder")}>آگے بڑھیں →</button>
        )}
      </div>
    </div>
  );

  // ── BUILDER ────────────────────────────────────────────
  if(screen==="builder") return(
    <div style={S.root}>
      <style>{css}</style>
      <div style={S.bar}>
        <button className="btn-sm" onClick={()=>setScreen("role")}>← واپس</button>
        <div style={S.barT}>{roleInfo?.icon} پیپر بنائیں</div>
        {history.length>0&&<button className="btn-sm" onClick={()=>setScreen("history")}>📂 {history.length}</button>}
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
                  {e.id!=="custom"&&<div style={{fontSize:10,color:"#555"}}>{e.marks}نمبر • {e.time}</div>}
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
                      onClick={()=>{setClassId(c.id);setSubject(null);}}
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
                  onClick={()=>setSubject(s.id)}>
                  <span style={{fontSize:22}}>{s.icon}</span>
                  <span style={{fontSize:11,color:"#777"}}>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SYLLABUS MODE */}
        {subject&&(
          <div style={S.sec} className="up">
            <label style={S.lbl}>📋 نصاب کا طریقہ</label>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              {[
                {id:"topic",  label:"ایک موضوع",    icon:"🎯"},
                {id:"custom", label:"جو پڑھا وہ",  icon:"📚"},
              ].map(t=>(
                <button key={t.id} className={`tab${syllabusMode===t.id?" on":""}`}
                  onClick={()=>setSyllabusMode(t.id)}
                  style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px"}}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>

            {syllabusMode==="topic"&&(
              <div className="up">
                <input className="inp" value={topic} onChange={e=>setTopic(e.target.value)}
                  placeholder="مثلاً: نظم آزادی، Fractions، Newton Laws، خلیہ..."
                  dir="auto"/>
                <div style={{fontSize:11,color:"#333",marginTop:5,direction:"rtl"}}>
                  💡 ایک باب یا موضوع لکھیں
                </div>
              </div>
            )}

            {syllabusMode==="custom"&&(
              <div className="up">
                <div style={{fontSize:12,color:"#5060A0",marginBottom:8,direction:"rtl",lineHeight:1.8}}>
                  ✏️ ابھی تک جو ابواب / موضوعات پڑھے ہیں وہ لکھیں — صرف انہی میں سے پیپر بنے گا:
                </div>
                <textarea className="inp"
                  value={customChaps}
                  onChange={e=>setCustomChaps(e.target.value)}
                  placeholder={"مثلاً:\nباب 1: نظم وطن\nباب 2: حمد و نعت\nباب 3: مضمون نویسی\n\nیا: Chapter 1 Motion, Chapter 2 Force, Chapter 3 Energy"}
                  dir="auto"
                  rows={5}
                  style={{resize:"vertical",lineHeight:1.8}}/>
                <div style={{fontSize:11,color:"#333",marginTop:5,direction:"rtl"}}>
                  💡 جتنا لکھیں گے، پیپر اتنا ہی نصاب کے مطابق بنے گا
                </div>
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
              min={10} max={100} step={5} value={marks} onChange={e=>setMarks(Number(e.target.value))}/>
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
          مفت • کوئی رجسٹریشن نہیں • فوری نتیجہ
        </div>
      </div>
    </div>
  );

  // ── HISTORY ────────────────────────────────────────────
  if(screen==="history") return(
    <div style={S.root}>
      <style>{css}</style>
      <div style={S.bar}>
        <button className="btn-sm" onClick={()=>setScreen("builder")}>← واپس</button>
        <div style={S.barT}>📂 پچھلے پیپر ({history.length})</div>
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
          <div key={h.id} className="card up" style={{cursor:"pointer"}}
            onClick={()=>{setPaper(h);setAnswers({});setSubmitted(false);setScore(null);
              setShowAns(false);setPracticeMode(false);setScreen("preview");}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{color:S.acc,fontWeight:700,fontSize:13}}>{h.subject} — {h.class}</span>
              <span style={{color:"#333",fontSize:11}}>{h.date}</span>
            </div>
            <div style={{fontSize:13,color:"#B0B0C0",direction:"rtl",marginBottom:4}}>{h.topic}</div>
            <div style={{fontSize:11,color:"#444",display:"flex",gap:8,flexWrap:"wrap"}}>
              <span>{h.examType}</span><span>{h.totalMarks}نمبر</span>
              <span>{USER_ROLES.find(r=>r.id===h.role)?.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PREVIEW ────────────────────────────────────────────
  if(screen==="preview"&&paper){
    const hasMCQ = paper.sections?.some(s=>s.type==="MCQ");
    return(
      <div style={S.root}>
        <style>{css}</style>
        <div style={S.bar} className="noprint">
          <button className="btn-sm" onClick={()=>setScreen("builder")}>← واپس</button>
          <div style={{...S.barT,color:"#82E0AA",fontSize:14}}>✅ پیپر تیار</div>
          <button className="btn-sm" onClick={()=>window.print()}>🖨️</button>
        </div>

        <Ad mt={10} mb={0}/>

        {/* Action buttons */}
        <div style={{padding:"10px 14px",display:"flex",gap:8,flexWrap:"wrap"}} className="noprint">
          {/* Practice toggle */}
          {hasMCQ&&!submitted&&(
            <button className={practiceMode?"btn-green":"btn-outline"}
              onClick={()=>{setPracticeMode(p=>!p);setAnswers({});}}
              style={{flex:1,padding:"10px",fontSize:13}}>
              {practiceMode?"❌ مشق بند کریں":"🖥️ آن لائن مشق کریں"}
            </button>
          )}
          {/* Answer key - teacher/school/parent only */}
          {(role==="teacher"||role==="school"||role==="parent")&&!practiceMode&&(
            <button className="btn-sm"
              onClick={()=>setShowAns(a=>!a)}
              style={{flex:1,padding:"10px",
                color:showAns?"#82E0AA":"#9090A8",
                borderColor:showAns?"#82E0AA44":"#1A1D2A"}}>
              {showAns?"🔑 چھپائیں":"🔑 جوابات"}
            </button>
          )}
          <button className="btn-sm" onClick={()=>setScreen("history")} style={{padding:"10px 12px"}}>📂</button>
        </div>

        {/* Download buttons */}
        <div style={{padding:"0 14px 10px",display:"flex",gap:8}} className="noprint">
          <button className="btn-sm" onClick={()=>downloadPaper(false)}
            style={{flex:1,padding:"10px",color:"#42A5F5",borderColor:"#42A5F533"}}>
            ⬇️ پیپر ڈاؤنلوڈ
          </button>
          {(role==="teacher"||role==="school")&&(
            <button className="btn-sm" onClick={()=>downloadPaper(true)}
              style={{flex:1,padding:"10px",color:"#82E0AA",borderColor:"#82E0AA33"}}>
              ⬇️ جوابات سمیت
            </button>
          )}
        </div>

        {/* Score card */}
        {submitted&&score&&(
          <div style={{margin:"0 14px 10px",background:score.pct>=60?"#1B5E2022":"#B71C1C22",
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
            <div style={{fontSize:12,color:"#555",marginTop:6}}>
              {score.pct>=80?"شاندار! بہترین کارکردگی 🌟":
               score.pct>=60?"اچھا! مزید مشق کریں 📚":
               "مزید پڑھیں اور دوبارہ کوشش کریں 💪"}
            </div>
          </div>
        )}

        {/* Paper content */}
        <div style={{flex:1,overflowY:"auto",padding:"0 14px 14px"}}>
          {/* Header */}
          <div style={{background:"#10121A",border:"1px solid #1A1D2A",
            borderRadius:14,padding:"16px",marginBottom:10,textAlign:"center"}}>
            <div style={{fontSize:11,color:"#333",marginBottom:3}}>
              {paper.school||"گورنمنٹ اسکول پاکستان"}
            </div>
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

          {/* Sections */}
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

                  {/* MCQ - practice mode */}
                  {q.options&&sec.type==="MCQ"&&(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8,marginRight:22}}>
                      {q.options.map((opt,oi)=>{
                        const letter = opt.split(".")[0].trim();
                        const isSelected = answers[`mcq_${q.no}`]===letter;
                        const isCorrect  = submitted && q.answer===letter;
                        const isWrong    = submitted && isSelected && !isCorrect;
                        const showGreen  = showAns && q.answer===letter;
                        return(
                          <button key={oi}
                            className={`mcq-opt${isSelected&&!submitted?" selected":""}${isCorrect||showGreen?" correct":""}${isWrong?" wrong":""}`}
                            onClick={()=>{
                              if(submitted||!practiceMode) return;
                              setAnswers(a=>({...a,[`mcq_${q.no}`]:letter}));
                            }}
                            style={{cursor:practiceMode&&!submitted?"pointer":"default"}}>
                            {opt}
                            {(isCorrect||showGreen)&&" ✓"}
                            {isWrong&&" ✗"}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* MCQ static (no practice) */}
                  {q.options&&sec.type!=="MCQ"&&(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8,marginRight:22}}>
                      {q.options.map((opt,oi)=>{
                        const isCorrect=showAns&&q.answer&&opt.startsWith(q.answer);
                        return(
                          <div key={oi} style={{fontSize:12,color:isCorrect?"#82E0AA":"#7080A0",
                            background:isCorrect?"#1B5E2022":"#090B10",
                            border:`1px solid ${isCorrect?"#43A04744":"#1A1D2A"}`,
                            borderRadius:8,padding:"6px 10px",direction:"auto"}}>
                            {opt}{isCorrect&&" ✓"}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Subparts */}
                  {q.subparts&&(
                    <div style={{marginRight:22,marginTop:6}}>
                      {q.subparts.map((sp,spi)=>(
                        <div key={spi} style={{fontSize:12,color:"#5060A0",lineHeight:2}}>{sp}</div>
                      ))}
                    </div>
                  )}

                  {/* Answer hint */}
                  {showAns&&q.answer_hint&&(
                    <div style={{marginRight:22,marginTop:6,background:"#0A1A0A",
                      border:"1px solid #43A04722",borderRadius:8,padding:"6px 10px"}}>
                      <span style={{fontSize:11,color:"#43A047"}}>✏️ جواب: </span>
                      <span style={{fontSize:12,color:"#81C784",direction:"rtl"}}>{q.answer_hint}</span>
                    </div>
                  )}

                  {/* Answer lines */}
                  {!showAns&&!practiceMode&&sec.type==="SHORT"&&(
                    <div style={{marginRight:22,marginTop:7}}>
                      {["جواب: _________________________________________________",
                        "________________________________________________________"].map((l,i)=>(
                        <div key={i} style={{fontSize:11,color:"#1E1E2A",marginBottom:2}}>{l}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div style={{textAlign:"center",fontSize:10,color:"#1E1E2A",padding:"10px 0"}}>
            *** پرچہ ختم *** — PaperMaster AI — مفت سروس
          </div>
        </div>

        {/* Bottom actions */}
        <div style={{display:"flex",gap:8,padding:"10px 14px 16px",
          borderTop:"1px solid #10121A"}} className="noprint">
          {practiceMode&&!submitted&&(
            <button className="btn-green"
              onClick={submitPractice}
              style={{flex:2}}>
              ✅ جمع کریں اور نتیجہ دیکھیں
            </button>
          )}
          {(!practiceMode||submitted)&&(
            <button className="btn" onClick={()=>{
              setPaper(null);setTopic("");setCustomChaps("");
              setExamType(null);setScreen("builder");
            }} style={{flex:1}}>✨ نیا پیپر</button>
          )}
          {submitted&&(
            <button className="btn-sm" onClick={()=>{
              setAnswers({});setSubmitted(false);setScore(null);
              setShowAns(false);setPracticeMode(true);
            }} style={{padding:"13px 14px",fontSize:13}}>🔄 دوبارہ</button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
