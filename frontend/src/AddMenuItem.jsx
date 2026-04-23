import { useState } from 'react';

export default function AddMenuItem({ onAddSuccess }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('You must be logged in as an admin to add items.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          isAvailable: true
        })
      });

      if (response.ok) {
        setName('');
        setDescription('');
        setPrice('');
        if (onAddSuccess) onAddSuccess();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add item. Ensure you are an Admin.');
      }
    } catch (err) {
      setError('Server error. Please check backend connection.');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>Add New Menu Item</h3>
      {error && <div style={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Item Name (e.g. Mocha)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price (e.g. 5.50)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Add to Menu</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
    marginBottom: '30px',
  },
  header: {
    margin: '0 0 16px 0',
    fontSize: '1.25rem',
    color: '#1a1a1a',
  },
  error: {
    color: '#991b1b',
    backgroundColor: '#fee2e2',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '0.875rem',
  },
  form: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '0.95rem',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  }
};