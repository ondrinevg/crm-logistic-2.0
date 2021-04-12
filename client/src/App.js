import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import ClientMU from "./components/Clients/Client/ClientMU";
import ListOfClientsMU from "./components/Clients/ListOfClientsMU";
import MyCalendar from "./components/Calendar/MyCalendar";
import HeaderMU from "./components/Header/Header mu";
import ListOfOrdersMU from "./components/Orders/ListOfOrdersMU";
import OrderMU from "./components/Orders/Order/OrderMU";
import AddClientMU from "./components/AddClient/AddClientMU";
import AddOrderMU from "./components/AddOrder/AddOrderMU";
import EditOrderMU from "./components/EditOrder/EditOrderMU";
import EditClientMU from "./components/EditClient/EditClientMU";
import AdminPanel from "./components/ApminPanel/AdminPanel";
import PrivatRouter from "./components/PrivateRouter/PrivatRouter";

function App() {


  return (
    <Router>
      <HeaderMU />
      <Switch>
        <PrivatRouter component={<MyCalendar />} exact path='/'/>
        {/* <Route exact path='/'>
          <MyCalendar />
        </Route> */}
        <Route exact path='/admin'>
          <AdminPanel />
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
       
      </Switch>
    </Router>
  );
}

export default App;
