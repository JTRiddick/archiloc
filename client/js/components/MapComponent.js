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
        zoom: AL.mapData.mapZoom,
        infoClass:'oof',
        controlClass:'inactive center',
        mapClass:'center',
        showSite:null
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

      // this.marker = new google.maps.Marker({
      //   lat: 0,
      //   lng: 0
      // });
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
          this.map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              position: (results[0].geometry.location),
              title:itemId.title
          });

          this.markMap(this.map,marker,itemId);

          return;
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

    markMap(mapRef,marker,item){

      marker.setMap(mapRef);


      var contentString = '<div id="content">'+
        '<div class="infobox-title">'+
        item.title + '</div>'+
        '<div class="infobox-arch">' + item.arch + '</div>'+
      '</div>';

      var infowindow = new google.maps.InfoWindow({
       content: contentString
      });


     marker.addListener('click', () => {
       infowindow.open(this.map, marker);
       this.setState({
         showSite:item,
         infoClass:'aif',
         mapClass:'right'
       })
       mapRef.setZoom(18);
       mapRef.setCenter(marker.getPosition());
     });
     this.map.addListener('click',()=>{
       infowindow.close(this.map,marker);
       this.setState({
         showSite:null,
         infoClass:'oof',
         mapClass:'center'
       })
     });

  

     AL.mapData.markers.push(marker);

     return;

    }

    render(){
      console.log('render state', this.state);

      var mapClass = "map-pane " + this.state.mapClass
      var infoClass = "info-pane " + this.state.infoClass;
      var controlClass = "control-pane " + this.state.controlClass;

      var info = '';
      var controls = '';

      if(this.state.showSite !== null){
        info= <InfoComponent showSite={this.state.showSite}/>
      }

      var mapOptions = {
        focus: this.state.focus,
        zoom:this.state.zoom
      }
      this.map = (this.map,mapOptions);
      //^ DOES NOT WORK

      return (<div id="map-component">Map Component
        <div className="component-inner">
          <div className={mapClass} ref={(map) =>
            { this.map = map; }} style={{width: '100%', height: '400px'}}>
          </div>
          <div className={infoClass}>
          {info}
          </div>
          <div className={controlClass}>
          {controls}
          </div>
        </div>
      </div>);
    }
  }

  class InfoComponent extends React.Component{

    constructor(){
      super();
    }
    componentWillMount(){
      this.setState({
        info:this.props.showSite
      })
    }

    render(){

      return (<div>
        <ol>
         <li>Name: {this.state.info.title} </li>
         <li>Year: {this.state.info.year} </li>
         <li>Arch: {this.state.info.arch} </li>
         <li>Type: {this.state.info.type} </li>
         <li>Street: {this.state.info.street} </li>
         <li>City: {this.state.info.city} </li>
         <li>Country: {this.state.info.country} </li>
       </ol>
      </div>)
    }

  }

  AL.MapComponent = MapComponent;

})();
