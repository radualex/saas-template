import Head from 'next/head';
import useSWR from 'swr';
import { Button, Code, Flex } from '@chakra-ui/react';

// Hooks
import { useAuth } from '@/services/auth';

// Helpers
import fetcher from '@/helpers/fetcher';

const Home = () => {
    const { user, signOut, signinWithGithub } = useAuth();
    const { data } = useSWR(user ? ['/api/hello', user.token] : null, fetcher);

    return (
        <Flex direction="column">
            <Head>
                <title>Saas Template</title>
            </Head>

            <Flex direction={'column'} alignItems={'center'}>
                {user ? (
                    <Button
                        backgroundColor={'red.100'}
                        onClick={() => signOut()}
                    >
                        Sign out
                    </Button>
                ) : (
                    <Button onClick={() => signinWithGithub()}>
                        Sign in
                    </Button>
                )}
                <Code mt={4}>{user?.email}</Code>
                <Code mt={4}>{data?.message}</Code>
            </Flex>
        </Flex>
    );
};

export default Home;
