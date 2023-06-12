import React, { useState } from 'react';
import PythonForm from './Components/PythonForm';
import XMLForm from './Components/XMLForm';
import './App.css';

function App() {
  const [areTriggered, setAreTriggered] = useState({});

  const handleTrigger = (triggerName) => {
    setAreTriggered({...areTriggered, [triggerName]: true});
  }

  return (
    <div className='container'>
      <h1 className='label'>XML</h1>
      <XMLForm onTrigger={handleTrigger}/>

      <h1 className='label'>Python</h1>
      <PythonForm areTriggered={areTriggered}/>
    </div>
  );
}

export default App;
