const socket = io();



var lat = 0;
var long = 0;
var a;
socket.on("lat", (arg) => {
    lat = arg;
    console.log(arg);
  });
  socket.on("long", (arg) => {
    long=(arg);
    console.log(arg);
  });

  socket.on("a", (arg) => {
    console.log("a");
    a = arg;
  });
  socket.on('message',function(message){
    console.log("Receive ESP data");
  })
