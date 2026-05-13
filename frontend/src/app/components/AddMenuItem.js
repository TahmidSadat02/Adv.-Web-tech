"use client";
import { useState, useContext } from 'react';
import api from '../lib/axios';
import { AppContext } from '../context/AppContext';

export default function AddMenuItem({ onAddSuccess }) {
  
  const { triggerNotification, categories } = useContext(AppContext);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Price must be a valid positive number.');
      setIsSubmitting(false);
      return;
    }
    try {
      
      const payload = {
        name,
        description,
        price: parsedPrice,
        isAvailable: true
      };

      
      if (categoryId) {
        payload.categoryId = categoryId;
      }

      await api.post('/menu', payload);
      
      triggerNotification(`Successfully added ${name} to the menu!`);

      
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      
      if (onAddSuccess) {
        onAddSuccess(); 
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add menu item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Item</h3>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-sm font-bold border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Item Name (e.g. Mocha)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
          />
          <input
            type="number"
            placeholder="Price (e.g. 4.50)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01"
            min="0"
            className="p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
          />
        </div>

        {/* --- NEW: Category Dropdown --- */}
        <div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all cursor-pointer bg-white"
          >
            <option value="">Select a Category (Optional)</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="p-4 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all resize-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-lg transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  );
}