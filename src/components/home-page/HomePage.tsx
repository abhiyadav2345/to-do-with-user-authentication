/* eslint-disable prettier/prettier */
import React, { FC, ReactNode, useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Todo } from '../../models/todo';
import { TodoCard } from '../todo-card';
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
    useMediaQuery,
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

enum FilterState {
    ALL = 'All',
    ACTIVE = 'Active',
    COMPLETED = 'Completed',
}
const HomePage = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const { user } = useContext(AuthContext);
    const isSmallScreen = useMediaQuery('(max-width:375px)');
    const [activeFilter, setActiveFilter] = useState<FilterState>(
        FilterState.ALL
    );
    const filteredTodos =
        activeFilter === FilterState.ALL
            ? todos
            : todos?.filter((todo) => {
                  const filterCondition =
                      activeFilter === FilterState.ACTIVE ? false : true;
                  return todo.isCompleted === filterCondition;
              });
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
            <TodoCard>
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
                        {!isSmallScreen && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    backgroundColor: 'primary.main',
                                }}
                            >
                                <HomepageButton
                                    isActive={activeFilter === FilterState.ALL}
                                    onClick={setActiveFilter(FilterState.ALL)}
                                >
                                    All
                                </HomepageButton>
                                <HomepageButton
                                    isActive={
                                        activeFilter === FilterState.ACTIVE
                                    }
                                    onClick={setActiveFilter(
                                        FilterState.ACTIVE
                                    )}
                                >
                                    Active
                                </HomepageButton>
                                <HomepageButton
                                    isActive={
                                        activeFilter === FilterState.COMPLETED
                                    }
                                    onClick={setActiveFilter(
                                        FilterState.COMPLETED
                                    )}
                                >
                                    Completed
                                </HomepageButton>
                            </Box>
                        )}
                        <Box>
                            <HomepageButton>{''}Clear Completed</HomepageButton>
                        </Box>
                    </Grid>
                </CardActions>
            </TodoCard>
            {isSmallScreen && (
                <TodoCard>
                    <CardContent>
                        <HomepageButton
                            isActive={activeFilter === FilterState.ALL}
                            onClick={setActiveFilter(FilterState.ALL)}
                        >
                            All
                        </HomepageButton>
                        <HomepageButton
                            isActive={activeFilter === FilterState.ACTIVE}
                            onClick={setActiveFilter(FilterState.ACTIVE)}
                        >
                            Active
                        </HomepageButton>
                        <HomepageButton
                            isActive={activeFilter === FilterState.COMPLETED}
                            onClick={setActiveFilter(FilterState.COMPLETED)}
                        >
                            Completed
                        </HomepageButton>
                    </CardContent>
                </TodoCard>
            )}
        </div>
    );
};

export default HomePage;
