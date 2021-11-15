import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './containers/Home';
import Signin from './containers/Signin/index';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions/auth.actions'
import Products from './containers/Products';
import Orders from './containers/Orders';
import Category from './containers/Category';
import { getAllCategory, getInitialData } from './actions';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData())
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/products" element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        } />
        <Route path="/orders" element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        } />
        <Route path="/category" element={
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        } />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </div>
  )
}


export default App;
