if (window.AL === undefined){window.AL = {}; }

(function() {

  class TestComponent extends React.Component{
    constructor(){
      super();
    }
    onComponentMount(){

    }

    render(){
      var links = (<ol>
       <li><ReactRouter.Link className="link" to={"/test/asd" }>Add</ReactRouter.Link></li>
       <li><ReactRouter.Link className="link" to={'/test/all'}>Show Collection</ReactRouter.Link></li>
      </ol>)
      return (<div className='admin-test'>
        <h3>This is the place where you can break everything</h3>
        {links}
      </div>)
    }
  }

  AL.TestComponent = TestComponent;

}());
