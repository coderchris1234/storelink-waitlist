import { useState } from 'react'
import { IoCopyOutline, IoCheckmark } from 'react-icons/io5'
import styles from './UserTable.module.css'

const TYPE_COLORS = {
  Fashion: '#f59e0b',
  Food: '#10b981',
  Electronics: '#3b82f6',
  Services: '#8b5cf6',
  Other: '#6b7280',
}

function TypeTag({ type }) {
  const color = TYPE_COLORS[type] || TYPE_COLORS.Other
  return (
    <span className={styles.tag} style={{ '--tag-color': color }}>
      {type}
    </span>
  )
}

function CopyPhone({ phone }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <span className={styles.phoneCell}>
      {phone}
      <button className={styles.copyBtn} onClick={copy} title="Copy phone number" aria-label="Copy phone number">
        {copied ? <IoCheckmark size={14} /> : <IoCopyOutline size={14} />}
      </button>
    </span>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function isToday(iso) {
  return new Date(iso).toDateString() === new Date().toDateString()
}

export default function UserTable({ users, loading, error, onView }) {
  if (loading) return <div className={styles.state}>Loading signups...</div>
  if (error) return <div className={styles.state}>Failed to load data.</div>
  if (!users.length) return <div className={styles.state}>No signups yet. Check back soon.</div>

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Business Type</th>
            <th>Platform</th>
            <th>Date Joined</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className={isToday(user.createdAt) ? styles.newRow : ''}>
              <td className={styles.name}>
                {user.name}
                {isToday(user.createdAt) && <span className={styles.newBadge}>New</span>}
              </td>
              <td><CopyPhone phone={user.phoneNumber} /></td>
              <td><TypeTag type={user.businessType} /></td>
              <td>{user.currentPlatform ?? '—'}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>
                <button className={styles.viewBtn} onClick={() => onView(user)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
