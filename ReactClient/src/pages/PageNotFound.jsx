import React from 'react';
import { useHistory } from 'react-router';

const PageNotFound = () => {
  const history = useHistory();
  history.push('/');
  return (
    <div>Page not found</div>
  );
};

export default PageNotFound;
