import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Table from './components/Table';
import Details from './components/Details';
import Container from '@mui/material/Container';

const App = () => {
  return (
    <Provider store={store}>
      <Container style={{ marginTop: 30, marginBottom: 30 }}>
        <Router>
          <Switch>
            <Route path='/' element={<Table />} />
            <Route path='/details/:id' element={<Details />} />
          </Switch>
        </Router>
      </Container>
      
    </Provider>
  );
};

export default App;
