import { useState } from 'react'
import axios from 'axios'

const PLATFORMS = ['WhatsApp', 'Instagram', 'Facebook', 'Twitter/X']

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
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

    const payload = {
      name: form.name,
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
      {/* NAV */}
      <nav className="nav">
        <span className="logo">StoreLink</span>
        <a href="#waitlist" className="btn btn-outline">Join Early Access</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <p className="badge">Built for Nigerian small businesses</p>
        <h1>Turn your WhatsApp business into a real online store in 2 minutes.</h1>
        <p className="subheadline">
          Create a simple online store, add your products, and let customers order
          directly on WhatsApp — all from one link.
        </p>
        <div className="hero-cta">
          <a href="#waitlist" className="btn btn-primary">Join Early Access</a>
          <span className="micro-text">No website needed. No coding required.</span>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section problem">
        <h2>Selling on WhatsApp is harder than it should be.</h2>
        <p className="section-sub">
          Most small businesses in Nigeria rely only on WhatsApp to sell. But it creates real problems:
        </p>
        <ul className="pain-list">
          <li>Customers keep asking "send price again"</li>
          <li>Products get lost in chat history</li>
          <li>No proper catalog to show new buyers</li>
          <li>You repeat the same replies every day</li>
          <li>You lose sales without even knowing</li>
        </ul>
      </section>

      {/* SOLUTION */}
      <section className="section solution">
        <h2>There's a simpler way.</h2>
        <p className="section-sub">
          StoreLink gives you a clean store page where your products are always visible.
        </p>
        <div className="comparison">
          <div className="comparison-card old">
            <span className="label">Before</span>
            <p>"Check my WhatsApp status"</p>
          </div>
          <div className="arrow">→</div>
          <div className="comparison-card new">
            <span className="label">After</span>
            <p>"Here is my store link"</p>
          </div>
        </div>
        <ul className="benefit-list">
          <li>✓ Your products are always organized</li>
          <li>✓ Customers can browse anytime</li>
          <li>✓ Orders come directly to your WhatsApp</li>
          <li>✓ No technical skills needed</li>
        </ul>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how">
        <h2>Get your store in 3 steps</h2>
        <div className="steps">
          <div className="step">
            <span className="step-num">1</span>
            <p>Create your store with your name and phone number</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <p>Add your products — image, price, description</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <p>Share your store link anywhere</p>
          </div>
        </div>
      </section>

      {/* WAITLIST FORM */}
      <section className="section waitlist" id="waitlist">
        <h2>Get early access before we launch</h2>
        <p className="section-sub">
          We are onboarding a small number of sellers first to help them grow faster.
        </p>

        {submitted ? (
          <div className="success-msg" role="status">
            You're on the list 🚀 We'll contact you on WhatsApp when access opens.
          </div>
        ) : (
          <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full Name <span className="required-mark">*</span></label>
              <span className="field-hint">So we know who you are</span>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="phone">Phone Number (WhatsApp) <span className="required-mark">*</span></label>
              <span className="field-hint">We will contact you here when your store is ready</span>
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

            <div className="field">
              <label htmlFor="businessType">Business Type <span className="required-mark">*</span></label>
              <select
                id="businessType"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your business type</option>
                <option value="Vendor">Vendor</option>
                <option value="Retailer">Retailer</option>
                <option value="Artisan">Artisan</option>
                <option value="Service Provider">Service Provider</option>
                <option value="Reseller">Reseller</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="currentPlatform">Where do you currently sell? <span className="required-mark">*</span></label>
              <select
                id="currentPlatform"
                name="currentPlatform"
                value={form.currentPlatform}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a platform</option>
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="notes">
                What is your biggest challenge selling online today? <span className="required-mark">*</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Tell us what's holding you back..."
                value={form.notes}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Reserve My Spot'}
            </button>
          </form>
        )}
      </section>

      {/* TRUST */}
      <section className="section trust">
        <h2>Built for small businesses like yours</h2>
        <p className="section-sub">
          We are building StoreLink specifically for sellers who run their business on WhatsApp and Instagram.
          Whether you are just starting out or already growing — StoreLink is built to move with you.
        </p>
      </section>

      {/* FINAL CTA */}
      <section className="section final-cta">
        <h2>Start selling smarter, not harder.</h2>
        <a href="#waitlist" className="btn btn-primary">Join Early Access</a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} StoreLink. Built for Nigerian small businesses.</p>
        <p>Contact us: <a href="mailto:christobelnwachukwu@gmail.com">christobelnwachukwu@gmail.com</a> · <a href="tel:09026161344">09026161344</a></p>
      </footer>
    </>
  )
}
