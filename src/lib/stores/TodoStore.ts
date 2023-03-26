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
        return todos = [...todos, { id: uuidv4(), name: name, description: description, completed: completed, folderId: folderId }]
    });
};