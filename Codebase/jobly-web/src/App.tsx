import React from 'react';
import SignupForm from './SignupForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>{/* Left column content */}</div>
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <SignupForm />
        </div>
        <div style={{ flex: '1' }}>{/* Right column content */}</div>
      </div>
    </div>
  );
};

export default App;
