const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'taskMate backend running' });});
app.use('/api/tasks', taskRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
