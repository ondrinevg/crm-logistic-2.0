import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import ClientMU from "./components/Clients/Client/ClientMU";
import ListOfClientsMU from "./components/Clients/ListOfClientsMU";
import Calendare from "./components/Calendar/Calendare";
import HeaderMU from "./components/Header/Header mu";
import ListOfOrdersMU from "./components/Orders/ListOfOrdersMU";
import OrderMU from "./components/Orders/Order/OrderMU";
import AddClientMU from "./components/AddClient/AddClientMU";
import AddOrderMU from "./components/AddOrder/AddOrderMU";
import EditOrderMU from "./components/EditOrder/EditOrderMU";
import EditClientMU from "./components/EditClient/EditClientMU";

function App() {

 
  return (
    <Router>
      <HeaderMU />
      <Switch>
        <Route exact path='/'>
          <div>главная страница</div>
        </Route>
        <Route exact path='/clients'>
          <ListOfClientsMU />
        </Route>
        <Route exact path='/clients/new'>
          <AddClientMU />
        </Route>
        <Route exact path='/clients/:id/edit'>
          <EditClientMU />
        </Route>
        <Route exact path='/clients/:id'>
          <ClientMU />
        </Route>
        <Route exact path='/orders/new'>
          <AddOrderMU />
        </Route>
        <Route exact path='/orders/:id/edit'>
          <EditOrderMU />
        </Route>
        <Route exact path='/orders/:id'>
          <OrderMU />
        </Route>        
        <Route exact path='/orders'>
          <ListOfOrdersMU />
        </Route>
        <Route exact path='/calendare'>
          <Calendare />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
