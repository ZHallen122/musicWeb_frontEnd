import './styles/App.css';
import AdminMain from './components/AdminMain';
import UserMain from './components/UserMain';
import {Route, Switch, Redirect, Router} from "react-router";




function App() {
  return (
    <div className="App">
        <AdminMain/>
    </div>
  );
}

export default App;
