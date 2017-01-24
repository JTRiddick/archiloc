if (window.AL === undefined) {window.AL = {};}

(function() {

    var mountNode = document.querySelector('#react-root');

    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;


    var router = <Router history={ReactRouter.hashHistory}>
      <Route path="/" component={AL.AppComponent}>
        ReactRouter.IndexRoute component={AL.MapComponent} />
        <Route path="/map" component={AL.MapComponent} />
        <Route path="/test" component={AL.TestComponent} />
        <Route path="/test/asd" component={AL.EditorComponent} />
        <Route path="/test/all" component={AL.ShowAllComponent} />
      </Route>
    </Router>;

ReactDOM.render(router, mountNode);


}());
