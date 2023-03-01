/* eslint-disable prettier/prettier */
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    User,
} from 'firebase/auth';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const provider = new GoogleAuthProvider();
const auth = getAuth();
export const LoginPage = () => {
    const [user, setUser] = useState<User | null>(null);
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
    return (
        <div>
            <TextField id="filled-basic" label="email" variant="filled" />
            <br />
            <TextField id="filled-basic" label="Password" variant="filled" />
            <br />
            <Button variant="text">SignUp</Button>
            <Button variant="text">Login</Button>
            <Button variant="text" onClick={signInWithGoogle}>
                Login with Google
            </Button>
            {user && <h2>{user.displayName}</h2>}
        </div>
    );
};
