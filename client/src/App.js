import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
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
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initUserSaga } from "./redux/actionCreators/userAC";
import PrivatRouterAdmin from "./components/PrivateRouter/PrivatRouterAdmin";
import Calendar from './components/Calendar/Calendar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUserSaga());
  }, [])

  return (
    <Router>
      <HeaderMU />
      <Switch>
        {/* <PrivatRouterAdmin component={MyCalendar} exact path='/'/> */}
        <PrivatRouterAdmin component={Calendar} exact path='/'/>
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
