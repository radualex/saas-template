import React, { useState, useEffect, useContext, createContext } from 'react';
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    GithubAuthProvider
} from 'firebase/auth';

// Services
import firebaseApp from '@/services/firebase';
import { createUser } from '@/services/db';

const auth = getAuth(firebaseApp);

// Providers
const gitHubProvider = new GithubAuthProvider();

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [user, setUser] = useState(null);

    const formatUser = (user) => {
        return {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            provider: user.providerData[0].providerId
        };
    };

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);

            createUser(user.uid, user);
            setUser(user);
            return user;
        }

        setUser(false);
        return false;
    };

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
        const unsubscribe = onAuthStateChanged(auth, handleUser);

        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signOut: signout
    };
};
