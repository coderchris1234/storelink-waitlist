import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import styles from './Dashboard.module.css'
import StatsCard from '../components/StatsCard'
import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'

const today = new Date().toDateString()

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // eslint-disable-line no-unused-vars
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    axios.get('https://store-api-ds7z.onrender.com/api/v1/get-users')
      .then(res => {
        const data = res.data
        setUsers(Array.isArray(data) ? data : data.users ?? data.data ?? [])
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [])

  const businessTypes = useMemo(() => {
    const types = [...new Set(users.map(u => u.businessType))]
    return ['All', ...types]
  }, [users])

  const filtered = useMemo(() => {
    return users
      .filter(u => {
        const q = search.toLowerCase()
        return u.name.toLowerCase().includes(q) || String(u.phoneNumber).includes(q)
      })
      .filter(u => filterType === 'All' || u.businessType === filterType)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [users, search, filterType])

  const stats = useMemo(() => {
    const byType = {}
    const byPlatform = {}
    users.forEach(u => {
      byType[u.businessType] = (byType[u.businessType] || 0) + 1
      if (u.currentPlatform) {
        byPlatform[u.currentPlatform] = (byPlatform[u.currentPlatform] || 0) + 1
      }
    })
    return {
      total: users.length,
      today: users.filter(u => new Date(u.createdAt).toDateString() === today).length,
      byType,
      byPlatform,
    }
  }, [users])

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>StoreLink Waitlist Dashboard</h1>
          <p className={styles.sub}>Manage early users</p>
        </div>
      </header>

      <main className={styles.main}>
        {/* Stats */}
        <div className={styles.stats}>
          <StatsCard label="Total Signups" value={stats.total} />
          <StatsCard label="Today's Signups" value={stats.today} accent />
        </div>

        <div className={styles.statsGroup}>
          <p className={styles.statsLabel}>By Business Type</p>
          <div className={styles.stats}>
            {Object.entries(stats.byType).map(([type, count]) => (
              <StatsCard key={type} label={type} value={count} />
            ))}
          </div>
        </div>

        <div className={styles.statsGroup}>
          <p className={styles.statsLabel}>By Platform</p>
          <div className={styles.stats}>
            {Object.entries(stats.byPlatform).map(([platform, count]) => (
              <StatsCard key={platform} label={platform} value={count} />
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className={styles.toolbar}>
          <input
            className={styles.search}
            type="search"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search users"
          />
          <select
            className={styles.filter}
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            aria-label="Filter by business type"
          >
            {businessTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Table */}
        <UserTable
          users={filtered}
          loading={loading}
          error={error}
          onView={setSelectedUser}
        />
      </main>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}
