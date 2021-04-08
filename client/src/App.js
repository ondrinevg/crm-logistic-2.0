import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import Client from "./components/Clients/Client/Client";
import ListOfClients from "./components/Clients/ListOfClients";
import Header from "./components/Header/Header";
import ListOfOrders from "./components/Orders/ListOfOrders";
import Order from "./components/Orders/Order/Order";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <div>главная страница</div>
        </Route>
        <Route exact path='/client'>
          <Client />
        </Route>
        <Route exact path='/order'>
          <Order />
        </Route>
        <Route exact path='/clients'>
          <ListOfClients />
        </Route>
        <Route exact path='/orders'>
          <ListOfOrders />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
