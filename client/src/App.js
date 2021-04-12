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
import PrivateRouterAdmin from "./components/PrivateRouter/PrivateRouterAdmin";
import PrivateRouterManager from "./components/PrivateRouter/PrivateRouterManager"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUserSaga());
  }, [])

  return (
    <Router>
      <HeaderMU />
      <Switch>
        
        <PrivateRouterManager component={MyCalendar} exact path='/'/>
        {/* <Route exact path='/'>
          <MyCalendar />
        </Route> */}
        <PrivateRouterAdmin component={AdminPanel} exact path='/admin'/>
        {/* <Route exact path='/admin'>
          <AdminPanel />
        </Route> */}
       
        <PrivateRouterManager component={ListOfClientsMU} exact path='/clients'/>
        {/* <Route exact path='/clients'>
          <ListOfClientsMU />
        </Route> */}
        
        <PrivateRouterManager component={AddClientMU} exact path='/clients/new'/>
        {/* <Route exact path='/clients/new'>
          <AddClientMU />
        </Route> */}
        
        <PrivateRouterManager component={EditClientMU} exact path='/clients/:id/edit'/>
        {/* <Route exact path='/clients/:id/edit'>
          <EditClientMU />
        </Route> */}
       
        <PrivateRouterManager component={ClientMU} exact path='/clients/:id'/>
        {/* <Route exact path='/clients/:id'>
          <ClientMU />
        </Route> */}
        
        <PrivateRouterManager component={AddOrderMU} exact path='/orders/new'/>
        {/* <Route exact path='/orders/new'>
          <AddOrderMU />
        </Route> */}
        
        <PrivateRouterManager component={EditOrderMU} exact path='/orders/:id/edit'/>
        {/* <Route exact path='/orders/:id/edit'>
          <EditOrderMU />
        </Route> */}
        
        <PrivateRouterManager component={OrderMU} exact path='/orders/:id'/>
        {/* <Route exact path='/orders/:id'>
          <OrderMU />
        </Route> */}
       
        <PrivateRouterManager component={ListOfOrdersMU} exact path='/orders'/>
        {/* <Route exact path='/orders'>
          <ListOfOrdersMU />
        </Route> */}
       
      </Switch>
    </Router>
  );
}

export default App;
