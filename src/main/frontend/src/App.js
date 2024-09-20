import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  // const [hello, setHello] = useState('');

  // useEffect(()=>{
  //   async function axiosTest() {
  //     const { data } = await axios.get('http://localhost:9000/api/hello');
  //     setHello(data);
  //   }
  //   axiosTest();
  // }, []);

  return (
    <div className='app-wrapper'>
      <Header/>
      <div className='content-wrapper'>
        {/* <Routes>
          <Route path="/"></Route>
          <Route path="/login"></Route>
          <Route path="/join"></Route>
          <Route path="/password"></Route>
          <Route path="/user/:id"></Route>
          <Route path="/servers/:id">
            <Route path="checklist"></Route>
            <Route path="memo"></Route>
            <Route path="map">
              <Route path=":id"></Route>
              <Route path="add"></Route>
            </Route>
          </Route>
          <Route path="/error"></Route>
        </Routes> */}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
