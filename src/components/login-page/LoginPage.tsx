/* eslint-disable prettier/prettier */
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { ChangeEvent, useState } from 'react';
import { Button, TextField } from '@mui/material';

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const LoginPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                setUser(user);
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
                setUser(user);
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
                setUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };
    return (
        <div>
            <TextField
                id="filled-basic"
                value={email}
                onChange={setEmailValue}
                label="email"
                variant="filled"
            />
            <br />
            <TextField
                id="filled-basic"
                value={password}
                onChange={setPasswordValue}
                type="password"
                label="Password"
                variant="filled"
            />
            <br />
            <Button variant="text" onClick={signUp}>
                SignUp
            </Button>
            <Button variant="text" onClick={loginInWithEmailAndPassword}>
                Login
            </Button>
            <Button variant="text" onClick={signInWithGoogle}>
                Login with Google
            </Button>
            {user && <h2>{user.displayName}</h2>}
        </div>
    );
};
