import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    }}>
      <p style={{ fontSize: '72px', margin: '0 0 8px', lineHeight: 1 }}>🔗</p>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>
        Page not found
      </h1>
      <p style={{ fontSize: '16px', color: '#6b7280', margin: '0 0 32px' }}>
        This link doesn't lead anywhere. Let's get you back on track.
      </p>
      <Link to="/" style={{
        background: '#aa3bff',
        color: '#fff',
        padding: '12px 28px',
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '15px',
        textDecoration: 'none',
      }}>
        Back to Home
      </Link>
    </div>
  )
}
