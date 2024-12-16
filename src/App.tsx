import { type FC, useEffect } from 'react';
import LandingPage from './LandingPage';

const App: FC = () => {
  useEffect(() => {
    // Prevent scrolling at the app level
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    return () => {
      // Cleanup
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  return <LandingPage />;
};

export default App;
