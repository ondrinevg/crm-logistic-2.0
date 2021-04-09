import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import AddClient from "./components/AddClient/AddClient";
import AddOrder from "./components/AddOrder/AddOrder";
import Client from "./components/Clients/Client/Client";
import ListOfClients from "./components/Clients/ListOfClients";
import Header from "./components/Header/Header";
import ListOfOrders from "./components/Orders/ListOfOrders";
import Order from "./components/Orders/Order/Order";
import EditClient from "./components/EditClient/EditClient";

function App() {

 
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/'>
          <div>главная страница</div>
        </Route>
        <Route exact path='/clients/new'>
          <AddClient />
        </Route>
        <Route exact path='/clients/:id/edit'>
          <EditClient />
        </Route>
        <Route exact path='/clients/:id'>
          <Client />
        </Route>
        <Route exact path='/orders/new'>
          <AddOrder />
        </Route>
        <Route exact path='/orders/:id'>
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
