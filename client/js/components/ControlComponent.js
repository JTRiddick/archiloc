if (window.AL === undefined){window.AL = {}; }

(() => {
  var ControlObject;
  var sendData;
  var emitter = new Emitter;

  window.AL.ControlObject = {
    mapMarkers:[],
    locationObjects:[],
    sendData: sendData,
    callbacks: [],
    emitter:emitter,
    resetControl: function(){

      this.callbacks = [];
      this.sendData = {};
      console.log('control data and callbacks cleared');
    },

    getAll:function(){

      if (this.sendData !== undefined) {
        this.locationObjects = this.sendData.sites;
        emitter.emit('loaded');
        return;
      }

      // console.log('gettin everything');
      //api get all
      $.ajax({
        url: '/api/sites',
        method: 'GET',
        dataType: 'JSON'
      })
      .done((data)=> {
        console.log("ajax get all done, recieved: \n ",data, "type of", typeof data);
        this.sendData = data;
        this.locationObjects = this.sendData.sites;
        emitter.emit('loaded');
        // console.log('grabbd everything',data);
      })
      .fail(()=>{
        console.log('cant get');
      })
    },//end of get all

    getStructById: function(itemId){

      $.ajax({
        url:'/api/sites/' + itemId,
        method:'GET',
        dataType:'JSON',
      })
      .done((data)=>{
        console.log("found ", data);
        this.sendData = data;
        emitter.emit('foundId');
        console.log('control callbacks test, callbacks are done ',this.callbacks);
      })
      .fail((req,stat,err)=>{
        console.log('failed to get req,', req);
        this.sendData = (req,stat,err);
        emitter.emit('foundId');
        //??
      })
    },
    deleteItem: function(itemId){

      $.ajax({
        url:'/api/sites/' + itemId +"/delete",
        method: 'DELETE',
        dataType:'JSON'
      })
      .done((data) => {
        console.log('callbacksEdit',this.callbacksEdit);
        console.log('deleted, ',data);
        this.sendData = data;
        console.log('when deleted, sendData is...',this.sendData);
        emitter.emit('deleted');

      })
      .fail((req,stat,err) => {
        console.log('delete failure');
        this.sendData = (req,stat,err);
        emitter.emit('deleted');
      });
    },//end of delete
    addItem: function(inputs){
      //test
      console.log("sending...", inputs);

      //api POST NEW
      $.ajax({
        url: '/api/sites',
        method: 'POST',
        dataType: 'JSON',
        data:{
          title:inputs.title,
          type:inputs.type,
          year:inputs.year,
          arch:inputs.arch,
          street:inputs.street,
          cityState:inputs.cityState,
          country:inputs.country,
          pic:inputs.pic,
          description:inputs.description
        }

      })
        .fail((req,stat,error)=>{
          // window.alert('no');
          console.log('request unsucessful');
          console.log("req",req);
          console.log("stat",stat);
          console.log("err",error);
          this.sendData = (req,stat,error);
          emitter.emit('saved');
        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.sendData = data;
          emitter.emit('saved');

        })
      },//end of addItem
      editItem: function(itemId,inputs){

        $.ajax({
          url: '/api/sites/' + itemId + '/edit',
          method:'PUT',
          dataType:'JSON',
          data:{
            title:inputs.title,
            type:inputs.type,
            year:inputs.year,
            arch:inputs.arch,
            street:inputs.street,
            cityState:inputs.cityState,
            country:inputs.country,
            pic:inputs.pic,
            description:inputs.description
          }
        })
        .fail((req,stat,error)=>{
          // window.alert('no');
          console.log('request unsucessful');
          console.log("req",req);
          console.log("stat",stat);
          console.log("err",error);
          this.sendData = (req,stat,err);
          emitter.emit('saved');
        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.sendData = data;
          emitter.emit('saved');

        })
      },//end of editor
      setStyleTags: function(itemId,tags){
        console.log('set tags of ',itemId,' to ',tags)
        $.ajax({
          url:'/api/sites/'+itemId+'/tag',
          method:'PUT',
          dataType:'JSON',
          data:{
            styles:tags
          }
        })
        .fail((req,stat,error)=>{
          // window.alert('no');
          console.log('request unsucessful');
          console.log("req",req);
          console.log("stat",stat);
          console.log("err",error);
          this.sendData = (req,stat,err);
          emitter.emit('saved');

        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.sendData = data;
          emitter.emit('saved');

        })
      },

      mapOneItem: function(itemId){

        $.ajax({
          url:'/api/sites/' + itemId + '/view-map',
          method:'GET',
          dataType:'JSON',
        })
        .done((data)=>{
          console.log("found ", data);
          ReactRouter.hashHistory.push('/map/view-one/'+ itemId);
          emitter.emit('mapOne');
        })
        .fail((req,stat,err)=>{
          console.log('failed to get req,', req);
          this.sendData = (req,stat,err);
          emitter.emit('mapOne');
          //??
        })

      },//end of map one view

      siteGeocode: function(itemRef){
        var address = itemRef.street + ' ' + itemRef.cityState + ' ' + itemRef.country;
        var latlng = [0,0];
        console.log('sending ',address,'to geocode');
        $.ajax({
          url:'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyA5B1QULYYb2uGrGReGKSqsuwxCgXL6pOQ',
          method:'GET',
          dataType:'JSON',
        })
        .done((results)=>{
          console.log('geocoded to',results);
          if(results.status === 'OK'){
            console.log('coordinates are', results.results[0].geometry.location);
            latlng = [results.results[0].geometry.location.lat,
            results.results[0].geometry.location.lng];
            console.log('coordinates are', latlng);
            console.log('for', itemRef);
            $.ajax({
              url:'/api/sites/'+itemRef.id+'/coordinates',
              method:'PUT',
              dataType:'JSON',
              data:{
                coordinate:latlng
              }
            })
            .fail((req,stat,error)=>{
              // window.alert('no');
              console.log('request unsucessful');
              console.log("req",req);
              console.log("stat",stat);
              console.log("err",error);

            })
            .done((data)=>{
              console.log('request successful');
              console.log('data: ',data);
              this.sendData = data;
              emitter.emit('saved');

            })

            emitter.emit('geocoded');
          }
          else{
            console.log('geocoder failure');
          }
        })

      }

    } //end of control object
  }
)();
