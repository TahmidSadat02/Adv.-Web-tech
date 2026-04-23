import { Routes, Route, Link } from 'react-router-dom';
import Menu from './Menu';
import Login from './Login';

export default function App() {
  return (
    <div style={styles.appContainer}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>Coffee Shop</div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Menu</Link>
          <Link to="/login" style={styles.link}>Login</Link>
        </div>
      </nav>

      {/* Page Routing */}
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    fontFamily: 'system-ui, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #eaeaea',
  },
  navBrand: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
  },
  link: {
    textDecoration: 'none',
    color: '#666666',
    fontWeight: '500',
    fontSize: '1rem',
  },
  mainContent: {
    padding: '40px 20px',
  }
};