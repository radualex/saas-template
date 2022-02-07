import { ThemeProvider, CSSReset, css } from '@chakra-ui/react';
import { Global } from '@emotion/react';

// Stles
import customTheme from '@/styles/theme';

// Services
import { AuthProvider } from '@/services/auth';

const GlobalStyle = ({ children }) => {
    return (
        <>
            <CSSReset />
            <Global
                styles={css`
                    html {
                        min-width: 360px;
                        scroll-behavior: smooth;
                    }

                    #__next {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            />
            {children}
        </>
    );
};

const MyApp = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={customTheme}>
            <AuthProvider>
                <GlobalStyle />
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default MyApp;
