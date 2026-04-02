import { useState } from 'react'
import './App.css'

interface GifterItem {
  id: number;
  title: string;
  image: string;
  category: string;
  user: string;
  isFreeOffer: boolean;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const items: GifterItem[] = [
    { id: 1, title: 'Pianta Monstera Deliciosa', category: 'Casa & Giardino', user: 'Laura G.', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=500&fit=crop', isFreeOffer: false },
    { id: 2, title: 'Set 4 sedie design', category: 'Mobili', user: 'Marco D.', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=500&fit=crop', isFreeOffer: true },
    { id: 3, title: 'Macchina caffè a cialde', category: 'Elettrodomestici', user: 'Sarah L.', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=500&fit=crop', isFreeOffer: false },
    { id: 4, title: 'Zaino trekking 40L', category: 'Sport', user: 'Alex V.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop', isFreeOffer: false },
    { id: 5, title: 'Libri Fantasy (4 volumi)', category: 'Libri', user: 'Paolo R.', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop', isFreeOffer: false },
    { id: 6, title: 'Magliette vintage M/L', category: 'Abbigliamento', user: 'Massi N.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', isFreeOffer: true },
    { id: 7, title: 'Monitor 24 pollici', category: 'Elettronica', user: 'Erica P.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=500&fit=crop', isFreeOffer: false },
    { id: 8, title: 'Vasi in ceramica', category: 'Casa', user: 'Giulia V.', image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?w=400&h=500&fit=crop', isFreeOffer: false },
  ]

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark')
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      <header>
        <a href="/" className="logo">
          <img src="/logo.png" alt="Gifter Logo" width="40" height="40" style={{ borderRadius: '8px' }} />
          <span>Gifter</span>
        </a>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Cerca un regalo o una categoria..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-buttons">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {isDarkMode ? '☀️ Chiaro' : '🌙 Scuro'}
          </button>
          <button className="btn btn-primary">Regala ora</button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1>Sgombera e Regala</h1>
            <p>Libera spazio in casa e fai felice qualcuno nella tua community.</p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-white" style={{ background: 'white', color: '#10b981' }}>Come funziona</button>
              <button className="btn btn-outline" style={{ border: '1px solid white', color: 'white', background: 'transparent' }}>Vedi Sgomberi VIP</button>
            </div>
          </div>
          {/* Overlay opaco per l'immagine hero */}
          <div style={{ 
            position: 'absolute', 
            top: 0, left: 0, right: 0, bottom: 0, 
            backgroundImage: 'url(/hero.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            opacity: 0.2,
            zIndex: 1
          }}></div>
        </section>

        <section style={{ padding: '2rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Tutti i regali di oggi</h2>
            <div className="card-tag" style={{ background: '#f0fdf4', border: '1px solid #10b981' }}>
              {filteredItems.length} oggetti trovati
            </div>
          </div>

          <div className="grid">
            {filteredItems.map(item => (
              <div key={item.id} className="card">
                <img src={item.image} alt={item.title} className="card-img" />
                <div className="card-info">
                  <div className="card-tag">{item.isFreeOffer ? 'Offerta Libera' : 'Regalo'}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{item.category}</p>
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ccc' }}></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{item.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 2rem 8rem', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; 2026 Gifter PWA - Made with ❤️ for the community</p>
      </footer>

      {/* Bottom Navigation for PWA/Mobile */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">🔍</span>
          <span className="nav-label">Cerca</span>
        </div>
        <div className="nav-item plus">
          <div className="plus-button">+</div>
        </div>
        <div className="nav-item">
          <span className="nav-icon">✉️</span>
          <span className="nav-label">Inbox</span>
        </div>
        <div className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profilo</span>
        </div>
      </nav>
    </div>
  )
}

export default App
