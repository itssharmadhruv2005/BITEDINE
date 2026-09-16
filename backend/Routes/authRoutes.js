const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readJSON, writeJSON } = require('../utils/dataStore');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'customer' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const users = await readJSON('users.json');
    if (users.find(u => u.email === email)) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), name, email, password: hashed, role };
    users.push(user);
    await writeJSON('users.json', users);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const users = await readJSON('users.json');
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update profile
router.put('/update-profile', async (req, res) => {
  try {
    const { name, email, phone, address, profilePhoto } = req.body;

    const users = await readJSON('users.json');
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    // update fields
    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      phone,
      address,
      profilePhoto
    };

    await writeJSON('users.json', users);

    res.json({ message: 'Profile updated successfully', user: users[userIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;

