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
         
        <PrivateRouterAdmin component={AdminPanel} exact path='/admin'/>
       
        <PrivateRouterManager component={ListOfClientsMU} exact path='/clients'/>
        
        <PrivateRouterManager component={AddClientMU} exact path='/clients/new'/>
                
        <PrivateRouterManager component={EditClientMU} exact path='/clients/:id/edit'/>
              
        <PrivateRouterManager component={ClientMU} exact path='/clients/:id'/>
               
        <PrivateRouterManager component={AddOrderMU} exact path='/orders/new'/>
                
        <PrivateRouterManager component={EditOrderMU} exact path='/orders/:id/edit'/>
                
        <PrivateRouterManager component={OrderMU} exact path='/orders/:id'/>
               
        <PrivateRouterManager component={ListOfOrdersMU} exact path='/orders'/>
               
      </Switch>
    </Router>
  );
}

export default App;
