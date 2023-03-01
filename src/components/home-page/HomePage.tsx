/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import {
    collection,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    query,
} from 'firebase/firestore';

const HomePage = () => {
    const [todos, setTodos] = useState<DocumentData[] | null>(null);
    // Get a list of todos from your database
    // async function getTodos() {
    //     const todosCol = collection(db, 'todos');
    //     const todosSnapshot = await getDocs(todosCol);
    //     const todoList = todosSnapshot.docs.map((doc: { data: () => any }) =>
    //         doc.data()
    //     );
    //     setTodos(todoList);
    // }
    const q = query(collection(db, 'todos'));

    useEffect(() => {
        const unsub = onSnapshot(q, (querySnapshot) => {
            const todos: DocumentData[] = [];
            querySnapshot.forEach((doc) => {
                todos.push(doc.data());
                setTodos(todos);
            });
            console.log('Current todo: ', todos.join(', '));
        });
        return unsub;
    }, []);
    const h = 'hello';

    const todoItems = todos?.map((todo: DocumentData) => (
        <span>{todo.title}</span>
    ));
    console.log(todos);
    return <div>{todoItems}</div>;
};

export default HomePage;
