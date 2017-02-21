(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-63008523-2', 'auto');
ga('send', 'pageview');


if(window.location.href.indexOf("tablette.me") < 0)
{
   window.location.replace("http://tablette.me");
}

//var wallpaperList = ["cubes.jpg", "nebula.jpg", "beach.jpg", "forest.jpg", "ltp.jpg", "wolf.jpg", "mugs.jpg", "alley.jpg", "sunset.jpg", "mountains.jpg", "mountains2.jpg", "mountains3.jpg", "stars.jpg", "sunset2.jpg", "aurora.jpg", "temple.jpg"];

if(localStorage.wChange != "true")
{
	$("#wallChange").attr("data-toggle","tooltip");
	$("#wallChange").attr("data-placement","left");
	$("#wallChange").attr("title","Wallpapers may be slow to load on first initialization");
}

function checkUser()
{
	var username = localStorage.username;
	if (username == null || username == "")
	{
	    $("#nameModal1").modal("toggle");
	}
	name = username;
}

function checkWall()
{
	// var wallpaper = localStorage.wallpaper;
	// if (wallpaper == null || wallpaper == "")
	// {
 //        var randNum = Math.floor(Math.random()*wallpaperList.length);
 //        localStorage.wallpaper = randNum.toString();
	// }
	// wallNum = Number(localStorage.wallpaper);
	// localStorage.wallLink = "wallpapers/" + wallpaperList[wallNum];
	if (localStorage.wallUrl != null && localStorage.wallUrl != "")
	{
	    localStorage.wallLink = localStorage.wallUrl;
	}
    else{
        localStorage.wallUrl= "https://source.unsplash.com/user/saqif/likes";
        localStorage.wallLink = localStorage.wallUrl;
    }
    $.backstretch(localStorage.wallLink,{speed: 700});
}

checkUser();
checkWall();

function printTime()
{
	var time = new Date();
	var hours = time.getHours();
	var mins = time.getMinutes();
	var seconds = time.getSeconds();
	var ampm = "pm";
	var secZ = "";
	var minZ = "";
	
	if (hours > 12)
	{
	    hours -= 12;
	}
	else if (hours == 0)
	{
	    hours = 12;
	}
	if (mins < 10)
	{
	    minZ = "0"
	}
	if (seconds < 10)
	{
	    secZ = "0"
	}
	
	if (time.getHours() < 12)
	{
	    ampm = "am";
	    $("#greeting").html("Good Morning, " + name + ".");
	}
	if ((time.getHours() < 5) || (time.getHours() > 22))
	{
	    $("#greeting").html("Good Night, " + name + ".");
	}
	else if (time.getHours() > 17)
	{
	    $("#greeting").html("Good Evening, " + name + ".");
	}
	else if (time.getHours() >= 12)
	{
	    $("#greeting").html("Good Afternoon, " + name + ".");
	}
	$("#time").html(hours + ":" + minZ + mins + ":" + secZ + seconds + " " + ampm);
}
setInterval("printTime()",1000);

$(function ()
{
$('[data-toggle="popover"]').popover()
$('[data-toggle="tooltip"]').tooltip()
})

$("#inputNameSave1").click(
function(){
    username = $("#inputName1").val();
    if (username != "" && username != null)
    {
    localStorage.username = username;
    }
    else
    {
        localStorage.username = "user";
    }
    name = username;
});

$("#inputNameSave2").click(
function(){
    username = $("#inputName2").val();
    if (username != "" && username != null)
    {
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

// $("#wallChange").click(
// function(){
//     localStorage.wChange = "true";
// 	wallNum++;
// 	if (wallNum >= wallpaperList.length)
// 	{
   //  wallNum = 0;
// 	}
// 	localStorage.wallpaper = wallNum.toString();
// 	localStorage.wallUrl = "";
// 	checkWall();
// });

$("#wallRotate").click(
function(){
  var url = "https://source.unsplash.com/" + window.innerWidth.toString() + "x" + window.innerHeight.toString() + "/?" + $("#wallRotateUrl").val();
  // var url = "https://source.unsplash.com/featured/?" + $("#wallRotateUrl").val();
  localStorage.wallUrl = url;
  checkWall();
});

$("#resetConfirm").click(
function(){
	localStorage.clear();
	location.reload();
})

$("#webB").click(
function(){
	document.getElementById("searchForm").action = "https://www.google.com/search";
	$("#webB").css("font-weight","bold");
	$("#imgB").css("font-weight","normal");
	$("#vidB").css("font-weight","normal");
});

$("#imgB").click(
function(){
	document.getElementById("searchForm").action = "http://images.google.com/images";
	$("#webB").css("font-weight","normal");
	$("#imgB").css("font-weight","bold");
	$("#vidB").css("font-weight","normal");
});

$("#vidB").click(
function(){
	document.getElementById("searchForm").action = "https://www.youtube.com/results?search_query=";
	$("#webB").css("font-weight","normal");
	$("#imgB").css("font-weight","normal");
	$("#vidB").css("font-weight","bold");
});