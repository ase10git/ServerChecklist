import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/common.css'
import 'App.css';
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
import User from 'pages/user/User';
import ServerAdd from 'pages/server/ServerAdd';
import ServerEdit from 'pages/server/ServerEdit';
import Favorites from 'pages/user/Favorites';
import Error from 'pages/Error';
import ServerInfoBox from 'components/servermain/ServerInfoBox';

function App() {

  return (
    <div className='app-wrapper'>
      <Header/>
      <div className='content-wrapper'>
        <Routes>
          <Route path="/" Component={Main}/>
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/resetpwd" Component={ResetPwd}/>
          <Route path="/user">
            <Route index Component={User}/>
            <Route path="favorites" Component={Favorites}/>
          </Route>
          <Route path="/servers/add" Component={ServerAdd}/>
          <Route path="/servers/:id" Component={ServerMain}>
            <Route index Component={ServerInfoBox}/>
            <Route path="edit" Component={ServerEdit}/>
            <Route path="checklists" Component={Checklists}/>
            <Route path="memo" Component={Memo}/>
            <Route path="maps">
              <Route index Component={Maps}/>
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
