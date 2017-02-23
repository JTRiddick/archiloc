if (window.AL === undefined){window.AL = {}; }

(() => {

  class AddEditComponent extends React.Component{

    constructor(){
      super();

      this.state = {editMode:false,styles:[],tagMode:false};



    }
    componentWillMount(){
      AL.ControlObject.resetControl();
      console.log('mounting with props, ',this.props);
      this.editorCallback = () => {
        this.setState({
          lastAdded:AL.ControlObject.sendData
        })
      };

      AL.ControlObject.emitter.on('foundId',this.editorCallback);
      AL.ControlObject.emitter.on('saved',this.editorCallback);

      if(this.props.location.pathname.includes('tag')){
          this.setState({
            tagMode:true
          })
        AL.ControlObject.getStructById(this.props.params.sId);
      }
      else if(this.props.params.sId && !this.state.editMode && !this.state.tagMode){
          this.setState({
            editMode:true
          });
        AL.ControlObject.getStructById(this.props.params.sId);
      }
      else{
        console.log('standard add mode');
      }

    }

    componentWillUnmount(){
      console.log('unmounting ASD/editor');
      AL.ControlObject.emitter.off('foundId',this.editorCallback);
      AL.ControlObject.emitter.off('saved',this.editorCallback);

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
      //field placeholders
      var name;
      var year;
      var arch;
      var type;
      var street;
      var city;
      var country;
      var styles;
      var description;
      var picUrl;

      if(this.state){
        console.log('last added/edit', this.state.lastAdded);
        if(this.state.lastAdded){
          review = <ReviewData info={this.state.lastAdded} />

          console.log('returned data in state', this.state.lastAdded);
        }
        if(this.state.error){
          review = <ReviewData warning={this.state.error,this.state.stat} />
        }

      }

      //set placeholders and defaults if editing

      console.log('last added/edit', this.state.lastAdded);

     if(this.state.lastAdded){
        console.log('default values');
        this.nameInput.value = this.state.lastAdded.title;
        this.yearInput.value = this.state.lastAdded.year;
        this.archInput.value = this.state.lastAdded.arch;
        this.typeInput.value = this.state.lastAdded.type;
        this.cityInput.value = this.state.lastAdded.cityState;
        this.streetInput.value = this.state.lastAdded.street;
        this.countryInput.value = this.state.lastAdded.country;
        this.picInput.value = decodeURIComponent(this.state.lastAdded.pic);
        this.descriptionInput.value = this.state.lastAdded.description;
      }
      if(this.state.error){
        review = <ReviewData warning={this.state.error,this.state.stat} />
      }
      if(this.state.lastAdded){
        review = <ReviewData info={this.state.lastAdded} />
        console.log('returned data in state', this.state.lastAdded);
      }


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
          <input defaultValue={name} placeholder="Name" ref={(input) => {this.nameInput = input}}/>
          <input defaultValue={year} placeholder="Year" ref={(input) => {this.yearInput = input}}/>
          <input defaultValue={arch} placeholder="Architect/Firm" ref={(input) => {this.archInput = input}}/>

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
          <input defaultValue={street} placeholder="Street" ref={(input) => {this.streetInput = input}}/>
          <input defaultValue={city} placeholder="City" ref={(input) => {this.cityInput = input}}/>
          <input defaultValue={country} placeholder="Country" ref={(input) => {this.countryInput = input}}/>

          <hr/>

          <h4>Description</h4>
          <textarea rows={5} cols={40} placeholder={description} defaultValue={description} ref={(input) => {this.descriptionInput = input}}/>



          <hr/>
          <h4>Image</h4>
          <input defaultValue="add a URL" ref={(input)=>{this.picInput = input}}/>

          <button>Add</button>
        </form>);
      }



      //set placeholders and defaults if editing



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
        info = "Error ", this.props.warning;
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
