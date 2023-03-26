import { writable } from "svelte/store";
import { browser } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';

const initialValue = browser ? JSON.parse(window.localStorage.getItem('ab-folders')) ?? [] : [];

export const folders = writable(initialValue);

type Folder = {
    id: string,
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

export const deleteFolder = (id: string) => {
    folders.update((folders) => {
        return folders.filter((folder: Folder) => {
            return folder.id !== id
        });
    });
}

export const updateFolder = (id: string, name: string) => {
    folders.update((folders) => {
        return folders.map((folder: Folder) => {
            if (folder.id === id) {
                return { ...folder, name }
            }
            return folder;
        });
    });
}