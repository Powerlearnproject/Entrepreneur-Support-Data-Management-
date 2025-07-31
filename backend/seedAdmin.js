// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust if your path is different

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existingAdmin = await User.findOne({ email: 'admin@heva.com' });
  if (existingAdmin) {
    console.log('Admin already exists');
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash('admin1234', 10); // Default password

  const admin = new User({
    name: 'HEVA Admin',
    email: 'admin@heva.com',
    password: hashedPassword,
    role: 'admin',
    needsPasswordReset: false,
  });

  await admin.save();
  console.log('✅ Admin user created: admin@heva.com / admin1234');

  process.exit();
};

seedAdmin();
