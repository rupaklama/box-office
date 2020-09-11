import React, { memo } from 'react';
// React's memo API can be used to optimize the rendering behavior of your React function components. 
// While React memo is used to wrap React components to prevent re-renderings, useMemo is used to memoize values.

const Title = ({ title, subtitle }) => {
  // console.log('render')
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default memo(Title);
// memo compare previous props to current props or next, pass to this component
// if they are the same, component will not re-render