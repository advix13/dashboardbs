'use client';

import { useState, useEffect } from 'react';
import { supabase, ProductCategory } from '@/lib/supabase';
import { Plus, Loader2 } from 'lucide-react';

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setCategories(data || []);
    } catch (err: any) {
      console.error('Error fetching categories:', err.message);
      setError('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = async () => {
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    setIsAdding(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('product_categories')
        .insert({
          name: newCategoryName.trim(),
          description: newCategoryDescription.trim() || null
        })
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setCategories([...categories, data[0]]);
        onChange(data[0].name);
        setNewCategoryName('');
        setNewCategoryDescription('');
        setShowAddForm(false);
      }
    } catch (err: any) {
      console.error('Error adding category:', err.message);
      setError(err.message || 'Failed to add category');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <Loader2 size={16} className="animate-spin" />
        <span>Loading categories...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
        >
          <Plus size={14} className="mr-0.5" />
          {showAddForm ? 'Cancel' : 'Add New Category'}
        </button>
      </div>

      {showAddForm ? (
        <div className="bg-gray-50 p-3 rounded-md mb-3 space-y-3">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            disabled={isAdding}
          />
          <input
            type="text"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            disabled={isAdding}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addCategory}
              disabled={isAdding}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-600 flex items-center"
            >
              {isAdding ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-1.5" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus size={14} className="mr-1.5" />
                  <span>Add Category</span>
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      ) : (
        <select
          id="category"
          name="category"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
} 