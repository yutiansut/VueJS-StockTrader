  //Import the components
  import theMainComponent from './../components/Main.vue';
  import buyingStocks from './../components/Stocks/Stocks.vue';
  import portfolio from './../components/Portfolio/Portfolio.vue';

  //Create the routes
  export const theRoutes = [
  {
    path: '/Home',
    component: theMainComponent,
    name: 'theIndex'
  },
  {
    path: '/stocks',
    component: buyingStocks,
    name: 'theStocks'
  },
  //For extra stuff, possible to put :theID in URL, then $route.params.theID to get it on the new page
  //Or if page is based on ID< to be used as PROPS in component [here: put props:true]
  //For query: query:
  /*
    ex: Calling a pre-defined route by name (ex: someEdit)
    :to={name: 'someEdit', params: {theID: this.someID}, query: {someOption: 'hello'}}

    and the route itself (object) {name: 'someEdit', path: '/edit/:theID', props: true, component: UserEdit}
    Also possible: children, components{ ... with names in named router-views ...}

    In page to recuperate values: for dynamic parameters (ex:theID) use props
    or $route.params.theID if not (param is whatever has : in the path name)
    and $route.query.something [they get to be GET Params]

    Also note: children can "inherit" the parent's route-view and URL unless absolute address.
  */
  {
    path: '/portfolio',
    component: portfolio,
    name: 'thePortfolio'
  },
  //Redirect all others to main (so no 404)
  {
    path: '*', redirect: '/Home'
  }
]
