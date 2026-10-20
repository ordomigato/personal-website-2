import { useRef, useState, type FormEvent } from 'react'
import { useReveal } from '../utils/useReveal'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'success' | 'error'

function encode(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

function Contact() {
  const { ref, visible } = useReveal<HTMLElement>()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const nameRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'Contact Form', name, email, message }),
      })
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className={`${styles.contact} reveal ${visible ? 'in' : ''}`}>
      <div className="wrap">
        <p className="eyebrow" style={{ color: 'var(--pale)' }}>04 — Contact</p>
        <div className={styles.head}>
          <h2 className={styles.heading}>
            <button
              type="button"
              className={styles.headingBtn}
              onClick={() => nameRef.current?.focus()}
            >
              Let's talk
            </button>
          </h2>
          <p className={styles.meta}>
            Always open to new opportunities. Drop a note below, or find me on LinkedIn.
          </p>
        </div>

        <form
          name="Contact Form"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="Contact Form" />
          <p hidden>
            <label>
              Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className={styles.fieldRow}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                ref={nameRef}
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <label className={styles.field}>
            <span>Message</span>
            <textarea
              name="message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <div className={styles.formFoot}>
            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
            {status === 'success' && (
              <p className={styles.formNote}>Thanks — I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className={styles.formNote}>
                Something went wrong. Try again, or reach me on LinkedIn below.
              </p>
            )}
          </div>
        </form>

        <div className={styles.foot}>
          <span suppressHydrationWarning>© {new Date().getFullYear()} Jeremy Gervais</span>
          <div className={styles.socials}>
            <a href="https://github.com/ordomigato" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/jeremy-gervais/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/fakiescript" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="/files/Jeremy%20Gervais%20-%20Resume.pdf" target="_blank" rel="noopener noreferrer">Resume ↓</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
