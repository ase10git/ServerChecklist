import 'styles/common.css'
import axios from 'axios';
import 'App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import ServerMain from 'pages/ServerMain';

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
        <Routes>
          <Route path="/" Component={Main}></Route>
          <Route path="/login"></Route>
          <Route path="/join"></Route>
          <Route path="/password"></Route>
          <Route path="/user/:id"></Route>
          <Route path="/servers/:id" Component={ServerMain}>
            <Route path="checklists"></Route>
            <Route path="memo"></Route>
            <Route path="maps">
              <Route path=":id"></Route>
              <Route path="add"></Route>
            </Route>
          </Route>
          <Route path="/error"></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
