if (window.AL === undefined){window.AL = {}; }

(() => {
  var ControlObject;

  window.AL.ControlObject = {
    callbacks: [],

    registerCallback: function(cb){
      this.callbacks.push(cb);

    },
    reloadItems: function(){
      this.callbacks.forEach((cb) => {
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
    }
  }





})();
