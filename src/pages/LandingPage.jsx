import { useState } from 'react'
import axios from 'axios'
import {
  IoBagHandle,
  IoLogoWhatsapp,
  IoFlash,
  IoBarChart,
  IoCheckmarkCircle,
  IoArrowForward,
  IoMailOutline,
  IoCallOutline,
  IoPeopleOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoStorefrontOutline,
  IoChatbubblesOutline,
  IoTrendingDownOutline,
  IoGridOutline,
  IoRefreshOutline,
  IoWalletOutline,
} from 'react-icons/io5'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa6'

const PLATFORMS = ['WhatsApp', 'Instagram', 'Facebook', 'Twitter/X']

const PAIN_POINTS = [
  { Icon: IoChatbubblesOutline, text: 'Customers keep asking "send price again"' },
  { Icon: IoTrendingDownOutline, text: 'Products get lost in chat history' },
  { Icon: IoGridOutline, text: 'No proper catalog to show new buyers' },
  { Icon: IoRefreshOutline, text: 'You repeat the same replies every day' },
  { Icon: IoWalletOutline, text: 'You lose sales without even knowing' },
]

const FEATURES = [
  { Icon: IoStorefrontOutline, title: 'Your own store link', desc: 'One clean link that shows all your products, prices, and details — always up to date.' },
  { Icon: IoLogoWhatsapp, title: 'Orders to WhatsApp', desc: 'Customers browse your store and orders land directly in your WhatsApp. No extra apps.' },
  { Icon: IoFlash, title: 'Ready in 2 minutes', desc: 'No coding, no domain, no tech headache. Just sign up, add products, share your link.' },
  { Icon: IoBarChart, title: 'Know your numbers', desc: 'See who viewed your store, what they clicked, and how your business is growing.' },
]

const BETA_STATS = [
  { Icon: IoPeopleOutline, value: '50+', label: 'Beta vendors tested' },
  { Icon: IoShieldCheckmarkOutline, value: '100%', label: 'Success rate' },
  { Icon: IoRocketOutline, value: 'Soon', label: 'Official launch' },
]


export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    currentPlatform: '',
    notes: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
    setForm({ ...form, phone: digits })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { name, email, phone, businessType, currentPlatform, notes } = form

    if (!name.trim() || !email.trim() || !phone.trim() || !businessType || !currentPlatform || !notes.trim()) {
      setError('Please fill in all fields before submitting.')
      setLoading(false)
      return
    }

    const payload = {
      name: form.name,
      email: form.email,
      phoneNumber: form.phone.replace(/\D/g, ''),
      businessType: form.businessType,
      currentPlatform: form.currentPlatform,
      notes: form.notes,
    }

    try {
      await axios.post('https://store-api-ds7z.onrender.com/api/v1/create-info', payload)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <span className="logo">MyStoreLink</span>
        <div className="nav-actions">
          <a href="#waitlist" className="btn btn-outline">Get Early Access</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <p className="badge">
            <span className="badge-dot" />
            Now accepting early access applications
          </p>
          <h1>
            Your business deserves a<br />
            <span>real online store.</span>
          </h1>
          <p className="subheadline">
            MyStoreLink turns your WhatsApp or Instagram business into a
            beautiful store page — in under 2 minutes. Share one link,
            get orders, grow faster.
          </p>
          <div className="hero-cta">
            <a href="#waitlist" className="btn btn-primary btn-lg">
              Join the Waitlist — It's Free <IoArrowForward size={18} />
            </a>
            <span className="micro-text">No credit card required. No coding needed.</span>
          </div>

          <div className="hero-social-proof">
            <div className="proof-item">
              <span className="proof-num">2 min</span>
              <span className="proof-label">Store setup time</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-num">100%</span>
              <span className="proof-label">Free to join waitlist</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-num">🇳🇬</span>
              <span className="proof-label">Built for Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BETA SECTION ── */}
      <section className="section beta">
        <p className="section-eyebrow">Beta testing complete</p>
        <h2>We've done the work. Launch is coming.</h2>
        <p className="section-sub">
          We ran a successful beta with a selected group of vendors across Nigeria.
          The results were clear — MyStoreLink works. Now we're getting ready to open
          the doors to everyone. Be first in line.
        </p>
        <div className="beta-stats">
          {BETA_STATS.map(({ Icon, value, label }, i) => (
            <div className="beta-stat-card" key={i}>
              <Icon size={28} className="beta-stat-icon" />
              <span className="beta-stat-value">{value}</span>
              <span className="beta-stat-label">{label}</span>
            </div>
          ))}
        </div>
        <div className="beta-quote">
          <IoCheckmarkCircle size={20} className="beta-check" />
          <p>"Beta testing confirmed our product works. We're launching very soon — and early users get priority access."</p>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section problem">
        <p className="section-eyebrow">The problem</p>
        <h2>Selling on WhatsApp alone is costing you.</h2>
        <p className="section-sub">
          You're working hard, but the tools you're using are working against you.
        </p>
        <div className="pain-grid">
          {PAIN_POINTS.map(({ Icon, text }, i) => (
            <div className="pain-card" key={i}>
              <Icon size={24} className="pain-icon" />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section solution">
        <p className="section-eyebrow">The solution</p>
        <h2>One link changes everything.</h2>
        <p className="section-sub">
          Instead of managing chaos in your DMs, give customers a clean store
          they can browse, trust, and order from — any time.
        </p>
        <div className="comparison">
          <div className="comparison-card old">
            <span className="comp-label">Before MyStoreLink</span>
            <p>"Please check my WhatsApp status for prices 🙏"</p>
          </div>
          <div className="comparison-divider">
            <IoArrowForward size={20} />
          </div>
          <div className="comparison-card new">
            <span className="comp-label">After MyStoreLink</span>
            <p>"Shop here → mystorelink.com/yourstore ✨"</p>
          </div>
        </div>
        <ul className="benefit-list">
          <li><IoCheckmarkCircle size={20} className="benefit-check" />Products are always visible and organized</li>
          <li><IoCheckmarkCircle size={20} className="benefit-check" />Customers can browse and order anytime</li>
          <li><IoCheckmarkCircle size={20} className="benefit-check" />Orders land directly in your WhatsApp</li>
          <li><IoCheckmarkCircle size={20} className="benefit-check" />Works without any technical knowledge</li>
        </ul>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how">
        <p className="section-eyebrow">How it works</p>
        <h2>Your store in 3 simple steps.</h2>
        <p className="section-sub">
          We built MyStoreLink to be the simplest store builder in Nigeria.
        </p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Create your store</h3>
            <p>Sign up with your name and phone number. Your store is ready instantly.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Add your products</h3>
            <p>Upload photos, set prices, and write descriptions. It takes minutes.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Share your link</h3>
            <p>Post it on WhatsApp, Instagram, or anywhere. Customers start ordering.</p>
          </div>
        </div>
      </section>

      {/* ── WAITLIST FORM ── */}
      <section className="section waitlist" id="waitlist">
        <p className="section-eyebrow">Early access</p>
        <h2>Be first when we launch.</h2>
        <p className="section-sub">
          We're onboarding a select group of sellers first. Reserve your spot now.
        </p>

        <div className="waitlist-card">
          {submitted ? (
            <div className="success-card">
              <div className="success-icon">🚀</div>
              <h3>You're on the list!</h3>
              <p>We'll reach out on WhatsApp as soon as your early access is ready. Get ready to grow.</p>
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full Name <span className="required-mark">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. Amaka Obi"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">WhatsApp Number <span className="required-mark">*</span></label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 08012345678"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    maxLength={11}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">Email Address <span className="required-mark">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. amaka@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="businessType">Business Type <span className="required-mark">*</span></label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select type</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Retailer">Retailer</option>
                    <option value="Artisan">Artisan</option>
                    <option value="Service Provider">Service Provider</option>
                    <option value="Reseller">Reseller</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="currentPlatform">Where do you sell now? <span className="required-mark">*</span></label>
                  <select
                    id="currentPlatform"
                    name="currentPlatform"
                    value={form.currentPlatform}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select platform</option>
                    {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="notes">Biggest challenge selling online? <span className="required-mark">*</span></label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Tell us what's holding your business back..."
                  value={form.notes}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="form-error" role="alert">{error}</p>}

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Reserving your spot...' : (
                  <><IoBagHandle size={18} /> Reserve My Early Access Spot</>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <p className="section-eyebrow">Why MyStoreLink</p>
        <h2>Everything you need. Nothing you don't.</h2>
        <p className="section-sub">
          Built specifically for Nigerian sellers who run their business on social media.
          Whether you're just starting or already growing — MyStoreLink moves with you.
        </p>
        <div className="features-grid">
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon"><Icon size={28} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── UPCOMING FEATURES ── */}
      <section className="section upcoming">
        <p className="section-eyebrow">Coming soon</p>
        <h2>Amazing features on the way.</h2>
        <p className="section-sub">
          During our beta, sellers told us exactly what they needed to grow their businesses.
          We listened — and we're building it all. Expect powerful new features rolling out
          right from launch, designed entirely from real feedback.
        </p>
        <div className="upcoming-hint">
          <IoRocketOutline size={20} />
          <span>Early access users will be the first to get every new feature as it drops.</span>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <h2>Start selling smarter, not harder.</h2>
        <p>Join Nigerian sellers getting early access to MyStoreLink.</p>
        <a href="#waitlist" className="btn btn-white btn-lg">
          Get Early Access — Free <IoArrowForward size={18} />
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer-logo">MyStoreLink</span>
        <span className="footer-copy">© {new Date().getFullYear()} MyStoreLink. Built for Nigerian small businesses.</span>
        <div className="footer-contact">
          <a href="mailto:christobelnwachukwu@gmail.com">
            <IoMailOutline size={15} /> christobelnwachukwu@gmail.com
          </a>
          <a href="tel:09026161344">
            <IoCallOutline size={15} /> 09026161344
          </a>
          <div className="footer-socials">
            <a href="https://www.instagram.com/mystorelinkapp/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={16} /></a>
            <a href="https://www.facebook.com/61588804700321/" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook size={16} /></a>
            <a href="https://www.tiktok.com/@mystorelinkapp" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok size={16} /></a>
            <a href="https://wa.me/2349026161344" target="_blank" rel="noreferrer" aria-label="WhatsApp"><IoLogoWhatsapp size={16} /></a>
          </div>
        </div>
      </footer>
    </>
  )
}
