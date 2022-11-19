// HTML5 Stereo Viewer Ver0.6(2020/05/20)
// Add mirror mode(0.5 -> 0.6)
// http://www.stereomaker.net/html5/viewer5/index.htm

document.write(
"<style>",
"body{margin:0px;}",
"button{",
"  font-size:18px;",
"  width:80px;",
"  height:30px;",
"  background: rgba(0,0,0,0.6);",
"  border-color:#888888 #888888 #888888 #888888;",
"  color:#aaaaaa;",
"  margin-top:0px;",
"  margin-bottom:0px;",
"}",
"button:active{",
"  background-color:#444444;",
"  color:#00ffff;",
"}",
"#canvas1 {",
" z-index: 1;",
"}",
"#dropmenu {",
"  list-style-type: none;",
"  width: 800px;",
"  height: 4px;",
"  margin-top:0px;",
"  background: #000000;",
"}",
"#dropmenu li {",
"  position: relative;",
"  width: 10%;",
"  float: left;",
"  margin: 0;",
"  padding: 0;",
"  text-align: center;",
"}",
"#dropmenu li ul {",
"  position: absolute;",
"  top: 100%;",
"  left: -50%;",
"  list-style: none;",
"  margin: 0;",
"  z-index: 2;",
"  border-radius: 0 0 3px 3px;",
"}",
"#dropmenu li ul li{",
"  overflow: hidden;",
"  width: 100%;",
"  height: 0px;",
"  -moz-transition: .2s;",
"  -webkit-transition: .2s;",
"  -o-transition: .2s;",
"  -ms-transition: .2s;",
"  transition: .2s;",
"}",
"#dropmenu li:hover ul li{",
"  overflow: visible;",
"  height: 50px;",
"}",
"</style>",
"<div id='contents' style='background-color:black;'>",
"<CENTER>",
"<ul id='dropmenu'>"
);
if(nRet==1) {
document.write(
"  <li><button onclick='history.go(-1)' id='button9'>Return</button>",
"  </li>"
);
}
document.write(
"  <li><button id='button1'>Prev</button>",
"  </li>",
"  <li><button id='button2'>Next</button>",
"  </li>",
"  <li><button id='button30'>Stereo</button>",
"    <ul>",
"      <li><button id='button20' style='height:50px;width:120px;'>Para</button></li> ",
"      <li><button id='button21' style='height:50px;width:120px;'>Cross</button></li> ",
"      <li><button id='button22' style='height:50px;width:120px;'>Dubois</button></li> ",
"      <li><button id='button29' style='height:50px;width:120px;'>SPM_Ana.</button></li> ",
"      <li><button id='button23' style='height:50px;width:120px;'>C_Ana.</button></li> ",
"      <li><button id='button24' style='height:50px;width:120px;'>Ana.</button></li> ",
"      <li><button id='button25' style='height:50px;width:120px;'>Int.</button></li> ",
"      <li><button id='button26' style='height:50px;width:120px;'>V_Int.</button></li> ",
"      <li><button id='button27' style='height:50px;width:120px;'>Single</button></li> ",
"      <li><button id='button28' style='height:50px;width:120px;'>SBS50</button></li> ",
"      <li><button id='button35' style='height:50px;width:120px;'>Mirror</button></li> ",
"    </ul>",
"  </li>",
"  <li><button id='button31'>Slide</button>",
"    <ul>",
"      <li><button id='button40' style='height:50px;width:120px;'>Off</button></li> ",
"      <li><button id='button41' style='height:50px;width:120px;'>1 Sec.</button></li> ",
"      <li><button id='button42' style='height:50px;width:120px;'>2 Sec.</button></li> ",
"      <li><button id='button43' style='height:50px;width:120px;'>3 Sec.</button></li> ",
"      <li><button id='button44' style='height:50px;width:120px;'>4 Sec.</button></li> ",
"      <li><button id='button45' style='height:50px;width:120px;'>5 Sec.</button></li> ",
"      <li><button id='button46' style='height:50px;width:120px;'>6 Sec.</button></li> ",
"      <li><button id='button47' style='height:50px;width:120px;'>7 Sec.</button></li> ",
"      <li><button id='button48' style='height:50px;width:120px;'>8 Sec.</button></li> ",
"      <li><button id='button49' style='height:50px;width:120px;'>9 Sec.</button></li> ",
"    </ul>",
"  </li>",
"  <li><button id='button4'>L-R</button>",
"  </li>",
"  <li><button id='button32'>Zoom</button>",
"    <ul>",
"      <li><button id='button6' style='height:50px;width:120px;'> Fit </button></li> ",
"      <li><button id='button7' style='height:50px;width:120px;'> + </button></li> ",
"      <li><button id='button5' style='height:50px;width:120px;'> - </button></li> ",
"    </ul>",
"  </li>",
"  <li><button id='button8'>Full</button>",
"  </li>",
"  <li><button id='button33'>Help</button>",
"    <ul>",
"      <li><button id='button50' style='height:50px;width:120px;'> Japanese </button></li> ",
"      <li><button id='button51' style='height:50px;width:120px;'> English </button></li> ",
"      <li><button id='button52' style='height:50px;width:120px;'> Version </button></li> ",
"    </ul>",
"  </li>",
"  <li><button id='button0' style='border-color:#000000 #000000 #000000 #000000;width:160px;'>1/33</button>",
"  </li>",
"</ul>",
"<BR>",
"<canvas id='canvas1'><FONT color='#ffffff'>Your Browser does not support html5 canvas</FONT></canvas><br>",
"</CENTER>",
"</div>"
);

var verno="Ver. 0.6";
var jet = new Image();
var picindex1 = 0;
var stype = 2;
var nGap = 97;
var nFull = 0;
var nSwap = 0;
var sshow = 0;
var nzoom = 100;
var nImgwidth ;
var nImgheight ;
var nWinwidth ;
var nWinheight;
var nCanwidth ;
var nCanwidth50 ;
var nCanheight;
var nInterval=3;
var canvas1 = document.getElementById("canvas1");
var ctx1 = canvas1.getContext("2d");
var nFS = 0;
var nFull = 0;
var start = 0;
var dist = 0;
var nt=0;
var Param   = "";
Param = self.location.search;
Param = Param.substring(1,Param.length);
for(i=0;i<pics.length;i++){
	if(pics[i]==Param) picindex1=i;
	}
Param   = "";
Param = document.cookie;
if(Param.length>0){
	var nCok=parseInt(Param);
	if ( isNaN ( nCok ) ) {
		nCok=20;
	}
	stype=parseInt(nCok/10);
	nSwap=parseInt(nCok%10);
	}
jet.src=pics[picindex1];
button0.innerHTML="" + (picindex1+1) + "/" + pics.length;
document.addEventListener("keydown", KeyEvent); 
document.addEventListener('fullscreenchange', changeFullScreenHandler);
document.addEventListener('mozfullscreenchange', changeFullScreenHandler);
document.addEventListener('webkitfullscreenchange', changeFullScreenHandler);
document.addEventListener("mousewheel", function(e){ 
	wheel_delta = e.detail ? e.detail / -3 : e.wheelDelta / 120;
	nzoom=nzoom+wheel_delta*10;
	if(nzoom>200) nzoom=200;
	if(nzoom<10) nzoom=10;
	draw();
      });
document.addEventListener('DOMMouseScroll', function(e){ 
	wheel_delta = e.detail ? e.detail / -3 : e.wheelDelta / 120;
	nzoom=nzoom+wheel_delta*10;
	if(nzoom>200) nzoom=200;
	if(nzoom<10) nzoom=10;
	draw();
      });
canvas1.addEventListener('touchstart', function(e){
	this.className = "hover";
	start = e.touches[0].pageX;
	dist=0;
	}, false);
canvas1.addEventListener('touchmove', function(e){
	if(e.touches.length==1 && dist<2){
		e.preventDefault();
		var distanceX = e.touches[0].pageX - start;
		if( Math.abs(distanceX) > 20 ){
			if(distanceX<0) dist=1;
			else dist=-1;
			}
		}
	else {
		start = e.touches[0].pageX;
		dist=2;
		}
	}, false);
canvas1.addEventListener('touchend', function(e){
		this.className = "";
		if(dist==1) {
			sshow=0;
			button31.innerHTML="Slide";
			picindex1 = (picindex1 + 1)%pics.length;
			load();
			}
		if(dist==-1){
			sshow=0;
			button31.innerHTML="Slide";
			picindex1 = (picindex1 - 1);
			if(picindex1<0) picindex1=pics.length-1;
			load();
			}
	}, false);
document.addEventListener('mousedown', function(e){
	e.preventDefault();
	start = e.pageX;
	dist=0;
	nt=1;
	}, false);
document.body.addEventListener('mousemove', function(e){
	if(nt==0) return;
	e.preventDefault();
	var distanceX = e.pageX - start;
	if( Math.abs(distanceX) > 20 ){
		if(distanceX<0) dist=1;
		else dist=-1;
		}
	}, false);
document.addEventListener('mouseup', function(e){
	e.preventDefault();
	nt=0;
	if(dist==1) {
		sshow=0;
		button31.innerHTML="Slide";
		picindex1 = (picindex1 + 1)%pics.length;
		load();
		}
	if(dist==-1){
		sshow=0;
		button31.innerHTML="Slide";
		picindex1 = (picindex1 - 1);
		if(picindex1<0) picindex1=pics.length-1;
		load();
		}
	}, false);
jet.onload = function(){
	draw();
	}

button1.onclick=function(){		//Previous
	picindex1 = (picindex1 - 1);
	if(picindex1<0) picindex1=pics.length-1;
	load();
	}

button2.onclick=function(){		//Next
	picindex1 = (picindex1 + 1)%pics.length;
	load();
	}

button40.onclick=function(){		//SlideShow ON/OFF
	sshow=0;
	button31.innerHTML="Slide";
	}

button41.onclick=function(){
	tstart0(1);
	}

button42.onclick=function(){
	tstart0(2);
	}

button43.onclick=function(){
	tstart0(3);
	}

button44.onclick=function(){
	tstart0(4);
	}

button45.onclick=function(){
	tstart0(5);
	}

button46.onclick=function(){
	tstart0(6);
	}

button47.onclick=function(){
	tstart0(7);
	}

button48.onclick=function(){
	tstart0(8);
	}

button49.onclick=function(){
	tstart0(9);
	}

button50.onclick=function(){
	window.open( "http://www.stereo.jpn.org/jpn/h5stvj.html");
	}

button51.onclick=function(){
	window.open( "http://www.stereo.jpn.org/eng/h5stve.html");
	}

button52.onclick=function(){
	button0.innerHTML=verno;
	}

button4.onclick=function(){		//Swap L-R
	nSwap=(nSwap+1)%2;
	draw();
	}

button5.onclick=function(){		//Zoom(-)
	nzoom=nzoom-10;
	if(nzoom<10) nzoom=10;
	draw();
	}

button6.onclick=function(){		//Zoom(Fit)
	nzoom=100;
	draw();
	}

button7.onclick=function(){		//Zoom(+)
	nzoom=nzoom+10;
	if(nzoom>200) nzoom=200;
	draw();
	}

button8.onclick=function(){		//Full Screen ON/OFF
	toggleFullScreen();
	}

button20.onclick=function(){		//SBS Parallel-eyed
	stype=0;
	draw();
	}

button21.onclick=function(){		//SBS Cross-eyed
	stype=1;
	draw();
	}

button22.onclick=function(){		//Dubois Anaglyph
	stype=2;
	draw();
	}

button23.onclick=function(){		//Color Anaglyph
	stype=3;
	draw();
	}

button24.onclick=function(){		//Red-Cyan Anaglyph
	stype=4;
	draw();
	}

button25.onclick=function(){		//Interlace
	stype=5;
	draw();
	}

button26.onclick=function(){		//Vertical Interlace
	stype=6;
	draw();
	}

button27.onclick=function(){		//Single Image
	stype=7;
	draw();
	}

button28.onclick=function(){		//SBS50
	stype=8;
	draw();
	}

button29.onclick=function(){		//SPM_Ana.
	stype=9;
	draw();
	}

button35.onclick=function(){		//SPM_Ana.
	stype=10;
	draw();
	}

function KeyEvent(e){
    var Keynum;
    if(window.event) Keynum = e.keyCode;  // IE
    else if(e.which) Keynum = e.which;
    if(Keynum==13) {	//Enter : Full screen ON/OFF
	toggleFullScreen();
	}
    else if(Keynum==87 || Keynum==38) {	//W or Up arrow : Mirror Gap wider
	nGap--;
	if(nGap<50) nGap=50;
	draw();
	}
    else if(Keynum==78 || Keynum==40) {	//N or Down arrow : Mirror Gap narrower
	nGap++;
	if(nGap>100) nGap=100;
	draw();
	}
    else if(Keynum==32 || Keynum==39) {	//Space or Right arrow : Next image
	picindex1 = (picindex1 + 1)%pics.length;
	load();
	}
    else if(Keynum==37) {	//Left arrow : Previous image
	picindex1 = (picindex1 - 1);
	if(picindex1<0) picindex1=pics.length-1;
	load();
	}
    else if(Keynum==88) {	//X : Swap
	nSwap=(nSwap+1)%2;
	draw();
	}
    else if(Keynum==70) {	//F : Fit
	nzoom=100;
	draw();
	}
    else if(Keynum==107) {	//+ : Fit
	nzoom=nzoom+10;
	if(nzoom>200) nzoom=200;
	draw();
	}
    else if(Keynum==109) {	//- : Fit
	nzoom=nzoom-10;
	if(nzoom<10) nzoom=10;
	draw();
	}
    else if(Keynum==65) {	//A : SlideShow ON/OFF
	sshow=(sshow+1)%2;
	if(sshow==0) button31.innerHTML="Off_SS";
	else button31.innerHTML="On(" + nInterval + "S)";
	tstart();
	}
    else if(Keynum>48 && Keynum<58) {	//Num : SlideShow Interval
	nInterval=Keynum-48;
	if(sshow==1) button31.innerHTML="On(" + nInterval + "S)";
	}
    else if(Keynum>96 && Keynum<106) {	//Num : SlideShow Interval
	nInterval=Keynum-96;
	if(sshow==1) button31.innerHTML="On(" + nInterval + "S)";
	}
    // button0.innerHTML="" + Keynum;
  }


    function changeFullScreenHandler(event) {
	if ((document.fullScreenElement && document.fullScreenElement !== null) ||(!document.mozFullScreen && !document.webkitIsFullScreen)) {
		nFull=0;
		button8.innerHTML="Full";
		}
	else {
		nFull=1;
		button8.innerHTML="Close";
		}
	
	draw();
    	}

function toggleFullScreen(){
	nFull=(nFull+1)%2;

	if(nFull==1){
		fullscreenon();
	}
      else{
		fullscreenoff();
	}

}

function fullscreenon(){
		nFS=0;
		var docElm = document.getElementById("contents");
		if (docElm.requestFullscreen) {
		    docElm.requestFullscreen();
		    nFS = 1;

		}
		else if (docElm.mozRequestFullScreen) {
		    docElm.mozRequestFullScreen();
		    nFS = 2;
		}
		else if (docElm.webkitRequestFullScreen) {
		    docElm.webkitRequestFullScreen();
		    nFS = 3;
		}
	}

function fullscreenoff(){

	        if (document.cancelFullScreen) {  
	          document.cancelFullScreen();  
	        } 
	        if (document.mozCancelFullScreen) {
	          document.mozCancelFullScreen();
	        } 
	        if (document.webkitCancelFullScreen) {
	          document.webkitCancelFullScreen();
	        }
	}



function tstart0(nint){		//SlideShow ON/OFF
	nInterval=nint;
	button31.innerHTML="On(" + nInterval + "S)";
	if(sshow==0){
		sshow=1;
		tstart();
		}
	}

function tstart(){
	if(sshow==1){
		setTimeout(tstart, nInterval*1000);
		picindex1 = (picindex1 + 1)%pics.length;
		load();
		}
	}
function getBrowserWidth(){   
	    if ( window.innerWidth ) { return window.innerWidth; }   
	    else if ( document.documentElement && document.documentElement.clientWidth != 0 ) { return document.documentElement.clientWidth; }   
	    else if ( document.body ) { return document.body.clientWidth; }   
	    return 0;   
	}  

function getBrowserHeight(){   
	    if ( window.innerHeight ) { return window.innerHeight; }   
	    else if ( document.documentElement && document.documentElement.clientHeight != 0 ) { return document.documentElement.clientHeight; }   
	    else if ( document.body ) { return document.body.clientHeight; }   
	    return 0;   
	}  


function load(){
	button0.innerHTML="loading ...";
	setTimeout(load2, 1);
	}

function load2(){
	jet.src=pics[picindex1];
	jet.onload = function(){
		draw();
		}
	}

function draw(){
	var expire = new Date();
	expire.setTime( expire.getTime() + 1000 * 3600 * 24 );
	var nCok=stype*10+nSwap;
	document.cookie = "" + nCok +"; expires=" + expire.toUTCString();
	if(nSwap==0) {
		button4.innerHTML="L-R";
		button4.style.color="#aaaaaa";
		}
	else {
		button4.innerHTML="R-L";
		button4.style.color="#ffff00";
		}
	if(stype==0) button30.innerHTML="Para";
	if(stype==1) button30.innerHTML="Cross";
	if(stype==2) button30.innerHTML="Dubois";
	if(stype==3) button30.innerHTML="C_Ana.";
	if(stype==4) button30.innerHTML="Ana.";
	if(stype==5) button30.innerHTML="Int.";
	if(stype==6) button30.innerHTML="V_Int.";
	if(stype==7) button30.innerHTML="Single";
	if(stype==8) button30.innerHTML="SBS50";
	if(stype==9) button30.innerHTML="SPM";
	if(stype==10) button30.innerHTML="Mirror";
	button0.innerHTML="in progress ...";
	setTimeout(draw2, 1);
	}

function draw2(){

	var time1;
	var time2;
	var startT = new Date();
       	time1 = startT.getTime();

	nImgwidth=jet.width/2;
	nImgheight=jet.height;

	nWinwidth = getBrowserWidth();
	if(nFull==0) {nWinheight = getBrowserHeight()-canvas1.offsetTop-10;}
	else {nWinheight = getBrowserHeight()-50;}

	nCanwidth = nWinwidth;
	nCanheight = nWinheight;

	if(stype<2 || stype==10) nCanheight=nCanheight*2;

	if(nCanwidth/nCanheight>nImgwidth/nImgheight){
		nCanwidth=nCanheight*nImgwidth/nImgheight;
		}
	else{
		nCanheight=nCanwidth*nImgheight/nImgwidth;
		}
	
	if(stype<2 || stype==10) nCanheight=nCanheight/2;
	if(stype==8 && nCanwidth < nWinwidth) nCanwidth = nWinwidth;

	nCanwidth=Math.floor(nCanwidth*nzoom/100);
	nCanheight=Math.floor(nCanheight*nzoom/100);


	canvas1.width=nCanwidth;
	canvas1.height=nCanheight;

	ctx1.clearRect(0, 0, nCanwidth, nCanheight);

	if(stype<2){		// 0:SBS Parallel-eyed  1:SBS Cross-eyed
		if((stype==0 && nSwap==0) || (stype==1 && nSwap==1)){
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth/2,nCanheight);
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,nCanwidth/2,0,nCanwidth/2,nCanheight);
			}
		else{
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,nCanwidth/2,0,nCanwidth/2,nCanheight);
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth/2,nCanheight);
			}
		}
	if(stype==10){		// 0:SBS Parallel-eyed  1:SBS Cross-eyed
		if(nSwap==0){
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth*nGap/200,nCanheight*nGap/100);
			ctx1.scale(-1,1);
			ctx1.translate(-canvas1.width, 0);
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth*nGap/200,nCanheight*nGap/100);
			}
		else{
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth*nGap/200,nCanheight*nGap/100);
			ctx1.scale(-1,1);
			ctx1.translate(-canvas1.width, 0);
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth*nGap/200,nCanheight*nGap/100);
			}
		}
	else if(stype==8){	//SBS 50%
		nCanwidth50=(nCanheight*nImgwidth)/(nImgheight*2);
		if(nSwap==0){
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,((nCanwidth/2)-nCanwidth50)/2,0,nCanwidth50,nCanheight);
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,nCanwidth/2+((nCanwidth/2)-nCanwidth50)/2,0,nCanwidth50,nCanheight);
			}
		else{
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,((nCanwidth/2)-nCanwidth50)/2,0,nCanwidth50,nCanheight);
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,nCanwidth/2+((nCanwidth/2)-nCanwidth50)/2,0,nCanwidth50,nCanheight);
			}

		}
	else if(stype==2){	//Dubois Anaglyph
		var r = 0;
		var g = 0;
		var b = 0;
		var rl = 0;
		var gl = 0;
		var bl = 0;
		var rr = 0;
		var gr = 0;
		var br = 0;

		ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw left image
		imagedata = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		if(nSwap==0) imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw right image 
		if(nSwap==0) imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image

		for (y = 0; y < nCanheight ; y++) {
			for (x = 0; x < nCanwidth; x++) {
				rl=imagedatal.data[4*y*nCanwidth+x*4+0];
				gl=imagedatal.data[4*y*nCanwidth+x*4+1];
				bl=imagedatal.data[4*y*nCanwidth+x*4+2];
				rr=imagedatar.data[4*y*nCanwidth+x*4+0];
				gr=imagedatar.data[4*y*nCanwidth+x*4+1];
				br=imagedatar.data[4*y*nCanwidth+x*4+2];

				r=Math.floor(0.456100*rl + 0.500484*gl + 0.176381 * bl - 0.0434706*rr - 0.0879388*gr - 0.00155529*br);
				g=Math.floor(-0.0400822*rl - 0.0378246*gl - 0.0157589*bl + 0.378476*rr + 0.73364*gr - 0.0184503*br);
				b=Math.floor(-0.0152161*rl - 0.0205971*gl - 0.00546856*bl - 0.0721527*rr - 0.112961*gr + 1.2264*br);

				imagedata.data[4*y*nCanwidth+x*4+0] = r;
				imagedata.data[4*y*nCanwidth+x*4+1] = g;
				imagedata.data[4*y*nCanwidth+x*4+2] = b;
				}
			}

		ctx1.putImageData(imagedata,0,0);
		}
	else if(stype==9){	//SPM Anaglyph
		var r = 0;
		var g = 0;
		var b = 0;
		var rl = 0;
		var gl = 0;
		var bl = 0;
		var rr = 0;
		var gr = 0;
		var br = 0;

		ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw left image
		imagedata = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		if(nSwap==0) imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw right image 
		if(nSwap==0) imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image

		for (y = 0; y < nCanheight ; y++) {
			for (x = 0; x < nCanwidth; x++) {
				rl=imagedatal.data[4*y*nCanwidth+x*4+0];
				gl=imagedatal.data[4*y*nCanwidth+x*4+1];
				bl=imagedatal.data[4*y*nCanwidth+x*4+2];
				rr=imagedatar.data[4*y*nCanwidth+x*4+0];
				gr=imagedatar.data[4*y*nCanwidth+x*4+1];
				br=imagedatar.data[4*y*nCanwidth+x*4+2];

				r=Math.floor(0.606100*rl + 0.400484*gl + 0.126381 * bl - 0.0434706*rr - 0.0879388*gr - 0.00155529*br);
				g=Math.floor(-0.0400822*rl - 0.0378246*gl - 0.0157589*bl + 0.078476*rr + 1.03364*gr - 0.0184503*br);
				b=Math.floor(-0.0152161*rl - 0.0205971*gl - 0.00546856*bl - 0.0721527*rr - 0.112961*gr + 1.2264*br);

				imagedata.data[4*y*nCanwidth+x*4+0] = r;
				imagedata.data[4*y*nCanwidth+x*4+1] = g;
				imagedata.data[4*y*nCanwidth+x*4+2] = b;
				}
			}

		ctx1.putImageData(imagedata,0,0);
		}
	else if(stype==3){		//Color Anaglyph
		ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw left image
		if(nSwap==0) imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw right image 
		if(nSwap==0) imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image

		for (y = 0; y < nCanheight ; y++) {
			for (x = 0; x < nCanwidth; x++) {
			imagedatar.data[4*y*nCanwidth+x*4] = imagedatal.data[4*y*nCanwidth+x*4];
			}
		};
		ctx1.putImageData(imagedatar,0,0);
		}
	else if(stype==4){		//Red-Cyan Anaglyph
		var r = 0;
		var g = 0;
		var b = 0;
		var rl = 0;
		var gl = 0;
		var bl = 0;
		var rr = 0;
		var gr = 0;
		var br = 0;

		ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw left image
		imagedata = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		if(nSwap==0) imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw right image 
		if(nSwap==0) imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image

		for (y = 0; y < nCanheight ; y++) {
			for (x = 0; x < nCanwidth; x++) {
				rl=imagedatal.data[4*y*nCanwidth+x*4+0];
				gl=imagedatal.data[4*y*nCanwidth+x*4+1];
				bl=imagedatal.data[4*y*nCanwidth+x*4+2];
				rr=imagedatar.data[4*y*nCanwidth+x*4+0];
				gr=imagedatar.data[4*y*nCanwidth+x*4+1];
				br=imagedatar.data[4*y*nCanwidth+x*4+2];

				r=Math.floor(0.29900*rl + 0.58700*gl + 0.11400*bl);
				g=Math.floor(0.29900*rr + 0.58700*gr + 0.11400*br);
				b=g

				imagedata.data[4*y*nCanwidth+x*4+0] = r;
				imagedata.data[4*y*nCanwidth+x*4+1] = g;
				imagedata.data[4*y*nCanwidth+x*4+2] = b;
				}
			}

		ctx1.putImageData(imagedata,0,0);
		}
	else if(stype==5){		//Interlace
		ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw left image
		if(nSwap==0) imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw right image 
		if(nSwap==0) imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight); //Get right image
		else imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight); //Get right image

		for (y = 0; y < nCanheight ; y=y+2) {
			for (x = 0; x < nCanwidth; x++) {
			imagedatar.data[4*y*nCanwidth+x*4] = imagedatal.data[4*y*nCanwidth+x*4];
			imagedatar.data[4*y*nCanwidth+x*4+1] = imagedatal.data[4*y*nCanwidth+x*4+1];
			imagedatar.data[4*y*nCanwidth+x*4+2] = imagedatal.data[4*y*nCanwidth+x*4+2];
			}
		};
		ctx1.putImageData(imagedatar,0,0);
		}
	else if(stype==6){		//Vertical Interlace
		ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw left image
		if(nSwap==0) imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		else imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight);  //Get left image
		ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight); //draw right image 
		if(nSwap==0) imagedatar = ctx1.getImageData(0,0,nCanwidth,nCanheight); //Get right image
		else imagedatal = ctx1.getImageData(0,0,nCanwidth,nCanheight); //Get right image

		for (x = 0; x < nCanwidth; x=x+2) {
			for (y = 0; y < nCanheight; y++) {
			imagedatar.data[4*y*nCanwidth+x*4] = imagedatal.data[4*y*nCanwidth+x*4];
			imagedatar.data[4*y*nCanwidth+x*4+1] = imagedatal.data[4*y*nCanwidth+x*4+1];
			imagedatar.data[4*y*nCanwidth+x*4+2] = imagedatal.data[4*y*nCanwidth+x*4+2];
			}
		};
		ctx1.putImageData(imagedatar,0,0);
		}
	else if(stype==7){		//Single Image
		if(nSwap==0){
			ctx1.drawImage(jet,0,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight);
			}
		else{
			ctx1.drawImage(jet,nImgwidth,0,nImgwidth,nImgheight,0,0,nCanwidth,nCanheight);
			}
		}

	var endT = new Date();
	time2 = endT.getTime();
	var dtime = time2 - time1;
//	button30.innerHTML="" + dtime + "mS";


	button0.innerHTML="" + (picindex1+1) + "/" + pics.length;
}
