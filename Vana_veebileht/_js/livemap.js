// JS functsioonid EOLi kaardirakenduse jaoks
// kodeeris: IT: Tarmo Klaar (www.tak-soft.com), 2008-2010
// kasutatud materjale:
// * punkti märkimine *
// http://social.msdn.microsoft.com/Forums/en-US/vemapcontroldev/thread/1959c0af-dce7-426c-b849-148834f1c079/
// http://social.msdn.microsoft.com/Forums/en-US/vemapcontroldev/thread/6af26a9f-90bd-42e7-b7af-f71a612d8fdb/
// * pindala arvutamine *
// http://social.msdn.microsoft.com/Forums/en-US/vemapcontroldev/thread/645e1e76-0fe8-442a-a854-9399b14b8a7f/

  var map = null;
  var alapunktid = new Array();
  var myShapeLayer = new VEShapeLayer();
  var myRouteLayer = new VEShapeLayer();
  var asukohtpunkt = new VELatLong();
  var sign = new VELatLong();
  var routeOptions = new VERouteOptions();
  var map_tekst = '';
  
  var startPoint = new VELatLong();
  var endPoint = new VELatLong();
  var setStart = false;
  var setEnd = false;
	  
//////////PINDALA arvutamine///////////
// anticipates two 3-element arrays representing 3d vectors, returns a 3-element array representing their cross-product   
function crossProduct(a, b) {   
  return [(a[1] * b[2]) - (a[2] * b[1]),   
  (a[2] * b[0]) - (a[0] * b[2]),   
  (a[0] * b[1]) - (a[1] * b[0])];   
  }   
     
  // anticipates two 3-element arrays, returns scalar value   
function dotProduct(a, b) {   
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);   
  }   
  
function spherePointAngle(A, B, C) { // returns angle at B   
  return Math.atan2(dotProduct(crossProduct(C, B), A), dotProduct(crossProduct(B, A), crossProduct(B, C)));   
}   
     
// returns 3-element array representing cartesian location of a point given by a latlng object   
function cartesianCoordinates(latlng) {   
  var latRadians = latlng.Latitude* (Math.PI/180);   
  var lngRadians = latlng.Longitude*(Math.PI/180);   
  var x = Math.cos(latRadians) * Math.sin(lngRadians);   
  var y = Math.cos(latRadians) * Math.cos(lngRadians);   
  var z = Math.sin(latRadians);   
  return [x, y, z];   
}   
  
 // Calculate area inside of polygon   
function polylineArea(latlngs) {   
  var earthRadius = 6378137; // in metres   
// var earthRadius = 3963.189; // in miles   
// var earthRadius = 20925637.92; // in feet   
  var id, sum = 0, pointCount = latlngs.length, cartesians = [];   
  if (pointCount < 3) return 0;   
  
  for (id in latlngs) {   
  cartesians[id] = cartesianCoordinates(latlngs[id]);   
  }   
  
// pad out with the first two elements   
cartesians.push(cartesians[0]);   
cartesians.push(cartesians[1]);   
  
for(id = 0; id < pointCount; id++) {   
  var A = cartesians[id];   
  var B = cartesians[id + 1];   
  var C = cartesians[id + 2];   
  sum = sum + spherePointAngle(A, B, C);   
}   
     
  var alpha = Math.abs(sum - (pointCount - 2) * Math.PI);   
  alpha = alpha - 2 * Math.PI * Math.floor(alpha / (2 * Math.PI));   
  alpha = Math.min(alpha, 4 * Math.PI - alpha);   
  
return Math.round(alpha * Math.pow(earthRadius, 2));   
}   
//////////////////////////////////////	  
	  
	  
	  function getMapCenterPoint()
	  {
		var Xpoint = map.GetCenter();
		var asukoht = document.getElementById("koht");	
		asukoht.value=Xpoint;
	  }	  

      function GetMap()
      {
        map = new VEMap('SHSKaart');
		 // EST keskel ~58.5970, 24.9280
        map.LoadMap(new VELatLong(asukohtpunkt.Latitude, asukohtpunkt.Longitude, 0, VEAltitudeMode.RelativeToGround), 8, VEMapStyle.Road , false, VEMapMode.Mode2D, false, 5);
		map.SetScaleBarDistanceUnit(VEDistanceUnit.Kilometers);
		 // piiride layer
		map.AddShapeLayer(myShapeLayer);
		map.AttachEvent("onclick", onMapClick);
		// teekonnad
		map.AddShapeLayer(myRouteLayer);
        
        routeOptions.DistanceUnit = VERouteDistanceUnit.Kilometer;		
		routeOptions.RouteCallback = onGotRoute;
		myShapeLayer.DeleteAllShapes();
		if (asukohtpunkt.Latitude!=null && asukohtpunkt.Latitude!=0) {
			joonistaPunkt(asukohtpunkt);
		}
		if (sign.Latitude!=null && sign.Latitude!=0) {
			joonistaSignPunkt(sign);
		}		
		// kui kaasa pandud ala
		if (alapunktid.length>0) {
			joonistaAla(true);
		}		
		
      }
	  
	  function joonistaAla(clear) {
			// tabel.value=alapunktid;
			if (clear==true) {
				myShapeLayer.DeleteAllShapes();
			}
			var tabel = document.getElementById("p");
			var pindala = document.getElementById("ala");
			var asukoht = document.getElementById("koht");			
			if(alapunktid.length>2) {
				var uusAla= new VEShape(VEShapeType.Polygon, alapunktid);
				myShapeLayer.AddShape(uusAla);	
				pindala.value=polylineArea(alapunktid);
				if  (pindala.value>1999999999) {alert("Pindala arvutamise viga, kustuta viimane nurgapunkt ja proovi uuesti");}
				asukoht.value=uusAla.GetIconAnchor();	
			} else {
				pindala.value='0';
				asukoht.value='0';
			}
			tabel.value = alapunktid;
	  }
	  
	  function joonistaPunkt(koordinaat){
			//myShapeLayer.DeleteAllShapes();
		  	var pin = new VEShape(VEShapeType.Pushpin, koordinaat);
			pin.SetCustomIcon(ve_location_icon);
			pin.SetTitle(map_tekst);
			pin.SetDescription("Asukoht WGS(lat,lon):<br />" + koordinaat);
			myShapeLayer.AddShape(pin);	
	  }
	  
	  function joonistaSignPunkt(koordinaat){
			//myShapeLayer.DeleteAllShapes();
		  	var pin = new VEShape(VEShapeType.Pushpin, koordinaat);
			pin.SetCustomIcon(ve_sign_icon);
			pin.SetTitle(map_tekst);
			pin.SetDescription("TÃ¤histus WGS(lat,lon):<br />" + koordinaat);
			myShapeLayer.AddShape(pin);	
	  }	  
	  
	  function joonistaStart(koordinaat){
			startPoint = koordinaat;
			myRouteLayer.DeleteAllShapes();
		  	var pin = new VEShape(VEShapeType.Pushpin, koordinaat);
			pin.SetCustomIcon(ve_start_icon);
			pin.SetTitle("Stardi koordinaadid");
			pin.SetDescription("Asukoht WGS(lat,lon):<br />" + koordinaat);
			myRouteLayer.AddShape(pin);	
	  }	  
	  
	  function joonistaLopp(koordinaat){
		    endPoint = koordinaat;
			
		  	var pin = new VEShape(VEShapeType.Pushpin, koordinaat);
		//	pin.SetCustomIcon(rist_icon_url);
			pin.SetTitle("Sihtpunkti koordinaadid");
			pin.SetDescription("Asukoht WGS(lat,lon):<br />" + koordinaat);
			myRouteLayer.AddShape(pin);	
			var asukohtE = document.getElementById("end_pos_id");	
			asukohtE.value=koordinaat;
	  }	  
	
	  function onMapClick(e) {   
		if(e.rightMouseButton)
		{
			var loc = map.PixelToLatLong(new VEPixel(e.mapX, e.mapY)); 
			joonistaStart(loc);
		}
		if (e.leftMouseButton) {
			
		}
	  }
	  
	  function delAllPoints (){
		if(alapunktid.length>0) {
			alapunktid.length=0;
		}
		joonistaAla(true);
	  }
	  
	  function delLastPoint (){
		if(alapunktid.length>0) {  
			alapunktid.pop();
			joonistaAla(true);
		}
	  }
	  
	  function hideInfo(id){
		if (document.getElementById){ 
			obj = document.getElementById(id); 
			if (obj.style.display == "none"){ 
				obj.style.display = ""; 
			} else { 
				obj.style.display = "none"; 
			}	 
		} 	  
	  }
	  
	  function salvesta(){
		  // alert('Ei ole veel andmebaasiga seotud!');
		if(document.getElementById("koht")) {
			var asukoht = document.getElementById("koht");
			if(asukoht.value!="") {
				opener.document.vorm.wgs_lat_lon.value=asukoht.value;
			}
		 }		  
		self.close();   
		return false;		  
	  }
	  
	  function CheckMap(){
		var mapDB=document.getElementById("id"); 
		if (mapDB.value!=""){
			GetMap();
		}
	  }
	  // Route planning
	  
	  function setStartPoint() {
		  setStart = true;
		  setEnd = false;
	  }
	  
	  function setEndPoint() {
		  setStart = false;
		  setEnd = true;
	  }
	  
	  
	  function getRouteFrom() {
	  if (asukohtpunkt.Latitude!=null && asukohtpunkt.Latitude!=0 && startPoint.Latitude!=null && startPoint.Latitude!=0) {
			if (sign.Latitude!=null && sign.Latitude!=0) {
				map.GetDirections([startPoint, sign, asukohtpunkt], routeOptions);
			} else {
				map.GetDirections([startPoint, asukohtpunkt], routeOptions);
			}
		  } else {
			  alert('Puuduv lähte- või sihtpunkt.');
		  }
	  }
	  
	  function deleteRoute(){            
		try            
		{                
			map.DeleteRoute();            
		}            
		catch (err)  {                
			alert(err.message);            
		}         
	  }
	  
	 function onGotRoute(route)
	 {
	   // Unroll route
	   var legs     = route.RouteLegs;
	   var turns    = "<b>Teekonna pikkus: " + route.Distance.toFixed(1) + " km</b><br />";
	   var numTurns = 0;
	   var leg      = null;

	   // Get intermediate legs
		for(var i = 0; i < legs.length; i++)
		{
		   // Get this leg so we don't have to derefernce multiple times
		   leg = legs[i];  // Leg is a VERouteLeg object
			  
		   // Unroll each intermediate leg
		   var turn = null;  // The itinerary leg
			  
		   for(var j = 0; j < leg.Itinerary.Items.length; j ++)
		   {
			  turn = leg.Itinerary.Items[j];  // turn is a VERouteItineraryItem object
			  numTurns++;
			  turns += numTurns + "." + turn.Text + " (" + turn.Distance.toFixed(1) + " km) <br />";
		   }
		}
		var rInfo = document.getElementById("routeInfoId");
		rInfo.innerHTML=turns;			
		//alert(turns);
	 }	  

