import { useState } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  Flame,
  MapPin,
  Menu,
  Navigation,
  Phone,
  Share2,
  Star,
  Utensils,
  X,
} from "lucide-react";

const red = "#c8442e";

export function PizzaPubProfile() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const feedback = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: "Pizza Pub · Garden Town", text: "Pizza Pub in Garden Town, Multan", url: window.location.href });
    } else {
      await navigator.clipboard?.writeText(window.location.href);
      feedback("Profile link copied");
    }
  };

  return (
    <main className="pizza-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap');
        :root { --ink:#252422; --paper:#f7f1e8; --cream:#fffaf1; --tomato:#c8442e; --mustard:#e8a83e; --sage:#809b72; --line:#dfd2c0; }
        * { box-sizing:border-box; } html { scroll-behavior:smooth; }
        body { margin:0; background:var(--paper); color:var(--ink); font-family:Manrope,sans-serif; }
        .pizza-page { min-height:100vh; overflow:hidden; background:radial-gradient(circle at 90% 4%,#f5dfb9 0,transparent 25%),var(--paper); }
        .topbar { height:72px; display:flex; justify-content:space-between; align-items:center; max-width:1220px; margin:auto; padding:0 28px; }
        .brand { display:flex; align-items:center; gap:11px; text-decoration:none; color:var(--ink); font-family:Syne,sans-serif; font-size:18px; }
        .brand-mark { width:33px;height:33px;border-radius:50%;background:var(--tomato); color:#fff6e7; display:grid;place-items:center; font-size:14px; transform:rotate(-8deg); }
        .top-actions { display:flex; gap:10px; align-items:center; }
        .ghost-btn,.save-btn { border:1px solid var(--line); background:rgba(255,250,241,.65); color:var(--ink); border-radius:999px; padding:10px 14px; display:flex;align-items:center;gap:8px; font:600 12px Manrope; cursor:pointer; transition:transform .2s,background .2s; }
        .ghost-btn:hover,.save-btn:hover { transform:translateY(-2px); background:var(--cream); } .save-btn.is-saved { color:var(--tomato); border-color:#e5a095; background:#fff0e9; }
        .hero { max-width:1220px; margin:auto; padding:18px 28px 0; display:grid; grid-template-columns:1.12fr .88fr; gap:34px; align-items:end; }
        .eyebrow { color:var(--tomato); font:500 11px 'DM Mono',monospace; letter-spacing:.15em; text-transform:uppercase; margin:0 0 18px; }
        h1 { font:800 clamp(52px,8vw,108px)/.87 Syne,sans-serif; letter-spacing:-.075em; margin:0; max-width:650px; }
        .dek { max-width:470px; font-size:16px; line-height:1.65; margin:27px 0 25px; color:#655d53; }
        .status-line { display:flex;align-items:center;gap:12px; font-size:13px; font-weight:700; } .open-dot { width:8px;height:8px;background:#5b9254;border-radius:50%; box-shadow:0 0 0 5px #dbe8d6; margin-left:4px; }
        .hero-art { height:415px; border-radius:24px 24px 4px 24px; overflow:hidden; position:relative; background:#dbb068; box-shadow:16px 16px 0 #ead8bd; animation:rise .75s ease both; }
        .hero-art img { width:100%;height:100%;object-fit:cover; display:block; mix-blend-mode:multiply; filter:saturate(1.12) contrast(1.04); }
        .art-stamp { position:absolute; right:18px; top:18px; width:82px;height:82px;border-radius:50%; border:1px dashed #fff2d6; color:#fff2d6; display:grid;place-items:center;text-align:center; font:500 10px 'DM Mono'; line-height:1.25; transform:rotate(12deg); }
        .hero-actions { display:flex; gap:10px; margin-top:30px; flex-wrap:wrap; } .primary { background:var(--tomato);color:#fff8e8;border:0; padding:14px 21px;border-radius:5px;font:700 13px Manrope;cursor:pointer; transition:transform .2s,background .2s; } .primary:hover { background:#a93527;transform:translateY(-2px); }
        .action-link { border:0; background:none; padding:14px 8px; color:var(--ink); font:700 13px Manrope; cursor:pointer;display:flex;gap:8px;align-items:center; }
        .tabbar { max-width:1220px;margin:64px auto 0;padding:0 28px; border-bottom:1px solid var(--line); display:flex;gap:30px; }
        .tab { border:0;background:none;padding:0 0 15px;font:700 12px 'DM Mono';text-transform:uppercase;letter-spacing:.08em;color:#958a7c;cursor:pointer;position:relative; } .tab.active {color:var(--tomato)} .tab.active:after {content:"";height:3px;background:var(--tomato);position:absolute;bottom:-1px;left:0;right:0;}
        .content { max-width:1220px;margin:auto;padding:45px 28px 90px; display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:60px; }
        .section { margin-bottom:63px; scroll-margin-top:24px; } .section-kicker { color:var(--tomato);font:500 10px 'DM Mono';letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px; } h2 { font:700 31px/1.08 Syne;margin:0 0 19px;letter-spacing:-.05em; } .section-intro {color:#766b5e;line-height:1.65;font-size:14px;max-width:590px;}
        .menu-feature { display:flex;min-height:166px;border:1px solid var(--line);background:var(--cream);border-radius:6px;overflow:hidden;margin-top:25px; } .menu-color { width:12px;background:var(--mustard); } .menu-copy {padding:23px;flex:1;} .menu-copy h3 {margin:7px 0 8px;font:700 21px Syne;} .menu-copy p {font-size:13px;color:#766b5e;margin:0;line-height:1.5;} .price {font:500 12px 'DM Mono';color:var(--tomato);margin-top:15px;display:block;} .menu-symbol {width:145px;background:#efe2ce;display:grid;place-items:center;color:var(--tomato);font:800 34px Syne;}
        .reveal { margin-top:12px; display:flex; align-items:center;gap:8px;color:var(--tomato);font:700 12px Manrope;background:none;border:0;cursor:pointer;padding:8px 0; } .extra-menu { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;animation:fade .3s ease; } .extra-item {padding:14px;background:#f1e8db;border-radius:4px;font-size:12px;font-weight:700;} .extra-item small {display:block;color:#8b7c6a;font-weight:500;margin-top:5px;}
        .info-grid { display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line); } .info-cell {background:var(--cream);padding:17px;} .info-cell span {display:block;color:#948878;font:500 10px 'DM Mono';text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;} .info-cell strong {font-size:13px;line-height:1.5;}
        .topics {display:flex;gap:8px;flex-wrap:wrap;margin-top:21px;} .topic {background:#e9dfd1;padding:9px 12px;border-radius:99px;font-size:12px;color:#63594f;} .review {background:var(--cream);padding:22px;border-left:4px solid var(--mustard);margin-top:21px;} .review p {font-family:Georgia,serif;font-size:17px;line-height:1.55;margin:0 0 15px;} .review-meta {display:flex;justify-content:space-between;font:500 11px 'DM Mono';color:#8d8170;}
        .side {position:relative;} .side-card {background:#26332c;color:#f7eee0;padding:25px;border-radius:5px;position:sticky;top:18px;} .side-card h3 {font:700 23px Syne;margin:0 0 20px;} .side-card p {font-size:13px;line-height:1.6;color:#c3c8b8;margin:0 0 21px;} .side-card .side-row {display:flex;gap:12px;padding:15px 0;border-top:1px solid #536056;font-size:12px;line-height:1.5;} .side-row svg {color:#e8a83e;flex:none;margin-top:2px;} .side-row a {color:#f7eee0;text-decoration:none;} .side-cta {width:100%;margin-top:14px;background:#e8a83e;color:#28332d;border:0;border-radius:3px;padding:14px;font:800 12px Manrope;cursor:pointer;transition:transform .2s;} .side-cta:hover{transform:translateY(-2px);}
        .nearby {display:flex;gap:12px;overflow:auto;padding-bottom:5px;} .near-card {min-width:170px;background:var(--cream);border:1px solid var(--line);padding:16px;border-radius:4px;} .near-card b{font:700 14px Syne;display:block;margin-bottom:7px;} .near-card span{font:11px 'DM Mono';color:#8c7d6c;}
        .toast {position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:#26332c;color:#fff3df;padding:13px 18px;border-radius:3px;font-size:12px;z-index:4;box-shadow:0 8px 30px #392b1d33;animation:fade .2s ease;}
        @keyframes rise {from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}} @keyframes fade {from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}
        @media(max-width:760px){.topbar{padding:0 18px}.top-actions .ghost-btn:first-child{display:none}.hero{padding:18px 18px 0;display:block}.hero-art{height:285px;margin-top:32px;box-shadow:9px 9px 0 #ead8bd}.tabbar{padding:0 18px;gap:22px;overflow:auto;margin-top:44px}.content{display:block;padding:35px 18px 70px}.side{margin-top:15px}.side-card{position:relative;top:auto}.info-grid{grid-template-columns:1fr}.extra-menu{grid-template-columns:1fr}.menu-symbol{width:90px}.dek{font-size:15px}}
      `}</style>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">PP</span><span>Pizza Pub <small style={{fontFamily:"DM Mono",fontSize:9,color:"#9b8c79"}}>/ MULTAN</small></span></a>
        <div className="top-actions">
          <button className="ghost-btn" onClick={() => feedback("Opening Facebook") }><Facebook size={14}/> facebook.com</button>
          <button className={`save-btn ${saved ? "is-saved" : ""}`} onClick={() => { setSaved(!saved); feedback(saved ? "Removed from saved places" : "Saved to your places"); }}><Bookmark size={15} fill={saved ? red : "none"}/>{saved ? "Saved" : "Save place"}</button>
        </div>
      </header>
      <div id="top" className="hero">
        <div>
          <p className="eyebrow">Fast food restaurant · Garden Town · Multan</p>
          <h1>Good food.<br/><span style={{color:red}}>No fuss.</span></h1>
          <p className="dek">The neighborhood pizza stop for loaded slices, late-night cravings, and the kind of chicken fajita people remember on the drive home.</p>
          <div className="status-line"><span className="open-dot"/> Open now <span style={{fontWeight:500,color:"#8c7c6a"}}>· Closes 3 AM</span></div>
          <div className="hero-actions"><button className="primary" onClick={() => document.getElementById("menu")?.scrollIntoView()}>See what’s good <ArrowUpRight size={15} style={{verticalAlign:"middle",marginLeft:6}}/></button><button className="action-link" onClick={() => window.location.href="tel:+923281999333"}><Phone size={15}/> Call +92 328 1999333</button></div>
        </div>
        <div className="hero-art"><img src="/__mockup/images/pizza-pub-hero.jpg" alt="Loaded chicken fajita pizza at Pizza Pub"/><div className="art-stamp">HOT<br/>FROM THE<br/>OVEN</div></div>
      </div>
      <nav className="tabbar" aria-label="Profile sections">
        {["overview","menu","reviews","details"].map(tab => <button key={tab} className={`tab ${activeTab===tab?"active":""}`} onClick={() => {setActiveTab(tab);document.getElementById(tab)?.scrollIntoView()}}>{tab}</button>)}
      </nav>
      <div className="content">
        <div>
          <section className="section" id="overview"><div className="section-kicker">The quick read</div><h2>Built for the “what should we eat?” moment.</h2><p className="section-intro">Pizza Pub keeps it simple: generous toppings, familiar comfort, and a kitchen that stays open when the rest of Garden Town is winding down. Come hungry, leave sorted.</p>
            <div className="info-grid" style={{marginTop:25}}><div className="info-cell"><span>Rating</span><strong><Star size={14} fill={red} color={red} style={{verticalAlign:"-2px",marginRight:4}}/> 4.2 <em style={{fontStyle:"normal",fontWeight:500,color:"#897d6e"}}>from 141 reviews</em></strong></div><div className="info-cell"><span>Spend</span><strong>Rs 1–1,000 <em style={{fontStyle:"normal",fontWeight:500,color:"#897d6e"}}>per person</em></strong></div></div>
          </section>
          <section className="section" id="menu"><div className="section-kicker">Worth ordering</div><h2>The ones locals point to.</h2><p className="section-intro">Start here if it’s your first visit. Both are full-volume, shareable, and best eaten while the cheese is still pulling.</p>
            <div className="menu-feature"><div className="menu-color"/><div className="menu-copy"><Flame size={16} color={red}/><h3>Chicken Fajita Pizza</h3><p>Smoky chicken, peppers, onions, and a lively fajita kick over a molten cheese base.</p><span className="price">LOCAL FAVOURITE</span></div><div className="menu-symbol">01</div></div>
            <div className="menu-feature"><div className="menu-color" style={{background:"#809b72"}}/><div className="menu-copy"><Utensils size={16} color={red}/><h3>Chicken Supreme Pizza</h3><p>The loaded classic: chicken, vegetables, extra toppings, and plenty of reason to share.</p><span className="price">THE BIG ORDER</span></div><div className="menu-symbol">02</div></div>
            <button className="reveal" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={15}/> : <Menu size={15}/>} {menuOpen ? "Hide more picks" : "Reveal more of the menu"} <ChevronDown size={14} style={{transform:menuOpen?"rotate(180deg)":"none"}}/></button>
            {menuOpen && <div className="extra-menu"><div className="extra-item">Macaroni Pasta<small>A recurring mention in the reviews.</small></div><div className="extra-item">Cold drinks & sides<small>For making the table feel complete.</small></div></div>}
          </section>
          <section className="section" id="reviews"><div className="section-kicker">From the table</div><h2>What keeps coming up.</h2><div className="topics"><span className="topic">macaroni pasta</span><span className="topic">fajita pizza</span><span className="topic">toppings</span><span className="topic">value for money</span></div>
            <div className="review"><p>“The fajita pizza was fresh and full of toppings. Good taste, good quantity, and worth the money.”</p><div className="review-meta"><span>Customer review</span><span>4 / 5</span></div></div>
            <button className="reveal" onClick={() => setReviewOpen(!reviewOpen)}>{reviewOpen ? "Show fewer reviews" : "Read more customer notes"} <ChevronDown size={14} style={{transform:reviewOpen?"rotate(180deg)":"none"}}/></button>
            {reviewOpen && <div className="review" style={{borderLeftColor:"#809b72"}}><p>“Macaroni pasta was surprisingly good. A relaxed place for a family meal and the portions feel fair.”</p><div className="review-meta"><span>Customer review</span><span>4 / 5</span></div></div>}
          </section>
          <section className="section" id="details"><div className="section-kicker">Good to know</div><h2>Find it. Reach it. Stay awhile.</h2><div className="info-grid"><div className="info-cell"><span>Address</span><strong>1 Tonsa House Rd, Garden Town,<br/>Multan, Pakistan</strong></div><div className="info-cell"><span>Services</span><strong>Dine-in · Drive-through<br/>No-contact delivery</strong></div></div></section>
          <section className="section"><div className="section-kicker">Around the corner</div><h2>Make a night of it.</h2><div className="nearby"><div className="near-card"><b>Shah Rukn-e-Alam</b><span>LANDMARK · NEARBY</span></div><div className="near-card"><b>Garden Town Market</b><span>SHOPPING · NEARBY</span></div><div className="near-card"><b>Multan Cantt</b><span>NEIGHBOURHOOD · NEARBY</span></div></div></section>
        </div>
        <aside className="side"><div className="side-card"><h3>Ready when<br/>you are.</h3><p>One tap for the next move. Pizza decisions should never need a meeting.</p><div className="side-row"><MapPin size={17}/><span>1 Tonsa House Rd<br/>Garden Town, Multan</span></div><div className="side-row"><Clock3 size={17}/><span><b style={{color:"#f7eee0"}}>Open</b> · Closes 3 AM<br/>Open late for the last slice.</span></div><button className="side-cta" onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Pizza+Pub+Garden+Town+Multan","_blank")}>Get directions <Navigation size={14} style={{verticalAlign:"-3px",marginLeft:5}}/></button><button className="side-cta" style={{background:"transparent",color:"#f7eee0",border:"1px solid #758172"}} onClick={share}><Share2 size={14} style={{verticalAlign:"-3px",marginRight:5}}/> Share profile</button></div></aside>
      </div>
      {notice && <div className="toast"><Check size={14} style={{verticalAlign:"-3px",marginRight:7}}/>{notice}</div>}
    </main>
  );
}