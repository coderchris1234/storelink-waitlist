import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import styles from './Dashboard.module.css'
import StatsCard from '../components/StatsCard'
import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'

// Mock data for development — remove when real API is ready
const MOCK_USERS = [
  { id: '1', name: 'Amaka Obi', phone: '2348012345678', businessType: 'Fashion', notes: 'I struggle with tracking orders', createdAt: new Date().toISOString() },
  { id: '2', name: 'Chidi Nwosu', phone: '2348098765432', businessType: 'Food', notes: 'Customers always ask for price list', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', name: 'Fatima Bello', phone: '2347011223344', businessType: 'Electronics', notes: '', createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: '4', name: 'Tunde Adeyemi', phone: '2348155667788', businessType: 'Services', notes: 'Hard to show portfolio', createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  { id: '5', name: 'Ngozi Eze', phone: '2349033445566', businessType: 'Fashion', notes: 'Repeat questions every day', createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
]

const today = new Date().toDateString()

export default function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // eslint-disable-line no-unused-vars
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    axios.get('/api/waitlist')
      .then(res => {
        const data = res.data
        setUsers(Array.isArray(data) ? data : data.users ?? data.data ?? MOCK_USERS)
      })
      .catch(() => setUsers(MOCK_USERS))
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
        return u.name.toLowerCase().includes(q) || u.phone.includes(q)
      })
      .filter(u => filterType === 'All' || u.businessType === filterType)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [users, search, filterType])

  const stats = useMemo(() => ({
    total: users.length,
    today: users.filter(u => new Date(u.createdAt).toDateString() === today).length,
    fashion: users.filter(u => u.businessType === 'Fashion').length,
  }), [users])

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
          <StatsCard label="Fashion Sellers" value={stats.fashion} />
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
