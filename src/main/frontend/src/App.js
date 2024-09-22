import 'styles/common.css'
import axios from 'axios';
import 'App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import ServerMain from 'pages/server/ServerMain';
import Login from 'pages/user/Login';
import Register from 'pages/user/Register';
import ResetPwd from 'pages/user/ResetPwd';
import Memo from 'pages/server/Memo';
import Checklists from 'pages/server/Checklists';
import Maps from 'pages/server/maps/Maps';
import MapDetail from 'pages/server/maps/MapDetail';
import MapAdd from 'pages/server/maps/MapAdd';

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
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/resetpwd" Component={ResetPwd}/>
          <Route path="/user/:id"/>
          <Route path="/servers/:id">
            <Route path="" Component={ServerMain}/>
            <Route path="checklists" Component={Checklists}/>
            <Route path="memo" Component={Memo}/>
            <Route path="maps">
              <Route path="" Component={Maps}/>
              <Route path=":id" Component={MapDetail}/>
              <Route path="new" Component={MapAdd}/>
            </Route>
          </Route>
          <Route path="/error" Component={Error}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
