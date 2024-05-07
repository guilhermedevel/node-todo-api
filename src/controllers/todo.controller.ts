import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { title } from 'process';

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({list});
};

export const add = async (req: Request, res: Response) => {
    if(req.body.title) {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });

        res.status(201).json({ task: newTodo });
    } else {
        res.json({ error: "Data didn't send"})
    }
};

export const update = async () => {

};

export const remove = async () => {

};