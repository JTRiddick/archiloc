if (window.AL === undefined){window.AL = {}; }

(() => {
  var ControlObject;

  window.AL.ControlObject = {
    callbacks: [],
    postSuccess: [],
    postFail:[],
    registerCallback: function(cb){
      this.callbacks.push(cb);
    },
    registerFailCallback: function(cb){
      this.callbacks.push(cb);
    },
    reloadItems: function(){
      this.callbacks.forEach((cb) => {
        cb();
      })
    },
    callbacksFailure: function(){
      this.postFail.forEach((cb) => {
        cb();
      })
    },
    deleteItem: function(itemId,cb){

      $.ajax({
        url:'/api/sheds/' + itemId,
        method: 'DELETE',
        dataType:'JSON'
      })
      .done((data) => {
        console.log('callbacks',this.callbacks);
        console.log('deleted, ',data);

        this.reloadItems();
      });
    },
    addItem: function(inputs){
      //test
      console.log("sending...", inputs.name, inputs.type);

      //api POST
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
          this.callbacksFailure();
        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.reloadItems();

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
          this.callbacksFailure();
        })
        .done((data)=>{
          console.log('request successful');
          console.log('data: ',data);
          this.reloadItems();

        })
      },//end of editor
    } //end of control object
  }
)();
