import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";

function App() {
  return (
   <Router>
     <Switch>
       <Route path='/'>
         <div>Начало</div>
       </Route>
     </Switch>
   </Router>
  );
}

export default App;
