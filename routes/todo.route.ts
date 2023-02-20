import express from 'express';
import { createTodo, getTodo, getTodos, removeTodo, updateTodo } from '../controllers/todo.controller';

const router = express.Router();

router.post('/todo', createTodo);
router.get('/todo/:id', getTodo);
router.get('/todo', getTodos);
router.put('/todo', updateTodo);
router.delete('/todo/:id', removeTodo);

export { router };


