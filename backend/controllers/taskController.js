const Task = require('../models/Task');
const mongoose = require('mongoose');
const getTasks = async (req, res, next) => {
  try {
    const { status, category, priority, search, sort, limit, page } = req.query;
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (search) {
      const re = new RegExp(search, 'i');
      query.$or = [{ title: re }, { description: re }, { category: re }];}
    const pageNum = Math.max(1, parseInt(page || '1'));
    const perPage = Math.max(1, Math.min(100, parseInt(limit || '50')));
    const skip = (pageNum - 1) * perPage;
    let dbQuery = Task.find(query).skip(skip).limit(perPage);
    if (sort) dbQuery = dbQuery.sort(sort);
    else dbQuery = dbQuery.sort({ createdAt: -1 });
    const tasks = await dbQuery.exec();
    const total = await Task.countDocuments(query);
    res.json({ tasks, total, page: pageNum, perPage });} 
    catch (err) {
    next(err);}};
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid task id');}
    const task = await Task.findById(id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');}
    res.json(task);} 
    catch (err) {
    next(err);}};
const createTask = async (req, res, next) => {
  try {
    const { title, description, category, dueDate, priority, status } = req.body;
    if (!title || title.trim().length === 0) {
      res.status(400);
      throw new Error('Title is required');}
    const allowedPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const allowedStatuses = ['todo', 'in progress', 'done'];
    if (priority && !allowedPriorities.includes(priority)) {
      res.status(400);
      throw new Error('Invalid priority');}
    if (status && !allowedStatuses.includes(status)) {
      res.status(400);
      throw new Error('Invalid status');}
    const task = new Task({
      title: title.trim(),
      description,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      status});
    await task.save();
    res.status(201).json(task);} 
  catch (err) {
    next(err);}};
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid task id');}
    const updates = req.body;
    if (updates.title && updates.title.trim().length === 0) {
      res.status(400);
      throw new Error('Title cannot be empty');}
    const allowedPriorities = ['Low', 'Medium', 'High', 'Critical'];
    const allowedStatuses = ['todo', 'in progress', 'done'];
    if (updates.priority && !allowedPriorities.includes(updates.priority)) {
      res.status(400);
      throw new Error('Invalid priority');}
    if (updates.status && !allowedStatuses.includes(updates.status)) {
      res.status(400);
      throw new Error('Invalid status');}
    if (updates.dueDate) updates.dueDate = new Date(updates.dueDate);
    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true});
    if (!task) {
      res.status(404);
      throw new Error('Task not found');}
    res.json(task);} 
    catch (err) {
    next(err);}};
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid task id');}
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');}
    res.json({ message: 'Task deleted', id: task._id });} 
  catch (err) {
    next(err);}};
module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask};
