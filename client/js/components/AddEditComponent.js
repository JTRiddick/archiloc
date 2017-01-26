if (window.AL === undefined){window.AL = {}; }

(function() {


  class AddEditComponent extends React.Component{


    constructor(){
      super();

      this.state = {editMode:false};

      AL.ControlObject.registerCallback(() => {
        this.setState({
          lastAdded:AL.ControlObject.sendData
        })
      });

    console.log('added callbacks', AL.ControlObject.cbSuccess,AL.ControlObject.cbFail);

    }
    componentWillMount(){
      console.log('mounting with params, ',this.props.params);
      if(this.props.params.sId && !this.state.editMode){
        this.setState({
          editMode:true
        })
        AL.ControlObject.getStructById(this.props.params.sId);
      }

    }

    componentWillUnmount(){
      console.log('unmount');
      AL.ControlObject.resetControl();
    }


    validateStructure(evt){
      evt.preventDefault();
      console.log("state check", this.state);
      //validate conditions here

      // this.submitStructure(evt);

      // input to control object
      var inputs = {
        title:this.nameInput.value,
        type:this.typeInput.value,
        year:this.yearInput.value,
        arch:this.archInput.value,
        street:this.streetInput.value,
        city:this.cityInput.value,
        country:this.countryInput.value,
      }

      //edit?
      console.log('inputs?',inputs);
      if (this.state.editMode){
        AL.ControlObject.editItem(this.props.params.sId,inputs);
      }else{
        AL.ControlObject.addItem(inputs);
      }


    }

    render(){
      console.log('@render, state set to ', this.state);
      var review;
      var fields;

      //field placeholders
      var name = "Name";
      var year = "Year of Construction/Completion";
      var arch = "Architect/Firm";
      var type = "Cultural";
      var street = "Street";
      var city = "City";
      var country = "Country";



      if(this.state){
        console.log('last added/edit', this.state.lastAdded);
        if(this.state.lastAdded){
          review = <ReviewData info={this.state.lastAdded} />
          if(this.state.editMode){
            name = this.state.lastAdded.title;
            year = this.state.lastAdded.year || 'Add Year';
            arch = this.state.lastAdded.arch;
            type = this.state.lastAdded.type;
            street = this.state.lastAdded.street;
            city = this.state.lastAdded.city;
            country = this.state.lastAdded.country;
          }


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
            <input placeholder={name} ref={(input) => {this.nameInput = input}}/>
            <input placeholder={year} ref={(input) => {this.yearInput = input}}/>
            <input placeholder={arch} ref={(input) => {this.archInput = input}}/>

            <hr/>
            <h4>Categories</h4>
            <select defaultValue={type} ref={(input) => {this.typeInput = input}}>
              <option value="cultural">Cultural</option>
              <option value="residential">Residential</option>
              <option value="industrial">Industrial</option>
              <option value="commercial">Commercial</option>
              <option value="infrastructural">Infrastructural</option>
            </select>
            <hr/>

            <h4>Location</h4>
            <input placeholder={street} ref={(input) => {this.streetInput = input}}/>
            <input placeholder={city} ref={(input) => {this.cityInput = input}}/>
            <input placeholder={country} ref={(input) => {this.countryInput = input}}/>

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
    componentDidMount(){
      console.log('review props',this.props)
    }

    render(){

      var info;

      if (this.props.warning){
        console.log(this.props.warning);
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
          {info}
      </div>)
    }

  }
  AL.ReviewData = ReviewData;
  AL.AddEditComponent = AddEditComponent;
}());
