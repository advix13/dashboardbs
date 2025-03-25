export default function OrdersPage() {
  // Use fixed sample data instead of random values
  const orders = [
    { id: 2001, customer: 'Customer 1', date: '2024-03-10', total: '22,995 CFA', status: 'Delivered' },
    { id: 2002, customer: 'Customer 2', date: '2024-03-09', total: '33,750 CFA', status: 'Processing' },
    { id: 2003, customer: 'Customer 3', date: '2024-03-08', total: '16,375 CFA', status: 'Shipped' },
    { id: 2004, customer: 'Customer 4', date: '2024-03-07', total: '44,625 CFA', status: 'Pending' },
    { id: 2005, customer: 'Customer 5', date: '2024-03-06', total: '27,150 CFA', status: 'Delivered' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">All Orders</h2>
            <p className="text-gray-500">Manage and track customer orders</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            New Order
          </button>
        </div>
        
        <div className="flex mb-4 space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md">
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
            <option>Custom range</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #ORD-{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
                    <button className="text-blue-500 hover:text-blue-700">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 100 orders
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md">Previous</button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-md">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
} 