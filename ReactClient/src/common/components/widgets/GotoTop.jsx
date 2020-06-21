import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const GotoTop = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const ignore = [];

  useEffect(() => {
    if (!ignore.find((x) => pathname.indexOf(x) !== -1)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <input type="hidden" value={history} />;
};

export default GotoTop;
