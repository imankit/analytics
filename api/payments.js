module.exports = function() {


    //Create Sale
    global.app.post('/:appId/sale',function(req,res){

      try{

    	  var data = req.body || {};
        var appId=req.params.appId;

        if(data.secureKey && global.keys.hostedSecureKey==data.secureKey){

          global.paymentsService.createSale(appId,data).then(function(respData) {
            if (!respData) {
              return res.status(400).send('Error : Something went wrong');
            }
            return res.status(200).json(respData);

          },function(error){
            console.log(error);
            return res.status(400).send(error);
          });

        }else{
          console.log("Unauthorized. Server is not recognized.");
          return res.status(400).send("Unauthorized. Server is not recognized.");
        }

      }catch(err){
        global.winston.log('error',{"error":String(err),"stack": new Error().stack}) ;
        res.status(500).send("Error");
      }

    });

     //Create Sale
    global.app.post('/:appId/thirdPartySale',function(req,res){

      try{

        var data = req.body || {};
        var appId=req.params.appId;

        if(data.secureKey && global.keys.hostedSecureKey===data.secureKey){

          global.paymentsService.createThirdPartySale(appId,data).then(function() {
            return res.status(200).json();
          },function(error){
            return res.status(400).send(error);
          });

        }else{
          return res.status(400).send("Unauthorized. Server is not recognized.");
        }

      }catch(err){
        global.winston.log('error',{"error":String(err),"stack": new Error().stack}) ;
        res.status(500).send("Error");
      }
    });


    //Cancel(stop recurring)
    global.app.post('/:appId/cancel',function(req,res){
      try{
        var data = req.body || {};
        var appId=req.params.appId;

        if(data.secureKey && global.keys.hostedSecureKey==data.secureKey){

          global.paymentsService.stopRecurring(data.secureKey,appId,data.userId).then(function(respData) {
            if (!respData) {
              return res.status(400).send('Error : No Document Found!');
            }
            return res.status(200).json(respData);

          },function(error){
            return res.status(400).send(error);
          });

        }else{
          return res.status(400).send("Unauthorized. Server is not recognized.");
        }
      }catch(err){
        global.winston.log('error',{"error":String(err),"stack": new Error().stack}) ;
        res.status(500).send("Error");
      }

    });

};
