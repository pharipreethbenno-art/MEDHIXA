import {useMemo,useState} from 'react';
import {Home,BookOpen,GraduationCap, Bot,Library,ClipboardCheck,FileText,Search,User,Menu,X,ChevronRight,ArrowLeft,CheckCircle2,Send,BookMarked,Globe2} from 'lucide-react';
type Board={id:string;label:string;classes:number[];};
type Subject={id:string;label:string;};
type Book={id:string;title:string;parts:string[];};
type Chapter={id:string;title:string;summary:string;};
const boards:Board[]=[
{id:'cbse',label:'CBSE',classes:[1,2,3,4,5,6,7,8,9,10]},
{id:'cisce',label:'CISCE (ICSE/ISC)',classes:[1,2,3,4,5,6,7,8,9,10]},
{id:'telangana',label:'Telangana State Board',classes:[1,2,3,4,5,6,7,8,9,10]},
{id:'andhra',label:'Andhra Pradesh State Board',classes:[1,2,3,4,5,6,7,8,9,10]},
{id:'other',label:'Other board (content to be added)',classes:[1,2,3,4,5,6,7,8,9,10]}
];
const subjects:Subject[]=[{id:'maths',label:'Mathematics'},{id:'science',label:'Science'},{id:'social',label:'Social Studies'},{id:'english',label:'English'},{id:'telugu',label:'Telugu'},{id:'hindi',label:'Hindi'},{id:'computer',label:'Computer Science'}];
const sampleBooks:Record<string,Book[]>={cbse:[
{id:'ganita',title:'Ganita Prakash — Mathematics',parts:['Part 1','Part 2']},
{id:'ncert-science',title:'NCERT Science',parts:['Complete book']},
{id:'ncert-social',title:'NCERT Social Science',parts:['History','Geography','Civics']},
{id:'ncert-english',title:'NCERT English',parts:['Complete book']}
]};
const sampleChapters:Record<string,Chapter[]>={ganita:[
{id:'ch1',title:'A Square and A Cube',summary:'Explore square numbers, cube numbers and their patterns.'},
{id:'ch2',title:'Power Play',summary:'Understand powers, exponents and patterns in numbers.'},
{id:'ch3',title:'A Story of Numbers',summary:'Explore number patterns and mathematical reasoning.'}
],'ncert-science':[
{id:'s1',title:'Crop Production and Management',summary:'Learn about agricultural practices and crop care.'},
{id:'s2',title:'Microorganisms: Friend and Foe',summary:'Discover useful and harmful microorganisms.'}
],'ncert-social':[
{id:'ss1',title:'How, When and Where',summary:'An introduction to how historians study the past.'},
{id:'ss2',title:'From Trade to Territory',summary:'Explore the expansion of company rule in India.'}
]};
const menu=[['Home',Home],['Class 1',BookOpen],['Class 2',BookOpen],['Class 3',BookOpen],['Class 4',BookOpen],['Class 5',BookOpen],['Class 6',BookOpen],['Class 7',BookOpen],['Class 8',BookOpen],['Class 9',BookOpen],['Class 10',BookOpen],['AI Study Assistant',Bot],['All Boards',Globe2],['All Subjects',Library],['Textbook Library',BookMarked],['Worksheets',FileText],['Mock Tests',ClipboardCheck],['Practice Questions',CheckCircle2],['Search',Search],['My Profile',User]] as const;
export default function App(){
 const [page,setPage]=useState('Home'),[mobile,setMobile]=useState(false),[board,setBoard]=useState('cbse'),[grade,setGrade]=useState(8),[subject,setSubject]=useState('maths'),[book,setBook]=useState('ganita'),[part,setPart]=useState('Part 1'),[chapter,setChapter]=useState('ch1'),[query,setQuery]=useState(''),[answer,setAnswer]=useState(''),[question,setQuestion]=useState(''),[chat,setChat]=useState<string[]>([]);
 const books=sampleBooks[board]||[];const selectedBook=books.find(b=>b.id===book)||books[0];const chapters=sampleChapters[book]||[];const selectedChapter=chapters.find(c=>c.id===chapter)||chapters[0];
 const availableSubjects=subjects;
 const filtered=useMemo(()=>[...boards.map(x=>x.label),...subjects.map(x=>x.label),...Object.values(sampleBooks).flat().map(x=>x.title),...Object.values(sampleChapters).flat().map(x=>x.title)].filter(x=>x.toLowerCase().includes(query.toLowerCase())),[query]);
 function chooseMenu(label:string){setPage(label);setMobile(false);if(label.startsWith('Class ')){setGrade(Number(label.slice(6)));setPage('Learning Library');}}
 function sendQuestion(){if(!question.trim())return;setChat(c=>[...c,`You: ${question}`,`Study Tree: The AI service is not connected yet. Add your approved AI provider key to a secure backend to enable real answers. For now, use the chapter notes and practice resources.`]);setQuestion('');}
 return <div className="app">
 <aside className={`sidebar ${mobile?'show':''}`}><div className="brand"><div className="brand-icon"><GraduationCap/></div><div><b>THE STUDY TREE</b><small>LEARN • PRACTISE • ACHIEVE</small></div><button className="close mobile-only" onClick={()=>setMobile(false)}><X/></button></div><div className="menu-label">MAIN MENU</div><nav>{menu.map(([label,Icon])=><button key={label} className={`nav-item ${page===label?'active':''}`} onClick={()=>chooseMenu(label)}><Icon size={18}/><span>{label}</span>{label==='AI Study Assistant'&&<span className="new">AI</span>}</button>)}</nav><div className="sidebar-foot">Made by <b>Haripreeth</b></div></aside>
 <main className="main"><header><button className="mobile-only menu-toggle" onClick={()=>setMobile(true)}><Menu/></button><div className="crumb">THE STUDY TREE <ChevronRight size={14}/><b>{page}</b></div><div className="header-right"><span className="status-dot"/> Learning platform</div></header>
 {page==='AI Study Assistant'?<section className="content"><div className="page-title"><div><span className="eyebrow">YOUR LEARNING COMPANION</span><h1>AI Study Assistant</h1><p>Ask a question about a lesson, concept or practice problem.</p></div><div className="hero-icon"><Bot/></div></div><div className="chat-panel"><div className="chat-top"><Bot/> <b>Study Tree AI</b><span className="pill warning">Not connected yet</span></div><div className="chat-messages">{chat.length?chat.map((m,i)=><p key={i} className={m.startsWith('You:')?'user-msg':'bot-msg'}>{m}</p>):<div className="empty-chat"><Bot size={34}/><b>What would you like to learn today?</b><span>Real AI answers will be enabled after a secure AI backend is configured.</span></div>}</div><div className="chat-input"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendQuestion()} placeholder="Ask a study question…"/><button onClick={sendQuestion}><Send size={17}/> Send</button></div></div></section>
 :page==='Search'?<section className="content"><div className="page-title"><div><span className="eyebrow">FIND LEARNING CONTENT</span><h1>Search Study Tree</h1><p>Search the currently loaded boards, books and sample chapters.</p></div></div><div className="search-box"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search subjects, books or chapters…"/></div><div className="result-list">{query&&filtered.map(x=><div className="result" key={x}>{x}<ChevronRight/></div>)}{query&&!filtered.length&&<p>No matching sample content found.</p>}</div></section>
 :page==='Home'||page==='Learning Library'||page==='All Boards'||page==='All Subjects'||page==='Textbook Library'||page==='Worksheets'||page==='Mock Tests'||page==='Practice Questions'||page==='My Profile'?<section className="content"><div className="page-title"><div><span className="eyebrow">A SMARTER WAY TO LEARN</span><h1>{page==='Home'?'Welcome to Study Tree':page}</h1><p>Choose your curriculum and follow the learning path to your chapter.</p></div><div className="hero-icon"><GraduationCap/></div></div>
 <div className="stats"><div><span>01</span><b>Choose a board</b><small>Curriculum</small></div><div><span>02</span><b>Select a class</b><small>Classes 1–10</small></div><div><span>03</span><b>Open a chapter</b><small>Learn & practise</small></div></div>
 <div className="section-heading"><div><h2>Start learning</h2><p>Select each option to load its available content.</p></div></div>
 <div className="selection-grid"><label>Education board<select value={board} onChange={e=>{setBoard(e.target.value);setBook('');setChapter('');}}>{boards.map(b=><option key={b.id} value={b.id}>{b.label}</option>)}</select></label><label>Class<select value={grade} onChange={e=>setGrade(Number(e.target.value))}>{Array.from({length:10},(_,i)=>i+1).map(n=><option key={n} value={n}>Class {n}</option>)}</select></label><label>Subject<select value={subject} onChange={e=>setSubject(e.target.value)}>{availableSubjects.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}</select></label><label>Textbook<select value={book} onChange={e=>{setBook(e.target.value);setChapter('');}}><option value="">Choose available textbook</option>{books.map(b=><option key={b.id} value={b.id}>{b.title}</option>)}</select></label><label>Book part<select value={part} onChange={e=>setPart(e.target.value)}>{(selectedBook?.parts||['Not available']).map(p=><option key={p}>{p}</option>)}</select></label></div>
 <div className="section-heading"><div><h2>Chapters</h2><p>{selectedBook?`${selectedBook.title} • ${part}`:'Choose a board and textbook to see available sample chapters.'}</p></div></div>
 {chapters.length?<div className="chapter-grid">{chapters.map((c,i)=><button className={`chapter-card ${chapter===c.id?'chosen':''}`} key={c.id} onClick={()=>setChapter(c.id)}><span className="chapter-num">CHAPTER {i+1}</span><b>{c.title}</b><small>{c.summary}</small><span className="open-link">Open chapter <ChevronRight size={15}/></span></button>)}</div>:<div className="notice"><BookOpen/><div><b>Content not added yet</b><p>There are no verified textbook entries for this board, class and subject combination yet. The selector is ready; add the correct book and chapter data before publishing this content.</p></div></div>}
 {selectedChapter&&<div className="chapter-detail"><div className="section-heading"><div><span className="eyebrow">SELECTED CHAPTER</span><h2>{selectedChapter.title}</h2><p>{selectedChapter.summary}</p></div></div><div className="resource-grid"><article><BookOpen/><b>Chapter overview</b><p>{selectedChapter.summary}</p></article><article><FileText/><b>Explanations & notes</b><p>Original lesson notes can be added by the content editor.</p></article><article><CheckCircle2/><b>Step-by-step solutions</b><p>Add original worked solutions for this chapter.</p></article><article><ClipboardCheck/><b>Practice & tests</b><p>Question sets and answer keys can be attached here.</p></article></div></div>}
 <div className="footer-note">Made by Haripreeth • Content availability varies by board, class and textbook.</div></section>:<section className="content"><h1>{page}</h1><p>Choose a section from the learning library.</p></section>}
 </main></div>;
}