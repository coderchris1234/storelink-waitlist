import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import styles from './UserModal.module.css'

const TYPE_COLORS = {
  Fashion: '#f59e0b',
  Food: '#10b981',
  Electronics: '#3b82f6',
  Services: '#8b5cf6',
  Other: '#6b7280',
}

export default function UserModal({ user, onClose }) {
  // close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const color = TYPE_COLORS[user.businessType] || TYPE_COLORS.Other

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="User details">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>User Details</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <IoClose size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <Row label="Name" value={user.name} />
          <Row label="Phone (WhatsApp)" value={user.phone} mono />
          <Row label="Business Type"
            value={
              <span className={styles.tag} style={{ '--tag-color': color }}>
                {user.businessType}
              </span>
            }
          />
          <Row
            label="Date Joined"
            value={new Date(user.createdAt).toLocaleString('en-NG', {
              dateStyle: 'medium', timeStyle: 'short'
            })}
          />
          {user.notes && <Row label="Notes" value={user.notes} />}
        </div>

        <div className={styles.footer}>
          <a
            href={`https://wa.me/${user.phone}`}
            target="_blank"
            rel="noreferrer"
            className={styles.waBtn}
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value, mono }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={`${styles.rowValue} ${mono ? styles.mono : ''}`}>{value}</span>
    </div>
  )
}
