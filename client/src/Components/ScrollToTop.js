import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { currentLoc } from '../context';

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();
  const { setLoc } = useContext(currentLoc)
  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    if(!pathname.includes('/bag')){
        window.scrollTo(0, 0);
    }
    setLoc(pathname)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}

export default ScrollToTop;