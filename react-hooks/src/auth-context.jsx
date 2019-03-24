import React from 'react';

const AuthContext = React.createContext({ status: false, login: () => {} }); /// * init value for context

export { AuthContext };
