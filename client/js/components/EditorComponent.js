if (window.AL === undefined){window.AL = {}; }

(function() {

  class EditorComponent extends React.Component{

    constructor(){
      super();

      this.state = ({
        name:""
      })
    }

    validateStructure(evt){
      evt.preventDefault();

      //validate conditions here

        this.submitStructure(evt);


    }

    submitStructure(evt){
      //api POST
      $.ajax({
        url: 'http://requestb.in/vi3w13vi',
        method: 'POST',
        dataType:'JSONP',
        data:{
          name:this.nameInput.value,
          type:this.typeInput.value,
          year:this.yearInput.value,
          arch:this.archInput.value,
          location:{street:this.archInput.value,
          city:this.cityInput.value,
          country:this.countryInput.value}
        },

      })
      .fail(()=>{
        window.alert('no');
        console.log('request unsucessful');
      })
      .done((data)=>{
        console.log('request successful');
        console.log('data ',data);
        this.setState({
          data:data
        })
      })
    }

    render(){
      var review;

      if(this.state !== undefined){
        if(this.state.data){
          review = <ReviewData info={this.state.data} />
        }
      }

      return (<div>
          <div className='add-structure'>
          <h3>Add Structure</h3>
          <hr />

          <form onSubmit = {(evt) => {this.validateStructure(evt)}}>

            <input placeholder="Name" ref={(input) => {this.nameInput = input}}/>
            <input placeholder="Type" ref={(input) => {this.typeInput = input}}/>
            <input placeholder="Year" ref={(input) => {this.yearInput = input}}/>
            <input placeholder="Architect/Firm" ref={(input) => {this.archInput = input}}/>

            <hr/>

            <h4>Location</h4>
            <input placeholder="Street" ref={(input) => {this.streetInput = input}}/>
            <input placeholder="City" ref={(input) => {this.cityInput = input}}/>
            <input placeholder="Country" ref={(input) => {this.countryInput = input}}/>

            <button>Add</button>
          </form>

        </div> {this.review}
      </div>)
    }
    //Type and Style should be set to select/dropdown list
  }
  //end of EditorComponent

  class ReviewData extends React.Component {
    constructor(){
      super();
    }
    onComponentMount(){
      this.setState({
        name:this.props.name
      })
    }

    render(){
      return (<div className='review'>
        <ol>
          <li>Name: {this.state.name}</li>
        </ol>
      </div>)
    }

  }

  AL.EditorComponent = EditorComponent;
}());
