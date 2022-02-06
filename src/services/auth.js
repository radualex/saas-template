import React, { useState, useEffect, useContext, createContext } from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    GithubAuthProvider
} from 'firebase/auth';

// Services
import firebaseApp from './firebase';

const auth = getAuth(firebaseApp);

// Providers
const gitHubProvider = new GithubAuthProvider();

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signinWithGithub = async () => {
        const response = await signInWithPopup(auth, gitHubProvider);

        setUser(response.user);
        return response.user;
    };

    const signout = async () => {
        await signOut(auth);

        setUser(false);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signOut: signout
    };
}
