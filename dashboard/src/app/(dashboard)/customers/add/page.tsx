'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'lucide-react';

export default function AddCustomerPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Senegal',
    notes: '',
    status: 'Active'
  });

  // State for validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would send the data to the server
      console.log('Submitting form:', formData);
      // Redirect to customers list (in a real app)
      // router.push('/customers');
      alert('Customer added successfully! (This is a placeholder - in a real app, data would be saved to the database)');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/customers" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Customers
        </Link>
        <h1 className="text-2xl font-bold">Add New Customer</h1>
        <p className="text-gray-500">Create a new customer record</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Information */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold mb-4">Business Information</h2>
                <div className="border-b border-gray-200 mb-4"></div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Business Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  placeholder="e.g. Chez Maman Restaurant"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              {/* Contact Information */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="border-b border-gray-200 mb-4"></div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Contact Name*</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  placeholder="e.g. Marie Dupont"
                />
                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  placeholder="e.g. contact@chezmaman.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  placeholder="e.g. +221 78 123 4567"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              {/* Address Information */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-semibold mb-4">Address Information</h2>
                <div className="border-b border-gray-200 mb-4"></div>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Street Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  placeholder="e.g. 123 Avenue de la République"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                  placeholder="e.g. Dakar"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Senegal">Senegal</option>
                  <option value="Mali">Mali</option>
                  <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Gambia">Gambia</option>
                </select>
              </div>
              
              {/* Additional Information */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
                <div className="border-b border-gray-200 mb-4"></div>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter any additional information about this customer..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
            <Link href="/customers" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 inline-flex items-center">
              <X size={16} className="mr-2" />
              Cancel
            </Link>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 