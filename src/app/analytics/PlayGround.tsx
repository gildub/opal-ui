import React from 'react';
// import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Playground, store } from 'graphql-playground-react';

const PlayGround: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Playground endpoint="http://localhost:9002/graphql" />;
    </Provider>
  );
};

export default PlayGround;
