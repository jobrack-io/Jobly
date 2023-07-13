import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/Home';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';

import './assets/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import JobDetail from './components/jobs/JobDetail';

const router = createBrowserRouter([
  {
    path: '/search',
    element: <MainLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/search', element: <SearchPage/> }
    ]
  },
  {
    path: '/jobs',
    element: <MainLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/jobs/:jobId', element: <JobDetail/> }
    ]
  },
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/', element: <HomePage/> },
      { path: '/search', element: <SearchPage/> },
      { path: '/about-us', element: <AboutUsPage/> },
      { path: '/contact-us', element: <ContactUsPage/> },
      { path: '/jobs/:jobId', element: <JobDetail/> },
    ]
  }
])

const App: React.FC = () => {
  return <RouterProvider router={router}/>
};

export default App;
