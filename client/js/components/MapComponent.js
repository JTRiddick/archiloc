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
      AL.mapData.markers = sessionStorage.getItem("markers") || [];

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
      sessionStorage.setItem('markers', AL.mapData.markers);
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

          AL.mapData.markers.push(marker);
          sessionStorage.setItem('markers', AL.mapData.markers);

          markMap(this.map,itemId);
          return;
        }
      }.bind(this))
    }

    markMap(mapRef,site){
      var stored = AL.mapData.markers;

      mapRef.setCenter(stored.results[0].geometry.location);
      var contentString = '<div id="content">'+
        '<div class="infobox-title">'+
        itemId.title + '</div>'+
        '<div class="infobox-arch">' + itemId.arch + '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
       content: contentString
      });

     marker.addListener('click', function() {
       infowindow.open(mapRef, marker);
     });
     this.map.addListener('click',()=>{
       infowindow.close(mapRef,marker);
     });
    }

    locationToGeocoder(addresses){
      console.log('locationToGeocoder says this is',this);
      addresses.sheds.forEach(address => {
        if(AL.mapData.markers.indexOf(address)<0){
          this.geoCode(address);
        }
        else{
          console.log('skipped geocoding,',address);
          this.markMap(this.map,address);
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

      return (<div id="map-component">Map Component
        <div>
          <div className="map-pane" ref={(map) =>
            { this.map = map; }} style={{width: '100%', height: '400px'}}>
          </div>
          <div className="info-pane">
          </div>
        </div>
      </div>);
    }
  }

  AL.MapComponent = MapComponent;

})();
