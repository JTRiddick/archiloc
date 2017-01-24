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

    populateList(evt){
      evt.preventDefault();

      //api get all
      $.ajax({
        url: '/api/sheds',
        method: 'GET',
        dataType: 'JSON'
      })
      .done((data)=> {
        console.log(data);
        this.setState({
          sites:data.sheds
        })
      })

    }


    render(){

      var sitesList = "";

      if (this.state.sites !== []){
        sitesList = JSON.stringify(this.state.sites);
        // ^ test
        

      }


      return(
        <div className = 'sites-view'>
          <form onSubmit = {(evt) => {this.populateList(evt)}}>
            <button>Populate</button>
          </form>
          <div>
            {sitesList}
          </div>
        </div>
      );

    }

  };

  class siteViewComponent extends React.Component{

    constructor(){
      super();

    }
    componentDidMount(){

    }


  }


  AL.ShowAllComponent = ShowAllComponent;
}());
