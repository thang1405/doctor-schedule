import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import TopMenu from './components/TopMenu'
import Home from './page/Home'
import Doctor from './page/Doctor'
function App() {
  return (
    <div >
    <Router>
    <div>
      <TopMenu />
      <Route path="/" exact component={Home} />
      <Route path="/doctor/" component={Doctor} />
    </div>
  </Router>
    </div>
  );
}

export default App;
