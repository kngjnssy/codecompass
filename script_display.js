// KINGA EVENTS
$.getJSON('https://www.googleapis.com/calendar/v3/calendars/kinga.janossy@code.berlin/events?key=AIzaSyBukHk_dPkq5FZB4nvTzRKxZ67QL2pP9e4', function(data){
// ID EVENTS
// code.berlin_pg1oevsslhon2p2fh2pemvrhms@group.calendar.google.com
// $.getJSON('https://www.googleapis.com/calendar/v3/calendars/code.berlin_pg1oevsslhon2p2fh2pemvrhms@group.calendar.google.com/events?key=AIzaSyBukHk_dPkq5FZB4nvTzRKxZ67QL2pP9e4', function(data){

var events = data.items;
var today = new Date("2019-11-25T14:00:00+02:00"); 
// var today = new Date();   
var current_date = today.toISOString();
// var test_date = '2017-10-17T14:00:00+02:00'
// console.log("events in this calendar: " + events.length)


var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

var dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function comparison(a, b) {

  const aa = a.start.dateTime;
  const bb = b.start.dateTime;
  let compare = 0;
  if (aa > bb) {
    compare = 1;
  } else if (aa < bb) {
    compare = -1;
  }
  return compare;
}


console.log(events)
let filteredEvents = [];
let filteredEventsPast = [];
if (events.length > 0) {
    var container = document.querySelector(".grid-container");
    var containerPast = document.querySelector(".grid-container-past");
    // container.innerHTML += `<h3>this is the quickstart, only my personal events <br></h3>`;
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      if(event.start){
        if (event.end.dateTime > current_date) {
          filteredEvents.push(event);
          }
        else {
          filteredEventsPast.push(event);
        }
      }
    }
    filteredEvents.sort(comparison)

// DISPLAY UPCOMING EVENTS    
for(let k = 0; k < 15; k++){
      let event = filteredEvents[k];
      if (event.start) {
          if (event.start.dateTime) {
            var when = new Date(event.start.dateTime)
            var whenEnds = new Date(event.end.dateTime)
            var date = when.getDate()
            if (date<10){
              date = "0" + date
            }
            var month = when.getMonth()
            for (var i=0; i <= 12; i++) {
              if (month == i){
                month = monthNames[i]
              } 
            }
            var day = when.getDay()
            for (var i=0; i < 7; i++) {
              if (day == i){
                day = dayNames[i]
              } 
          }
            var hour = when.getHours()
            if (hour<10){
              hour = "0" + hour
            }
            var minutes = when.getMinutes()
            if (minutes<10){
              minutes = "0" + minutes
            }
            
            var endHour = whenEnds.getHours()
            if (endHour<10){
              endHour = "0" + endHour
            }

            var endMinutes = whenEnds.getMinutes()
            if (endMinutes<10){
              endMinutes = "0" + endMinutes
            }

          } 

          else if (!when) {
            when = event.start.date;
          }}
          
          else {
            console.log("problem")
          }

          if(event.location) {
            var room = event.location;
            var room_info ="";
          } 

          else {
            var room_info ="";
            var room=""
          }

          if (room.includes("Amy")) {
            room = 'AFF'
          }
          else if (room.includes("Rock")) {
            room = 'ROCK'
          }

          else if (room.includes("Cinema")) {
            room = 'CINEMA'
          }

          else if (room.includes("kitchen")) {
            room = 'KITCHEN'
          }

          else if (room.includes("Caf")) {
            room = 'CAFE'
          }

          else if (room.includes("Lexis")) {
            room = 'LEXIS'
          }
          else if (room.includes("Jungle")) {
            room = 'JUNGLE'
          }
          else if (room.includes("New School Kitchen")) {
            room = 'NSKitchen'
          }
          else if (room.includes("Brunnen")) {
            room = 'Mein Haus am See'
          }

          else {
            room = 'SCISSORS'
            room_info = 'in front of'
          }

          var event_name = event.summary;
          
          var event_type = "";

          if (event_name.includes("[OS LU]")) {
            event_name = event_name.replace("[OS LU] " , "");
            event_type = "LEARNING UNIT"
          } 
          else if (event_name.includes("[OS Info Session]")) {
            event_name = event_name.replace("[OS Info Session]" , "");
            event_type = "INFO SESSION"
          } 
          else {
            event_type ="COMMUNITY EVENT"
          }
          // ['a', 'b', 'c'].includes('b')

          let rooms_left = ["ROCK", "PAPER", "ADA", "ZUSE", "WARP", "ECHO", "8-BIT"]
          
          
          let arrow_gif = ""
          if (rooms_left.includes(room)) {
            arrow_gif = "leftarrow.gif";
          }

          else if (room == 'SCISSORS'){
            arrow_gif = '40x40blacktile.bmp';

          }

          else if (room == 'Mein Haus am See'){
            arrow_gif = '40x40blacktile.bmp';

          }

          else if (room == 'CINEMA'){
            arrow_gif = 'uparrow.gif';

          }

          else if (room == 'LEXIS'){
            arrow_gif = 'downarrow.gif';

          }
          else if (room == 'CAFE'){
            arrow_gif = 'downarrow.gif';

          }

          else {
            arrow_gif = "rightarrow.gif";
          }
  
      if (!when) {
        when = event.start.date;
      } // to show full day events

      let dateandtime = '<div class="grid-container"><span class="hour">' 
      + hour + ":" + minutes + 
      // "-" + endHour + ":" + endMinutes +
      '<br><span class="date">'+ date + " " + month + '</span>' +
      // '<br><span class="day">'+ day + '</span>'+
      '</div>'
   
      let title = '<div class="grid-container"><span class="type">'
      + event_type + 
      '<br><span class="title">' + event_name + '</span></span>'

      let location = '<div class="grid-container"><span class="location">' + room_info +'<br>'
      + room + '</span></div>'

      let arrow = '<div class="grid-container"><span class="arrow"><br><img src="assets/'+ arrow_gif + '"> </span></div>'

      container.innerHTML += dateandtime
      container.innerHTML += title
      container.innerHTML += location
      container.innerHTML += arrow
    

    }
    console.log(filteredEventsPast)
// DISPLAY PAST EVENTS
    for(let k = 0; k < 10; k++){
      let event = filteredEventsPast[k];
      if (event.start.dateTime) {
        var when = new Date(event.start.dateTime)
        var whenEnds = new Date(event.end.dateTime)
        var date = when.getDate()
        if (date<10){
          date = "0" + date
        }
        var month = when.getMonth()
        for (var i=0; i <= 12; i++) {
          if (month == i){
            month = monthNames[i]
          } 
        }
        var day = when.getDay()
        for (var i=0; i < 7; i++) {
          if (day == i){
            day = dayNames[i]
          } 
       }
        var hour = when.getHours()
        if (hour<10){
          hour = "0" + hour
        }
        var minutes = when.getMinutes()
        if (minutes<10){
          minutes = "0" + minutes
        }
        
        var endHour = whenEnds.getHours()
        if (endHour<10){
          endHour = "0" + endHour
        }

        var endMinutes = whenEnds.getMinutes()
        if (endMinutes<10){
          endMinutes = "0" + endMinutes
        }

      }

      if (!when) {
        when = event.start.date;
      } // to show full day events

      if(event.location) {
        var room = event.location;
        var room_info ="";
      } 

      else {
        var room_info ="";
        var room=""
      }

      if (room.includes("Amy")) {
        room = 'AFF'
      }
      else if (room.includes("Rock")) {
        room = 'ROCK'
      }

      else if (room.includes("Cinema")) {
        room = 'CINEMA'
      }

      else if (room.includes("kitchen")) {
        room = 'KITCHEN'
      }

      else if (room.includes("Caf")) {
        room = 'CAFE'
      }

      else if (room.includes("Lexis")) {
        room = 'LEXIS'
      }
      else if (room.includes("Jungle")) {
        room = 'JUNGLE'
      }
      else if (room.includes("New School Kitchen")) {
        room = 'NSKitchen'
      }
      else if (room.includes("Brunnen")) {
        room = 'Mein Haus am See'
      }

      else {
        room = 'SCISSORS'
        room_info = 'in front of'
      }

      var event_name = event.summary;
      
      var event_type = "";

      if (event_name.includes("[OS LU]")) {
        event_name = event_name.replace("[OS LU] " , "");
        event_type = "LEARNING UNIT"
      } 
      else if (event_name.includes("[OS Info Session]")) {
        event_name = event_name.replace("[OS Info Session]" , "");
        event_type = "INFO SESSION"
      } 
      else {
        event_type ="COMMUNITY EVENT"
      }
      // ['a', 'b', 'c'].includes('b')

      let rooms_left = ["ROCK", "PAPER", "ADA", "ZUSE", "WARP", "ECHO", "8-BIT"]
      
      
      let arrow_gif = ""
      if (rooms_left.includes(room)) {
        arrow_gif = "leftarrow.gif";
      }

      else if (room == 'SCISSORS'){
        arrow_gif = '40x40blacktile.bmp';

      }

      else if (room == 'Mein Haus am See'){
        arrow_gif = '40x40blacktile.bmp';

      }

      else if (room == 'CINEMA'){
        arrow_gif = 'uparrow.gif';

      }

      else if (room == 'LEXIS'){
        arrow_gif = 'downarrow.gif';

      }
      else if (room == 'CAFE'){
        arrow_gif = 'downarrow.gif';

      }

      else {
        arrow_gif = "rightarrow.gif";
      }
 

      let dateandtime = '<div class="grid-container-past"><span class="hour">' 
      + hour + ":" + minutes + 
      // "-" + endHour + ":" + endMinutes +
      '<br><span class="date">'+ date + " " + month + '</span></div>'
   
      let title = '<div class="grid-container-past"><span class="type">'
      + event_type + 
      '<br><span class="title">' + event_name + '</span></span>'

      let location = '<div class="grid-container-past"><span class="location">' + room_info +'<br>'
      + room + '</span></div>'

      // let arrow = '<div class="grid-container-past"><span class="arrow"><br><img src="assets/'+ "WTF" + '"> </span></div>'

      containerPast.innerHTML += dateandtime
      containerPast.innerHTML += title
      containerPast.innerHTML += location
      // container.innerHTML += arrow
    

    }

}})
