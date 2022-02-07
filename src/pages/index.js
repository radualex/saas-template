import Head from 'next/head';
import { Button, Code } from '@chakra-ui/react';

// Hooks
import { useAuth } from '@/services/auth';

const Home = () => {
    const auth = useAuth();

    return (
        <div>
            <Head>
                <title>Saas Template</title>
            </Head>

            <main>
                {auth?.user ? (
                    <Button
                        backgroundColor={'red.100'}
                        onClick={() => auth.signOut()}
                    >
                        Sign out
                    </Button>
                ) : (
                    <Button onClick={() => auth.signinWithGithub()}>
                        Sign in
                    </Button>
                )}
                <Code>{auth?.user?.email}</Code>
            </main>
        </div>
    );
};

export default Home;
