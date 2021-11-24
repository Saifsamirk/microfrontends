import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

// Exporting the app component to be displayed as a container
// that wraps all micro projects inside
export default () => {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) history.push("/dashboard");
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={() => setSignedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route
              path="/auth"
              render={() => {
                return <AuthApp onSignIn={() => setSignedIn(true)} />;
              }}
            />
            <Route path="/dashboard">
              {isSignedIn ? <DashboardApp /> : <Redirect to="/" />}
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
