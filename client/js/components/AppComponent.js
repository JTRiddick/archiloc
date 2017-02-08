if (window.AL === undefined) {window.AL = { }; }

(function() {


  class AppComponent extends React.Component {
    render() {
      console.log('rendering app component');

      var testBar = (<div className = "top-bar nav">
        <ul>
          <li><ReactRouter.Link className="link" to={"/map" }>Map</ReactRouter.Link></li>
          <li><ReactRouter.Link className="link" to={'/test'
        }>Admin/Testing</ReactRouter.Link></li>
        </ul>
      </div>)

      return( <div className='app-component'>

        <div className="component-header">
          <div className="title">
            <h1>ArchiType &apos;97</h1>
            <p><i>How Much does your Building Weigh?</i></p>
          </div>
          {testBar}
        </div>
        {this.props.children}
      </div>);
    }
  }

  AL.AppComponent = AppComponent;
}());
