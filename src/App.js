import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import AnimalsContainer from './animals/AnimalsContainer';
// import logsContainer from './logs/logsContainer';
import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/animals">
          <AnimalsContainer />
        </Route>
        <Route path="/logs">
          {/* <logsContainer /> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
