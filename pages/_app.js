import ThemeProvider from '../components/ThemeProvider';
import AppContent from '../components/AppContent';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;