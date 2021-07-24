import './App.css';
import Home from "./Home";
import Form from "./PostForm";
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Form" component={Form} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
