import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Crosshair,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Quote,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";

type MenuItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  note: string;
  available: boolean;
};

type CartItem = MenuItem & { quantity: number };

const menuItems: MenuItem[] = [
  {
    id: "pizza",
    name: "Pizza",
    category: "Pizzas",
    image: "/__mockup/images/pizza-pub-hero.jpg",
    note: "Menu details coming soon",
    available: true,
  },
  {
    id: "chicken-paratha-roll",
    name: "Chicken Paratha Roll",
    category: "Rolls",
    image: "/__mockup/images/pizza-pub-hero.jpg",
    note: "Menu details coming soon",
    available: true,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    category: "Fries",
    image: "/__mockup/images/pizza-pub-hero.jpg",
    note: "Menu details coming soon",
    available: true,
  },
  {
    id: "cheese-burger",
    name: "Cheese Burger",
    category: "Burgers",
    image: "/__mockup/images/pizza-pub-hero.jpg",
    note: "Menu details coming soon",
    available: true,
  },
];

const categoryList = ["Pizzas", "Burgers", "Rolls", "Fries", "Drinks", "Deals"];

const style = `
  .pwg-site {
    --ink: #25211e;
    --muted: #756b64;
    --cream: #fbf7f1;
    --paper: #fffdf9;
    --line: #eadfd4;
    --tomato: #c94a2f;
    --tomato-deep: #9c3424;
    --saffron: #efa93f;
    --sage: #557064;
    background: var(--cream);
    color: var(--ink);
    font-family: "DM Sans", ui-sans-serif, system-ui, sans-serif;
    overflow-x: hidden;
    min-width: 0;
  }
  .pwg-site * { box-sizing: border-box; }
  .pwg-site a { color: inherit; text-decoration: none; }
  .pwg-site button, .pwg-site input, .pwg-site select, .pwg-site textarea { font: inherit; }
  .pwg-site button { cursor: pointer; }
  .pwg-shell { width: min(1180px, calc(100% - 40px)); margin-inline: auto; }
  .pwg-kicker {
    display: inline-flex; align-items: center; gap: 8px; color: var(--tomato);
    font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase;
  }
  .pwg-kicker:before { content: ""; width: 22px; height: 2px; background: var(--saffron); }
  .pwg-heading {
    margin: 14px 0 0; font-family: Georgia, "Times New Roman", serif; font-weight: 700;
    letter-spacing: -.045em; line-height: .98; color: var(--ink);
  }
  .pwg-muted { color: var(--muted); }
  .pwg-topbar { background: var(--ink); color: #fef6e8; font-size: 12px; }
  .pwg-topbar-inner { min-height: 34px; display:flex; align-items:center; justify-content:space-between; gap: 18px; }
  .pwg-topbar strong { color: var(--saffron); font-weight: 800; }
  .pwg-topbar-note { display:flex; align-items:center; gap: 7px; }
  .pwg-nav {
    position: sticky; top: 0; z-index: 20; background: rgba(251,247,241,.93);
    border-bottom: 1px solid rgba(234,223,212,.88); backdrop-filter: blur(14px);
  }
  .pwg-nav-inner { min-height: 76px; display:flex; align-items:center; justify-content:space-between; gap: 24px; }
  .pwg-brand { display:inline-flex; align-items:center; gap: 10px; font-family: Georgia, serif; font-size: 20px; font-weight: 700; letter-spacing:-.04em; white-space:nowrap; }
  .pwg-brand-mark { position:relative; display:grid; place-items:center; width:38px; height:38px; border-radius:50%; background:var(--tomato); color:#fff8ee; font-family: "DM Sans", sans-serif; font-size:17px; font-weight:900; }
  .pwg-brand-mark:after { content:""; position:absolute; inset:5px; border:1px solid rgba(255,255,255,.45); border-radius:50%; }
  .pwg-navlinks { display:flex; align-items:center; gap: 27px; color:#615750; font-size:13px; font-weight:700; }
  .pwg-navlinks a { transition:color .2s ease; }
  .pwg-navlinks a:hover, .pwg-navlinks a:focus-visible { color:var(--tomato); }
  .pwg-order-pill, .pwg-btn-primary {
    display:inline-flex; align-items:center; justify-content:center; gap:9px; border:0; border-radius:999px;
    background:var(--tomato); color:#fff9f1; padding:13px 19px; font-size:13px; font-weight:800;
    box-shadow: 0 8px 22px rgba(156,52,36,.16); transition:transform .2s ease, background .2s ease, box-shadow .2s ease;
  }
  .pwg-order-pill:hover, .pwg-btn-primary:hover { transform: translateY(-2px); background:var(--tomato-deep); box-shadow:0 12px 25px rgba(156,52,36,.22); }
  .pwg-order-pill:active, .pwg-btn-primary:active { transform:translateY(0); }
  .pwg-menu-toggle { display:none; background:none; color:var(--ink); border:0; padding:8px; }
  .pwg-hero { position:relative; padding: 72px 0 94px; }
  .pwg-hero:before { content:""; position:absolute; width: 480px; height:480px; right:-250px; top:20px; border:1px solid rgba(201,74,47,.14); border-radius:50%; box-shadow:0 0 0 32px rgba(201,74,47,.025), 0 0 0 65px rgba(201,74,47,.018); pointer-events:none; }
  .pwg-hero-grid { display:grid; grid-template-columns: minmax(0, 1fr) minmax(390px, .92fr); align-items:center; gap: 62px; }
  .pwg-hero-copy { position:relative; z-index:1; }
  .pwg-hero h1 { max-width: 590px; font-size: clamp(47px, 6.2vw, 82px); }
  .pwg-hero-lede { max-width:490px; margin: 23px 0 0; color:var(--muted); font-size:16px; line-height:1.7; }
  .pwg-hero-lede strong { color:var(--ink); }
  .pwg-actions { display:flex; flex-wrap:wrap; gap:11px; margin-top: 28px; }
  .pwg-btn-secondary {
    display:inline-flex; align-items:center; justify-content:center; gap:9px; border:1px solid #d9c8ba; border-radius:999px;
    background:transparent; color:var(--ink); padding:12px 18px; font-size:13px; font-weight:800; transition:background .2s ease, border-color .2s ease, transform .2s ease;
  }
  .pwg-btn-secondary:hover { background:#f2e9dd; border-color:#bda996; transform:translateY(-2px); }
  .pwg-trust-row { display:flex; align-items:center; flex-wrap:wrap; gap: 17px; margin-top:31px; }
  .pwg-rating { display:flex; align-items:center; gap:7px; font-size:13px; font-weight:800; }
  .pwg-stars { display:flex; gap:2px; color:var(--saffron); }
  .pwg-stars svg { fill:currentColor; }
  .pwg-rating span { color:var(--muted); font-weight:600; }
  .pwg-dot { width:4px; height:4px; border-radius:50%; background:#c9b9aa; }
  .pwg-hero-art { position:relative; min-height: 435px; }
  .pwg-image-wrap { position:absolute; right:0; top:0; width:min(100%, 450px); aspect-ratio:1/1; border-radius: 45% 55% 48% 52% / 47% 42% 58% 53%; overflow:hidden; border:10px solid #f6eadc; box-shadow:0 22px 50px rgba(70,42,28,.15); transform:rotate(4deg); }
  .pwg-image-wrap img { width:100%; height:100%; object-fit:cover; transform:rotate(-4deg) scale(1.08); }
  .pwg-hero-sticker { position:absolute; left:10px; top:36px; z-index:2; width:112px; height:112px; display:grid; place-items:center; text-align:center; border-radius:50%; background:var(--saffron); color:#633d17; font-size:11px; font-weight:900; line-height:1.2; text-transform:uppercase; letter-spacing:.08em; transform:rotate(-11deg); box-shadow:0 8px 18px rgba(112,72,18,.15); }
  .pwg-hero-sticker:after { content:""; position:absolute; inset:7px; border:1px dashed rgba(99,61,23,.45); border-radius:50%; }
  .pwg-location-chip { position:absolute; right:10px; bottom:18px; z-index:2; display:flex; align-items:center; gap:10px; padding:12px 15px; border:1px solid rgba(234,223,212,.8); background:rgba(255,253,249,.93); border-radius:12px; box-shadow:0 12px 26px rgba(70,42,28,.12); font-size:12px; font-weight:800; }
  .pwg-location-chip svg { color:var(--tomato); }
  .pwg-band { background:var(--tomato); color:#fff7ec; }
  .pwg-quick { display:grid; grid-template-columns: repeat(4, 1fr); }
  .pwg-quick-item { display:flex; align-items:center; gap:13px; min-height:92px; padding:15px 24px; border-right:1px solid rgba(255,255,255,.2); }
  .pwg-quick-item:last-child { border-right:0; }
  .pwg-quick-icon { display:grid; place-items:center; width:35px; height:35px; border-radius:50%; background:rgba(255,255,255,.13); color:var(--saffron); flex:none; }
  .pwg-quick-label { display:block; color:rgba(255,247,236,.65); font-size:10px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; }
  .pwg-quick-value { display:block; margin-top:3px; font-size:13px; font-weight:800; line-height:1.3; }
  .pwg-section { padding: 98px 0; }
  .pwg-section-head { display:flex; align-items:end; justify-content:space-between; gap:25px; margin-bottom:35px; }
  .pwg-section-head h2 { font-size: clamp(38px, 4.6vw, 59px); }
  .pwg-section-intro { max-width:380px; color:var(--muted); font-size:14px; line-height:1.65; }
  .pwg-category-row { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:27px; }
  .pwg-category {
    border:1px solid var(--line); border-radius:999px; padding:9px 15px; background:transparent; color:var(--muted); font-size:12px; font-weight:800;
    transition:color .2s ease, border-color .2s ease, background .2s ease;
  }
  .pwg-category:hover, .pwg-category.active { border-color:var(--tomato); background:#f8e7dc; color:var(--tomato-deep); }
  .pwg-menu-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:15px; }
  .pwg-menu-card { overflow:hidden; border:1px solid var(--line); border-radius:15px; background:var(--paper); transition:transform .25s ease, box-shadow .25s ease; }
  .pwg-menu-card:hover { transform:translateY(-5px); box-shadow:0 17px 35px rgba(75,43,26,.1); }
  .pwg-card-img { position:relative; height:176px; overflow:hidden; background:#ecd8c8; }
  .pwg-card-img img { width:100%; height:100%; object-fit:cover; filter:saturate(.9); transition:transform .35s ease; }
  .pwg-menu-card:hover .pwg-card-img img { transform:scale(1.06); }
  .pwg-card-img:after { content:""; position:absolute; inset:0; background:linear-gradient(180deg, transparent 55%, rgba(37,33,30,.18)); pointer-events:none; }
  .pwg-category-tag { position:absolute; left:12px; top:12px; z-index:1; border-radius:999px; padding:5px 8px; background:#fff7e8; color:var(--tomato-deep); font-size:10px; font-weight:900; letter-spacing:.04em; text-transform:uppercase; }
  .pwg-card-body { padding:17px; }
  .pwg-card-body h3 { margin:0; font-family:Georgia, serif; font-size:20px; letter-spacing:-.03em; }
  .pwg-card-note { min-height:38px; margin:8px 0 16px; color:var(--muted); font-size:12px; line-height:1.5; }
  .pwg-card-foot { display:flex; align-items:center; justify-content:space-between; gap:10px; border-top:1px solid #f1e8df; padding-top:13px; }
  .pwg-price-note { color:#9b8a7d; font-size:11px; font-weight:700; }
  .pwg-add { display:inline-flex; align-items:center; gap:5px; border:0; border-radius:999px; padding:8px 10px; background:var(--ink); color:#fff7ed; font-size:11px; font-weight:800; transition:background .2s ease, transform .2s ease; }
  .pwg-add:hover { background:var(--tomato); transform:translateY(-1px); }
  .pwg-small-note { margin-top:19px; color:#927f71; font-size:11px; font-style:italic; }
  .pwg-split { display:grid; grid-template-columns: .93fr 1.07fr; gap: 72px; align-items:center; }
  .pwg-about-panel { position:relative; padding:46px; border-radius:19px; background:#e8eee5; overflow:hidden; }
  .pwg-about-panel:after { content:""; position:absolute; right:-75px; bottom:-90px; width:240px; height:240px; border:1px solid rgba(85,112,100,.25); border-radius:50%; box-shadow:0 0 0 24px rgba(85,112,100,.06), 0 0 0 48px rgba(85,112,100,.045); }
  .pwg-about-panel .pwg-heading { font-size:clamp(34px,4vw,53px); max-width:430px; }
  .pwg-about-copy { margin:24px 0 0; max-width:490px; color:#59685e; font-size:15px; line-height:1.8; }
  .pwg-fact-list { display:grid; gap:15px; margin-top:29px; }
  .pwg-fact { display:flex; align-items:flex-start; gap:12px; color:#4e5f55; font-size:13px; line-height:1.45; }
  .pwg-fact svg { flex:none; margin-top:2px; color:var(--sage); }
  .pwg-feedback { padding-top:2px; }
  .pwg-feedback h2 { font-size:clamp(37px,4.2vw,54px); max-width:480px; }
  .pwg-feedback-lede { max-width:450px; margin-top:18px; color:var(--muted); line-height:1.7; font-size:14px; }
  .pwg-feedback-card { display:grid; grid-template-columns:145px 1fr; gap:25px; align-items:center; margin-top:32px; padding:20px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
  .pwg-big-rating { font-family:Georgia, serif; font-size:53px; font-weight:700; line-height:1; }
  .pwg-google { margin-top:7px; color:var(--muted); font-size:11px; font-weight:700; }
  .pwg-quote { position:relative; margin:0; padding-left:24px; color:#574d46; font-family:Georgia, serif; font-size:17px; line-height:1.5; }
  .pwg-quote:before { content:"“"; position:absolute; left:0; top:-8px; color:var(--tomato); font-size:33px; }
  .pwg-review-btn { margin-top:24px; display:inline-flex; align-items:center; gap:8px; border:0; border-bottom:1px solid var(--tomato); background:none; padding:4px 0; color:var(--tomato-deep); font-size:13px; font-weight:800; }
  .pwg-order-section { background:#f1e5d8; }
  .pwg-order-grid { display:grid; grid-template-columns: .82fr 1.18fr; align-items:start; gap:58px; }
  .pwg-order-copy h2 { max-width:420px; font-size:clamp(39px,4.8vw,62px); }
  .pwg-order-copy > p { max-width:395px; margin-top:20px; color:var(--muted); font-size:14px; line-height:1.7; }
  .pwg-order-contact { display:flex; align-items:center; gap:10px; margin-top:29px; color:var(--tomato-deep); font-size:15px; font-weight:900; }
  .pwg-order-contact svg { padding:8px; width:34px; height:34px; border-radius:50%; background:var(--tomato); color:#fff6ec; }
  .pwg-form-card { padding:29px; border:1px solid #e4d4c4; border-radius:18px; background:var(--paper); box-shadow:0 15px 38px rgba(82,51,32,.07); }
  .pwg-form-heading { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:22px; }
  .pwg-form-heading h3 { margin:0; font-family:Georgia, serif; font-size:24px; letter-spacing:-.03em; }
  .pwg-form-heading span { color:var(--muted); font-size:11px; font-weight:700; }
  .pwg-form-row { display:grid; grid-template-columns:1fr 1fr; gap:13px; }
  .pwg-field { display:grid; gap:7px; margin-bottom:15px; }
  .pwg-field label { color:#5e5147; font-size:11px; font-weight:800; letter-spacing:.04em; }
  .pwg-field input, .pwg-field select, .pwg-field textarea { width:100%; border:1px solid #decec0; border-radius:9px; outline:0; background:#fffcf7; color:var(--ink); padding:11px 12px; font-size:13px; transition:border-color .2s ease, box-shadow .2s ease; }
  .pwg-field textarea { min-height:83px; resize:vertical; }
  .pwg-field input:focus, .pwg-field select:focus, .pwg-field textarea:focus { border-color:var(--tomato); box-shadow:0 0 0 3px rgba(201,74,47,.12); }
  .pwg-field input::placeholder, .pwg-field textarea::placeholder { color:#b5a79b; }
  .pwg-selected { border:1px solid #ecdfd3; border-radius:10px; background:#fdf8f1; padding:11px; }
  .pwg-selected-empty { color:#9b8b7d; font-size:12px; }
  .pwg-selected-item { display:flex; align-items:center; justify-content:space-between; gap:9px; color:#54483e; font-size:12px; font-weight:700; }
  .pwg-selected-item + .pwg-selected-item { margin-top:8px; padding-top:8px; border-top:1px solid #eee2d7; }
  .pwg-quantity { display:inline-flex; align-items:center; gap:7px; color:var(--tomato-deep); }
  .pwg-quantity button { display:grid; place-items:center; width:21px; height:21px; border:1px solid #e5cfc0; border-radius:50%; background:#fff; color:var(--tomato-deep); }
  .pwg-submit { width:100%; margin-top:4px; padding:14px 18px; }
  .pwg-form-feedback { display:flex; align-items:flex-start; gap:9px; margin-top:13px; border-radius:9px; padding:11px 12px; font-size:12px; line-height:1.5; }
  .pwg-form-feedback.error { background:#fbe7e1; color:#9c3424; }
  .pwg-form-feedback.success { background:#e4f0e3; color:#40634a; }
  .pwg-form-feedback svg { flex:none; margin-top:1px; }
  .pwg-location-grid { display:grid; grid-template-columns:.8fr 1.2fr; gap:18px; }
  .pwg-address-card, .pwg-map-placeholder { border:1px solid var(--line); border-radius:17px; background:var(--paper); }
  .pwg-address-card { padding:31px; }
  .pwg-address-card h3 { margin:15px 0 9px; font-family:Georgia, serif; font-size:27px; }
  .pwg-address-card p { color:var(--muted); font-size:14px; line-height:1.65; }
  .pwg-address-icon { display:grid; place-items:center; width:43px; height:43px; border-radius:12px; background:#f7dfd5; color:var(--tomato); }
  .pwg-address-links { display:flex; flex-wrap:wrap; gap:10px; margin-top:22px; }
  .pwg-map-placeholder { position:relative; min-height:265px; overflow:hidden; background:#e6ece4; }
  .pwg-map-grid { position:absolute; inset:-30px; opacity:.46; transform:rotate(-8deg); background-image:linear-gradient(25deg, transparent 46%, #c7d3c6 47%, #c7d3c6 49%, transparent 50%), linear-gradient(115deg, transparent 42%, #d0dacf 43%, #d0dacf 45%, transparent 46%), linear-gradient(80deg, transparent 49%, #d0dacf 50%, #d0dacf 51%, transparent 52%); background-size:95px 80px, 120px 100px, 170px 140px; }
  .pwg-map-label { position:absolute; left:20px; top:20px; padding:8px 11px; border-radius:8px; background:rgba(255,253,249,.88); color:#5f6e62; font-size:11px; font-weight:800; }
  .pwg-map-pin { position:absolute; left:51%; top:50%; display:grid; place-items:center; width:47px; height:47px; transform:translate(-50%,-50%); border:5px solid rgba(255,253,249,.9); border-radius:50% 50% 50% 0; background:var(--tomato); color:#fff; box-shadow:0 9px 18px rgba(75,43,26,.2); rotate:-45deg; }
  .pwg-map-pin svg { rotate:45deg; }
  .pwg-map-disclaimer { position:absolute; bottom:15px; left:20px; right:20px; color:#748076; font-size:11px; }
  .pwg-footer { padding:47px 0 25px; background:var(--ink); color:#f7eadd; }
  .pwg-footer-grid { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:35px; }
  .pwg-footer .pwg-brand { color:#fff7eb; }
  .pwg-footer-copy { max-width:255px; margin-top:15px; color:#bcb0a5; font-size:12px; line-height:1.7; }
  .pwg-footer h4 { margin:3px 0 15px; color:#fff7eb; font-size:11px; text-transform:uppercase; letter-spacing:.14em; }
  .pwg-footer nav { display:grid; gap:9px; color:#bcb0a5; font-size:12px; }
  .pwg-footer nav a:hover { color:var(--saffron); }
  .pwg-socials { display:flex; gap:8px; }
  .pwg-social { display:grid; place-items:center; width:31px; height:31px; border:1px solid #655a52; border-radius:50%; color:#d4c6b8; }
  .pwg-social:hover { border-color:var(--saffron); color:var(--saffron); }
  .pwg-footer-bottom { display:flex; justify-content:space-between; gap:15px; margin-top:42px; padding-top:18px; border-top:1px solid #4b443f; color:#8f847b; font-size:11px; }
  .pwg-modal-backdrop { position:fixed; inset:0; z-index:50; display:grid; place-items:center; padding:20px; background:rgba(37,33,30,.54); }
  .pwg-modal { position:relative; width:min(490px,100%); max-height:90vh; overflow:auto; border-radius:17px; padding:31px; background:var(--paper); box-shadow:0 25px 70px rgba(29,19,12,.25); }
  .pwg-modal h3 { margin:0; font-family:Georgia, serif; font-size:31px; letter-spacing:-.04em; }
  .pwg-modal p { margin:10px 0 22px; color:var(--muted); font-size:13px; line-height:1.65; }
  .pwg-close { position:absolute; right:18px; top:18px; display:grid; place-items:center; border:0; background:none; color:var(--muted); }
  @media (max-width: 850px) {
    .pwg-hero-grid, .pwg-split, .pwg-order-grid { grid-template-columns:1fr; gap:43px; }
    .pwg-hero { padding-top:52px; }
    .pwg-hero-art { min-height:390px; max-width:570px; width:100%; margin:auto; }
    .pwg-menu-grid { grid-template-columns:repeat(2, 1fr); }
    .pwg-order-copy { max-width:590px; }
    .pwg-location-grid { grid-template-columns:1fr; }
  }
  @media (max-width: 640px) {
    .pwg-shell { width:min(100% - 28px, 520px); }
    .pwg-topbar-inner { min-height:40px; font-size:10px; }
    .pwg-topbar-note:last-child { display:none; }
    .pwg-nav-inner { min-height:65px; }
    .pwg-navlinks { position:absolute; left:14px; right:14px; top:68px; display:none; flex-direction:column; align-items:stretch; gap:0; padding:7px; border:1px solid var(--line); border-radius:13px; background:var(--paper); box-shadow:0 14px 28px rgba(75,43,26,.12); }
    .pwg-navlinks.open { display:flex; }
    .pwg-navlinks a { padding:12px; border-radius:8px; }
    .pwg-navlinks a:hover { background:#f8e7dc; }
    .pwg-order-pill { padding:10px 13px; font-size:11px; }
    .pwg-menu-toggle { display:block; }
    .pwg-hero { padding:42px 0 63px; }
    .pwg-hero h1 { font-size:clamp(45px,13vw,67px); }
    .pwg-hero-lede { font-size:14px; }
    .pwg-hero-art { min-height:310px; }
    .pwg-image-wrap { width:82%; right:6%; border-width:7px; }
    .pwg-hero-sticker { width:88px; height:88px; left:0; top:19px; font-size:9px; }
    .pwg-location-chip { right:0; bottom:4px; padding:9px 11px; font-size:10px; }
    .pwg-quick { grid-template-columns:1fr 1fr; }
    .pwg-quick-item { min-height:78px; padding:13px 15px; border-bottom:1px solid rgba(255,255,255,.2); }
    .pwg-quick-item:nth-child(2) { border-right:0; }
    .pwg-quick-item:nth-child(3), .pwg-quick-item:nth-child(4) { border-bottom:0; }
    .pwg-section { padding:67px 0; }
    .pwg-section-head { display:block; margin-bottom:28px; }
    .pwg-section-intro { margin-top:15px; }
    .pwg-menu-grid { gap:10px; }
    .pwg-card-img { height:125px; }
    .pwg-card-body { padding:12px; }
    .pwg-card-body h3 { font-size:17px; }
    .pwg-card-note { min-height:46px; font-size:11px; }
    .pwg-card-foot { display:block; }
    .pwg-price-note { display:block; margin-bottom:9px; }
    .pwg-add { width:100%; justify-content:center; }
    .pwg-about-panel { padding:27px 23px; }
    .pwg-feedback-card { grid-template-columns:1fr; gap:14px; }
    .pwg-order-grid { gap:34px; }
    .pwg-form-card { padding:19px 15px; }
    .pwg-form-row { grid-template-columns:1fr; gap:0; }
    .pwg-address-card { padding:23px; }
    .pwg-footer-grid { grid-template-columns:1fr 1fr; gap:29px 17px; }
    .pwg-footer-grid > :first-child { grid-column:1 / -1; }
    .pwg-footer-bottom { display:block; line-height:1.7; }
    .pwg-footer-bottom span { display:block; }
    .pwg-modal { padding:25px 19px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pwg-site *, .pwg-site *:before, .pwg-site *:after { transition-duration:.01ms !important; scroll-behavior:auto !important; }
  }
`;

function Stars({ size = 13 }: { size?: number }) {
  return (
    <span className="pwg-stars" aria-label="4 out of 5 stars">
      {[0, 1, 2, 3, 4].map((star) => (
        <Star key={star} size={size} />
      ))}
    </span>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PizzaWorldGalaxy() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Pizzas");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrder, setShowOrder] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", orderType: "Delivery", address: "", instructions: "" });

  const visibleItems = useMemo(
    () => menuItems.filter((item) => activeCategory === "Pizzas" ? item.id === "pizza" : item.category === activeCategory),
    [activeCategory],
  );

  function addToCart(item: MenuItem) {
    setCart((current) => {
      const exists = current.find((cartItem) => cartItem.id === item.id);
      return exists
        ? current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
        : [...current, { ...item, quantity: 1 }];
    });
    setFeedback(null);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  }

  function openOrder() {
    setShowOrder(true);
    setTimeout(() => document.getElementById("order-name")?.focus(), 50);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    try {
      if (!cart.length) {
        setFeedback({ type: "error", message: "Please add at least one item before placing your order request." });
        return;
      }
      if (!form.name.trim() || !form.phone.trim()) {
        setFeedback({ type: "error", message: "Please add your name and phone number so the restaurant can reach you." });
        return;
      }
      if (!/^[+()\d\s-]{8,}$/.test(form.phone.trim())) {
        setFeedback({ type: "error", message: "Please enter a valid phone number, including country code if needed." });
        return;
      }
      if (form.orderType === "Delivery" && !form.address.trim()) {
        setFeedback({ type: "error", message: "A delivery address is needed for delivery orders." });
        return;
      }
      setSubmitted(true);
      setFeedback({ type: "success", message: "Your order request is ready. Please call to confirm availability and final details." });
    } catch {
      setFeedback({ type: "error", message: "We couldn't prepare that request. Please call to order instead." });
    }
  }

  function navTo(id: string) {
    setMobileOpen(false);
    scrollToSection(id);
  }

  return (
    <div className="pwg-site">
      <style>{style}</style>
      <div className="pwg-topbar">
        <div className="pwg-shell pwg-topbar-inner">
          <span className="pwg-topbar-note"><Clock3 size={13} /> Open now · closes at <strong>3 AM</strong></span>
          <span className="pwg-topbar-note">Fast Food Restaurant · Qasim Bela, Multan</span>
        </div>
      </div>

      <header className="pwg-nav">
        <div className="pwg-shell pwg-nav-inner">
          <button className="pwg-brand" onClick={() => navTo("home")} aria-label="Pizza World Galaxy home">
            <span className="pwg-brand-mark">P</span>
            <span>Pizza World <em style={{ fontStyle: "normal", color: "var(--tomato)" }}>Galaxy</em></span>
          </button>
          <nav className={`pwg-navlinks ${mobileOpen ? "open" : ""}`} aria-label="Primary navigation">
            <a href="#home" onClick={(event) => { event.preventDefault(); navTo("home"); }}>Home</a>
            <a href="#menu" onClick={(event) => { event.preventDefault(); navTo("menu"); }}>Menu</a>
            <a href="#about" onClick={(event) => { event.preventDefault(); navTo("about"); }}>About</a>
            <a href="#reviews" onClick={(event) => { event.preventDefault(); navTo("reviews"); }}>Reviews</a>
            <a href="#contact" onClick={(event) => { event.preventDefault(); navTo("contact"); }}>Contact</a>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <button className="pwg-order-pill" onClick={openOrder}><ShoppingBag size={15} /> Order Now</button>
            <button className="pwg-menu-toggle" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="pwg-hero">
          <div className="pwg-shell pwg-hero-grid">
            <div className="pwg-hero-copy">
              <span className="pwg-kicker">Qasim Bela · Multan</span>
              <h1 className="pwg-heading">Big Flavour.<br /><span style={{ color: "var(--tomato)" }}>Fresh Food.</span><br />Made for You.</h1>
              <p className="pwg-hero-lede">Pizza World Galaxy is your local <strong>Fast Food Restaurant</strong> near Rewaj Marquee, serving the kind of comfort food you think about on the way home.</p>
              <div className="pwg-actions">
                <button className="pwg-btn-primary" onClick={openOrder}>Order Now <ArrowRight size={16} /></button>
                <button className="pwg-btn-secondary" onClick={() => navTo("menu")}>View Menu</button>
              </div>
              <div className="pwg-trust-row">
                <div className="pwg-rating"><Stars /> <strong>4.0 / 5</strong> <span>· 9 Google reviews</span></div>
                <span className="pwg-dot" />
                <span className="pwg-muted" style={{ fontSize: 12, fontWeight: 700 }}>Rs 1–2,000 per person</span>
              </div>
            </div>
            <div className="pwg-hero-art" aria-label="Pizza with chicken and jalapeños">
              <div className="pwg-hero-sticker">Made for<br />your kind<br />of hungry</div>
              <div className="pwg-image-wrap"><img src="/__mockup/images/pizza-pub-hero.jpg" alt="Fresh pizza topped with grilled chicken, green peppers and jalapeños" /></div>
              <a className="pwg-location-chip" href="https://www.google.com/maps/search/?api=1&query=Pizza+World+Galaxy+Qasim+Bela+Multan" target="_blank" rel="noreferrer"><MapPin size={16} /> Near Rewaj Marquee <ArrowRight size={13} /></a>
            </div>
          </div>
        </section>

        <section className="pwg-band" aria-label="Restaurant information">
          <div className="pwg-shell pwg-quick">
            <div className="pwg-quick-item"><span className="pwg-quick-icon"><Phone size={16} /></span><span><span className="pwg-quick-label">Call to order</span><a className="pwg-quick-value" href="tel:+923084859955">+92 308 4859955</a></span></div>
            <div className="pwg-quick-item"><span className="pwg-quick-icon"><MapPin size={16} /></span><span><span className="pwg-quick-label">Find us</span><span className="pwg-quick-value">Qasim Bela, Multan</span></span></div>
            <div className="pwg-quick-item"><span className="pwg-quick-icon"><ShoppingBag size={16} /></span><span><span className="pwg-quick-label">Ways to enjoy</span><span className="pwg-quick-value">Dine-in · Takeout · Delivery</span></span></div>
            <div className="pwg-quick-item"><span className="pwg-quick-icon"><Clock3 size={16} /></span><span><span className="pwg-quick-label">Listing status</span><span className="pwg-quick-value">Open · closes at 3 AM</span></span></div>
          </div>
        </section>

        <section id="menu" className="pwg-section">
          <div className="pwg-shell">
            <div className="pwg-section-head">
              <div><span className="pwg-kicker">Something for every craving</span><h2 className="pwg-heading">The menu, your way.</h2></div>
              <p className="pwg-section-intro">Choose a category to explore. Official menu details and prices can be updated here later.</p>
            </div>
            <div className="pwg-category-row" role="tablist" aria-label="Menu categories">
              {categoryList.map((category) => <button key={category} className={`pwg-category ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}
            </div>
            {visibleItems.length ? (
              <div className="pwg-menu-grid">
                {visibleItems.map((item) => <article className="pwg-menu-card" key={item.id}>
                  <div className="pwg-card-img"><img src={item.image} alt={`${item.name} from Pizza World Galaxy`} /><span className="pwg-category-tag">{item.category}</span></div>
                  <div className="pwg-card-body"><h3>{item.name}</h3><p className="pwg-card-note">{item.note}</p><div className="pwg-card-foot"><span className="pwg-price-note">Price available on request</span><button className="pwg-add" onClick={() => addToCart(item)}><Plus size={14} /> Add to order</button></div></div>
                </article>)}
              </div>
            ) : (
              <div style={{ border: "1px dashed #dbc9ba", borderRadius: 15, padding: "44px 20px", textAlign: "center", color: "var(--muted)" }}>
                <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 21 }}>Menu details coming soon</p>
                <p style={{ margin: "8px 0 0", fontSize: 12 }}>This category is ready for official items to be added later.</p>
              </div>
            )}
            <p className="pwg-small-note">Showing currently known items only: Pizza, Chicken Paratha Roll, Loaded Fries, and Cheese Burger.</p>
          </div>
        </section>

        <section id="about" className="pwg-section" style={{ background: "#fffaf4" }}>
          <div className="pwg-shell pwg-split">
            <div className="pwg-about-panel">
              <span className="pwg-kicker" style={{ color: "var(--sage)" }}>Good to know</span>
              <h2 className="pwg-heading">Your nearby stop for a proper bite.</h2>
              <p className="pwg-about-copy">Pizza World Galaxy is a Fast Food Restaurant in Qasim Bela, Multan. Come by for dine-in, pick up your order, or request delivery when the craving calls.</p>
              <div className="pwg-fact-list">
                <div className="pwg-fact"><Check size={16} /> <span>Located near Rewaj Marquee, Bhutta Colony.</span></div>
                <div className="pwg-fact"><Check size={16} /> <span>Serving dine-in, takeout, and delivery.</span></div>
                <div className="pwg-fact"><Check size={16} /> <span>Open now on the listing; closes at 3 AM.</span></div>
              </div>
            </div>
            <div id="reviews" className="pwg-feedback">
              <span className="pwg-kicker">A little social proof</span>
              <h2 className="pwg-heading">Popular from customer feedback.</h2>
              <p className="pwg-feedback-lede">Pizza, Chicken Paratha Roll, and Loaded Fries are the items currently highlighted from available customer feedback.</p>
              <div className="pwg-feedback-card">
                <div><div className="pwg-big-rating">4.0</div><Stars size={14} /><div className="pwg-google">From 9 Google reviews</div></div>
                <blockquote className="pwg-quote">A 4.0 / 5 local favorite with a menu built around Pizza, Chicken Paratha Roll, and Loaded Fries.</blockquote>
              </div>
              <button className="pwg-review-btn" onClick={() => setShowAllReviews((value) => !value)}>{showAllReviews ? "Hide review note" : "View all reviews"} <ChevronDown size={15} style={{ transform: showAllReviews ? "rotate(180deg)" : undefined }} /></button>
              {showAllReviews && <p style={{ margin: "15px 0 0", color: "var(--muted)", fontSize: 12, lineHeight: 1.6 }}>Review link can be added here later. Google rating shown: 4.0 / 5 from 9 reviews.</p>}
            </div>
          </div>
        </section>

        <section id="order" className="pwg-section pwg-order-section">
          <div className="pwg-shell pwg-order-grid">
            <div className="pwg-order-copy">
              <span className="pwg-kicker">Hungry already?</span>
              <h2 className="pwg-heading">Make it a call, not a wait.</h2>
              <p>Send an order request with the basics, then call to confirm availability and final details. No payment processing here — just an easier way to get your request ready.</p>
              <a className="pwg-order-contact" href="tel:+923084859955"><Phone size={34} /> <span>Call to Order<br /><small>+92 308 4859955</small></span></a>
              <a className="pwg-btn-secondary" style={{ marginTop: 24 }} href="https://wa.me/923084859955" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp Order</a>
              <p style={{ marginTop: 10, fontSize: 11, color: "#8b786b" }}>WhatsApp is a contact option and can be enabled or disabled by the restaurant.</p>
            </div>
            <div className="pwg-form-card">
              <div className="pwg-form-heading"><h3>Place your order request</h3><span>We keep it simple</span></div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="pwg-form-row">
                  <div className="pwg-field"><label htmlFor="order-name">Your name</label><input id="order-name" placeholder="How should we address you?" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div>
                  <div className="pwg-field"><label htmlFor="order-phone">Phone number</label><input id="order-phone" inputMode="tel" placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div>
                </div>
                <div className="pwg-form-row">
                  <div className="pwg-field"><label htmlFor="order-type">Order type</label><select id="order-type" value={form.orderType} onChange={(event) => setForm({ ...form, orderType: event.target.value })}><option>Delivery</option><option>Takeout</option><option>Dine-in</option></select></div>
                  <div className="pwg-field"><label htmlFor="order-items">Selected items</label><div id="order-items" className="pwg-selected">{cart.length ? cart.map((item) => <div className="pwg-selected-item" key={item.id}><span>{item.name}</span><span className="pwg-quantity"><button type="button" aria-label={`Decrease ${item.name}`} onClick={() => changeQuantity(item.id, -1)}><Minus size={11} /></button>{item.quantity}<button type="button" aria-label={`Increase ${item.name}`} onClick={() => changeQuantity(item.id, 1)}><Plus size={11} /></button></span></div>) : <span className="pwg-selected-empty">Add items from the menu</span>}</div></div>
                </div>
                {form.orderType === "Delivery" && <div className="pwg-field"><label htmlFor="order-address">Delivery address</label><input id="order-address" placeholder="Area and address for delivery" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></div>}
                <div className="pwg-field"><label htmlFor="order-instructions">Additional instructions <span style={{ color: "#a99585", fontWeight: 500 }}>(optional)</span></label><textarea id="order-instructions" placeholder="Anything the team should know?" value={form.instructions} onChange={(event) => setForm({ ...form, instructions: event.target.value })} /></div>
                <button className="pwg-btn-primary pwg-submit" type="submit">{submitted ? "Request ready" : "Place Order"} <ArrowRight size={16} /></button>
                {feedback && <div className={`pwg-form-feedback ${feedback.type}`} role="status">{feedback.type === "success" ? <Check size={16} /> : <X size={16} />}<span>{feedback.message}</span></div>}
              </form>
            </div>
          </div>
        </section>

        <section id="contact" className="pwg-section">
          <div className="pwg-shell">
            <div className="pwg-section-head"><div><span className="pwg-kicker">Come find us</span><h2 className="pwg-heading">Right here in Qasim Bela.</h2></div><p className="pwg-section-intro">Need the quickest answer? Call the team before you set off. Hours may vary — please call to confirm.</p></div>
            <div className="pwg-location-grid">
              <div className="pwg-address-card"><div className="pwg-address-icon"><MapPin size={21} /></div><h3>Pizza World Galaxy</h3><p>5CR4+QMR, near Rewaj Marquee,<br />Qasim Bela, Bhutta Colony,<br />Multan, Pakistan</p><div className="pwg-address-links"><a className="pwg-btn-primary" href="tel:+923084859955"><Phone size={15} /> Call to Order</a><a className="pwg-btn-secondary" href="https://www.google.com/maps/search/?api=1&query=Pizza+World+Galaxy+Qasim+Bela+Multan" target="_blank" rel="noreferrer"><Crosshair size={15} /> Get Directions</a></div></div>
              <div className="pwg-map-placeholder" aria-label="Map placeholder for Pizza World Galaxy location"><div className="pwg-map-grid" /><span className="pwg-map-label">Qasim Bela · Multan</span><span className="pwg-map-pin"><MapPin size={21} /></span><span className="pwg-map-disclaimer">Map preview placeholder — use Get Directions for the live location.</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pwg-footer">
        <div className="pwg-shell">
          <div className="pwg-footer-grid">
            <div><button className="pwg-brand" onClick={() => navTo("home")}><span className="pwg-brand-mark">P</span><span>Pizza World <em style={{ fontStyle: "normal", color: "var(--saffron)" }}>Galaxy</em></span></button><p className="pwg-footer-copy">Fast Food Restaurant · Qasim Bela, Multan. Pizza, rolls, fries and more — made for your kind of hungry.</p></div>
            <div><h4>Explore</h4><nav><a href="#home" onClick={(event) => { event.preventDefault(); navTo("home"); }}>Home</a><a href="#menu" onClick={(event) => { event.preventDefault(); navTo("menu"); }}>Menu</a><a href="#about" onClick={(event) => { event.preventDefault(); navTo("about"); }}>About</a><a href="#reviews" onClick={(event) => { event.preventDefault(); navTo("reviews"); }}>Reviews</a></nav></div>
            <div><h4>Contact</h4><nav><a href="tel:+923084859955">+92 308 4859955</a><a href="#contact" onClick={(event) => { event.preventDefault(); navTo("contact"); }}>Qasim Bela / Multan</a><a href="#order" onClick={(event) => { event.preventDefault(); navTo("order"); }}>Order request</a></nav></div>
            <div><h4>Stay connected</h4><div className="pwg-socials"><a className="pwg-social" href="#contact" aria-label="Instagram placeholder"><Instagram size={15} /></a><a className="pwg-social" href="#contact" aria-label="Facebook placeholder"><Facebook size={15} /></a><a className="pwg-social" href="https://wa.me/923084859955" target="_blank" rel="noreferrer" aria-label="WhatsApp contact"><MessageCircle size={15} /></a></div><p className="pwg-footer-copy" style={{ marginTop: 13 }}>Official social links can be updated later.</p></div>
          </div>
          <div className="pwg-footer-bottom"><span>© Pizza World Galaxy · Qasim Bela, Multan</span><span>Hours may vary — please call to confirm.</span></div>
        </div>
      </footer>

      {showOrder && <div className="pwg-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowOrder(false); }}>
        <div className="pwg-modal" role="dialog" aria-modal="true" aria-labelledby="order-dialog-title">
          <button className="pwg-close" aria-label="Close order guide" onClick={() => setShowOrder(false)}><X size={21} /></button>
          <h3 id="order-dialog-title">Ready when you are.</h3>
          <p>Add items from the menu, then fill in the short order request below. For the quickest confirmation, call <a href="tel:+923084859955" style={{ color: "var(--tomato-deep)", fontWeight: 800 }}>+92 308 4859955</a>.</p>
          <button className="pwg-btn-primary" style={{ width: "100%" }} onClick={() => { setShowOrder(false); scrollToSection("order"); }}>Start an order request <ArrowRight size={16} /></button>
        </div>
      </div>}
    </div>
  );
}