if (window.AL === undefined) {window.AL = {};}

(function() {

    var mountNode = document.querySelector('#react-root');

    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var Link = Router.Link;

    var router = <Router history={ReactRouter.hashHistory}>
      <Route path="/" component={AL.AppComponent}>
        ReactRouter.IndexRoute component={AL.MapComponent} />
        <Route path="/map" component={AL.MapComponent} />
        <Route path="/test" component={AL.TestComponent} />
        <Route path="/test/asd" component={AL.AddEditComponent} />
        <Route path="/test/asd/:sId/edit" component={AL.AddEditComponent} />
        <Route path="/test/all" component={AL.ShowAllComponent} />
      </Route>
    </Router>;

ReactDOM.render(router, mountNode);


}());
