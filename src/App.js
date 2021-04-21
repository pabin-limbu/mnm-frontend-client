import "./App.css";
import HomePage from "./containers/Homepage";
import ProductListPage from "./containers/ProductListPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      {/* <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
               
            </Helmet> */}
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/:slug" component={ProductListPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
