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

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let todo = await Todo.findByPk(id);

    if(todo) {

        if(req.body.title) {
            todo.title = req.body.title;
        }

        if(req.body.done) {
            switch(req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = true;
                    break;
                case 'false':
                case '0':
                    todo.done = false;
                    break;
            }
        }

        await todo.save();
        res.status(200).json({ task: todo });

    } else {
        res.status(400).json({ error: 'Tarefa não encontrada'});
    }
};

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let todo = await Todo.findByPk(id);

    if(todo) {
        todo.destroy();
        res.status(204).json({sucess: 'Tarefa removida'});
    }

    res.status(400).json({ error: 'Tarefa não encontrada'})
};