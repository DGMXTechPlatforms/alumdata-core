import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
// import Paso1 from './Paso1';
// import Login from './components/auth/Login';
// import Home from './components/main/Home';
// import CardHome from './components/ui/CardHome';
import { MainApp } from './MainApp';

ReactDOM.render(
  <MainApp />,
  // <React.StrictMode>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<App />} />
  //       <Route path="paso1" element={<Paso1 />} />
  //       <Route path="login" element={<Login />} />
  //       <Route path="home" element={<Home />} />
  //       <Route path="cardhome" element={<CardHome />} />
  //     </Routes>
  //   </BrowserRouter>
  // </React.StrictMode>,
  document.getElementById('root')
);
