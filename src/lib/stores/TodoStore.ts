import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { v4 as uuidv4 } from 'uuid';
const initialTodos = browser ? JSON.parse(window.localStorage.getItem('ab-todos')) ?? [] : [];
export const todos = writable(initialTodos);
type Todos = {
    id: string,
    name: string,
    description: string,
    completed: boolean,
    folderId: string
};
todos.subscribe((todos) => {
    if (browser) {
        window.localStorage.setItem('ab-todos', JSON.stringify(todos));
    }
});
export const addTodo = (name: string, description: string, completed: boolean, folderId: string) => {
    return todos.update((todos: Todos[]) => {
        let existTodos = todos.filter((todo) => {
            return todo.name === name
        });
        if (existTodos.length > 0) {
            alert('This todo already exist.');
            return todos;
        } else {
            return todos = [...todos, { id: uuidv4(), name: name, description: description, completed: completed, folderId: folderId }]
        }
    });

};
export const delteTodo = (id: string) => {
    return todos.update((todos: Todos[]) => {
        return todos.filter((todo) => {
            return todo.id !== id;
        })
    });
};
export const completeTodo = (id: string) => {
    return todos.update((todos: Todos[]) => {
        return todos.map((todo) => {
            if (todo.id == id) {
                return { ...todo, completed: !todo.completed };
            } else {
                return todo;
            }
        });
    });
};

export const updateTodo = (todoId: string, todoName: string, todoDesc: string, todoCompleted: boolean) => {
    return todos.update((todos: Todos[]) => {
        return todos.map((todo) => {
            if (todo.id == todoId) {
                return { ...todo, name: todoName, description: todoDesc, completed: todoCompleted };
            } else {
                return todo;
            }
        });
    });
};