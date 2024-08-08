// AdminPage.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  approveSupplyRequest,
  declineSupplyRequest,
  markProductAsPaid,
  addClerk,
  removeClerk,
  setSupplyRequests,
  setProducts,
  setClerks,
  setReports
} from '../features/adminSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar,PieChart,Pie } from 'recharts';
import './AdminPage.css';
import { updateClerk } from '../features/adminSlice';

// Mock data
const mockSupplyRequests = [
  { id: 1, supplier: 'Supplier A', quantity: 100, status: 'Pending' },
  { id: 2, supplier: 'Supplier B', quantity: 200, status: 'Pending' },
  { id: 3, supplier: 'Supplier C', quantity: 150, status: 'Pending' },
];

const mockProducts = [
  { id: 1, name: 'Rice', paymentStatus: 'unpaid', spoilt: 5, remaining: 95, unitPrice: 100, buyingPrice: 80 },
  { id: 2, name: 'Beans', paymentStatus: 'paid', spoilt: 2, remaining: 48, unitPrice: 120, buyingPrice: 100 },
  { id: 3, name: 'Greengrams', paymentStatus: 'unpaid', spoilt: 1, remaining: 49, unitPrice: 150, buyingPrice: 130 },
];

const mockClerks = [
  { id: 1, name: 'Clerk A', email: 'clerka@example.com', status: 'active' },
  { id: 2, name: 'Clerk B', email: 'clerkb@example.com', status: 'active' },
];

const mockSales = {
  'Clerk A': [
    { date: '2023-08-01', item: 'Rice', quantitySold: 10, quantityInHand: 90, profit: 200 },
    { date: '2023-08-01', item: 'Beans', quantitySold: 5, quantityInHand: 45, profit: 100 },
    { date: '2023-08-01', item: 'Greengrams', quantitySold: 8, quantityInHand: 42, profit: 160 },
  ],
  'Clerk B': [
    { date: '2023-08-01', item: 'Rice', quantitySold: 8, quantityInHand: 92, profit: 160 },
    { date: '2023-08-01', item: 'Beans', quantitySold: 6, quantityInHand: 44, profit: 120 },
    { date: '2023-08-01', item: 'Greengrams', quantitySold: 7, quantityInHand: 43, profit: 140 },
  ],
};

const mockReports = {
  rice: [
    { date: '2023-08-01', quantitySold: 18, quantityInHand: 82, profit: 360 },
    { date: '2023-08-02', quantitySold: 15, quantityInHand: 67, profit: 300 },
    { date: '2023-08-03', quantitySold: 20, quantityInHand: 47, profit: 400 },
  ],
  beans: [
    { date: '2023-08-01', quantitySold: 11, quantityInHand: 39, profit: 220 },
    { date: '2023-08-02', quantitySold: 13, quantityInHand: 26, profit: 260 },
    { date: '2023-08-03', quantitySold: 16, quantityInHand: 10, profit: 320 },
  ],
  greengrams: [
    { date: '2023-08-01', quantitySold: 15, quantityInHand: 35, profit: 300 },
    { date: '2023-08-02', quantitySold: 18, quantityInHand: 17, profit: 360 },
    { date: '2023-08-03', quantitySold: 12, quantityInHand: 5, profit: 240 },
  ],
};

const AdminPage = () => {
  const dispatch = useDispatch();
  const [newClerkName, setNewClerkName] = useState('');
  const [newClerkEmail, setNewClerkEmail] = useState('');
  const [showAddClerkPopup, setShowAddClerkPopup] = useState(false);

  const handleUpdateClerkStatus = (id, status) => dispatch(updateClerk({ id, status }));
  const {
    supplyRequests = [],
    products = [],
    clerks = [],
    reports = {}
  } = useSelector((state) => state.admin);

  useEffect(() => {
    // Use mock data for now
    dispatch(setSupplyRequests(mockSupplyRequests));
    dispatch(setProducts(mockProducts));
    dispatch(setClerks(mockClerks));
    dispatch(setReports(mockReports));
  }, [dispatch]);

  const handleApproveRequest = (id) => {
    dispatch(approveSupplyRequest(id));
  };

  const handleDeclineRequest = (id) => {
    dispatch(declineSupplyRequest(id));
  };

  const handleMarkAsPaid = (id) => {
    dispatch(markProductAsPaid(id));
  };

  const handleAddClerk = () => {
    if (newClerkName.trim() && newClerkEmail.trim()) {
      dispatch(addClerk({ id: Date.now(), name: newClerkName.trim(), email: newClerkEmail.trim(), status: 'active' }));
      setNewClerkName('');
      setNewClerkEmail('');
      setShowAddClerkPopup(false);
    }
  };

  const handleRemoveClerk = (id) => {
    dispatch(removeClerk(id));
  };

  const handleInactivateClerk = (id) => {
    dispatch(updateClerk({id,status:'inactive'}));
    console.log('Inactivate clerk', id);
  };

  return (
    <div className="admin-page">
      <aside className="sidebar">
        <h2>My Duka</h2>
        <button className="logout-btn">Log Out</button>
      </aside>
      <main className="main-content">
        <header>
          <h1>Admin</h1>
          <button className="add-clerk-btn" onClick={() => setShowAddClerkPopup(true)}>
            <span className="plus-icon">+</span> Add Clerk
          </button>
        </header>
        
        <section className="supply-requests">
          <h2>Supply Requests</h2>
          <table>
            <thead>
              <tr>
                <th>Clerk</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {supplyRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.supplier}</td>
                  <td>{request.quantity}</td>
                  <td>{request.status}</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleApproveRequest(request.id)}>Approve</button>
                    <button className="decline-btn" onClick={() => handleDeclineRequest(request.id)}>Decline</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="products">
          <h2>Products</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Paid Status</th>
                <th>Spoilt</th>
                <th>Remaining Stock</th>
                <th>Unit Price</th>
                <th>Buying Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    {product.paymentStatus === 'paid' ? (
                      'Paid'
                    ) : (
                      <button onClick={() => handleMarkAsPaid(product.id)}>Mark as Paid</button>
                    )}
                  </td>
                  <td>{product.spoilt}</td>
                  <td>{product.remaining}</td>
                  <td>{product.unitPrice}</td>
                  <td>{product.buyingPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="clerks">
          <h2>Clerks</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clerks.map(clerk => (
                <tr key={clerk.id}>
                  <td>{clerk.name}</td>
                  <td>{clerk.email}</td>
                  <td>{clerk.status}</td>
                  <td>
                    <button className="inactivate-btn" onClick={() => handleInactivateClerk(clerk.id)}>Inactivate</button>
                    <button className="delete-btn" onClick={() => handleRemoveClerk(clerk.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {Object.entries(mockSales).map(([clerkName, sales]) => (
          <section key={clerkName} className="clerk-sales">
            <h2>{clerkName} Sales</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Quantity Sold</th>
                  <th>Quantity in Hand</th>
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.date}</td>
                    <td>{sale.item}</td>
                    <td>{sale.quantitySold}</td>
                    <td>{sale.quantityInHand}</td>
                    <td>{sale.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}

        <section className="performance-reports">
          <h2>Performance Reports</h2>
          {Object.entries(reports).map(([product, data]) => (
            <div key={product} className="product-report">
              <h3>{product.charAt(0).toUpperCase() + product.slice(1)} Sales Trends</h3>
              <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="quantitySold" stroke="#ffc658" name="Quantity Sold" />
                <Line yAxisId="left" type="monotone" dataKey="quantityInHand" stroke="#ff0000" name="Quantity in Hand" />
                <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit (KSH)" />
              </LineChart>
            </div>
          ))}
        </section>
        <section className="product-performance-comparison">
  <h2>Product Performance Comparison</h2>
  <BarChart width={800} height={400} data={[
    { name: 'Rice', quantitySold: 53, profit: 1060 },
    { name: 'Beans', quantitySold: 40, profit: 800 },
    { name: 'Greengrams', quantitySold: 45, profit: 900 }
  ]}>
    <XAxis dataKey="name" />
    <YAxis yAxisId="left" />
    <YAxis yAxisId="right" orientation="right" />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar yAxisId="left" dataKey="quantitySold" fill="#8884d8" name="Quantity Sold" />
    <Bar yAxisId="right" dataKey="profit" fill="#82ca9d" name="Profit (KSH)" />
  </BarChart>
</section>
<section className="clerk-performance-comparison">
  <h2>Clerk Performance Comparison</h2>
  <PieChart width={800} height={400}>
    <Pie
      data={[
        { name: 'Clerk A', value: 53, fill: '#8884d8' },
        { name: 'Clerk B', value: 40, fill: '#82ca9d' },
      ]}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={120}
      label
    />
    <Tooltip />
    <Legend />
  </PieChart>
</section>
      </main>

      {showAddClerkPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Clerk</h2>
            <input
              type="text"
              value={newClerkName}
              onChange={(e) => setNewClerkName(e.target.value)}
              placeholder="Enter clerk name"
            />
            <input
              type="email"
              value={newClerkEmail}
              onChange={(e) => setNewClerkEmail(e.target.value)}
              placeholder="Enter clerk email"
            />
            <button onClick={handleAddClerk}>Add</button>
            <button onClick={() => setShowAddClerkPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;