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
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { AuthContext } from '../../providers/auth';
import { AddTodo } from '../../add-todo';
import { CheckIcon, CrossIcon, SunIcon } from '../icons';
import { Visibility } from '@mui/icons-material';

type HomePageButtonProps = {
    isActive?: boolean;
    children: ReactNode;
};
const HomepageButton: FC<HomePageButtonProps> = (props) => {
    const { isActive = false } = props;
    return (
        <Button sx={{ color: isActive ? 'blue' : 'text.secondary' }}>
            {props.children}
        </Button>
    );
};
const HomePage = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
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
            const todos: Todo[] = [];
            querySnapshot.forEach((doc) => {
                todos.push(doc.data() as Todo);
                setTodos(todos);
            });
        });
        return unsub;
    }, []);
    const handleRadioCheck = (todo: Todo) => {
        console.log(todo);
    };
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
            {/* {todo.isCompleted ? (
                <SunIcon />
            ) : (
                <Radio
                    checked={false}
                    onChange={() => handleRadioCheck(todo)}
                    inputProps={{ 'aria-label': todo.title }}
                />
            )} */}
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
                        <span>{todo.title}</span>
                    </Grid>
                </ListItemText>
                <IconButton
                    className="delete-icon"
                    color="primary"
                    aria-label="theme switcher"
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
                        <Box component="span">0 items lefts</Box>
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
