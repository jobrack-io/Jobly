import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const App: React.FC = () => {
  return (
    <div>
      {/* Fixed top navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src='logo-m.png'></img> Jobly
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mt-5">
        <div className="row">
          {/* First column */}
          <div className="col-lg-8 text-center shadow-lg p-3 mb-5 bg-body rounded mt-5 pt-5">
            <img src="jobly.jpeg" alt="jobly_screen" width="66%"/>
          </div>

          {/* Second column */}
          <div className="col-lg-4">
            <LoginForm />
            
            <SignupForm />
          </div>
        </div>
      </div>

      {/* Fixed footer */}
      <footer className="bg-light text-center text-lg-start fixed-bottom">
        <div className="text-muted p-2">
          © 2023 Jobly. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
