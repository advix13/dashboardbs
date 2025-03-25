'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, X, Search, Plus, Minus, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

export default function AdjustStockPage() {
  // Stock adjustment types
  const adjustmentTypes = [
    { id: 'add', label: 'Add Stock', description: 'Increase inventory levels' },
    { id: 'remove', label: 'Remove Stock', description: 'Decrease inventory levels' },
    { id: 'set', label: 'Set Exact Value', description: 'Set a specific inventory level' },
  ];

  // Reason codes
  const reasonCodes = [
    { id: 'purchase', label: 'Purchase', forTypes: ['add'] },
    { id: 'return_from_customer', label: 'Return from Customer', forTypes: ['add'] },
    { id: 'production', label: 'Production', forTypes: ['add'] },
    { id: 'found', label: 'Inventory Found', forTypes: ['add'] },
    { id: 'sale', label: 'Sale', forTypes: ['remove'] },
    { id: 'damaged', label: 'Damaged/Expired', forTypes: ['remove'] },
    { id: 'theft', label: 'Theft/Loss', forTypes: ['remove'] },
    { id: 'transfer', label: 'Transfer', forTypes: ['add', 'remove'] },
    { id: 'correction', label: 'Count Correction', forTypes: ['add', 'remove', 'set'] },
    { id: 'initial', label: 'Initial Count', forTypes: ['set'] },
  ];

  // Sample inventory items
  const inventoryItems = [
    { 
      id: 1, 
      name: 'Water Bottle - 500ml', 
      sku: 'WTR-B500', 
      category: 'Water', 
      currentStock: 250, 
      minStock: 50, 
      maxStock: 300, 
      location: 'WH-A12' 
    },
    { 
      id: 2, 
      name: 'Water Bottle - 1L', 
      sku: 'WTR-B1000', 
      category: 'Water', 
      currentStock: 180, 
      minStock: 40, 
      maxStock: 250, 
      location: 'WH-A14' 
    },
    { 
      id: 3, 
      name: 'Water Gallon - 5L', 
      sku: 'WTR-G5000', 
      category: 'Water', 
      currentStock: 30, 
      minStock: 25, 
      maxStock: 100, 
      location: 'WH-B05' 
    },
    { 
      id: 4, 
      name: 'Ice Bag - 2kg', 
      sku: 'ICE-B2000', 
      category: 'Ice', 
      currentStock: 120, 
      minStock: 30, 
      maxStock: 150, 
      location: 'WH-C01' 
    },
    { 
      id: 5, 
      name: 'Ice Bag - 5kg', 
      sku: 'ICE-B5000', 
      category: 'Ice', 
      currentStock: 85, 
      minStock: 20, 
      maxStock: 100, 
      location: 'WH-C02' 
    }
  ];

  // State for form
  const [formData, setFormData] = useState({
    adjustmentType: 'add',
    reasonCode: 'purchase',
    reference: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    items: [] as Array<{
      id: number;
      quantity: number;
      newQuantity: number;
    }>
  });

  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof inventoryItems>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    
    const filteredItems = inventoryItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) || 
      item.sku.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredItems);
    setShowSearchResults(true);
  };

  // Add item to adjustment
  const addItemToAdjustment = (item: typeof inventoryItems[0]) => {
    // Check if item is already in the list
    if (formData.items.some(i => i.id === item.id)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { 
          id: item.id, 
          quantity: 0,
          newQuantity: item.currentStock
        }
      ]
    }));
    
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Remove item from adjustment
  const removeItemFromAdjustment = (itemId: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (itemId: number, value: string) => {
    const quantity = parseInt(value) || 0;
    
    setFormData(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId) {
          const inventoryItem = inventoryItems.find(i => i.id === itemId);
          if (!inventoryItem) return item;
          
          let newQuantity = inventoryItem.currentStock;
          
          switch (prev.adjustmentType) {
            case 'add':
              newQuantity = inventoryItem.currentStock + quantity;
              break;
            case 'remove':
              newQuantity = Math.max(0, inventoryItem.currentStock - quantity);
              break;
            case 'set':
              newQuantity = quantity;
              break;
          }
          
          return { ...item, quantity, newQuantity };
        }
        return item;
      });
      
      return { ...prev, items: updatedItems };
    });
  };

  // Handle adjustment type change
  const handleAdjustmentTypeChange = (type: string) => {
    // Reset reason code if it's not applicable for the new type
    const currentReasonCode = formData.reasonCode;
    const isReasonApplicable = reasonCodes.find(
      r => r.id === currentReasonCode && r.forTypes.includes(type)
    );
    
    const newReasonCode = isReasonApplicable 
      ? currentReasonCode 
      : reasonCodes.find(r => r.forTypes.includes(type))?.id || '';
    
    // Update form data with new type and reason
    setFormData(prev => ({
      ...prev,
      adjustmentType: type,
      reasonCode: newReasonCode,
      items: prev.items.map(item => {
        const inventoryItem = inventoryItems.find(i => i.id === item.id);
        if (!inventoryItem) return item;
        
        let newQuantity = inventoryItem.currentStock;
        
        switch (type) {
          case 'add':
            newQuantity = inventoryItem.currentStock + item.quantity;
            break;
          case 'remove':
            newQuantity = Math.max(0, inventoryItem.currentStock - item.quantity);
            break;
          case 'set':
            newQuantity = item.quantity;
            break;
        }
        
        return { ...item, newQuantity };
      })
    }));
  };

  // Get available reason codes based on selected adjustment type
  const getAvailableReasonCodes = () => {
    return reasonCodes.filter(reason => 
      reason.forTypes.includes(formData.adjustmentType)
    );
  };

  // Get inventory item details
  const getInventoryItem = (itemId: number) => {
    return inventoryItems.find(item => item.id === itemId);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (formData.items.length === 0) {
      alert('Please add at least one item to adjust.');
      return;
    }
    
    if (!formData.reasonCode) {
      alert('Please select a reason for the adjustment.');
      return;
    }
    
    // In a real app, this would be sent to the server
    console.log('Submitting stock adjustment:', formData);
    
    // Show success message
    alert('Stock adjustment has been successfully recorded!');
    
    // In a real app, we would redirect to the inventory page
    // router.push('/inventory');
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/inventory" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Inventory
        </Link>
        <h1 className="text-2xl font-bold">Adjust Inventory</h1>
        <p className="text-gray-500">Add, remove, or update product stock levels</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {/* Adjustment Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Adjustment Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adjustmentTypes.map((type) => (
                  <div 
                    key={type.id}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      formData.adjustmentType === type.id ? 
                        'border-blue-500 bg-blue-50' : 
                        'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAdjustmentTypeChange(type.id)}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 ${
                        formData.adjustmentType === type.id ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <h3 className="font-medium">{type.label}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Adjustment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason
                </label>
                <select
                  value={formData.reasonCode}
                  onChange={(e) => setFormData({ ...formData, reasonCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a reason</option>
                  {getAvailableReasonCodes().map((reason) => (
                    <option key={reason.id} value={reason.id}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference (Optional)
                </label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Purchase Order #, Invoice #"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Additional information about this adjustment"
                />
              </div>
            </div>

            {/* Product Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Products
              </label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
                  placeholder="Search products by name or SKU"
                />
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {searchResults.map((item) => (
                      <div 
                        key={item.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        onClick={() => addItemToAdjustment(item)}
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.sku}</div>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Stock: {item.currentStock}</span>
                          <button 
                            type="button"
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              addItemToAdjustment(item);
                            }}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {showSearchResults && searchResults.length === 0 && searchQuery && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-center">
                    <p className="text-gray-500">No products found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Products Table */}
            {formData.items.length > 0 && (
              <div className="border rounded-md overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {formData.adjustmentType === 'set' ? 'New Value' : 'Quantity'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        New Stock Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.items.map((item) => {
                      const inventoryItem = getInventoryItem(item.id);
                      if (!inventoryItem) return null;
                      
                      return (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{inventoryItem.name}</div>
                            <div className="text-sm text-gray-500">{inventoryItem.sku}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {inventoryItem.currentStock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              min="0"
                              value={item.quantity || ''}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="w-24 px-3 py-1 border border-gray-300 rounded-md"
                              required
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${
                              item.newQuantity > inventoryItem.currentStock ? 'text-green-600' :
                              item.newQuantity < inventoryItem.currentStock ? 'text-red-600' :
                              'text-gray-600'
                            }`}>
                              {item.newQuantity}
                            </span>
                            {formData.adjustmentType !== 'set' && (
                              <span className="text-xs text-gray-500 ml-1">
                                ({item.newQuantity > inventoryItem.currentStock ? '+' : ''}
                                {item.newQuantity - inventoryItem.currentStock})
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button 
                              type="button"
                              onClick={() => removeItemFromAdjustment(item.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {formData.items.length === 0 && (
              <div className="border border-dashed border-gray-300 rounded-md p-6 text-center mb-6">
                <p className="text-gray-500">Search and add products to adjust their stock levels</p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
            <Link href="/inventory" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 inline-flex items-center">
              <X size={16} className="mr-2" />
              Cancel
            </Link>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
            >
              <Save size={16} className="mr-2" />
              Record Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 