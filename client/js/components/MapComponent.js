if (window.AL === undefined){window.AL = {}; }

(() => {
  var mapData;
  window.AL.mapData = {
    locations:[],
    markers:[],
    filter:'none',
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
        findingOne:false,
        tag:'none'
      }

    }

    componentWillMount(){
      AL.ControlObject.resetControl();
      console.log('map mounted with props',this.props);
      if(this.props.params.sId){
        //console.log('only,', this.props.params.sId);
        this.setState({
          findingOne:true
        })
        AL.ControlObject.registerCallback(()=>{
          AL.mapData.locations.push(AL.ControlObject.sendData);
        })
      }else{
        //console.log('showing maximum stuff');
        //console.log('fill mapdata locations list with',AL.ControlObject.sendData);
        AL.ControlObject.registerCallback(()=>
         AL.ControlObject.sendData.sites.forEach(item => {
          AL.mapData.locations.push(item);
        }))
      }
      //moves control data to list
      AL.ControlObject.registerCallback(()=>this.locationToGeocoder(AL.mapData.locations));
      //registers callback to geocode (then locate and mark) points of interest
    }



    componentDidMount() {
      //reset filter
      this.googleMap = new google.maps.Map(this.map, {
        center: this.state.focus,
        zoom: this.state.zoom
      });

      this.geocoder = new google.maps.Geocoder();

      if(!this.state.findingOne){
        AL.ControlObject.getAll();
      }else{
        AL.ControlObject.getStructById(this.props.params.sId)
      }

      //sets mapdata locations and triggers callback to run geo+location
      //console.log(this.map,this.geocoder);

    }

    componentWillUnmount(){
      console.log('main page unmounted');
      // AL.ControlObject.resetControl();
    }

    //defaults

    deselectSite(evt,ele){

      this.setState({
        showSite:null,
        infoClass:'oof',
        controlClass:'low inactive',
        mapClass:'center'
      })
     this.googleMap.setZoom(AL.mapData.mapZoom);
    }
    //master close

    locationToGeocoder(locations){
      console.log('location to geocoder',locations,'state',this.state.tag);
      var addresses;
      if(AL.mapData.filter == 'none'){
        addresses = locations;
        //console.log('locationToGeocoder says this is',addresses);
          addresses.forEach(address => {
             if( AL.mapData.markers.indexOf(address)<0){
              this.geoCode(address,this.map);
            }
          })
      }else{
        let addresses = locations;
        addresses.forEach(address =>{
          console.log('address',address,'includes',address.styles);
          if (address.styles.includes(AL.mapData.filter) && AL.mapData.markers.indexOf(address)<0){
            console.log('filter including', address);
            this.geoCode(address,this.map);
          }
        })
      }
    }

    geoCode(itemId,map){
      var handleResults;
      //check for item id or obj
      //console.log('GEOCODE',itemId);
      var address = itemId.street + " " + itemId.cityState + " " + itemId.country;
      this.geocoder.geocode({'address':address}, handleResults = (results,status)=>{
        if (status === google.maps.GeocoderStatus.OK){
          //console.log('geo code this check',this.map);
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
      //console.log(infowindow, "infowindow");
      //make infowindow



      //Check for service

     marker.addListener('click', () => {
       infowindow.open(this.map, marker);
       this.setState({
         showSite:item,
         infoClass:'aif',
         controlClass:'low',
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
         controlClass:'low inactive',
         mapClass:'center'
       })
       mapRef.setZoom(AL.mapData.mapZoom)
     });

     AL.mapData.markers.push(marker);


     if(this.state.findingOne ===true){
       //console.log('and its..,', this.props.params.sId);

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

    selectFilter(filter){

      this.deselectSite();
      AL.mapData.filter = filter;
      console.log('FILTER SET TO ',AL.mapData.filter);
      AL.mapData.markers.forEach(marker => {marker.setMap(null)})
      AL.mapData.markers = [];
      this.setState({
        tag:filter
      })
      console.log('resending to geocode with filter', filter, 'these',AL.mapData.markers,AL.mapData.locations);
      this.locationToGeocoder(AL.mapData.locations);

    }

    render(){
      console.log('render state', this.state);
      var mapClass = "map-pane " + this.state.mapClass
      var infoClass = "info-pane " + this.state.infoClass;
      var controlClass = "control-pane-" + this.state.controlClass;

      var info = '';
      var controls = '';

      if(this.state.showSite !== null){
        info= <InfoComponent showSite={this.state.showSite} infoboxFilter={(filter)=>{this.selectFilter(filter);}}/>
        controls = <MapControlComponent showSite={this.state.showSite}/>
      }



      return (<div id="map-component">

        <div className="component-inner">
          <div className={infoClass}>
            <div className = "close" onClick={(evt)=>{this.deselectSite(evt)}}>X</div>
          {info}
            <div className = "filter-controls">
              <div className = "filter-button reset" onClick={()=>{this.selectFilter('none')}}>
              <p>Reset Filter</p>
              </div>
            </div>
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
      var generateTags;

    }
    componentWillMount(){
      this.setState({
        info:this.props.showSite,
        tags:this.props.showSite.styles
      })

    }


    render(){
      //console.log("InfoComponent showing ", this.state.info,this.state.tags);

      return (<div className="info-box">

        <div className="info-box-text">
          <ol>
           <li><h4>{this.state.info.title}</h4> </li>
           <li>{this.state.info.street}, {this.state.info.cityState},
              {this.state.info.country}, </li>
           <li className='info-type'>{this.state.info.type} </li>
           <li>{this.state.info.year} </li>
           <li>{this.state.info.arch} </li>
         </ol>
        <div className="info-box-tags">
          <ul>
            {this.state.tags.map((tag,i) => {
              return <li key={i} onClick={(evt)=>{
                this.props.infoboxFilter(tag)
              }}>{tag}</li>
            })}
          </ul>
        </div></div>
      </div>)
    }

  }

  class MapControlComponent extends React.Component{

    componentWillMount(){
      if (this.props.showSite){
        this.setState({
          info:this.props.showSite
        })
      }

    }

    render(){
      //console.log('controlbox state: ',this.state,' img ',this.state.info.pic);
      return(<div className="controlbox-content">
         <div className="mapview-image">
           <img src={decodeURIComponent(this.state.info.pic)}/>
        </div>
        <div className="mapview-desc">
          <p>{this.state.info.description || "Stuff here"}</p>
        </div>
      </div>)
    }
  }

  AL.MapComponent = MapComponent;

})();
