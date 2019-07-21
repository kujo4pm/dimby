import React from 'react';
import { Map } from './components/Map';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div style={styles.main}>
      <Sidebar />
      <Map />
    </div>
  );
}

const styles = {
  main: {
    display: 'grid',
    gridTemplateColumns: '25% 75%',
    height: window.innerHeight
  }
};

export default App;
