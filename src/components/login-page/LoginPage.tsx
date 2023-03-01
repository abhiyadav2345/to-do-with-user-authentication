/* eslint-disable prettier/prettier */
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { ChangeEvent, useContext, useState } from 'react';
import {
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { AuthContext } from '../../providers/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const LoginPage = () => {
    //const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(AuthContext);

    const setEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const setPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                if (user && setUser) {
                    setUser(user);
                }
            })
            .catch((error) => {
                console.log(error);
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                if (user && setUser) {
                    setUser(user);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };
    const loginInWithEmailAndPassword = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                if (user && setUser) {
                    setUser(user);
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    return (
        <Card>
            <CardContent>
                <TextField
                    id="filled-basic"
                    value={email}
                    onChange={setEmailValue}
                    label="email"
                    variant="filled"
                    fullWidth
                    sx={{ mb: 2 }}
                />

                <TextField
                    id="filled-basic"
                    value={password}
                    onChange={setPasswordValue}
                    type="password"
                    label="Password"
                    variant="filled"
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </CardContent>
            <CardActions>
                <Button color="secondary" variant="text" onClick={signUp}>
                    SignUp
                </Button>
                <Button variant="text" onClick={loginInWithEmailAndPassword}>
                    Login
                </Button>
                <Button variant="text" onClick={signInWithGoogle}>
                    Login with Google
                </Button>
            </CardActions>
        </Card>
    );
};
