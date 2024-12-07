import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Forms from './RegistrationForm/Forms';
import reportWebVitals from './reportWebVitals';
import ExploreCampaigns from './ExploreCampaignForm/ExploreCampaigns';
import CreateCampaign from './CreateCampaignForm/CreateCampaign';
import {BrowserRouter as  Router,Routes,Route} from 'react-router-dom';
import Login from './LoginForm/Login';
import Payment from './PaymentForm/Payment';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path='/' element={<Forms/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/ExploreCampaigns' element={<ExploreCampaigns/>}/>
      <Route path='/CreateCampaign' element={<CreateCampaign/>}/>
      <Route path='/Payment' element={<Payment/>}/>
    </Routes>
   </Router>

   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
