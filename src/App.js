import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './containers/Home';
import Signin from './containers/Signin/index';
import Signup from './containers/Signup';


function App() {
  return(
    <div className="App">
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
     
    </div>
  )
}


export default App;
