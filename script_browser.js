// KINGA EVENTS
$.getJSON('https://www.googleapis.com/calendar/v3/calendars/kinga.janossy@code.berlin/events?key=AIzaSyBukHk_dPkq5FZB4nvTzRKxZ67QL2pP9e4', function(data){

var events = data.items;
var today = new Date("2019-11-25T08:00:00+02:00"); 
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
if (events.length > 0) {
    // container.innerHTML += `<h3>this is the quickstart, only my personal events <br></h3>`;
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      if(event.start){
        if (event.start.dateTime > current_date) {
          filteredEvents.push(event) ;
          console.log(filteredEvents)
      }}
    }
    filteredEvents.sort(comparison)
    for(let k = 0; k < 5; k++){
      let event = filteredEvents[k];
      if (event.end.dateTime) {
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
        room = 'CAMPUS'
        room_info = 'somewhere on'
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

      let rooms_left = ["ROCK", "PAPER", "SCISSORS", "ADA", "ZUSE", "WARP", "ECHO", "8-BIT"]
      
      
      let arrow_gif = ""
      if (rooms_left.includes(room)) {
        arrow_gif = "leftarrow.gif";
      }

      else if (room == 'RIGHT HERE'){
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

      var mainContainer = document.querySelector(".main-container")
      // var eventContainer = document.querySelector(".grid-container-browser");
      var roomPaths = document.querySelector(".plan")
  


      let date_and_day = '<div class="grid-element date">' + date + " " + month + ", " + day + '</div>'
      let time = '<div class="grid-element time">' + hour + ":" + minutes + "- <br>" + endHour + ":" + endMinutes + '</div>'
      let type = '<div class="grid-element type">' + event_type + '</div>'
      let title = '<div class="grid-element title">' + event_name + '</div>'
      let location = '<div class="grid-element location">' + room_info + " " + room + '</div>'
      // let arrow = '<div class="grid-container-browser"><span class="arrow"><br><img src="assets/'+ arrow_gif + '"> </span></div>'

      let eventAll = '<div class="grid-container-browser grid--areas">' + date_and_day + time + type + title + location + '</div>'
      mainContainer.innerHTML += eventAll
    
      var test_date_2 = new Date("2020-02-03T11:00:00+01:00");  
      var test_date_2_String = test_date_2.toISOString();

      if (event.start.dateTime < test_date_2_String && event.end.dateTime > test_date_2_String)  {
        // roomPaths.innerHTML += '<text font-size="110px" fill="#FF7879"><textPath xlink:href=\'#jungle\'>' + event_name + '</textPath></text>'
        // roomPaths.innerHTML += '<text class="event-fit" font-size="60px" fill=#000 x=1000 y=2300>' + event_name + '</text>'

        roomPaths.innerHTML += '<switch><foreignObject x="980" y="2070" width="660" height="280" font-size="60"><p>'
          + event_name + '</p></foreignObject></switch>'
      }
      else {
        console.log(event.start.dateTime)
        console.log(event.end.dateTime)
        console.log(test_date_2_String)
        console.log('FAAAAAAIL')
      }


      // eventContainer.innerHTML += date_and_day
      // eventContainer.innerHTML += time
      // eventContainer.innerHTML += type
      // eventContainer.innerHTML += title
      // eventContainer.innerHTML += location
  
      // container.innerHTML += arrow
    

    }

}})
