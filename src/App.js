import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './Loading.jsx'
import Posts from './page/Posts.jsx';
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import Home from './page/Home.jsx';
import AddItem from './page/AddItem';
import EditItem from './page/EditItem';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
function App() {
  return (
    <>
     <Provider store={store}>
         <Router>
              <Routes>
                <Route path="/add" element={<AddItem />} />
                  
                <Route path="/edit/:id" element={<EditItem />} />
                  
                <Route path="/" element={<Home />} />
                  
              </Routes>
          </Router>
     </Provider>
    </>
  );
}

export default App;
