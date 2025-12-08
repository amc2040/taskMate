const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200},
  description: {
    type: String,
    trim: true,
    default: ''},
  category: {
    type: String,
    trim: true,
    default: 'General'},
  dueDate: {
    type: Date},
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'},
  status: {
    type: String,
    enum: ['todo', 'in progress', 'done'],
    default: 'todo'},
  createdAt: {
    type: Date,
    default: Date.now}});
module.exports = mongoose.model('Task', taskSchema);
