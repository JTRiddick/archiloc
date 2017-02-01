if (window.AL === undefined) {window.AL = { }; }

(function() {


  class AppComponent extends React.Component {
    render() {
      console.log('rendering app component');

      return( <div className='app-component'>
        {this.props.children}
      </div>);
    }
  }

  AL.AppComponent = AppComponent;
}());
