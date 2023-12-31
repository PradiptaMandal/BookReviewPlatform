import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { NavBar, Footer, Loading } from "./components";
import VerifyUser from "./components/VerifyUser";
import {
  Home,
  Profile,
  ExternalApi,
  Search,
  BookDetail,
  BookDetailsView,
} from "./views";
import ProtectedRoute from "./auth/protected-route";

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <div className="container flex-grow-1">
        <Switch>
          <Route path="/" exact component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
          <Route path="/search" exact component={Search} />
          <Route path="/verify-user" component={VerifyUser} />
          <ProtectedRoute path="/bookDetails/:bookId" component={BookDetail} />
          <ProtectedRoute
            path="/bookDetailsView/:bookId"
            component={BookDetailsView}
          />
          <Route path="*" element={<p>Nothing to match this path. </p>} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;

