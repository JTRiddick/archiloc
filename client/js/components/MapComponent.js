if (window.AL === undefined){window.AL = {}; }

(() => {
  var mapData;
  window.AL.mapData = {
    markers:[],
    locations:[]
  }
})();

(() => {


  class MapComponent extends React.Component{


    constructor(){
      super();
      var defaultView = {lat:15,lng:-80};
      var mapZoom = 10;
      this.state = {
        focus: defaultView,
        zoom: mapZoom
      }
    }

    componentWillMount(){
      AL.ControlObject.registerCallback(()=>{
        this.addLocationObj(AL.mapData.locations);
      })

      AL.ControlObject.registerCallback(()=>{
        AL.ControlObject.sendData.forEach(item =>{
          console.log('hey its,', item);
          AL.mapData.locations.push(item);
        })
      })

      // if(this.props.params.sId){
      //   console.log('only,', this.props.params.sId);
      // }

    }



    componentDidMount() {
      this.map = new google.maps.Map(this.map, {
        center: this.state.focus,
        zoom: this.state.zoom
      });
      this.marker = new google.maps.Marker({
        lat: 0,
        lng: 0
      });
      this.geocoder = new google.maps.Geocoder();

      AL.ControlObject.getAll();

      if(this.props.params.sId){
        // AL.ControlObject.getStructById(this.props.params.sId);
      }


    }

    componentWillUnmount(){
      AL.ControlObject.resetControl();
    }



    geoCode(address){

      if (!this.map){
        this.map = new google.maps.Map(this.map, {
          center: this.state.focus,
          zoom: this.state.zoom
        });
      }

      console.log('geocoding');
      this.geocoder.geocode({'address':address},function handleResults(results,status){
        if (status === google.maps.GeocoderStatus.OK){

          var marker = new google.maps.Marker({
              position: (results[0].geometry.location),
              title:"Hello World!"
          });
          marker.setMap(this.map);
          this.map.setCenter(results[0].geometry.location);
          this.setState({
             focus: results[0].geometry.location,
             isGeocodingError: false,
             zoom:1
          });
         return;
        }
      }.bind(this))
    }

    addLocationObj(obj){
      var arr = AL.ControlObject.locationObjects;
      console.log('adding location',obj);
      arr.push(obj);

      arr.forEach(obj =>{
        let address = obj.street + " " + obj.city + " " + obj.country;

        this.geoCode(address);
      })

    }
    //


    //^^ Test Geocode

    render(){
      console.log('render state', this.state);
      var mapOptions = {
        focus: this.state.focus,
        zoom:this.state.zoom
      }
      this.map =(this.map,mapOptions);

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

})();
