var pilot = require('./fillforpilot');
var done =0;

var sendnames = function(todaysPilot,noOfPilots){
   
  setInterval(function () {
    var d = new Date();
    var prev= d; 
    if(d.getSeconds()==30 && done==0)
    {
      var i=0;
     for(i=0;i<noOfPilots;i++)
     {
        pilot.fill('nouse',todaysPilot[i][0],todaysPilot[i][1]);
        //console.log("username : "+todaysPilot[i][0]);
        //console.log("password : "+todaysPilot[i][1]);    
     }
     done=1;
    }
  },1 );
}

module.exports.sendnames = sendnames;