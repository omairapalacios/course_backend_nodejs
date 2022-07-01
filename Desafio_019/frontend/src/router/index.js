import React from 'react';
import StartLayout from '../layouts/StartLayout';
import SignIn from '../pages/SignIn';

const routes = [
  {
    path: '/',
    element: <StartLayout />,
    children: [
      { path: '/', element: <SignIn /> },
    ],
  },
];

export default routes;
