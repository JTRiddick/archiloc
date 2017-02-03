if (window.AL === undefined){window.AL = {}; }

(() => {
  var ControlObject;
  var sendData;

  window.AL.ControlObject = {
    mapMarkers:[],
    locationObjects:[],
    sendData: sendData,
    callbacks: [],
    registerCallback: function(cb){
      this.callbacks.push(cb);
    },
    callbacksEdit: function(){
      this.callbacks.forEach((cb) => {
        console.log("this.sendData",this.sendData);
        cb();
        console.log('callback');
      })
    },
    resetControl: function(){
      this.callbacks = [];
      this.sendData = {};
    },

    getAll:function(){
      console.log('gettin everything');
      //api get all
      $.ajax({
        url: '/api/sheds',
        method: 'GET',
        dataType: 'JSON'
      })
      .done((data)=> {
        console.log("done, recieved: \n ",data, "type of", typeof data);
        this.sendData = data;
        this.locationObjects = data;
        console.log('get done.');
        this.callbacksEdit();
        console.log('grabbd everything',data);
      })
      .fail(()=>{
        console.log('cant get');
      })
    },//end of get all

    getStructById: function(itemId){

      $.ajax({
        url:'/api/sheds/' + itemId,
        method:'GET',
        dataType:'JSON',
      })
      .done((data)=>{
        console.log("found ", data);
        this.sendData = data;
        this.callbacksEdit();
        console.log('control callbacks test, callbacks are done ',this.callbacks);
      })
      .fail((req,stat,err)=>{
        console.log('failed to get req,', req);
        this.sendData = (req,stat,err);
        this.callbacksEdit();
        //??
      })
    },
    deleteItem: function(itemId){

      $.ajax({
        url:'/api/sheds/' + itemId +"/delete",
        method: 'DELETE',
        dataType:'JSON'
      })
      .done((data) => {
        console.log('callbacksEdit',this.callbacksEdit);
        console.log('deleted, ',data);
        this.sendData = data;
        this.callbacksEdit();

      })
      .fail((req,stat,err) => {
        console.log('delete failure');
        this.sendData = (req,stat,err);
        this.callbacksEdit();
      });
    },//end of delete
    addItem: function(inputs){
      //test
      console.log("sending...", inputs.name, inputs.type);

      //api POST NEW
      $.ajax({
        url: '/api/sheds',
        method: 'POST',
        dataType: 'JSON',
        data:{
          title:inputs.title,
          type:inputs.type,
          year:inputs.year,
          arch:inputs.arch,
          street:inputs.street,
          city:inputs.city,
          country:inputs.country
        }

      })
        .fail((req,stat,error)=>{
          // window.alert('no');
          console.log('request unsucessful');
          console.log("req",req);
          console.log("stat",stat);
          console.log("err",error);
          this.sendData = (req,stat,error);
          this.callbacksEdit();
        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.sendData = data;
          this.callbacksEdit();

        })
      },//end of addItem
      editItem: function(itemId,inputs){

        $.ajax({
          url: '/api/sheds/' + itemId + '/edit',
          method:'PUT',
          dataType:'JSON',
          data:{
            title:inputs.title,
            type:inputs.type,
            year:inputs.year,
            arch:inputs.arch,
            street:inputs.street,
            city:inputs.city,
            country:inputs.country
          }
        })
        .fail((req,stat,error)=>{
          // window.alert('no');
          console.log('request unsucessful');
          console.log("req",req);
          console.log("stat",stat);
          console.log("err",error);
          this.sendData = (req,stat,err);
          this.callbacksEdit();
        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.sendData = data;
          this.callbacksEdit();

        })
      },//end of editor
      mapFilterResults: function(query,type){



      },//end of typefilter
      mapOneItem: function(itemId){
        // AL.ControlObject.registerCallback(()=>{
        //   console.log('geocoding');
        //   // this.geoCode(this.sendData);
        // });

        $.ajax({
          url:'/api/sheds/' + itemId + '/view-map',
          method:'GET',
          dataType:'JSON',
        })
        .done((data)=>{
          console.log("found ", data);
          ReactRouter.hashHistory.push('/map/view-one/'+ itemId);
          // this.sendData = data;
          // this.callbacksEdit();
        })
        .fail((req,stat,err)=>{
          console.log('failed to get req,', req);
          this.sendData = (req,stat,err);
          this.callbacksEdit();
          //??
        })

      },//end of map one view

      //end of geocode 1
      // locationToList: function(data){
      //   console.log('list/geo called',data);
      //   data.forEach(item =>{
      //     console.log('hey its,', item);
      //     AL.MapComponent.locationToGeocoder(item);
      //     this.locationObjects.push(item);
      //   })
      // }
    } //end of control object
  }
)();
