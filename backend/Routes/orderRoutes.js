const express = require('express');
const { readJSON, writeJSON } = require('../utils/dataStore');
const router = express.Router();

// 📦 Place a new order
// orderRoutes.js
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items' });
    }

    const orders = await readJSON('orders.json');
    const order = {
      id: Date.now().toString(),
      name: name || "Guest User",
      email: email || "guest@example.com",
      phone,
      address,
      items,
      total,
      status: 'Placed',
      createdAt: new Date().toISOString()
    };

    orders.push(order);
    await writeJSON('orders.json', orders);
    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/:emailOrName', async (req, res) => {
  try {
    const emailOrName = req.params.emailOrName.toLowerCase();
    const orders = await readJSON('orders.json');

    const userOrders = orders.filter(o =>
      (o.email && o.email.toLowerCase() === emailOrName) ||
      (o.name && o.name.toLowerCase() === emailOrName)
    );

    if (userOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.json(userOrders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
