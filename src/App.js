import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './shared/Navbar';
import AnimalsContainer from './animals/AnimalsContainer';
import LogsContainer from './logs/LogsContainer';
import ZookeepersContainer from './zookeepers/ZookeepersContainer'
import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/animals">
          <AnimalsContainer />
        </Route>
        <Route path="/animal_logs">
          <LogsContainer />
        </Route>
        <Route path="/zookeepers">
          <ZookeepersContainer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
