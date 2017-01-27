if (window.AL === undefined){window.AL = {}; }

(function() {


  class MapComponent extends React.Component{


    constructor(props){
      super(props);
      var defaultView = {lat:32.779,lng:-96.802};
      var mapZoom = 10;
      this.state = {
        focus: defaultView,
        zoom: mapZoom
      }
    }

    componentWillMount(){
      console.log(AL.ControlObject.locationObjects);
      console.log(this.props.params);
      if(this.props.params.sId){
        console.log('registerCallback');
        AL.ControlObject.registerCallback(()=>{
          this.addLocationObj(AL.ControlObject.locationObjects,AL.ControlObject.sendData)});
      }
    }

    componentDidMount() {
      AL.ControlObject.getStructById(this.props.params.sId);

      console.log('this map', this.map);
      this.googleMap = new google.maps.Map(this.map, {
        center: this.state.focus,
        zoom: this.state.zoom
      });

    }

    addLocationObj(arr,obj){
      console.log('adding location',obj);
      arr.push(obj);
      console.log('locations,',arr, 'last',arr[arr.length-1]._id);
      this.geoCode(arr.pop().street);
    }

    setFocus(xy){
      this.setState({
        focus:{xy},
        zoom:2
      });
      console.log('set focus to,',this.state.focus);
    }

    geoCode(locId){
      var map = this.googleMap
      var address = locId;
      console.log(" address to geocoder", address);
      // address = address.street;
      var geoCoder = new google.maps.Geocoder();
      geoCoder.geocode( { 'address': address}, function(results, status) {
       if (status == 'OK') {
         var marker = new google.maps.Marker({
             map: this.googleMap,
             position: results[0].geometry.location
         });

         var xy = results[0].geometry.location;
         console.log('new focus @', xy);

         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
      });

      this.setFocus(xy);

    }

    //^^ Test Geocode

    render(){

      return (<div>Map Component
        <div>
          <div ref={(map) =>
            { this.map = map; }} style={{width: '100%', height: '400px'}}>
          </div>
        </div>
      </div>);
    }
  }

  AL.MapComponent = MapComponent;

}());
