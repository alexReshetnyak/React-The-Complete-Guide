import React from 'react';

import { User } from '../../components/user';

const authIndexPage = ({ appName }) => {
  return (
    <div>
      <h1>The Auth Page - { appName }</h1>
      <User name='Alex' age={31} />
    </div>
  );
};

authIndexPage.getInitialProps = async (context) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'Super App (Auth)' });
    }, 1000);
  });

  const result = await promise;
  return result;
};

export default authIndexPage;