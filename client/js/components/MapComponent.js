if (window.AL === undefined){window.AL = {}; }

(() => {
  var mapData;
  window.AL.mapData = {
    locations:[],
    markers:[],
    defaultView: {lat:15,lng:-80},
    mapZoom: 14
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
        controlClass:'low inactive',
        mapClass:'center',
        showSite:null,
        findingOne:false
      }
      var locationToGeocoder;
      var geoCode;

    }



    componentWillMount(){
      if(this.props.params.sId){
        console.log('only,', this.props.params.sId);
        this.setState({
          findingOne:true
        })
        AL.ControlObject.registerCallback(()=>{
          AL.mapData.locations.push(AL.ControlObject.sendData);
        })
      }else{
        console.log('showing maximum stuff');
        console.log('fill mapdata locations list with',AL.ControlObject.sendData);
        AL.ControlObject.registerCallback(()=>
         AL.ControlObject.sendData.sheds.forEach(item => {
          AL.mapData.locations.push(item);
        }))
      }



      //moves control data to list
      AL.ControlObject.registerCallback(()=>this.locationToGeocoder(AL.mapData.locations));
      //registers callback to geocode (then locate and mark) points of interest
    }



    componentDidMount() {
      this.googleMap = new google.maps.Map(this.map, {
        center: this.state.focus,
        zoom: this.state.zoom
      });

      this.marker = new google.maps.Marker({
        lat: 30,
        lng: 30
      });

      this.geocoder = new google.maps.Geocoder();

      if(!this.state.findingOne){
        AL.ControlObject.getAll();
      }else{
        AL.ControlObject.getStructById(this.props.params.sId)
      }

      //sets mapdata locations and triggers callback to run geo+location
      console.log(this.map,this.geocoder);

    }

    componentWillUnmount(){
      AL.ControlObject.resetControl();
    }

    //

    geoCode(itemId,map){
      var handleResults;
      //check for item id or obj
      console.log('GEOCODE',itemId);
      this.geocoder.geocode({'address':itemId.street}, handleResults = (results,status)=>{
        if (status === google.maps.GeocoderStatus.OK){
          console.log('geo code this check',this.map);
          this.googleMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              position: (results[0].geometry.location),
              title:itemId.title
          });

          this.markMap(this.googleMap,marker,itemId);
          return;
        }
        return;
      })
    }

    locationToGeocoder(addresses){
      console.log('locationToGeocoder says this is',addresses);
        addresses.forEach(address => {
           if( AL.mapData.markers.indexOf(address)<0){
            this.geoCode(address,this.map);
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
      console.log(infowindow, "infowindow");
      //make infowindow



      //Check for service

     marker.addListener('click', () => {
       infowindow.open(this.map, marker);
       this.setState({
         showSite:item,
         infoClass:'aif',
         mapClass:'two-thirds-map'
       })
       mapRef.setZoom(18);
       mapRef.setCenter(marker.getPosition());
     });
     mapRef.addListener('click',()=>{
       infowindow.close(this.map,marker);
       this.setState({
         showSite:null,
         infoClass:'oof',
         mapClass:'center'
       })
       mapRef.setZoom(AL.mapData.mapZoom)
     });

     AL.mapData.markers.push(marker);


     if(this.state.findingOne ===true){
       console.log('and its..,', this.props.params.sId);

       mapRef.setCenter(marker.getPosition());
       infowindow.open(this.map,marker);
       this.setState({
         showSite:item,
         infoClass:'aif',
         mapClass:'two-thirds-map'
       })

     }
     return;
    }

    selectFocus(sId){
      console.log(AL.mapData.markers);

      //test^
    }

    render(){
      console.log('render state', this.state);

      var mapClass = "map-pane " + this.state.mapClass
      var infoClass = "info-pane " + this.state.infoClass;
      var controlClass = "control-pane-" + this.state.controlClass;

      var info = '';
      var controls = '';

      if(this.state.showSite !== null){
        info= <InfoComponent showSite={this.state.showSite}/>
      }



      return (<div id="map-component">

        <div className="component-inner">
          <div className={infoClass}>
          {info}
          </div>

          <div className={mapClass} ref={(map) =>
            { this.map = map; }} style={{height: '440px'}}>
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

      return (<div className="info-box-text">
        <ol>
         <li><h4>{this.state.info.title}</h4> </li>
         <li>{this.state.info.street}, {this.state.info.city},
            {this.state.info.country}, </li>
         <li className='info-type'>{this.state.info.type} </li>
         <li>{this.state.info.year} </li>
         <li>{this.state.info.arch} </li>

       </ol>
      </div>)
    }

  }

  AL.MapComponent = MapComponent;

})();
