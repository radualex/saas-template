import '../styles/globals.css';

// Services
import { ProvideAuth } from '../services/auth';

function MyApp({ Component, pageProps }) {
    return (
        <ProvideAuth>
            <Component {...pageProps} />
        </ProvideAuth>
    );
}

export default MyApp;
