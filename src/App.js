import "./App.css";
import HomePage from "./containers/Homepage";
import ProductListPage from "./containers/ProductListPage";
import CartPage from "./containers/CartPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { updateCart } from "./store/actions/cart.actions";
import { useDispatch } from "react-redux";
import { getInitialData } from "./store/actions/initialdata.actions";
import CheckOutPage from "./containers/CheckOutPage";
import ProductDetailsPage from "./containers/PrdouctDetailsPage";
import SuccessCheckoutSummary from "./containers/SuccessCheckoutSummary";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateCart());

    return () => {};
  }, []);

  useEffect(() => {
    dispatch(getInitialData());
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/cart" exact component={CartPage}></Route>
          <Route path="/checkout" exact component={CheckOutPage}></Route>

          <Route
            path="/success-order"
            exact
            component={SuccessCheckoutSummary}
          ></Route>
          <Route
            path="/product/:slug"
            exact
            component={ProductListPage}
          ></Route>
          <Route
            path="/product/:slug/:id/"
            exact
            component={ProductDetailsPage}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
