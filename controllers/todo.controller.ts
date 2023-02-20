import db from '../db';
import type { Request, Response } from 'express';



export const createTodo = async (req: Request, res: Response) => {
  const { title, completed = false } = req.body as {title:string,completed:boolean};
  if(title.trim().length < 1) {
    return res.status(400)
  }
  try {
    const todo = await db.query(`INSERT INTO todos (title,completed) VALUES($1,$2) RETURNING *`, [title, completed]);
    res.json(todo.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  res.json(req.query);
  try {
    const todo = await db.query(`SELECT * FROM todos WHERE todo_id = $1`, [id]);
    res.json(todo.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    if (req.query.status) {
      const todo = await db.query(`SELECT * FROM todos WHERE completed = $1`, [req.query.status]);
      return res.json(todo.rows);
    }
    const todo = await db.query(`SELECT * FROM todos`);
    res.json(todo.rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id, completed } = req.body as {id : number, completed : boolean};

  try {
    const todo = await db.query(`UPDATE todos SET completed = $1  WHERE todo_id = $2 RETURNING *`, [completed, id]);
    res.json(todo.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await db.query(`DELETE FROM todos WHERE todo_id = $1`, [id]);
    res.json('Удалено!');
  } catch (err) {
    res.status(500).json(err);
  }
};
