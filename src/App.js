import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './containers/Home';
import Signin from './containers/Signin/index';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <PrivateRoute path="/" exact component={<Home />} /> */}
        <Route path="/" exact element={
          <PrivateRoute>
          <Home />
          </PrivateRoute>
        } />
       
        <Route path="/" exact component={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}


export default App;
