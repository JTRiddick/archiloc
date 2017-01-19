if (window.ArchMap === undefined) {window.ArchMap = { }; }

(function() {


  class AppComponent extends React.Component {
    render() {
      console.log('rendering app component');

      return( <div>
        <p>This is the React AppComponent</p>
        {this.props.children}
      </div>);
    }
  }

  ArchMap.AppComponent = AppComponent;
}());
