// GOOGLE ANALYTICS
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63008523-2', 'auto');
ga('send', 'pageview');


if(window.location.href.indexOf("tablette.me") < 0){
   window.location.replace("http://tablette.me");
}

if(localStorage.wChange != "true"){
	$("#wallChange").attr("data-toggle","tooltip");
	$("#wallChange").attr("data-placement","left");
	$("#wallChange").attr("title","Wallpapers may be slow to load on first initialization");
}

function checkUser(){
	var username = localStorage.username;
	if (username == null || username == ""){
	  $("#nameModal1").modal("toggle");
	}
	name = username;
}

function checkWall(){
	if (localStorage.wallUrl != null && localStorage.wallUrl != ""){
	  localStorage.wallLink = localStorage.wallUrl;
	}
	else{
    localStorage.wallUrl= "https://source.unsplash.com/" + window.innerWidth.toString()
			+ "x" + window.innerHeight.toString() + "/?" + "mountains";
    localStorage.wallLink = localStorage.wallUrl;
	}
	$.backstretch(localStorage.wallLink,{speed: 700});
}

function checkPVisible(){
	if (localStorage.latCoor != null && typeof localStorage.latCoor != undefined){
  	latCoor = localStorage.latCoor;
  	lonCoor = localStorage.lonCoor;
  	$("#latitudeIn").val(latCoor);
  	$("#longitudeIn").val(lonCoor);
  }
	if (localStorage.pVisible == null || typeof localStorage.pVisible == undefined){
    localStorage.pVisible = "false";
    $("#prayerTimes").hide();
		$('#pVisCheck').prop('checked', false);
	}
	if (localStorage.pVisible == "true"){
		$("#prayerTimes").show();
		showPTimes();
		$('#pVisCheck').prop('checked', true);
	}
	else{
		localStorage.pVisible = "false";
		$("#prayerTimes").hide();
		$('#pVisCheck').prop('checked', false);
	}
	
}

var latCoor; 
var lonCoor;

// PRAYER CODE
function showPTimes(){
	
	prayTimes.setMethod('ISNA');
	var date = new Date(); // today
	var prayerTimes = prayTimes.getTimes(date, [latCoor, lonCoor], -5,"auto","12h");
	var prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Midnight'];

	var html = '';
	for(var i in prayers){
		html += "<span class='prayer'>"+prayers[i];
		html += ": " + prayerTimes[prayers[i].toLowerCase()]+"</span>";
	}
	$("#prayerTimes").html(html);
}

checkUser();
checkWall();
checkPVisible();

function printTime()
{
	var time = new Date();
	var hours = time.getHours();
	var mins = time.getMinutes();
	var seconds = time.getSeconds();
	var ampm = "pm";
	var secZ = "";
	var minZ = "";
	
	if (hours > 12){
	    hours -= 12;
	}
	else if (hours == 0){
	    hours = 12;
	}
	if (mins < 10){
	    minZ = "0"
	}
	if (seconds < 10){
	    secZ = "0"
	}
	if (time.getHours() < 12){
	    ampm = "am";
	    $("#greeting").html("Good Morning, " + name + ".");
	}
	if ((time.getHours() < 5) || (time.getHours() > 22)){
	    $("#greeting").html("Good Night, " + name + ".");
	}
	else if (time.getHours() > 17){
	    $("#greeting").html("Good Evening, " + name + ".");
	}
	else if (time.getHours() >= 12){
	    $("#greeting").html("Good Afternoon, " + name + ".");
	}
	$("#time").html(hours + ":" + minZ + mins + ":" + secZ + seconds + " " + ampm);
}
setInterval("printTime()",1000);

$(function (){
	$('[data-toggle="popover"]').popover()
	$('[data-toggle="tooltip"]').tooltip()
})


// SETTINGS
$("#inputNameSave1").click(function(){
    username = $("#inputName1").val();
    if (username != "" && username != null){
    	localStorage.username = username;
    }
    else{
        localStorage.username = "user";
    }
    name = username;
});

$("#inputNameSave2").click(function(){
    username = $("#inputName2").val();
    if (username != "" && username != null){
    	localStorage.username = username;
    }
    name = localStorage.username;
});

$("#wallUrlSave").click(
function(){
	var url = $("#wallUrl").val();
	localStorage.wallUrl = url;
	checkWall();
});

$("#wallRotate").click(
function(){
  var url = "https://source.unsplash.com/" + window.innerWidth.toString()
  	+ "x" + window.innerHeight.toString() + "/?" + $("#wallRotateUrl").val();
  // var url = "https://source.unsplash.com/featured/?" + $("#wallRotateUrl").val();
  localStorage.wallUrl = url;
  checkWall();
});

// Prayer Settings
$("#pVisCheck").change(function(){
	if($('#pVisCheck').prop('checked')){
		localStorage.pVisible = "true";
		showPTimes();
	}
	else{
		localStorage.pVisible = "false";
	}
	$("#prayerTimes").toggle();
});

$("#resetConfirm").click(function(){
	localStorage.clear();
	location.reload();
});

$("#calibrateLoc").click(function(){
	navigator.geolocation.getCurrentPosition(success, error, options);
});

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  // console.log('Your current position is:');
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
  $("#savedLocation").text("Current Saved Location:");
  localStorage.latCoor = `${crd.latitude}`;
  localStorage.lonCoor = `${crd.longitude}`;
  latCoor = localStorage.latCoor;
  lonCoor = localStorage.lonCoor;
  $("#latitudeIn").val(latCoor);
  $("#longitudeIn").val(lonCoor);
  showPTimes();
};

function error(err) {
  console.warn('ERROR(${err.code}): ${err.message}');
  $("#savedLocation").text("Current Saved Location: [Error Loading Data - Retry]");
};


$("#locationIn").click(function(){
	localStorage.latCoor = $("#latitudeIn").val();
  localStorage.lonCoor = $("#longitudeIn").val();
	latCoor = localStorage.latCoor;
  lonCoor = localStorage.lonCoor;
  showPTimes();
});

// SEARCH BUTTONS
$("#webB").click(function(){
	document.getElementById("searchForm").action = "https://www.google.com/search";
	$("#webB").css("font-weight","bold");
	$("#imgB").css("font-weight","normal");
	$("#vidB").css("font-weight","normal");
});

$("#imgB").click(function(){
	document.getElementById("searchForm").action = "http://images.google.com/images";
	$("#webB").css("font-weight","normal");
	$("#imgB").css("font-weight","bold");
	$("#vidB").css("font-weight","normal");
});

$("#vidB").click(function(){
	document.getElementById("searchForm").action = "https://www.youtube.com/results?search_query=";
	$("#webB").css("font-weight","normal");
	$("#imgB").css("font-weight","normal");
	$("#vidB").css("font-weight","bold");
});