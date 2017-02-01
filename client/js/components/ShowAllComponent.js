if (window.AL === undefined){window.AL = {}; }

(function() {

  class ShowAllComponent extends React.Component{

    constructor() {
      super();
      this.state = {
        sites:[]
      }
    }

    componentDidMount(){
      AL.ControlObject.registerCallback(() => {
        this.setState({
          sites:AL.ControlObject.sendData.sheds
        });
      });

    }

    componentWillUnmount(){
      AL.ControlObject.resetControl();
    }

    populateList(){
      //reset

      AL.ControlObject.getAll();

    }

    sendToNewEditor(){
      ReactRouter.hashHistory.push('/test/asd');
    }

    render(){
      var sitesList;
      console.log(this.state.sites);
      if (this.state.sites && this.state.sites.length > 0){

      sitesList = this.state.sites.map((site,index) =>{
          return <div className='site-info-box' key={index}>
               <SiteViewComponent key={site._id} info={site} del={this.deleteItem}/>
             </div>
        });
      }


      return(
        <div className = 'sites-view'>
          <div className = "button load" onClick={() => {this.populateList()}}> LOAD </div>
          <div className = "button load new" onClick={() => {this.sendToNewEditor()}}> ADD </div>
          <div>
            <ol>
              {sitesList}
            </ol>
          </div>

        </div>
      );

    }

  };

  class SiteViewComponent extends React.Component{

    constructor(){
      super();

    }
    componentDidMount(){
      console.log(this,'viewbox mounted');

      this.setState(
        {
          info:this.props.info
        }
      )
    }
    componentWillUnmount(){
      console.log(this,'viewbox unmount');
      //removed cb reset
    }

    sendToEdit(sId){
      ReactRouter.hashHistory.push('/test/asd/'+sId+'/edit');
    }

    render(){
      var editLinkId;

      if(this.state && this.state.info.id){
        editLinkId = this.state.info.id;
      }

      return (<div className="site-inner-box">
        <div className="site-info">
          <ol>
            <li>{this.props.info.id}</li>
            <li>{this.props.info.title}</li>
            <li>{this.props.info.year}</li>
            <li>{this.props.info.arch}</li>
            <li>{this.props.info.type}</li>
            <li>{this.props.info.street}</li>
            <li>{this.props.info.city}</li>
            <li>{this.props.info.country}</li>
          </ol>
        </div>

        <div className = "site-controls">
          <div className = "button" onClick={() =>
            {AL.ControlObject.deleteItem(this.state.info.id)}}>delete</div>
          <div className = "button" onClick={() => {
            this.sendToEdit(editLinkId)
          }}>edit
          </div>
          <div className = "button" onClick={() =>
            {AL.ControlObject.mapOneItem(this.state.info.id)}}>view
          </div>
        </div>
      </div>)

    }


  }

  AL.SiteViewComponent = SiteViewComponent;
  AL.ShowAllComponent = ShowAllComponent;
})();
