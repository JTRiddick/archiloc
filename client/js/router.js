if (window.ArchMap === undefined) {window.ArchMap = {};}

(function() {

    var mountNode = document.querySelector('#react-root');

    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var IndexRoute = ReactRouter.IndexRoute;

    var router = <Router history={ReactRouter.hashHistory}>
    <Route path="/" component={ArchMap.TestComponent} />
    <Route path="/map" component={ArchMap.MapComponent} />
    </Router>;

ReactDOM.render(router, mountNode);


}());
