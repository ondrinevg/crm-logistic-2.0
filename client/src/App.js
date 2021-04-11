import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import AddClient from "./components/AddClient/AddClient";
import AddOrder from "./components/AddOrder/AddOrder";
import Client from "./components/Clients/Client/Client";
import ClientMU from "./components/Clients/Client/ClientMU";
import ListOfClients from "./components/Clients/ListOfClients";
import ListOfClientsMU from "./components/Clients/ListOfClientsMU";
import Header from "./components/Header/Header";
import ListOfOrders from "./components/Orders/ListOfOrders";
import Order from "./components/Orders/Order/Order";
import EditClient from "./components/EditClient/EditClient";
import EditOrder from "./components/EditOrder/EditOrder";
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
      {/* <Header /> */}
      <HeaderMU />
      <Switch>
        <Route exact path='/'>
          <div>главная страница</div>
        </Route>
        <Route exact path='/clients'>
          {/* <ListOfClients /> */}
          <ListOfClientsMU />
        </Route>
        <Route exact path='/clients/new'>
          {/* <AddClient /> */}
          <AddClientMU />
        </Route>
        <Route exact path='/clients/:id/edit'>
          {/* <EditClient /> */}
          <EditClientMU />
        </Route>
        <Route exact path='/clients/:id'>
          {/* <Client /> */}
          <ClientMU />
        </Route>
        <Route exact path='/orders/new'>
          {/* <AddOrder /> */}
          <AddOrderMU />
        </Route>
        <Route exact path='/orders/:id/edit'>
          {/* <EditOrder /> */}
          <EditOrderMU />
        </Route>
        <Route exact path='/orders/:id'>
          {/* <Order /> */}
          <OrderMU />
        </Route>        
        <Route exact path='/orders'>
          {/* <ListOfOrders /> */}
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
