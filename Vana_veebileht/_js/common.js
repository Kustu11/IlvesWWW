function openEditWindow(url){
  lookupwindow = window.open(url,'Sisu','resizable=yes,width=750,height=520,scrollbars=yes');
  lookupwindow.focus();
}
function openDirWindow(url){
  lookupwindow = window.open(url,'Dir','resizable=yes,width=400,height=450,scrollbars=yes');
  lookupwindow.focus();
}
function openPhotoWindow(url){
  lookupwindow = window.open(url,'Photo','resizable=yes,width=150,height=150,scrollbars=no');
  lookupwindow.focus();
}
function openKaartWindow(url){
  lookupwindow = window.open(url,'Kaart','resizable=no,width=640,height=640,scrollbars=yes');
  lookupwindow.focus();
}
function kasKustutame(){
	return confirm('Kas soovid kustutada?');
}
function kysimus(ktekst){
	return confirm(ktekst);
}
function loadPage(pform){	
	pform.submit();
	return true;
}
function selectItem(pform){
 var menuId=pform.lMenus.selectedIndex;
 pform.selectedMenu.value=menuId;
 var menuItem=pform.lMenus.options[menuId].text;
 var pos=menuItem.indexOf('=');
 if (pos>-1) {
		 pform.nMenuName.value=menuItem.substring(0,pos);
		 var menuDir=menuItem.substring(pos+1);
		 var leitud=false;
		// otisme �ige lehe ka valikust ja kui ei leia siis alert
		 for(i=0;i<pform.sDir.length;i++) {
			if (pform.sDir.options[i].text==menuDir) {
				 leitud=true;
				 pform.sDir.selectedIndex=i;
			}
		 }
		if (leitud==false){
			 alert('Kataloogi:'+menuDir+' ei leinud kataloogi nimekirjas!');
		}
	}
}
function saveBack(pform){
 	// asendame listis uute vrtustega!
	var menuId=pform.selectedMenu.value;
	if (menuId!='' && pform.nMenuName.value!='') {
		 pform.lMenus.options[menuId].text=pform.nMenuName.value+'='+pform.sDir.options[pform.sDir.selectedIndex].text;
	}
}
function addNew(pform){
	if (confirm("Kas soovid lisada uut menüü elementi?")){
	var menux=document.createElement('option');

	menux.text='UUS=index.php';
	try
	{
		pform.lMenus.add(menux,null); // standards compliant
	}
	catch(ex)
	{
		pform.lMenus.add(menux); // IE only
	}
	}
	pform.lMenus.selectedIndex=pform.lMenus.length-1;
	selectItem(pform);
}
function deleteMenu(pform){
	if (confirm("Kas soovid kustutada lehe linki menüüst? Kataloog materjalidega jääb alles.")){
			 var menuId=pform.lMenus.selectedIndex;
			 if (menuId>-1) {
			 pform.lMenus.remove(menuId);
			 }
	}
}
function moveDown(pform){
   var menuId=pform.lMenus.selectedIndex;
	 if (menuId<pform.lMenus.length-1) {
			var tmp=pform.lMenus.options[menuId+1].text;
			pform.lMenus.options[menuId+1].text=pform.lMenus.options[menuId].text;
			pform.lMenus.options[menuId].text=tmp;
			pform.lMenus.selectedIndex=menuId+1;
	 }
}
function moveUp(pform){
var menuId=pform.lMenus.selectedIndex;
 if (menuId>0) {
		var tmp=pform.lMenus.options[menuId-1].text;
		pform.lMenus.options[menuId-1].text=pform.lMenus.options[menuId].text;
		pform.lMenus.options[menuId].text=tmp;
		pform.lMenus.selectedIndex=menuId-1;
 }
}
function checkBadChar(InString){
 if(InString.length==0) return (false);
 var RefString=";>|*</%¤#'";
 for (Count=0; Count < InString.length; Count++)  {
		 TempChar= InString.substring (Count, Count+1);
		 if (RefString.indexOf (TempChar, 0)!=-1) { 
				alert('Kasutad mitte sobilikke märke '+RefString+'!');
				return (false);
			}
	}
	return (true);
}
function cpyVlsTmp(pform){
	var tmp="";
	for(i=0; i<pform.lMenus.length; i++){
		tmp=tmp+pform.lMenus.options[i].text+'!';
	}
	pform.xMenus.value=tmp;
}
function copySortOrder(pform){
    var tmp="";
	for(i=0; i<pform.lMenus.length; i++){
	 	var men=pform.lMenus.options[i].text;
	 	
	 	tmp=tmp+men.substring(men.indexOf('::')+2)+',';
  	}
	pform.complist.value=tmp;
}
function checkNewUrl(InString){
	if(InString.length==0) return (false);
	var RefString="abcdefghijklmnopqrstuv0123456789_";
	for (Count=0; Count < InString.length; Count++)  {
		TempChar= InString.substring (Count, Count+1);
		if (RefString.indexOf (TempChar, 0)==-1) { 
			alert('Kasutad mitte sobilikke tähti!');
			return (false);
		}
	}
	return (true);	
}
function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        cursor.x = e.clientX + 
            (document.documentElement.scrollLeft || 
            document.body.scrollLeft) - 
            document.documentElement.clientLeft;
        cursor.y = e.clientY + 
            (document.documentElement.scrollTop || 
            document.body.scrollTop) - 
            document.documentElement.clientTop;
    }
    return cursor;
}
function show_popup( tekst, e ){
	var ie=document.all&&document.getElementById
	if (ie) {
	var p=window.createPopup();
	var pbody=p.document.body;
	pbody.style.backgroundColor="#FFFFE0";
	pbody.style.border	="solid black 1px";
	pbody.style.font	="12px Arial;";
	var ecursor = {x:0, y:0};
	ecursor = getPosition(e);
	pbody.innerHTML=tekst;
	p.show(ecursor.x, ecursor.y, 200, 75, document.body);
	} else {
		alert(tekst);
	}
}
function show_popupPhoto( tekst, e ){
 	var ie=document.all&&document.getElementById
	if (ie) {
	var p=window.createPopup();
	var pbody=p.document.body;
	pbody.style.backgroundColor="#FFFFE0";
	pbody.style.border	="solid black 1px";
	pbody.style.font	="12px Arial;";
	var ecursor = {x:0, y:0};
	ecursor = getPosition(e);
	pbody.innerHTML='<div align="center"><img src="'+tekst+'"></div>';
	p.show(ecursor.x, ecursor.y, 151, 151, document.body);
	} else {
		openPhotoWindow(tekst);
	}
}
function loadModalW( url ){
	TINY.box.show({iframe:url,width:575,height:550});
	if (1==2){
	if (window.showModelessDialog) {
		window.showModelessDialog(url,"","dialogWidth:650px;dialogHeight:500px;edge:raised;help:no;status:no;");
	} else {
		openKaartWindow(url);
	}}
}
function mask(str,textbox,loc,delim){
var locs = loc.split(',');
for (var i = 0; i <= locs.length; i++){
	for (var k = 0; k <= str.length; k++){
	 if (k == locs[i]){
	  if (str.substring(k, k+1) != delim){
	   if (event.keyCode != 8){ //backspace
	    str = str.substring(0,k) + delim + str.substring(k,str.length);
       }
	  }
	 }
	}
 }
textbox.value = str
}
function bgChange(element, bg){
	element.style.background=bg
}
function changeVisible(elem_id){
	if (document.getElementById(elem_id).style.display=='none') {document.getElementById(elem_id).style.display='block';} else {document.getElementById(elem_id).style.display='none';}
}
function getUrlParam( paramName ) {
    var reParam = new RegExp( '(?:[\?&]|&)' + paramName + '=([^&]+)', 'i' ) ;
    var match = window.location.search.match(reParam) ;
    return ( match && match.length > 1 ) ? match[ 1 ] : null ;
}
function selectFile(url,elementId){
	if (elementId==''){
		var funcNum = getUrlParam( 'CKEditorFuncNum' );
		window.opener.CKEDITOR.tools.callFunction( funcNum, url);
		window.top.close();
	} else {
		opener.document.getElementById(elementId).value=url;
		window.top.close();
		window.top.opener.focus();
	}
}
function selectMap(){
	
	fileUrl="";
	if (document.getElementById("wgs_lat_lon").value!=""){
	 fileUrl=document.getElementById("wgs_lat_lon").value;
	} 
	fileUrl=fileUrl+"|";
	fileUrl=fileUrl+"|";
	fileUrl=fileUrl+"|"+document.getElementById("tekst").value;
	if (document.getElementById("sign_lat_lon").value!=""){
	 fileUrl=fileUrl+"|"+document.getElementById("sign_lat_lon").value;
	} 	
	fileUrl="JavaScript:openKaartWindow(\'"+document.getElementById("urldir").value+"cmsmap.php?maploc="+fileUrl+"\');";
	selectFile(fileUrl,'');
}
function addQR(){
	fileUrl=document.getElementById("qrurl").value;
	selectFile('http://chart.apis.google.com/chart?cht=qr&chs=80x80&chld=L&choe=UTF-8&chl='+fileUrl,'');
}
var isMuudetud = false;
function checkForClose()
{
	if (isMuudetud && 1>2) {
		return "Sul on muudatusi tehtud. \n" + 
  	     "Kas soovid salvestamata lahkuda?";
	}
}

TINY={};

TINY.box=function(){
	var j,m,b,g,v,p=0;
	return{
		show:function(o){
			v={opacity:70,close:1,animate:1,fixed:1,mask:1,maskid:'',boxid:'',topsplit:2,url:0,post:0,height:0,width:0,html:0,iframe:0};
			for(s in o){v[s]=o[s]}
			if(!p){
				j=document.createElement('div'); j.className='tbox';
				p=document.createElement('div'); p.className='tinner';
				b=document.createElement('div'); b.className='tcontent';
				m=document.createElement('div'); m.className='tmask';
				g=document.createElement('div'); g.className='tclose'; g.v=0;
				document.body.appendChild(m); document.body.appendChild(j); j.appendChild(p); p.appendChild(b);
				m.onclick=g.onclick=TINY.box.hide; window.onresize=TINY.box.resize
			}else{
				j.style.display='none'; clearTimeout(p.ah); if(g.v){p.removeChild(g); g.v=0}
			}
			p.id=v.boxid; m.id=v.maskid; j.style.position=v.fixed?'fixed':'absolute';
			if(v.html&&!v.animate){
				p.style.backgroundImage='none'; b.innerHTML=v.html; b.style.display='';
				p.style.width=v.width?v.width+'px':'auto'; p.style.height=v.height?v.height+'px':'auto'
			}else{
				b.style.display='none'; 
				if(!v.animate&&v.width&&v.height){
					p.style.width=v.width+'px'; p.style.height=v.height+'px'
				}else{
					p.style.width=p.style.height='100px'
				}
			}
			if(v.mask){this.mask(); this.alpha(m,1,v.opacity)}else{this.alpha(j,1,100)}
			if(v.autohide){p.ah=setTimeout(TINY.box.hide,1000*v.autohide)}else{document.onkeyup=TINY.box.esc}
		},
		fill:function(c,u,k,a,w,h){
			if(u){
				if(v.image){
					var i=new Image(); i.onload=function(){w=w||i.width; h=h||i.height; TINY.box.psh(i,a,w,h)}; i.src=v.image
				}else if(v.iframe){
					this.psh('<iframe src="'+v.iframe+'" width="'+v.width+'" frameborder="0" height="'+v.height+'"></iframe>',a,w,h)
				}else{
					var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
					x.onreadystatechange=function(){
						if(x.readyState==4&&x.status==200){p.style.backgroundImage=''; TINY.box.psh(x.responseText,a,w,h)}
					};
					if(k){
    	            	x.open('POST',c,true); x.setRequestHeader('Content-type','application/x-www-form-urlencoded'); x.send(k)
					}else{
       	         		x.open('GET',c,true); x.send(null)
					}
				}
			}else{
				this.psh(c,a,w,h)
			}
		},
		psh:function(c,a,w,h){
			if(typeof c=='object'){b.appendChild(c)}else{b.innerHTML=c}
			var x=p.style.width, y=p.style.height;
			if(!w||!h){
				p.style.width=w?w+'px':''; p.style.height=h?h+'px':''; b.style.display='';
				if(!h){h=parseInt(b.offsetHeight)}
				if(!w){w=parseInt(b.offsetWidth)}
				b.style.display='none'
			}
			p.style.width=x; p.style.height=y;
			this.size(w,h,a)
		},
		esc:function(e){e=e||window.event; if(e.keyCode==27){TINY.box.hide()}},
		hide:function(){TINY.box.alpha(j,-1,0,3); document.onkeypress=null; if(v.closejs){v.closejs()}},
		resize:function(){TINY.box.pos(); TINY.box.mask()},
		mask:function(){m.style.height=this.total(1)+'px'; m.style.width=this.total(0)+'px'},
		pos:function(){
			var t;
			if(typeof v.top!='undefined'){t=v.top}else{t=(this.height()/v.topsplit)-(j.offsetHeight/2); t=t<20?20:t}
			if(!v.fixed&&!v.top){t+=this.top()}
			j.style.top=t+'px'; 
			j.style.left=typeof v.left!='undefined'?v.left+'px':(this.width()/2)-(j.offsetWidth/2)+'px'
		},
		alpha:function(e,d,a){
			clearInterval(e.ai);
			if(d){e.style.opacity=0; e.style.filter='alpha(opacity=0)'; e.style.display='block'; TINY.box.pos()}
			e.ai=setInterval(function(){TINY.box.ta(e,a,d)},20)
		},
		ta:function(e,a,d){
			var o=Math.round(e.style.opacity*100);
			if(o==a){
				clearInterval(e.ai);
				if(d==-1){
					e.style.display='none';
					e==j?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''
				}else{
					if(e==m){
						this.alpha(j,1,100)
					}else{
						j.style.filter='';
						TINY.box.fill(v.html||v.url,v.url||v.iframe||v.image,v.post,v.animate,v.width,v.height)
					}
				}
			}else{
				var n=a-Math.floor(Math.abs(a-o)*.5)*d;
				e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
			}
		},
		size:function(w,h,a){
			if(a){
				clearInterval(p.si); var wd=parseInt(p.style.width)>w?-1:1, hd=parseInt(p.style.height)>h?-1:1;
				p.si=setInterval(function(){TINY.box.ts(w,wd,h,hd)},20)
			}else{
				p.style.backgroundImage='none'; if(v.close){p.appendChild(g); g.v=1}
				p.style.width=w+'px'; p.style.height=h+'px'; b.style.display=''; this.pos();
				if(v.openjs){v.openjs()}
			}
		},
		ts:function(w,wd,h,hd){
			var cw=parseInt(p.style.width), ch=parseInt(p.style.height);
			if(cw==w&&ch==h){
				clearInterval(p.si); p.style.backgroundImage='none'; b.style.display='block'; if(v.close){p.appendChild(g); g.v=1}
				if(v.openjs){v.openjs()}
			}else{
				if(cw!=w){p.style.width=(w-Math.floor(Math.abs(w-cw)*.6)*wd)+'px'}
				if(ch!=h){p.style.height=(h-Math.floor(Math.abs(h-ch)*.6)*hd)+'px'}
				this.pos()
			}
		},
		top:function(){return document.documentElement.scrollTop||document.body.scrollTop},
		width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},
		height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},
		total:function(d){
			var b=document.body, e=document.documentElement;
			return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):
			Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
		}
	}
}();