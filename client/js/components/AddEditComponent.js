if (window.AL === undefined){window.AL = {}; }

(() => {

  class AddEditComponent extends React.Component{

    constructor(){
      super();

      this.state = {editMode:false,styles:[],tagMode:false};

      AL.ControlObject.registerCallback(() => {
        this.setState({
          lastAdded:AL.ControlObject.sendData
        })
      });

    console.log('added callbacks', AL.ControlObject.cbSuccess,AL.ControlObject.cbFail);

    }
    componentWillMount(){
      console.log('mounting with props, ',this.props);
      if(this.props.location.pathname.includes('tag')){
        this.setState({
          tagMode:true
        })
        AL.ControlObject.getStructById(this.props.params.sId);
      }
      if(this.props.params.sId && !this.state.editMode && !this.state.tagMode){
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

    sendToViewer(){
      ReactRouter.hashHistory.push('/test/all');
    }

    addStyleTag(tag){
      console.log("tag is", tag.value, 'sId is ',this.props.params.sId);
      if(tag.value.length > 0){
        AL.ControlObject.setStyleTags(this.props.params.sId,tag.value);
        console.log('tagged');
      }else{
        console.log('tag failed');
      }

    }

    validateStructure(evt){
      evt.preventDefault();
      console.log("state check", this.state);
      //validate conditions here



      // input to control object
      var encodePic = encodeURIComponent(this.picInput.value);
      var inputs = {
        title:this.nameInput.value,
        type:this.typeInput.value,
        year:this.yearInput.value,
        arch:this.archInput.value,
        street:this.streetInput.value,
        cityState:this.cityInput.value,
        country:this.countryInput.value,
        pic:encodePic,
        styles:this.state.styles,
        description:this.descriptionInput.value
      }

      //edit?
      console.log('inputs?',inputs);
      if (this.state.editMode){
        AL.ControlObject.editItem(this.props.params.sId,inputs);
      }else{
        console.log('adding',inputs);
        AL.ControlObject.addItem(inputs);
      }


    }

    render(){
      console.log('@render, state set to ', this.state);
      var review;
      var fields;


      if(this.state.tagMode){
        fields = <div>
          <hr/>
          <h4>Styles</h4>
          <div className="styletags">Adding StyleTags {this.state.styles}</div>
          <input ref={(input)=>{this.styleInput = input}} />
          <div className="nav-button" onClick={() => {this.addStyleTag(this.styleInput)}}>Add</div>
        </div>
      }else{
       fields = (
        <form onSubmit = {(evt) => {this.validateStructure(evt)}}>
          <h4>Details</h4>
          <input defaultValue={name}  placeholder={name} ref={(input) => {this.nameInput = input}}/>
          <input defaultValue={year} placeholder={year} ref={(input) => {this.yearInput = input}}/>
          <input defaultValue={arch} placeholder={arch} ref={(input) => {this.archInput = input}}/>

          <hr/>
          <h4>Categories</h4>
          <select defaultValue={type} ref={(input) => {this.typeInput = input}}>
            <option value="cultural">Cultural</option>
            <option value="civic">Civic</option>
            <option value="residential">Residential</option>
            <option value="industrial">Industrial</option>
            <option value="commercial">Commercial</option>
            <option value="infrastructural">Infrastructural</option>
          </select>
          <hr/>

          <h4>Location</h4>
          <input defaultValue={street} placeholder={street} ref={(input) => {this.streetInput = input}}/>
          <input defaultValue={city} placeholder={city} ref={(input) => {this.cityInput = input}}/>
          <input defaultValue={country} placeholder={country} ref={(input) => {this.countryInput = input}}/>

          <hr/>

          <h4>Description</h4>
          <input type='text' placeholder={description} defaultValue={description} ref={(input) => {this.descriptionInput = input}}/>



          <hr/>
          <h4>Image</h4>
          <input defaultValue="add a URL" ref={(input)=>{this.picInput = input}}/>

          <button>Add</button>
        </form>);
      }

      //field placeholders
      var name = "Name";
      var year = "Year of Construction/Completion";
      var arch = "Architect/Firm";
      var type = "Cultural";
      var street = "Street";
      var city = "City, State";
      var country = "Country";
      var styles = "Styles";
      var description = "This is a Building, probably"
      var picUrl = "add a URL"

      //set placeholders and defaults if editing
      if(this.state){
        console.log('last added/edit', this.state.lastAdded);
        if(this.state.lastAdded){
          review = <ReviewData info={this.state.lastAdded} />
          if(this.state.editMode){
            name = this.state.lastAdded.title;
            year = this.state.lastAdded.year || 'Add Year';
            arch = this.state.lastAdded.arch;
            type = this.state.lastAdded.type;
            city = this.state.lastAdded.cityState;
            street = this.state.lastAdded.street;
            country = this.state.lastAdded.country;
            styles = this.state.lastAdded.styles || "no style";
            picUrl = this.state.lastAdded.pic;
            description = this.state.lastAdded.description;
          }


          console.log('returned data in state', this.state.lastAdded);
        }
        if(this.state.error){
          review = <ReviewData warning={this.state.error,this.state.stat} />
        }

      }


      return (<div>
          <div className='add-structure'>
          <div className='panel-header'>
            <h3 className= "left">Add Structure</h3>
            <div className = "nav-button view right" onClick={() => {this.sendToViewer()}}> Show All </div>
          </div>
          {fields}

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

      if (this.props.info && !this.props.warning){
        info = <ol>
          <li>Name: {this.props.info.title} </li>
          <li>Year: {this.props.info.year} </li>
          <li>Arch: {this.props.info.arch} </li>
          <li>Type: {this.props.info.type} </li>
          <li>Street: {this.props.info.street} </li>
          <li>City: {this.props.info.cityState} </li>
          <li>Country: {this.props.info.country} </li>
          <li>Styles: {JSON.stringify(this.props.info.styles)} </li>
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
})();
