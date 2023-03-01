import { Box, Card, CardContent, TextField } from '@mui/material';
import { AccountCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { useState, KeyboardEvent, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../providers/auth';

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
        <Card>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <RadioButtonUnchecked
                        sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                    <TextField
                        id="input-with-sx"
                        label="Add Todo"
                        variant="standard"
                        onKeyPress={onkeyPress}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default AddTodo;
