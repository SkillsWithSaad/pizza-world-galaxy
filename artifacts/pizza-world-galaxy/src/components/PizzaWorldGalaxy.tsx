import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowRight, Check, ChevronDown, Clock3, Crosshair, Facebook, Instagram, MapPin,
  Menu, MessageCircle, Minus, Phone, Plus, ShoppingBag, Star, X,
} from 'lucide-react';
import { categoryList, menuItems, restaurant, type MenuItem } from '@/data/restaurant';

type CartItem = MenuItem & { quantity: number };
type FormState = { name: string; phone: string; orderType: string; address: string; instructions: string };
type Feedback = { type: 'success' | 'error'; message: string };

function Stars({ size = 13 }: { size?: number }) {
  return <span className="pwg-stars" aria-label="4 out of 5 stars">{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={size} />)}</span>;
}

function Anchor({ id, children, onNavigate }: { id: string; children: ReactNode; onNavigate: (id: string) => void }) {
  return <a href={`#${id}`} onClick={(event) => { event.preventDefault(); onNavigate(id); }}>{children}</a>;
}

export function PizzaWorldGalaxy() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Pizzas');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showReviewNote, setShowReviewNote] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', phone: '', orderType: 'Delivery', address: '', instructions: '' });
  const orderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'Pizza World Galaxy | Fresh Food in Qasim Bela, Multan';
    const description = 'Pizza World Galaxy is a Fast Food Restaurant near Rewaj Marquee in Qasim Bela, Multan. Dine-in, takeout and delivery.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
    meta.setAttribute('content', description);
    const setMeta = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('property', property); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    };
    setMeta('og:title', document.title);
    setMeta('og:description', description);
    setMeta('og:type', 'restaurant');
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://example.com/pizza-world-galaxy');
  }, []);

  const visibleItems = useMemo(() => activeCategory === 'Pizzas'
    ? menuItems.filter((item) => item.id === 'pizza')
    : menuItems.filter((item) => item.category === activeCategory), [activeCategory]);

  function navigate(id: string) {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function addToCart(item: MenuItem) {
    setCart((current) => {
      const found = current.find((entry) => entry.id === item.id);
      return found ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, quantity: 1 }];
    });
    setFeedback(null);
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  }

  function openOrder() {
    orderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('order-name')?.focus(), 500);
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    if (!cart.length) return setFeedback({ type: 'error', message: 'Please add at least one item before placing your order request.' });
    if (!form.name.trim() || !form.phone.trim()) return setFeedback({ type: 'error', message: 'Please add your name and phone number so the restaurant can reach you.' });
    if (!/^[+()\d\s-]{8,}$/.test(form.phone.trim())) return setFeedback({ type: 'error', message: 'Please enter a valid phone number, including country code if needed.' });
    if (form.orderType === 'Delivery' && !form.address.trim()) return setFeedback({ type: 'error', message: 'A delivery address is needed for delivery orders.' });
    setSubmitted(true);
    setFeedback({ type: 'success', message: 'Your order request is ready. Please call to confirm availability and final details.' });
  }

  const updateForm = (key: keyof FormState, value: string) => { setForm((current) => ({ ...current, [key]: value })); setSubmitted(false); };
  const menuNav = (id: string) => <Anchor id={id} onNavigate={navigate}>{id[0].toUpperCase() + id.slice(1)}</Anchor>;

  return (
    <div className="pwg-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Restaurant', name: restaurant.name, servesCuisine: 'Fast Food',
        telephone: restaurant.phoneDisplay, priceRange: restaurant.priceRange, address: { '@type': 'PostalAddress', streetAddress: restaurant.address, addressLocality: 'Multan', addressCountry: 'PK' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: restaurant.rating, reviewCount: restaurant.reviewCount },
      }) }} />
      <div className="pwg-topbar"><div className="pwg-shell pwg-topbar-inner"><span className="pwg-topbar-note"><Clock3 size={13} /> Open now · closes at <strong>{restaurant.closesAt}</strong></span><span className="pwg-topbar-note">{restaurant.type} · Qasim Bela, Multan</span></div></div>
      <header className="pwg-nav">
        <div className="pwg-shell pwg-nav-inner">
          <button className="pwg-brand" data-testid="button-home" onClick={() => navigate('home')} aria-label={`${restaurant.name} home`}><span className="pwg-brand-mark">P</span><span>Pizza World <em style={{ fontStyle: 'normal', color: 'var(--tomato)' }}>Galaxy</em></span></button>
          <nav className={`pwg-navlinks ${mobileOpen ? 'open' : ''}`} aria-label="Primary navigation">{menuNav('home')}{menuNav('menu')}{menuNav('about')}{menuNav('reviews')}{menuNav('contact')}</nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><button className="pwg-order-pill" data-testid="button-order-now" onClick={openOrder}><ShoppingBag size={15} /> Order Now</button><button className="pwg-menu-toggle" data-testid="button-mobile-menu" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
        </div>
      </header>

      <main>
        <section id="home" className="pwg-hero">
          <div className="pwg-shell pwg-hero-grid"><div className="pwg-hero-copy"><span className="pwg-kicker">Qasim Bela · Multan</span><h1 className="pwg-heading">Big Flavour.<br /><span style={{ color: 'var(--tomato)' }}>Fresh Food.</span><br />Made for You.</h1><p className="pwg-hero-lede">Pizza World Galaxy is your local <strong>Fast Food Restaurant</strong> near Rewaj Marquee, serving the kind of comfort food you think about on the way home.</p><div className="pwg-actions"><button className="pwg-btn-primary" data-testid="button-hero-order" onClick={openOrder}>Order Now <ArrowRight size={16} /></button><button className="pwg-btn-secondary" data-testid="button-view-menu" onClick={() => navigate('menu')}>View Menu</button></div><div className="pwg-trust-row"><div className="pwg-rating"><Stars /><strong>{restaurant.rating} / 5</strong><span>· {restaurant.reviewCount} Google reviews</span></div><span className="pwg-dot" /><span style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 700 }}>{restaurant.priceRange}</span></div></div>
            <div className="pwg-hero-art" aria-label="Pizza with chicken and jalapeños"><div className="pwg-hero-sticker">Made for<br />your kind<br />of hungry</div><div className="pwg-image-wrap"><img src="/images/pizza-pub-hero.jpg" alt="Fresh pizza topped with grilled chicken, green peppers and jalapeños" fetchPriority="high" /></div><a className="pwg-location-chip" data-testid="link-hero-directions" href={restaurant.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Near Rewaj Marquee <ArrowRight size={13} /></a></div>
          </div>
        </section>
        <section className="pwg-band" aria-label="Restaurant information"><div className="pwg-shell pwg-quick">
          <div className="pwg-quick-item"><span className="pwg-quick-icon"><Phone size={16} /></span><span><span className="pwg-quick-label">Call to order</span><a className="pwg-quick-value" data-testid="link-phone-quick" href={restaurant.phoneHref}>{restaurant.phoneDisplay}</a></span></div>
          <div className="pwg-quick-item"><span className="pwg-quick-icon"><MapPin size={16} /></span><span><span className="pwg-quick-label">Find us</span><span className="pwg-quick-value">Qasim Bela, Multan</span></span></div>
          <div className="pwg-quick-item"><span className="pwg-quick-icon"><ShoppingBag size={16} /></span><span><span className="pwg-quick-label">Ways to enjoy</span><span className="pwg-quick-value">Dine-in · Takeout · Delivery</span></span></div>
          <div className="pwg-quick-item"><span className="pwg-quick-icon"><Clock3 size={16} /></span><span><span className="pwg-quick-label">Listing status</span><span className="pwg-quick-value">Open · closes at 3 AM</span></span></div>
        </div></section>

        <section id="menu" className="pwg-section"><div className="pwg-shell"><div className="pwg-section-head"><div><span className="pwg-kicker">Something for every craving</span><h2 className="pwg-heading">The menu, your way.</h2></div><p className="pwg-section-intro">Choose a category to explore. Official menu details and prices can be updated here later.</p></div>
          <div className="pwg-category-row" role="tablist" aria-label="Menu categories">{categoryList.map((category) => <button key={category} className={`pwg-category ${activeCategory === category ? 'active' : ''}`} data-testid={`button-category-${category.toLowerCase()}`} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div>
          {visibleItems.length ? <div className="pwg-menu-grid">{visibleItems.map((item) => <article className="pwg-menu-card" data-testid={`card-menu-${item.id}`} key={item.id}><div className="pwg-card-img"><img src={item.image} alt={`${item.name} from Pizza World Galaxy`} loading="lazy" /><span className="pwg-category-tag">{item.category}</span></div><div className="pwg-card-body"><h3>{item.name}</h3><p className="pwg-card-note">{item.note}</p><div className="pwg-card-foot"><span className="pwg-price-note">Price available on request</span><button className="pwg-add" data-testid={`button-add-${item.id}`} onClick={() => addToCart(item)}><Plus size={14} /> Add to order</button></div></div></article>)}</div> : <div style={{ border: '1px dashed #dbc9ba', borderRadius: 15, padding: '44px 20px', textAlign: 'center', color: 'var(--muted)' }}><p style={{ margin: 0, fontFamily: 'var(--app-font-serif)', fontSize: 21 }}>Menu details coming soon</p><p style={{ margin: '8px 0 0', fontSize: 12 }}>This category is ready for official items to be added later.</p></div>}
          <p className="pwg-small-note">Showing currently known items only: Pizza, Chicken Paratha Roll, Loaded Fries, and Cheese Burger.</p>
        </div></section>

        <section id="about" className="pwg-section" style={{ background: '#fffaf4' }}><div className="pwg-shell pwg-split"><div className="pwg-about-panel"><span className="pwg-kicker" style={{ color: 'var(--sage)' }}>Good to know</span><h2 className="pwg-heading">Your nearby stop for a proper bite.</h2><p className="pwg-about-copy">Pizza World Galaxy is a Fast Food Restaurant in Qasim Bela, Multan. Come by for dine-in, pick up your order, or request delivery when the craving calls.</p><div className="pwg-fact-list"><div className="pwg-fact"><Check size={16} /><span>Located near Rewaj Marquee, Bhutta Colony.</span></div><div className="pwg-fact"><Check size={16} /><span>Serving dine-in, takeout, and delivery.</span></div><div className="pwg-fact"><Check size={16} /><span>Open now on the listing; closes at 3 AM.</span></div></div></div>
          <div id="reviews" className="pwg-feedback"><span className="pwg-kicker">A little social proof</span><h2 className="pwg-heading">Popular from customer feedback.</h2><p className="pwg-feedback-lede">Pizza, Chicken Paratha Roll, and Loaded Fries are the items currently highlighted from available customer feedback.</p><div className="pwg-feedback-card"><div><div className="pwg-big-rating">{restaurant.rating}</div><Stars size={14} /><div className="pwg-google">From {restaurant.reviewCount} Google reviews</div></div><blockquote className="pwg-quote">A 4.0 / 5 local favorite with a menu built around Pizza, Chicken Paratha Roll, and Loaded Fries.</blockquote></div><button className="pwg-review-btn" data-testid="button-review-note" onClick={() => setShowReviewNote((value) => !value)}>{showReviewNote ? 'Hide review note' : 'View all reviews'} <ChevronDown size={15} style={{ transform: showReviewNote ? 'rotate(180deg)' : undefined }} /></button>{showReviewNote && <p style={{ margin: '15px 0 0', color: 'var(--muted)', fontSize: 12, lineHeight: 1.6 }}>Google rating shown: 4.0 / 5 from 9 reviews. A direct review link can be added here later.</p>}</div>
        </div></section>

        <section id="order" ref={orderRef} className="pwg-section pwg-order-section"><div className="pwg-shell pwg-order-grid"><div className="pwg-order-copy"><span className="pwg-kicker">Hungry already?</span><h2 className="pwg-heading">Make it a call, not a wait.</h2><p>Send an order request with the basics, then call to confirm availability and final details. No payment processing here — just an easier way to get your request ready.</p><a className="pwg-order-contact" data-testid="link-order-phone" href={restaurant.phoneHref}><Phone size={34} /><span>Call to Order<br /><small>{restaurant.phoneDisplay}</small></span></a>{restaurant.whatsappEnabled && <><a className="pwg-btn-secondary" data-testid="link-whatsapp-order" style={{ marginTop: 24 }} href={restaurant.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp Order</a><p style={{ marginTop: 10, fontSize: 11, color: '#8b786b' }}>WhatsApp is a contact option and can be enabled or disabled by the restaurant.</p></>}</div>
          <div className="pwg-form-card"><div className="pwg-form-heading"><h3>Place your order request</h3><span>We keep it simple</span></div><form onSubmit={submitOrder} noValidate><div className="pwg-form-row"><div className="pwg-field"><label htmlFor="order-name">Your name</label><input id="order-name" data-testid="input-order-name" autoComplete="name" required placeholder="How should we address you?" value={form.name} onChange={(event) => updateForm('name', event.target.value)} /></div><div className="pwg-field"><label htmlFor="order-phone">Phone number</label><input id="order-phone" data-testid="input-order-phone" inputMode="tel" autoComplete="tel" required placeholder="+92 3XX XXXXXXX" value={form.phone} onChange={(event) => updateForm('phone', event.target.value)} /></div></div><div className="pwg-form-row"><div className="pwg-field"><label htmlFor="order-type">Order type</label><select id="order-type" data-testid="select-order-type" value={form.orderType} onChange={(event) => updateForm('orderType', event.target.value)}><option>Delivery</option><option>Takeout</option><option>Dine-in</option></select></div><div className="pwg-field"><label htmlFor="order-items">Selected items</label><div id="order-items" className="pwg-selected" aria-live="polite">{cart.length ? cart.map((item) => <div className="pwg-selected-item" key={item.id}><span>{item.name}</span><span className="pwg-quantity"><button type="button" data-testid={`button-decrease-${item.id}`} aria-label={`Decrease ${item.name}`} onClick={() => changeQuantity(item.id, -1)}><Minus size={11} /></button>{item.quantity}<button type="button" data-testid={`button-increase-${item.id}`} aria-label={`Increase ${item.name}`} onClick={() => changeQuantity(item.id, 1)}><Plus size={11} /></button></span></div>) : <span className="pwg-selected-empty">Add items from the menu</span>}</div></div></div>{form.orderType === 'Delivery' && <div className="pwg-field"><label htmlFor="order-address">Delivery address</label><input id="order-address" data-testid="input-order-address" autoComplete="street-address" required placeholder="Area and address for delivery" value={form.address} onChange={(event) => updateForm('address', event.target.value)} /></div>}<div className="pwg-field"><label htmlFor="order-instructions">Additional instructions <span style={{ color: '#a99585', fontWeight: 500 }}>(optional)</span></label><textarea id="order-instructions" data-testid="input-order-instructions" placeholder="Anything the team should know?" value={form.instructions} onChange={(event) => updateForm('instructions', event.target.value)} /></div><button className="pwg-btn-primary pwg-submit" data-testid="button-place-order" type="submit">{submitted ? 'Request ready' : 'Place Order'} <ArrowRight size={16} /></button>{feedback && <div className={`pwg-form-feedback ${feedback.type}`} data-testid={`status-order-${feedback.type}`} role="status">{feedback.type === 'success' ? <Check size={16} /> : <X size={16} />}<span>{feedback.message}</span></div>}</form></div>
        </div></section>

        <section id="contact" className="pwg-section"><div className="pwg-shell"><div className="pwg-section-head"><div><span className="pwg-kicker">Come find us</span><h2 className="pwg-heading">Right here in Qasim Bela.</h2></div><p className="pwg-section-intro">Need the quickest answer? Call the team before you set off. Hours may vary — please call to confirm.</p></div><div className="pwg-location-grid"><div className="pwg-address-card"><div className="pwg-address-icon"><MapPin size={21} /></div><h3>{restaurant.name}</h3><p>5CR4+QMR, near Rewaj Marquee,<br />Qasim Bela, Bhutta Colony,<br />Multan, Pakistan</p><div className="pwg-address-links"><a className="pwg-btn-primary" data-testid="link-contact-phone" href={restaurant.phoneHref}><Phone size={15} /> Call to Order</a><a className="pwg-btn-secondary" data-testid="link-directions" href={restaurant.mapsUrl} target="_blank" rel="noreferrer"><Crosshair size={15} /> Get Directions</a></div></div><div className="pwg-map-placeholder" aria-label="Map placeholder for Pizza World Galaxy location"><div className="pwg-map-grid" /><span className="pwg-map-label">Qasim Bela · Multan</span><span className="pwg-map-pin"><MapPin size={21} /></span><span className="pwg-map-disclaimer">Map preview placeholder — use Get Directions for the live location.</span></div></div></div></section>
      </main>

      <footer className="pwg-footer"><div className="pwg-shell"><div className="pwg-footer-grid"><div><button className="pwg-brand" data-testid="button-footer-home" onClick={() => navigate('home')}><span className="pwg-brand-mark">P</span><span>Pizza World <em style={{ fontStyle: 'normal', color: 'var(--saffron)' }}>Galaxy</em></span></button><p className="pwg-footer-copy">{restaurant.type} · Qasim Bela, Multan. Pizza, rolls, fries and more — made for your kind of hungry.</p></div><div><h4>Explore</h4><nav><Anchor id="home" onNavigate={navigate}>Home</Anchor><Anchor id="menu" onNavigate={navigate}>Menu</Anchor><Anchor id="about" onNavigate={navigate}>About</Anchor><Anchor id="reviews" onNavigate={navigate}>Reviews</Anchor></nav></div><div><h4>Contact</h4><nav><a data-testid="link-footer-phone" href={restaurant.phoneHref}>{restaurant.phoneDisplay}</a><Anchor id="contact" onNavigate={navigate}>Qasim Bela / Multan</Anchor><Anchor id="order" onNavigate={navigate}>Order request</Anchor></nav></div><div><h4>Stay connected</h4><div className="pwg-socials"><a className="pwg-social" data-testid="link-instagram-placeholder" href="#contact" aria-label="Instagram link unavailable" aria-disabled="true" onClick={(event) => event.preventDefault()}><Instagram size={15} /></a><a className="pwg-social" data-testid="link-facebook-placeholder" href="#contact" aria-label="Facebook link unavailable" aria-disabled="true" onClick={(event) => event.preventDefault()}><Facebook size={15} /></a>{restaurant.whatsappEnabled && <a className="pwg-social" data-testid="link-footer-whatsapp" href={restaurant.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp contact"><MessageCircle size={15} /></a>}</div><p className="pwg-footer-copy" style={{ marginTop: 13 }}>Official social links can be updated later.</p></div></div><div className="pwg-footer-bottom"><span>© Pizza World Galaxy · Qasim Bela, Multan</span><span>Hours may vary — please call to confirm.</span></div></div></footer>
    </div>
  );
}