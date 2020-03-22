import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Conjugator } from './components/Conjugator';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ height: '100vh' }}>
          <Conjugator />
        </Typography>
      </Container>
    </>
  );
}

export default App;
