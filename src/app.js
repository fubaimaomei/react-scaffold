import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom"
import Home from '../components/index/Home/index'
import About from '../components/about/Home/index'
import Case from '../components/case/Home/index'
import Solution from '../components/solution/Home/index'
import Info from '../components/info/Home/index'
import Contact from '../components/Contact/Home/index'
import SingleCase from '../components/single-case/Home/index'
import SingleSolution from '../components/single-solution/Home/index'
import SingleInfo from '../components/single-info/Home/index'

function AppRouter() {
  return (
    <Router>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/case/" component={Case} />
          <Route path="/solution/" component={Solution} />
          <Route path="/info/" component={Info} />
          <Route path="/contact/" component={Contact} />
          <Route path="/SingleCase/" component={SingleCase} />
          <Route path="/SingleSolution/" component={SingleSolution} />
          <Route path="/SingleInfo/" component={SingleInfo} />
        </Switch>
  </Router>
  );
}

export default AppRouter;
