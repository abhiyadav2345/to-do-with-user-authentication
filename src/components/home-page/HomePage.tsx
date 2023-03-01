/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import {
    collection,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../../add-todo';

const HomePage = () => {
    const [todos, setTodos] = useState<DocumentData[] | null>(null);
    const { user } = useContext(AuthContext);
    // Get a list of todos from your database
    // async function getTodos() {
    //     const todosCol = collection(db, 'todos');
    //     const todosSnapshot = await getDocs(todosCol);
    //     const todoList = todosSnapshot.docs.map((doc: { data: () => any }) =>
    //         doc.data()
    //     );
    //     setTodos(todoList);
    // }

    const q = query(collection(db, 'todos'), where('userId', '==', user?.uid));

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
    return (
        <div>
            <AddTodo />
            <Card>
                <CardContent>{todoItems}</CardContent>
                <CardActions>
                    <Button>Filter</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default HomePage;
