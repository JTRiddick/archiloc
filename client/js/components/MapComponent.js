if (window.AL === undefined){window.AL = {}; }

(() => {
  var mapData;
  window.AL.mapData = {
    locations:[],
    markers:[],
    defaultView: {lat:15,lng:-80},
    mapZoom: 10
  }
})();

(() => {


  class MapComponent extends React.Component{


    constructor(){
      super();

      this.state = {
        focus: AL.mapData.defaultView,
        zoom: AL.mapData.mapZoom
      }
      var locationToGeocoder;
      var geoCode;
    }

    componentWillMount(){

      if(this.props.params.sId){
        console.log('only,', this.props.params.sId);
      }
      AL.ControlObject.registerCallback(()=>this.locationToGeocoder(AL.ControlObject.sendData));
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

      AL.mapData.locations = AL.ControlObject.getAll();
      console.log(this.map,this.geocoder);
    }

    componentWillUnmount(){
      AL.ControlObject.resetControl();
    }


    //
    geoCode(itemId){
      //check for item id or obj
      console.log('geocoding',itemId);
      this.geocoder.geocode({'address':itemId.street},function handleResults(results,status){
        if (status === google.maps.GeocoderStatus.OK){

          var marker = new google.maps.Marker({
              position: (results[0].geometry.location),
              title:itemId.title
          });
          marker.setMap(this.map);
          this.map.setCenter(results[0].geometry.location);
        //  return;
        }
      }.bind(this))
    }

    locationToGeocoder(addresses){
      console.log('locationToGeocoder says this is',this);
      addresses.sheds.forEach(address => {
        if(AL.mapData.markers.indexOf(address)<0){
          this.geoCode(address);
        }
      })
    }

    //^^ Test Geocode

    render(){
      console.log('render state', this.state);
      var mapOptions = {
        focus: this.state.focus,
        zoom:this.state.zoom
      }
      this.map = (this.map,mapOptions);

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
