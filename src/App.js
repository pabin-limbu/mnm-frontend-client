import "./App.css";
import HomePage from "./containers/Homepage";
import ProductListPage from "./containers/ProductListPage";
import CartPage from "./containers/CartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { updateCart } from "./store/actions/cart.actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCart());

    return () => {};
  }, []);

  return (
    <div className="App">
      {/* <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
               
            </Helmet> */}
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/cart" component={CartPage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
