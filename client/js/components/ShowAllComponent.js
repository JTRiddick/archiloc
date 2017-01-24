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

    }

    populateList(){
      //reset
      this.setState({
        sites:[]
      })

      //api get all
      $.ajax({
        url: '/api/sheds',
        method: 'GET',
        dataType: 'JSON'
      })
      .done((data)=> {
        console.log("done, recieved: \n ",data, "type of", typeof data);
        this.setState({
          sites:data.sheds
        })

      })

    }

    deleteItem(itemId){

      $.ajax({
        url:'/api/sheds/' + itemId,
        method: 'DELETE',
        dataType:'JSON'
      })
      .done(() => {
        this.populateList();
      });
    }


    render(){

      var sitesList;

      if (this.state.sites != []){
        // sitesList = JSON.stringify(this.state.sites);
        // ^ test
        sitesList = this.state.sites.map((site,index) =>{
          return <div className='site-info-box' key={index}>
               <SiteViewComponent key={site._id} info={site} del={this.deleteItem}/>
             </div>
        });
      }


      return(
        <div className = 'sites-view'>
          <div className = "button load" onClick={() => {this.populateList()}}> LOAD </div>
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
      this.setState(
        {

        }
      )
    }

    render(){



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
            {AL.ShowAllComponent.deleteItem(this.state.info.id)}}>delete</div>
          <div className = "button">edit</div>
          <div className = "button" onClick={() => {console.log("This is item ID of ,",this.state.info.id)}}>view</div>
        </div>
      </div>)

    }


  }

  AL.SiteViewComponent = SiteViewComponent;
  AL.ShowAllComponent = ShowAllComponent;
}());
