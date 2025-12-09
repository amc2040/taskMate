const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Task.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        username: 'testuser1',
        email: 'test1@example.com',
        password: 'password123'
      },
      {
        username: 'testuser2',
        email: 'test2@example.com',
        password: 'password456'
      }
    ]);
    console.log('Sample users created');

    // Create sample tasks
    const tasks = await Task.create([
      {
        title: 'Complete project proposal',
        description: 'Finish the MERN stack project proposal',
        category: 'School',
        dueDate: new Date('2024-12-15'),
        priority: 'High',
        status: 'done'
      },
      {
        title: 'Study for final exam',
        description: 'Review all course materials',
        category: 'School',
        dueDate: new Date('2024-12-20'),
        priority: 'Critical',
        status: 'in progress'
      },
      {
        title: 'Buy groceries',
        description: 'Get milk, eggs, bread',
        category: 'Personal',
        dueDate: new Date('2024-12-10'),
        priority: 'Medium',
        status: 'todo'
      },
      {
        title: 'Workout',
        description: '30 minutes cardio',
        category: 'Health',
        dueDate: new Date('2024-12-09'),
        priority: 'Low',
        status: 'todo'
      },
      {
        title: 'Fix MongoDB connection',
        description: 'Debug database connection issues',
        category: 'Work',
        dueDate: new Date('2024-12-11'),
        priority: 'High',
        status: 'done'
      }
    ]);
    console.log('Sample tasks created');

    console.log(`Seeded ${users.length} users and ${tasks.length} tasks`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
