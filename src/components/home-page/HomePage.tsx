/* eslint-disable prettier/prettier */
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Todo } from '../../models/todo';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Radio,
} from '@mui/material';
import {
    collection,
    onSnapshot,
    query,
    where,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../../add-todo';
import { CheckIcon, CrossIcon } from '../icons';

type HomePageButtonProps = {
    isActive?: boolean;
    children: ReactNode;
    onClick?: () => void;
};
// const HomepageButton: FC<HomePageButtonProps> = (props) => {
//     const { isActive = false } = props;
//     return (
//         <Button sx={{ color: isActive ? 'blue' : 'text.secondary' }} {...props}>
//             {props.children}
//         </Button>
//     );
// };

const HomepageButton: FC<HomePageButtonProps> = (props) => {
    const { isActive = false } = props;
    return (
        <Button
            sx={{ color: isActive ? 'info.light' : 'text.secondary' }}
            {...props}
        >
            {props.children}
        </Button>
    );
};
const HomePage = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const { user } = useContext(AuthContext);
    // Get a list of todos from your database

    const q = query(collection(db, 'todos'), where('userId', '==', user?.uid));

    useEffect(() => {
        const unsub = onSnapshot(q, (querySnapshot) => {
            const todos: Todo[] = [];
            querySnapshot.forEach((doc) => {
                const todoItem = {
                    id: doc.id,
                    ...doc.data(),
                };
                todos.push(todoItem as Todo);
                setTodos(todos);
            });
        });
        return unsub;
    }, []);
    // To Mark Completed
    const handleRadioCheck = (todo: Todo) => {
        if (todo.id) {
            const docReference = doc(db, 'todos', todo.id);
            updateDoc(docReference, { isCompleted: true });
        }
    };

    //Filter Active Todo

    const activeTodos = todos?.filter((todo) => !todo.isCompleted ?? []);
    const completedTodos = todos?.filter((todo) => todo.isCompleted ?? []);

    // Delete todo
    const deleteTodo = (todo: Todo) => {
        if (todo.id) {
            deleteDoc(doc(db, 'todos', todo.id));
        }
    };

    // Clear all Completed Todos
    const clearCompleted = (todo: Todo) => {
        completedTodos?.forEach(deleteTodo);
    };

    // Mapping Todo Items
    const todoItems = todos?.map((todo: Todo) => (
        <ListItem
            sx={{
                p: 0,
                m: 0,
                borderBottom: '1px solid #dfdfdf',
                '& .delete-icon': { visibility: 'hidden' },
                '&:hover .delete-icon': { visibility: 'visible' },
            }}
            disablePadding
        >
            <ListItemButton>
                {todo.isCompleted ? (
                    <CheckIcon />
                ) : (
                    <Radio
                        checked={false}
                        onChange={() => handleRadioCheck(todo)}
                        inputProps={{ 'aria-label': todo.title }}
                    />
                )}

                <ListItemText>
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {todo.isCompleted ? (
                            <span
                                style={{
                                    textDecoration: 'line-through',
                                    textDecorationThickness: '0.1rem',
                                }}
                            >
                                {todo.title}
                            </span>
                        ) : (
                            <span>{todo.title}</span>
                        )}
                    </Grid>
                </ListItemText>
                <IconButton
                    className="delete-icon"
                    color="primary"
                    aria-label="theme switcher"
                    onClick={() => deleteTodo(todo)}
                >
                    <CrossIcon />
                </IconButton>
            </ListItemButton>
        </ListItem>
    ));
    console.log(todos);
    return (
        <div>
            <AddTodo />
            <Card sx={{ mt: 2 }}>
                <CardContent sx={{ p: 0, m: 0 }}>
                    <List>{todoItems}</List>
                </CardContent>
                <CardActions>
                    <Grid
                        container
                        alignItems={'center'}
                        justifyContent="space-between"
                    >
                        <Box component="span">
                            {activeTodos?.length} items left
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <HomepageButton isActive>All</HomepageButton>
                            <HomepageButton>Active</HomepageButton>
                            <HomepageButton>Completed</HomepageButton>
                            <HomepageButton>Clear Completed</HomepageButton>
                        </Box>
                        <Box></Box>
                    </Grid>
                </CardActions>
            </Card>
        </div>
    );
};

export default HomePage;
