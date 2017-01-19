if (window.ArchMap === undefined){window.ArchMap = {}; }

(function() {

  class TestComponent extends React.Component{

    render(){

      return (<div>Test Component</div>)
    }
  }

  ArchMap.TestComponent = TestComponent;

}());
