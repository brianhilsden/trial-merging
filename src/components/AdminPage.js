import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  approveSupplyRequest,
  declineSupplyRequest,
  markProductAsPaid,
  addClerk,
  removeClerk,
  fetchSupplyRequests,
  fetchProducts,
  fetchClerks,
  fetchReports
} from '../features/adminSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './AdminPage.css';

const AdminPage = () => {
  const dispatch = useDispatch();
  const {
    supplyRequests = [],
    products = [],
    clerks = [],
    reports = {}
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchSupplyRequests());
    dispatch(fetchProducts());
    dispatch(fetchClerks());
    dispatch(fetchReports());
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
    const newClerk = { name: 'New Clerk' }; // You might want to open a modal or form to get this data
    dispatch(addClerk(newClerk));
  };

  const handleRemoveClerk = (id) => {
    dispatch(removeClerk(id));
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
          <button className="add-clerk-btn" onClick={handleAddClerk}>Add Clerk</button>
        </header>
        
        <div className="grid-container">
          <section className="supply-requests">
            <h2>Supply Requests</h2>
            <table>
              <thead>
                <tr>
                  <th>Supplier</th>
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
                      <button onClick={() => handleApproveRequest(request.id)}>Approve</button>
                      <button onClick={() => handleDeclineRequest(request.id)}>Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="products">
            <h2>Products</h2>
            <div className="product-lists">
              <div className="paid-products">
                <h3>Paid</h3>
                <ul>
                  {products.filter(p => p.paymentStatus === 'paid').map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
              <div className="unpaid-products">
                <h3>Unpaid</h3>
                <ul>
                  {products.filter(p => p.paymentStatus === 'unpaid').map(product => (
                    <li key={product.id}>
                      {product.name}
                      <button onClick={() => handleMarkAsPaid(product.id)}>Mark as Paid</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="clerks">
            <h2>Clerks</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {clerks.map(clerk => (
                  <tr key={clerk.id}>
                    <td>{clerk.name}</td>
                    <td>
                      <button onClick={() => handleRemoveClerk(clerk.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="reports">
            <h2>Performance Reports</h2>
            {reports.lineData && (
              <LineChart width={600} height={300} data={reports.lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;