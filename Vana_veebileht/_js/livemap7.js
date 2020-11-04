//
function showBingMap(lat,lon,zoomx,pushpins,mapcontainer){
	Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', { callback: function () {
	map = new Microsoft.Maps.Map(document.getElementById(mapcontainer),
				 {credentials:"Akc3ga1mT4PNKTWoXk7HTYOb-FsJ5tNPhOTF2Y9iep_TLRz0lxcTk4XpS10GWlaz", 
				 showScalebar: true, 
				 showMapTypeSelector: true, 
				 enableSearchLogo: false,
				 theme: new Microsoft.Maps.Themes.BingTheme()}); 
	map.entities.clear(); 
	var LLA = new Array();
		for(var p=1;p<pushpins.length;p++){
			var pinLoc=new Microsoft.Maps.Location(pushpins[p][0],pushpins[p][1]);
			LLA.push(pinLoc);
			var pushPin=new Microsoft.Maps.Pushpin(pinLoc, {typeName: 'pinstyle', text : p.toString(), visible: true}); 
			map.entities.push(pushPin);
			map.entities.push(new Microsoft.Maps.Infobox(pinLoc, { title:pushpins[p][2], description: pushpins[p][3] +' '+pushpins[p][4]+'', pushpin: pushPin}));
		}
		var bestView = Microsoft.Maps.LocationRect.fromLocations(LLA);
		map.setView({ 
		mapTypeId: Microsoft.Maps.MapTypeId.automatic,
		bounds: bestView });
		
	}});
}