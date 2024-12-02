import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Admin from './admin';
import Main from './main';
import Addmovie from './Addmovie';
import Bookedstatus from './Bookedstatus';
import Viewfeedback from './Viewfeedback';
import Profile from './Profile';
import Moviedetail from './Moviedetail';
import Booktickets from './Bookticket';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import CardPayment from './CardPayment';
// import UpiPayment from './UpiPayment';
// import NetBankingPayment from './NetBankingPayment';
import TheatreList from './Theatrelist';
import Updatemovie from './Updatemovie';
import Viewbooking from './Viewbooking';
import MovieList from './MovieList';

const stripePromise = loadStripe('pk_test_51QNQwFAhsz3I07t587QvYrds51hDoW9ieQst6DOMh4V39aLfKFczvE6NlJbjPvWba0Hq0ovdjJSwxIl1au2eWBb700pV31rl96');

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Elements stripe={stripePromise}> {/* Wrap the Routes in Elements */}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/addmovie" element={<Addmovie />} />
            <Route path="/bookedstatus" element={<Bookedstatus />} />
            <Route path="/viewfeedback" element={<Viewfeedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/moviedetail" element={<Moviedetail />} />
            <Route path="/bookticket" element={<Booktickets />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/update-movie/:id" element={<Updatemovie />} />
            <Route path="/viewbooking" element={<Viewbooking />} />
            <Route path="/payment/card" element={<CardPayment />} />
            <Route path ="/theatrelist" element={<TheatreList/>}/>
            <Route path ="/movielist" element={<MovieList/>}/>
          {/* <Route path="/payment/upi" element={<UpiPayment />} /> */}
          
          {/* <Route path="/payment/netbanking" element={<NetBankingPayment />} /> */}
          </Routes>
        </Elements>
      </BrowserRouter>
    </div>
  );
}

export default App;
