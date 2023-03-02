import { Box, Card, CardContent, TextField } from '@mui/material';
import {
    AccountCircle,
    BorderBottom,
    RadioButtonUnchecked,
} from '@mui/icons-material';
import { useState, KeyboardEvent, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../providers/auth';
import { TodoCard } from '../todo-card';

const AddTodo = () => {
    const [todoText, setTodoText] = useState();
    const { user } = useContext(AuthContext);
    const onkeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const inputValue = (event.target as HTMLInputElement).value;
            if (inputValue) {
                addDoc(collection(db, 'todos'), {
                    title: inputValue,
                    isCompleted: false,
                    userId: user?.uid,
                });
            }
        }
    };

    return (
        <TodoCard>
            <CardContent
                sx={{
                    p: 0,
                    pl: 3,
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none',
                    },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <RadioButtonUnchecked
                        sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                    <TextField
                        id="input-with-sx"
                        label="Add Todo"
                        variant="standard"
                        onKeyPress={onkeyPress}
                        fullWidth
                    />
                </Box>
            </CardContent>
        </TodoCard>
    );
};

export default AddTodo;
