import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../components/Navigation';

const ClerkDashboard = () => {
  const inventory = useSelector(state => state.inventory);
  const sales = useSelector(state => state.sales);

  return (
    <div>
      <Navigation />
      <h1>Dashboard</h1>
      <div>
        <h2>Inventory</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Status</th>
              <th>Items Spoilt</th>
              <th>Stock</th>
              <th>Unit Price</th>
              <th>Base Price</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id}>
                <td>{item.item}</td>
                <td>{item.status}</td>
                <td>{item.spoilt}</td>
                <td>{item.stock}</td>
                <td>{item.unitPrice}</td>
                <td>{item.basePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Sales</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity Sold</th>
              <th>Quantity In Hand</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.date}</td>
                <td>{sale.item}</td>
                <td>{sale.quantitySold}</td>
                <td>{sale.quantityInHand}</td>
                <td>{sale.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClerkDashboard;
