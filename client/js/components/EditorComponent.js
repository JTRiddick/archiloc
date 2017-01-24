if (window.AL === undefined){window.AL = {}; }

(function() {


  class EditorComponent extends React.Component{



    constructor(){
      super();

    }

    validateStructure(evt){
      evt.preventDefault();

      //validate conditions here

        this.submitStructure(evt);

    }

    submitStructure(evt){
      //test
      console.log("sending...", this.nameInput.value, this.typeInput.value);

      //api POST
      $.ajax({
        url: '/api/sheds',
        method: 'POST',
        dataType: 'JSON',
        data:{
          title:this.nameInput.value,
          type:this.typeInput.value,
          year:this.yearInput.value,
          arch:this.archInput.value,
          street:this.streetInput.value,
          city:this.cityInput.value,
          country:this.countryInput.value
        }

      })
      .fail((req,stat,error)=>{
        // window.alert('no');
        console.log('request unsucessful');
        console.log("req",req);
        console.log("stat",stat);
        console.log("err",error);
        this.setState({error:stat});
      })
      .done((data)=>{
        console.log('request successful');
        console.log('data: ',data);
        this.setState({lastAdded:data, error:false});

      })
    }

    render(){
      var review;


      if(this.state){
        if(this.state.lastAdded){
          review = <ReviewData info={this.state.lastAdded} />

          console.log('returned data in state', this.state.lastAdded);
        }
        if(this.state.error){
          review = <ReviewData warning={this.state.error} />
        }
      }


      return (<div>
          <div className='add-structure'>
          <h3>Add Structure</h3>
          <hr />

          <form onSubmit = {(evt) => {this.validateStructure(evt)}}>
            <h4>Details</h4>
            <input placeholder="Name" ref={(input) => {this.nameInput = input}}/>
            <input placeholder="Year" ref={(input) => {this.yearInput = input}}/>
            <input placeholder="Architect/Firm" ref={(input) => {this.archInput = input}}/>

            <hr/>
            <h4>Categories</h4>
            <select defaultValue="cultural" ref={(input) => {this.typeInput = input}}>
              <option value="cultural">Cultural</option>
              <option value="residential">Residential</option>
              <option value="industrial">Industrial</option>
              <option value="commercial">Commercial</option>
              <option value="infrastructural">Infrastructural</option>
            </select>
            <hr/>

            <h4>Location</h4>
            <input placeholder="Street" ref={(input) => {this.streetInput = input}}/>
            <input placeholder="City" ref={(input) => {this.cityInput = input}}/>
            <input placeholder="Country" ref={(input) => {this.countryInput = input}}/>

            <button>Add</button>
          </form>

        </div>
      {review}
      </div>)
    }
    //Type and Style should be set to select/dropdown list
  }
  //end of EditorComponent

  class ReviewData extends React.Component {
    constructor(){
      super();

    }


    render(){

      var info;

      if (this.props.warning){

        info = "Error " + JSON.stringify(this.props.warning);
      }

      if (this.props.info){
        info = <ol>
          <li>Name: {this.props.info.title} </li>
          <li>Year: {this.props.info.year} </li>
          <li>Arch: {this.props.info.arch} </li>
          <li>Type: {this.props.info.type} </li>
          <li>Street: {this.props.info.street} </li>
          <li>City: {this.props.info.city} </li>
          <li>Country: {this.props.info.country} </li>
        </ol>

      }

      return (<div className='review add-structure'>
          <h4> Saved... </h4>
          {this.info}
      </div>)
    }

  }
  AL.ReviewData = ReviewData;
  AL.EditorComponent = EditorComponent;
}());
