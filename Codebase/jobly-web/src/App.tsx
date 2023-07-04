import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import HomeLayout from './layouts/Home';
import HomePage from './pages/Home';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    children: [
      { path: '/', element: <HomePage/> },
      { path: '/about-us', element: <AboutUsPage/> },
      { path: '/contact-us', element: <ContactUsPage/> },
    ]
  }
])

const App: React.FC = () => {
  return <RouterProvider router={router}/>
};

export default App;
