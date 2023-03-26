import { writable } from "svelte/store";
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';

const initialValue = browser ? JSON.parse(window.localStorage.getItem('ab-folders')) ?? [] : [];

export const folders = writable(initialValue);

type Folder = {
    id: number,
    name: string
}

folders.subscribe((folders) => {
    if (browser) {
        window.localStorage.setItem('ab-folders', JSON.stringify(folders));
    }
});

export const addFolder = (name: string) => {
    folders.update((folders) => {
        const folderExist: Folder[] = folders.filter((folder: Folder) => {
            return folder.name === name;
        });
        if (folderExist.length > 0) {
            alert('this folder already exist');
            return folders;
        } else {
            return [...folders, { id: uuidv4(), name: name }]
        }
    });
}

export const deleteFolder = (id: number) => {
    folders.update((folders) => {
        return folders.filter((folder: Folder) => {
            folder.id !== id
        });
    });
}

export const updateFolder = (id: number, name: string) => {
    folders.update((folders) => {
        return folders.map((folder: Folder) => {
            if (folder.id === id) {
                return { ...folder, name }
            }
            return folder;
        });
    });
}