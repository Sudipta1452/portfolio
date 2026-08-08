import { useState } from 'react'

const EMPTY_FORM = { name: '', email: '', message: '' }

const STATUS_MESSAGE = {
  sent: "Thanks — your message is on its way. I'll get back to you soon.",
  error: 'Something went wrong sending that. Please try again in a moment.',
}

// Netlify Forms only works once this site is deployed on Netlify — its
// build bot statically parses HTML for `data-netlify="true"` forms, which
// can't see a form this component renders at runtime. public/__forms.html
// is a plain, hidden, non-React copy of this form's fields that exists
// solely so that bot has something to find at build time. At runtime, the
// actual submission below just POSTs form-encoded data to Netlify's
// endpoint, tagged with the matching form-name.
function encodeFormData(data) {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

// A "controlled" form: each input's value comes from React state, and
// every keystroke updates that state via onChange. This is the standard
// React pattern — the DOM input becomes a reflection of state rather
// than the source of truth, which is why we can reset the whole form
// just by resetting one object.
export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setStatus('sending')
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({ 'form-name': 'contact', ...form, 'bot-field': '' }),
      })

      if (!response.ok) throw new Error(`Netlify Forms responded with ${response.status}`)

      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <h2 className="major">Contact</h2>
      <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <p style={{ display: 'none' }}>
          <label>
            Don&rsquo;t fill this out if you&rsquo;re human: <input name="bot-field" />
          </label>
        </p>
        <div className="fields">
          <div className="field half">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <ul className="actions">
          <li>
            <input
              type="submit"
              value={status === 'sending' ? 'Sending…' : 'Send Message'}
              className="primary"
              disabled={status === 'sending'}
            />
          </li>
          <li>
            <input
              type="reset"
              value="Reset"
              onClick={() => {
                setForm(EMPTY_FORM)
                setStatus('idle')
              }}
            />
          </li>
        </ul>
        {status !== 'idle' && status !== 'sending' && (
          <p role="status" className={status === 'sent' ? 'contact-status-ok' : 'contact-status-error'}>
            {STATUS_MESSAGE[status]}
          </p>
        )}
      </form>
      <ul className="icons">
        <li>
          <a href="#" className="icon brands fa-twitter">
            <span className="label">Twitter</span>
          </a>
        </li>
        <li>
          <a href="#" className="icon brands fa-facebook-f">
            <span className="label">Facebook</span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/sudipta-saha-71059b146" className="icon brands fa-linkedin-in">
            <span className="label">LinkedIn</span>
          </a>
        </li>
        <li>
          <a href="https://github.com/Sudipta1452" className="icon brands fa-github">
            <span className="label">GitHub</span>
          </a>
        </li>
      </ul>
    </>
  )
}
