/*
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */
var verno='3D180 Ver0.5';
var stType = 1;
var dltv=0.1;		//Left/Right adjustment unit
var dltr=0.1;		//Left/Right adjustment unit
var dltx=0.0;
var dlty=0.0;
var rota=0.0;
var nFull = 0;
var nPage = 0;
var start = 0;
var dist = 0;
var effect;
var swap = true;
var menutime = 30;	//menu showing time 30x0.1=3.0Sec
var curmtime = 0;
var video = null;
var audio = null;
var video2 = null;
var vw;
var vh;
var canvasl = null;
var canvasr = null;
var canvas = null;
var ctxl = null;
var ctxr = null;
var ctx = null;
var isVideo = true;
var ChangeCanvas = true;
var isStart = false;
var isiOS = false;
var file3d;
var timeall = 0;
var timecnt = 0;
var camera;
var cameraDir;
var devrot = false;
var deffile = true;
var files;
var showbtn = true;
var bFirst=true;
var bTach=false;
var passiveSupported = false;
var distance=0.0;
var zoomfac=100.0;
var pan3=0;
var nRot=0;
var is1st=true;
var vmuted=false;
var vlevel=1.0;
var mousedown=false;
var cangle=-1;
var isDevchg=true;
var nMove=0;
var bClear=false;
var plane;
var initx;
var inity;
var initz;
var message;
var stmov="0,0,0,1,1,0,1,0,60";
var st180="0,0,0,1,1,1,0";
var st360="0,0,0,1,1,1,0";

document.write(
"<style>",
"    HTML{",
"	margin:0px;",
"	width:100%",
"	height:100%",
"    overflow: clip;",
"    -ms-overflow-style: none;",
"    overflow: -moz-scrollbars-none;",
"	scrollbar-width: none;",
"    }",
"    body::-webkit-scrollbar {",
"        display:none;",
"    }",
"	input{",
"	  display: none;",
"	  }",
"	label{",
"	  font-size:18px;",
"	  background: #000;",
"	  color:#fff;",
"	  cursor:pointer;",
"	  text-align: center;",
"	  border: solid 2px #aaaaaa;",
"	  display:inline-block;",
"	  line-height:44px;",
"	}",
"	button{",
"	  font-size:18px;",
"	  width:70px;",
"	  height:30px;",
"	  background: rgba(0,0,0,0.6);",
"	  border-color:#888888 #888888 #888888 #888888;",
"	  color:#aaaaaa;",
"	  margin-top:0px;",
"	  margin-bottom:0px;",
"	}",
"	button:active{",
"	  background-color:#444444;",
"	  color:#00ffff;",
"	}",
"	#filename{",
"	  display:inline-block;",
"	  font-size:18px;",
"	  height:20px;",
"	  width:200px;",
"	  background: rgba(0,0,0,0.6);",
"	  color:#aaaaaa;",
"		padding: 5px 5px;",
"	  margin-top:0px;",
"	  margin-left:1px;",
"	}",
"	#progtime{",
"	  display:inline-block;",
"	  font-size:18px;",
"	  height:26px;",
"	  width:180px;",
"	  background: rgba(0,0,0,0.6);",
"	  color:#aaaaaa;",
"	  margin-top:0px;",
"	}",
"	#volumelevel{",
"	  display:inline-block;",
"	  font-size:18px;",
"	  height:26px;",
"	  width:150px;",
"	  background: rgba(0,0,0,0.6);",
"	  color:#aaaaaa;",
"	  margin-top:0px;",
"	margin-left:60px;",
"	}",
"	#dropmenu {",
"	  list-style-type: none;",
"	  width: 800px;",
"	  height: 4px;",
"	  margin-top:0px;",
"	  background: #000000;",
"	}",
"	#dropmenu li {",
"	  position: relative;",
"	  float: left;",
"	  margin: 0;",
"	  padding: 0;",
"	  text-align: center;",
"	}",
"	#dropmenu li ul {",
"	  position: absolute;",
"	  top: 100%;",
"	  left: -50%;",
"	  list-style: none;",
"	  margin: 0;",
"	  z-index: 2;",
"	  border-radius: 0 0 3px 3px;",
"	}",
"	#dropmenu li ul li{",
"	  overflow: hidden;",
"	  width: 100%;",
"	  height: 0px;",
"	  -moz-transition: .2s;",
"	  -webkit-transition: .2s;",
"	  -o-transition: .2s;",
"	  -ms-transition: .2s;",
"	  transition: .2s;",
"	}",
"	#dropmenu li:hover ul li{",
"	  overflow: visible;",
"	  height: 100%;",
"	}",
"	#progress-wrap {",
"	    width: 100%;",
"	    height: 1rem;",
"	}",
"	 ",
"	#progress-out {",
"	    width: 100%;",
"	    height: 100%;",
"	    background-color: rgba(0, 0, 0, 0.2);",
"	    border-radius: 3px;",
"	    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);",
"	    transform: scaleY(0.5);",
"	    transition: 0.3s;",
"	}",
"	 ",
"	#progress-out:hover {",
"	    transform: scaleY(1.0);",
"	    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);",
"	    cursor: pointer;",
"	}",
"	 ",
"	#progress-in {",
"	    margin: 0 auto 0 0;",
"	    width: 100%;",
"	    height: 100%;",
"	    background-color: #3F51B5;",
"	    border-radius: 3px;",
"	    transform-origin: top left;",
"	    transition: 0.1s;",
"	}",
"	 ",
"	#controller-box {",
"	    text-align: center;",
"	}",
"</style>",
"<div id='image1' style='position:absolute;top:0px;left:0px'></div>",
"<div id='btn' style='background-color:black;'>",
"<CENTER>",
"<ul id='dropmenu'>",
"<NOBR>",
"  <li><button id='button9' style='width:40px;'>X</button></li> ",
"  <li><button id='button6' style='width:80px;'>Full</button></li>",
"  <li><button id='button5' style='width:60px;'>Dev.</button></li>",
"  <li><button id='button3' style='width:60px;'>L/R</button></li>",
"  <li><button id='button0'>Stereo</button>",
"    <ul>",
"      <li><button id='button20' style='height:40px;width:120px;'>SBS</button></li> ",
"      <li><button id='button29' style='height:40px;width:120px;'>LR/RL </button></li> ",
"      <li><button id='button22' style='height:40px;width:120px;'>Dubois</button></li> ",
"      <li><button id='button23' style='height:40px;width:120px;'>Color</button></li> ",
"      <li><button id='button24' style='height:40px;width:120px;'>Gray </button></li> ",
"      <li><button id='button25' style='height:40px;width:120px;'>H_Int</button></li> ",
"      <li><button id='button27' style='height:40px;width:120px;'>3DLCD</button></li> ",
"      <li><button id='button28' style='height:40px;width:120px;'>HSBS </button></li> ",
"      <li><button id='button35' style='height:40px;width:120px;'>2D </button></li> ",
"    </ul>",
"  </li>",
"  <li><button id='button1' style='height:30px;width:40px;'>&lArr;</button></li>",
"  <li><button id='button2' style='height:30px;width:40px;'>&rArr;</button></li>",
"  <li><button id='button60' style='width:60px;'>File</button>",
"	<ul>",
"		<li><input class='test' type='file' id='files' name='files[]' multiple ><label for='files' style='height:44px; width:120px;'>Full SBS</label></li> ",
"	</ul>",
"  </li>",
"  <li><button id='button50' style='width:60px;'>Help</button>",
"	<ul>",
"		<li><button id='button52' style='height:40px;width:120px;'>English</button></li>",
"		<li><button id='button51' style='height:40px;width:120px;'>Japanese</button></li>",
"		<li><button id='button53' style='height:40px;width:120px;'>Version</button></li>",
"		<li><button id='button54' style='height:40px;width:120px;'>Reset</button></li>",
"	</ul>",
"  </li>",
"  <li><div id='filename'>filename</div><li>",
"</ul>",
"</NOBR></div></CENTER>",
"<div id='controller-box'  style='position:absolute;bottom:0px;left:2%;width:96%'>",
"<div id='progress-wrap'>",
"<div id='progress-out'>",
"<div id='progress-in'></div>",
"</div>",
"</div>",
"<NOBR>",
"<div id='progtime'></div>",
"<button id='button4'>Play</button>",
"<button id='button31'>Stop</button>",
"<div id='volumelevel'></div>",
"<button id='button32' style='width:40px;'> &uArr; </button>",
"<button id='button33' style='width:40px;'> &dArr; </button>",
"<button id='button34'>Mute</button>",
"</NOBR>",
"</div>"
);


var ThView = function(arg) {
    this.d2r = function(d) {
        return d * Math.PI / 180;
    };
    this.id = arg.id; // id of parent element *required*
    if (arg.file instanceof Array) {
        this.file = arg.file; // filename *required*
    } else {
        this.file = [arg.file];
    }
    this.interval = (arg.interval == undefined) ? 500 : arg.interval; // animation rate
    this.width = (arg.width == undefined) ? window.innerWidth : arg.width; // pixel (500)
    this.height = (arg.height == undefined) ? window.innerHeight : arg.height; // pixel (300)
    this.rotation = (arg.rotation == undefined) ? false : arg.rotation; // true/false (false)
    this.speed = (arg.speed == undefined) ? 0.001 * 10 / 10 : 0.001 * arg.speed /
        10; // -100..-1, 1..100 (10)
    this.zoom = (arg.zoom == undefined) ? 70 : arg.zoom; // 20 .. 130 (70)
    this.firstview = (arg.firstview == undefined) ? 0 : this.d2r(-arg.firstview); // 0 .. 360 (0)
    this.degree = (arg.degree == undefined) ? [0, 0, 0] // [0,0,0] .. [360,360,360] ([0,0,0])
        : [this.d2r(arg.degree[0]), this.d2r(arg.degree[1]), this.d2r(arg.degree[
            2])];
    this.pan = this.firstview;
    this.tilt = 0;
    cameraDir = new THREE.Vector3(Math.sin(this.pan), Math.sin(this.tilt),
        Math.cos(this.pan));
    this.oldPosition = {
        x: null,
        y: null
    };
	loadlocalStorage();

    this.imageNo = 0;
	Param = self.location.search;
	Param = Param.substring(1,Param.length);
	if(parseInt(Param)>0) this.imageNo=(parseInt(Param)-1)*2;
//	for(i=0;i<this.file.length;i=i+2){
//		if(this.file[i+1]==Param) this.imageNo=i;
//		}

    this.mousedown = false;
    this.moving = false;
    this.element = document.getElementById(this.id);
    this.show();
}

// if(!Filenamedisplay) document.getElementById("filename").style.visibility = "hidden";

window.onunload =function(event){
  	event.preventDefault();
	if(bClear) return;
	var array = [];
	var obj = {
	  	'stType': stType,
	  	'Swap': swap,
		'Vlevel':vlevel,
		'Vmuted':vmuted,
		'dltx':dltx.toFixed(1),
		'dlty':dlty.toFixed(1),
		'rota':rota.toFixed(1)
		};
	array.push(obj);
	var setjson = JSON.stringify(obj);
	try {
		localStorage.setItem('3d180', setjson);
		}
	catch(err) {
		var expire = new Date();
		expire.setTime( expire.getTime() + 1000 * 3600 * 24 );
		var nCok=""+ stmov +"&" + dltx.toFixed(1)+","+dlty.toFixed(1)+","+rota.toFixed(1)+","+stType+","+swap/1 + "," + vlevel + "," + vmuted/1 + "&" + st360;
		document.cookie = "" + nCok +"; expires=" + expire.toUTCString();
		}
	}

function loadlocalStorage(){
	try{
	var getjson = localStorage.getItem('3d180');
	var obj = JSON.parse(getjson);
	if(obj!=null){
		stType=obj['stType'];
		swap=obj['Swap'];
		vmuted=obj['Vmuted'];
		vlevel=obj['Vlevel'];
		dltx=obj['dltx'];
		if(dltx==null) dltx=0.0;
		dlty=obj['dlty'];
		if(dlty==null) dlty=0.0;
		rota=obj['rota'];
		if(rota==null) rota=0.0;
		}
	} catch(err) {
		if(document.cookie.length>0){
		    var allcookies = document.cookie;
		    if( allcookies != '' )
		    	{
				var appcookies = allcookies.split( '&' );
				if(appcookies.length>2){
					stmov=appcookies[0];
					st360=appcookies[2];
			        var cookies = appcookies[1].split( ',' );
					dltx=parseFloat(cookies[0]);
					dlty=parseFloat(cookies[1]);
					rota=parseFloat(cookies[2]);
					stType=parseInt(cookies[3]);
					swap=Boolean(parseInt(cookies[4]));
					vlevel=parseFloat(cookies[5]);
					vmuted=Boolean(parseInt(cookies[6]));
					}
		    	}
			}
		}
	dltx=parseFloat(dltx);
	dlty=parseFloat(dlty);
	rota=parseFloat(rota);
	}

ThView.prototype.toggleRotation = function() {
        //	this.rotation = ! this.rotation;
        this.rotation = false;
    }
    ///////// drag callback
ThView.prototype.rotateCamera2 = function(x, y) {
    if (!this.mousedown) return;
    var pos = {
        x: x,
        y: y
    };
    if (this.oldPosition.x === null) {
        this.oldPosition = pos;
        return;
    }
    pan3 -= (this.oldPosition.x - pos.x) * 0.005;
	this.oldPosition = pos;
	}

ThView.prototype.rotateCamera = function(x, y) {
    if (!this.mousedown) return;
    var pos = {
        x: x,
        y: y
    };
    if (this.oldPosition.x === null) {
        this.oldPosition = pos;
        return;
    }
    this.pan -= (this.oldPosition.x - pos.x) * 0.005;
    this.tilt -= (this.oldPosition.y - pos.y) * 0.004;
    var limit = Math.PI / 2 - 0.3;
    if (this.tilt > limit) this.tilt = limit;
    if (this.tilt < -limit) this.tilt = -limit;
    var limit = Math.PI / 2 -0.3;
    if (this.pan > limit) this.pan = limit;
    if (this.pan < -limit) this.pan = -limit;
    cameraDir.x = Math.sin(this.pan) * Math.cos(this.tilt);
    cameraDir.z = Math.cos(this.pan) * Math.cos(this.tilt);
    cameraDir.y = Math.sin(this.tilt);
    camera.lookAt(cameraDir);
    if (this.sync) {
        this.sync.camera.lookAt(cameraDir);
    }
    this.oldPosition = pos;
    this.moving = true;
}
ThView.prototype.setCameraDir = function(alpha, beta, gamma) {
    if (this.rotation) {
        this.rotation = false;
    }
    var tilt2;
    var pan2;
  	var angle;
  	angle = screen && screen.orientation && screen.orientation.angle;
  	if (angle == null) {
    	angle = window.orientation || 0;
  		}
	if(angle==0 && (window.screen.width>window.screen.height)) angle=90; //for samsung Chrome
	isDevchg=false;
	if(cangle!=angle){
		cangle=angle;
		isDevchg=true;
		}

//	button6.innerHTML=""+angle;
    switch (angle) {
        case 0:
			if(isDevchg) pan3=Math.PI-alpha;
            cameraDir.x = Math.sin(alpha + pan3) * Math.cos(-(beta + Math.PI /
                2));
            cameraDir.z = Math.cos(alpha + pan3) * Math.cos(-(beta + Math.PI /
                2));
            cameraDir.y = Math.sin(-(beta + Math.PI / 2));
            break;
        case 90:
	            if (gamma < 0) {
	                tilt2 = -(Math.PI / 2 + gamma);
	                pan2 = alpha - Math.PI;
	            } else {
	                tilt2 = Math.PI / 2 - gamma;
	                pan2 = alpha;
	            }
				if(isDevchg) pan3=-pan2;
	            cameraDir.x = Math.sin(pan2+pan3) * Math.cos(tilt2);
	            cameraDir.z = Math.cos(pan2+pan3) * Math.cos(tilt2);
	            cameraDir.y = Math.sin(tilt2);
            break;
        case -90:
        case 270:
	            if (gamma < 0) {
	                tilt2 = -(Math.PI / 2 + gamma);
	                pan2 = alpha - Math.PI;
	            } else {
	                tilt2 = Math.PI / 2 - gamma;
	                pan2 = alpha;
	            }
				if(isDevchg) pan3=-pan2;
	            cameraDir.x = Math.sin(pan2+pan3) * Math.cos(-tilt2);
	            cameraDir.z = Math.cos(pan2+pan3) * Math.cos(-tilt2);
	            cameraDir.y = Math.sin(-tilt2);
            break;
        case 180:
			if(isDevchg) pan3=-(alpha+ gamma);
            cameraDir.x = Math.sin(alpha + gamma+pan3) * Math.cos(-(beta + Math.PI /
                2));
            cameraDir.z = Math.cos(alpha + gamma+pan3) * Math.cos(-(beta + Math.PI /
                2));
            cameraDir.y = Math.sin(-(beta + Math.PI / 2));
            break;
    }
    camera.lookAt(cameraDir);
};
///////// wheel callback
ThView.prototype.zoomCamera = function(val) {
        this.zoom += val * 0.1;
        if (this.zoom < 20) this.zoom = 20;
        if (this.zoom > 130) this.zoom = 130;
        camera.fov = this.zoom;
        camera.updateProjectionMatrix();
        if (this.sync) {
            this.sync.camera.fov = this.zoom;
            this.sync.camera.updateProjectionMatrix();
        }
    }
    ///////// main process
ThView.prototype.show = function() {
    var self = this;
    var onPointerDownPointerX0;
    var onPointerDownPointerY0;
    var texturel;
    var texturer;
    var _animationID = null;
    if (navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf(
        "iPod") > 0 || navigator.userAgent.indexOf("iPad") > 0) {
        isiOS = true;
    }
    var renderer;
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    this.element.appendChild(renderer.domElement); // append to <DIV>
    document.getElementById('files').addEventListener('change',
        handleFileSelect, false);

    function handleFileSelect(evt) {
            files = evt.target.files; // FileList object
            if (files.length > 0) {
                deffile = false;
                self.imageNo = 0;
                loadfiletotex(self.imageNo);
            }
        }
    var onmouseupOrg = document.onmouseup;
    document.onmouseup = function() {
        if (onmouseupOrg) onmouseupOrg();
        self.mousedown = false;
    };

	try {
	    document.addEventListener("test", null, Object.defineProperty({}, "passive", {
	        get: function() {
	            passiveSupported = true;
	        }
	    }));
	} catch(err) {}

    document.addEventListener('touchstart', function(e) {
        this.className = "hover";
		self.mousedown = true;
        start = e.touches[0].pageX;
        dist = 0;
		nMove=0;
        if (e.touches.length ==1) {
            var wx = window.innerWidth;
            var wy = window.innerHeight;
            var dx = e.touches[0].pageX;
            var dy = e.touches[0].pageY;
            self.mousedown = true;
            self.oldPosition = {
                x: dx,
                y: dy
            };
            onPointerDownPointerX0 = dx;
            onPointerDownPointerY0 = dy;
        }
		else if (e.touches.length == 2) {
			e.preventDefault();
            var dx = e.touches[0].pageX;
            var dy = e.touches[0].pageY;
            var dx2 = e.touches[1].pageX;
            var dy2 = e.touches[1].pageY;
			var wx=dx2-dx;
			var wy=dy2-dy;
			distance=Math.sqrt(wx*wx+wy*wy);
		}
		else if (e.touches.length == 3) {
			e.preventDefault();
            zoomfac=100.0;
		//	button6.innerHTML=""+zoomfac;
		}
        return true;
    }, passiveSupported ? { passive: false } : false);
    document.addEventListener('touchmove', function(e) {
		e.preventDefault();
		if(showbtn) curmtime=menutime;
        if (e.touches.length == 1) {
			nMove++;
			e.preventDefault();
            if (!devrot) {
				if(e.touches[0].pageY <(window.innerHeight - 80)) self.rotateCamera(e.touches[0].pageX, e.touches[0].pageY);
				}
			else{
				if(e.touches[0].pageY <(window.innerHeight - 80)) self.rotateCamera2(e.touches[0].pageX, e.touches[0].pageY);
				}
        }
	else if (e.touches.length == 2) {
			nMove++;
			e.preventDefault();
            var dx = e.touches[0].pageX;
            var dy = e.touches[0].pageY;
            var dx2 = e.touches[1].pageX;
            var dy2 = e.touches[1].pageY;
			var wx=dx2-dx;
			var wy=dy2-dy;
			var dt=Math.sqrt(wx*wx+wy*wy);
			if(e.touches[1].pageX>(window.innerWidth/2) && (stType==1 || stType==2)){
				zoomfac=zoomfac+(dt-distance)/4;
				if(zoomfac>100.0) zoomfac=100.0;
				}
			else self.zoomCamera((distance-dt)*2);

			distance=dt;
	}
    }, passiveSupported ? { passive: false } : false);
    document.addEventListener('touchend', function(e) {
		if(nMove<2){
	        if(showbtn) curmtime=menutime;
			else showmenu();
			}
        if (e.touches.length ==1) {
	        var dx;
	        if (!isiOS) {
	            dx = e.changedTouches[0].pageX;
	            dx = e.changedTouches[1].pageX;
	        }
	        dx = onPointerDownPointerX0 - e.changedTouches[0].pageX;
	        var dy = onPointerDownPointerY0 - e.changedTouches[0].pageY;
	        var wx = window.innerWidth;
	        var wy = window.innerHeight;
		}
    }, passiveSupported ? { passive: false } : false);
    document.addEventListener('mousedown', function(e) {
        e.preventDefault();
		nMove=0;
        self.mousedown = true;
        self.oldPosition = {
            x: e.pageX,
            y: e.pageY
        };
        onPointerDownPointerX0 = e.clientX;
        onPointerDownPointerY0 = e.clientY;
    });
    document.addEventListener('mousemove', function(e) {
        e.preventDefault();
		if(showbtn) curmtime=menutime;
        if(e.clientY <(window.innerHeight - 80)) {
			self.rotateCamera(e.pageX, e.pageY);
			nMove++;
			}
    });
    document.addEventListener('mouseup', function(e) {
        e.preventDefault();
		if(nMove<2){
	        if(showbtn) curmtime=menutime;
			else showmenu();
			}
    });
    // chrome / safari / IE
    this.element.onmousewheel = function(e) {
        var delta = e.deltaY ? e.deltaY : e.wheelDelta ? -e.wheelDelta :
            -e.wheelDeltaY * 0.2;
        self.zoomCamera(delta);
        e.preventDefault();
    };
    // firefox
    this.element.addEventListener("DOMMouseScroll", function(e) {
        self.zoomCamera(e.detail * 5);
        e.preventDefault();
    });
    this.element.addEventListener("dblclick", function(e) {
            if (showbtn) {
                hidemenu();
            } else {
                showmenu();
            }
    }, false);

document.addEventListener('fullscreenchange', changeFullScreenHandler);
document.addEventListener('mozfullscreenchange', changeFullScreenHandler);
document.addEventListener('webkitfullscreenchange', changeFullScreenHandler);

    function changeFullScreenHandler(event) {
	if ((document.fullScreenElement && document.fullScreenElement !== null) ||(!document.mozFullScreen && !document.webkitIsFullScreen)) {
		nFull=0;
		button6.innerHTML="Full";
		}
	else {
		nFull=1;
		button6.innerHTML="Close";
		}
    	}

function menutimer(){
	setTimeout(menutimer, 100);
	if(curmtime<=0) return;
	curmtime--;
	if(curmtime<=0) hidemenu();
	}

function showmenu(){
//	document.body.style.cursor = 'default';
	document.getElementById("btn").style.visibility = "visible";
	if(isVideo) document.getElementById("controller-box").style.visibility = "visible";
	else document.getElementById("controller-box").style.visibility = "hidden";
	curmtime=menutime;
	showbtn = true;
	}

function hidemenu(){
//	document.body.style.cursor = 'none';
	document.getElementById("btn").style.visibility = "hidden";
	document.getElementById("controller-box").style.visibility = "hidden";
    showbtn = false;
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
		var docElm = document.getElementById(document.body);
		if (document.body.webkitRequestFullscreen) {
			document.body.webkitRequestFullscreen(); //Chrome15+, Safari5.1+, Opera15+
		} else if (document.body.mozRequestFullScreen) {
			document.body.mozRequestFullScreen(); //FF10+
		} else if (document.body.msRequestFullscreen) {
			document.body.msRequestFullscreen(); //IE11+
		} else if (document.body.requestFullscreen) {
			document.body.requestFullscreen(); // HTML5 Fullscreen API仕様
		} else {
			alert('Your browser does not support full screen operation');
			return;
		}
	}

function fullscreenoff(){
		if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen(); //Chrome15+, Safari5.1+, Opera15+
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen(); //FF10+
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen(); //IE11+
		} else if(document.cancelFullScreen) {
			document.cancelFullScreen(); //Gecko:FullScreenAPI仕様
		} else if(document.exitFullscreen) {
			document.exitFullscreen(); // HTML5 Fullscreen API仕様
		}
	}

function KeyDownFunc(e){
        var Keynum;
        if (window.event) Keynum = e.keyCode; // IE
        else if (e.which) Keynum = e.which;
    //    button6.innerHTML=""+Keynum;
        if (Keynum == 32 || Keynum == 220 || Keynum == 176 || Keynum == 227) { //Next image
			e.preventDefault();
			next();
        } else if (Keynum == 8 || Keynum == 186 || Keynum == 222 || Keynum == 177 ||
            Keynum == 228) { //Previous image
			e.preventDefault();
            prev();
        } else if (Keynum == 80 || Keynum == 189 || Keynum == 179 || Keynum == 219) { //Effect
            if (video.paused) {
                video.play();
                timeall = 0;
                timecnt = 0;
            } else {
                video.pause();
                timeall = 0;
                timecnt = 0;
            }
        } else if (Keynum == 0 || Keynum == 83) { //Stereo
            stType++;
            if (stType > 8) stType = 0;
            setstereomode(stType);
		} else if (Keynum == 37) { //←
			dltx+=dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 39) { //→
			dltx-=dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 38) { //↑
			dlty-=dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 40) { //↓
			dlty+=dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 75) { //K:rot+
			rota+=dltr;
			showmenu();
		} else if (Keynum == 76) { //L:rot-
			rota-=dltr;
			showmenu();
		} else if (Keynum == 36 || Keynum == 67) { //Home or C
			dltx=0;
			dlty=0;
			rota=0;
			showmenu();
        } else if (Keynum == 88) { //Swap
            swap = !swap;
        } else if (Keynum == 81) { //Q:quit
            history.go(-1);
        } else if (Keynum == 77) { //M
            if (showbtn) {
                hidemenu();
            } else {
                showmenu();
            }
        } else if(Keynum==13) {	//Enter : Full screen ON/OFF
	    toggleFullScreen();
	} else if (Keynum == 32) { //Menu Hide
            if (showbtn) {
                document.getElementById("btn").style.visibility =
                    "hidden";
                showbtn = false;
            } else {
                document.getElementById("btn").style.visibility =
                    "visible";
                showbtn = true;
            }
        }
    }

    // iOS
function permission_request() {
    if(!bFirst) return;
    bFirst=false;
    if ( DeviceOrientationEvent
		    && DeviceOrientationEvent.requestPermission
				&& typeof DeviceOrientationEvent.requestPermission === 'function'
		) {
        DeviceOrientationEvent.requestPermission().then();
	    window.addEventListener("deviceorientation", function(e) {
	        if (e.alpha) {
	            if (devrot) self.setCameraDir(self.d2r(e.alpha), self.d2r(
	                e.beta), self.d2r(e.gamma));
	            if (Math.abs(e.gamma) < 10) {
	                nPage = 2;
	            } else if (Math.abs(e.gamma) > 40 && nPage == 2) {
	                nPage = 1;
	            }
	            if (nPage == 1) {
	                nPage = 0;
	            } else {}
	        }
	    });
    }
	else{
	    window.addEventListener("deviceorientation", function(e) {
	        if (e.alpha) {
	            if (devrot) self.setCameraDir(self.d2r(e.alpha), self.d2r(
	                e.beta), self.d2r(e.gamma));
	            if (Math.abs(e.gamma) < 10) {
	                nPage = 2;
	            } else if (Math.abs(e.gamma) > 40 && nPage == 2) {
	                nPage = 1;
	            }
	            if (nPage == 1) {
	                nPage = 0;
	            } else {}
	        }
	    });
	}
   }



window.focus();
if(window.addEventListener){

	// キーボードを押したときに実行されるイベント
	window.addEventListener("keydown" , KeyDownFunc);

// アタッチイベントに対応している
}else if(document.attachEvent){

	// キーボードを押したときに実行されるイベント
	document.attachEvent("onkeydown" , KeyDownFunc);

}


    window.addEventListener('resize', function(e) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (stType == 1) camera.aspect = window.innerWidth / (
            window.innerHeight * 2);
        else camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        effect.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("orientationchange", function(e) {
			setTimeout(function(){
				doresize();
			}, 100);
		});

function videoend(){
	video.currentTime = 0;video.play();
	}

function prev(){
            if (deffile) {
                self.imageNo = self.imageNo - 2;
                if (self.imageNo < 0) self.imageNo = self.file.length -
                    2;
            } else {
                self.imageNo = self.imageNo - 1;
                if (self.imageNo < 0) self.imageNo = files.length -
                    1;
            }
            loadfiletotex(self.imageNo);
}

function next(){
        if (deffile) {
            self.imageNo = self.imageNo + 2;
            if (self.imageNo > self.file.length - 1) self.imageNo = 0;
        } else {
            self.imageNo = self.imageNo + 1;
            if (self.imageNo > files.length - 1) self.imageNo = 0;
        }
        loadfiletotex(self.imageNo);
	}

function doresize(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        if (stType == 1) camera.aspect = window.innerWidth / (
            window.innerHeight * 2);
        else camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        effect.setSize(window.innerWidth, window.innerHeight);
}
    window.onpagehide = function() {
		if(video!=null){
	        if (!video.paused) {
	            video.pause();
	            video.currentTime = 0;
	        }
		}
    }
    this.element.addEventListener('dragover', function(event) {
        event.preventDefault();
    }, false);
    this.element.addEventListener('drop', function(event) {
        event.preventDefault();
        files = event.dataTransfer.files; // FileList object
        if (files.length > 0) {
            deffile = false;
            self.imageNo = 0;
            loadfiletotex(self.imageNo);
        }
    }, false);
    button1.onclick = function() { //Previous
        prev();
    }
    button2.onclick = function() { //Next
        next();
    }
    button3.onclick = function() { //Swap
        swap = !swap;
    }
    button4.onclick = function() { //PLAY
		if(isVideo){
	        if (video.paused) {
	            video.play();
	            timeall = 0;
	            timecnt = 0;
	        } else {
	            video.pause();
	            timeall = 0;
	            timecnt = 0;
	        }
		}
		else{
	//		location.reload(false);
		}
    }
    button5.onclick = function() { //Devaice rotation
        devrot = !devrot;
		if(devrot) permission_request();
		cangle=-1;

    }
    button6.onclick = function() { //Page reload
//        location.reload(false);
	toggleFullScreen();
    }
    button9.onclick = function() {
		history.go(-1);
    }
    button0.onclick = function() { //Stereo
    }
    button20.onclick = function() {
        setstereomode(1);
    }
    button29.onclick = function() {
        setstereomode(2);
    }
    button22.onclick = function() {
        setstereomode(3);
    }
    button23.onclick = function() {
        setstereomode(4);
    }
    button24.onclick = function() {
        setstereomode(5);
    }
    button25.onclick = function() {
        setstereomode(6);
    }
    button27.onclick = function() {
        setstereomode(7);
    }
    button28.onclick = function() {
        setstereomode(8);
    }
    button35.onclick = function() {
        setstereomode(0);
    }
	button51.onclick=function(){
		window.open( "https://suto.bex.jp/html5/help/jpn/3d180/index.html");
	}

	button52.onclick=function(){
		window.open( "https://suto.bex.jp/html5/help/eng/3d180/index.html");
	}

	button53.onclick=function(){
		alert(verno);
	}
	button54.onclick=function(){
		bClear=true;
		try{
			localStorage.clear();
		}catch(err) {
			var expire = new Date();
			expire.setTime( expire.getTime() + 1000 * 3600 * 24 );
			var nCok=""+ stmov + "&" + st180 + "&" + st360;
			document.cookie = "" + nCok +"; expires=" + expire.toUTCString();
			}
		location.reload();
	}
	button31.onclick=function(){
		video.pause();
		video.currentTime = 0.0;
	}
	button32.onclick=function(){
		if(video.volume <= 0.90 && !video.muted) video.volume = video.volume + 0.10;
		vlevel=video.volume;
		showstatus();
	}
	button33.onclick=function(){
		if(!video.muted) video.volume = video.volume - 0.10;
		vlevel=video.volume;
		showstatus();
	}
	button34.onclick=function(){
		video.muted = video.muted ? false : true;
		vmuted=video.muted;
	}

	// プログレスバー長さ更新
	const progressOut = document.getElementById("progress-out");
	const progressIn = document.getElementById("progress-in");

    var geometry;
    var material;
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(this.zoom, this.width / this.height);
    camera.position = new THREE.Vector3(0, 0, 0);
    camera.lookAt(cameraDir);
    camera.rotation.order = 'ZXY';
    scene.add(camera);
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    this.texture = new Array(this.file.length * 2);
    var canvas = document.createElement('canvas');
    canvas.height = 1024;
    canvas.width = 1024;
    texturel = new THREE.Texture(canvas);
    texturer = new THREE.Texture(canvas);
    loadfiletotex(self.imageNo);

	function showstatus(){
		document.getElementById("progtime").innerHTML="Time: "+video.currentTime.toFixed(1)+"/"+video.duration.toFixed(1);
		if(video.muted) document.getElementById("volumelevel").innerHTML="Volume: muted";
		else document.getElementById("volumelevel").innerHTML="Volume:" + (video.volume*100).toFixed(0) + "%";
		}

    function loadfiletotex(ncnt) {
        if (!deffile) {
            loadfiletotex2(ncnt);
            return;
        }
        if (isStart) {
            cancelAnimationFrame(_animationID);
            texturel.dispose();
            texturel = null;
            texturer.dispose();
            texturer = null;
            if (video) {
                video.pause();
                video.currentTime = 0;
                video = null;
            }
        }
		if(Filenamedisplay) message="("+((ncnt/2)+1)+"/"+ (self.file.length/2) + ") " + self.file[ncnt + 1];
		else message=""+((ncnt/2)+1)+"/"+ (self.file.length/2);
        if (self.file[ncnt] == 'm') {
            ChangeCanvas = true;
            video = document.createElement('video');

			video.addEventListener('timeupdate', function () {
				if(video!=null){
					progressIn.style.transform = "scaleX(" + video.currentTime / video.duration + ")";
					showstatus();
					}
				});

			progressOut.addEventListener('click', function (e) {
				const percent = (e.pageX - (progressOut.getBoundingClientRect().left + window.pageXOffset)) / progressOut.clientWidth;
				video.currentTime = video.duration * percent;
				});

			progressOut.addEventListener('mousemove', function (e) {
				if(self.mousedown){
					const percent = (e.pageX - (progressOut.getBoundingClientRect().left + window.pageXOffset)) / progressOut.clientWidth;
					video.currentTime = video.duration * percent;
					progressIn.style.transform = "scaleX(" + video.currentTime / video.duration + ")";
					showstatus();
					}
				});

	    	video.addEventListener('ended', function () {
	          videoend();
	        }, true);

            video.src = self.file[ncnt + 1];
			video.setAttribute('playsinline', '');
            video.play();
            isVideo = true;
			video.volume = vlevel;
			video.muted = vmuted;
			document.getElementById("progtime").innerHTML="Push Play button!";
            timeall = 0;
            timecnt = 0;
			if (showbtn) showmenu();
            isStart = true;
			render();
        } else if (self.file[ncnt] == 'p') {
            var img;
            img = document.createElement('img');
            var imgload = false;
            img.onload = (function(e) {
                if (canvasl == null) canvasl = document.createElement(
                    'canvas');
                canvasl.height = img.height;
                canvasl.width = img.width/2;
                var ctxl = canvasl.getContext('2d');
                ctxl.drawImage(img, 0, 0, img.width/2, img.height, 0, 0, canvasl.width, canvasl.height);
				ctxl.lineWidth = 5;
				ctxl.strokeStyle = 'rgb(0, 0, 0)';
				ctxl.strokeRect(2, 2, canvasl.width-4, canvasl.height-4);
                texturel = new THREE.Texture(canvasl);
                texturel.flipY = false;
                texturel.needsUpdate = true;
                if (canvasr == null) canvasr = document.createElement(
                    'canvas');
                canvasr.height = img.height;
                canvasr.width = img.width/2;
                var ctxr = canvasr.getContext('2d');
                ctxr.drawImage(img, img.width/2, 0, img.width/2,img.height, 0, 0, canvasr.width, canvasr.height);
				ctxr.lineWidth = 5;
				ctxr.strokeStyle = 'rgb(0, 0, 0)';
				ctxr.strokeRect(2, 2, canvasr.width-4, canvasr.height-4);
                texturer = new THREE.Texture(canvasr);
                texturer.flipY = false;
                texturer.needsUpdate = true;
                isVideo = false;
                isStart = true;
				if (showbtn) showmenu();
                render();
            });
            img.src = self.file[ncnt + 1];
        }
    }

    function loadfiletotex2(ncnt) {
            cancelAnimationFrame(_animationID);
            texturel.dispose();
            texturel = null;
            texturer.dispose();
            texturer = null;
            if (video) {
                video.pause();
                video.currentTime = 0;
                video = null;
            }
            var file = files[ncnt];
			if(Filenamedisplay) message="("+(ncnt+1)+"/"+(files.length)+") " + file.name;
			else message=""+(ncnt+1)+"/"+(files.length);
            var createObjectURL = window.URL && window.URL.createObjectURL ?
                function(file) {
                    return window.URL.createObjectURL(file);
                } : window.webkitURL && window.webkitURL.createObjectURL ?
                function(file) {
                    return window.webkitURL.createObjectURL(file);
                } : undefined;
            if (file.type.substring(0, 5) === 'video') {
                ChangeCanvas = true;
                video = document.createElement('video');

				video.addEventListener('timeupdate', function () {
					if(video!=null){
						progressIn.style.transform = "scaleX(" + video.currentTime / video.duration + ")";
						showstatus();
						}
					});

				progressOut.addEventListener('click', function (e) {
					const percent = (e.pageX - (progressOut.getBoundingClientRect().left + window.pageXOffset)) / progressOut.clientWidth;
					video.currentTime = video.duration * percent;
					});

				progressOut.addEventListener('mousemove', function (e) {
					if(self.mousedown){
						const percent = (e.pageX - (progressOut.getBoundingClientRect().left + window.pageXOffset)) / progressOut.clientWidth;
						video.currentTime = video.duration * percent;
						progressIn.style.transform = "scaleX(" + video.currentTime / video.duration + ")";
						showstatus();
						}
					});

		    	video.addEventListener('ended', function () {
		          videoend();
		        }, true);

                video.src = createObjectURL(file);
				video.setAttribute('playsinline', '');

                video.play();
                isVideo = true;
				video.volume = vlevel;
				video.muted = vmuted;
				document.getElementById("progtime").innerHTML="Push Play button!";
				if (showbtn) showmenu();
                render();
            } else {
                var img;
                img = document.createElement('img');
                var imgload = false;
                img.onload = (function(e) {
                    if (canvasl == null) canvasl = document.createElement(
                        'canvas');
                    canvasl.height = img.height;
                    canvasl.width = img.width/2;
                    var ctxl = canvasl.getContext('2d');
					ctxl.drawImage(img, 0, 0, img.width/2, img.height, 0, 0, canvasl.width, canvasl.height);
					ctxl.lineWidth = 5;
					ctxl.strokeStyle = 'rgb(0, 0, 0)';
					ctxl.strokeRect(2, 2, canvasl.width-4, canvasl.height-4);
                    texturel = new THREE.Texture(canvasl);
                    texturel.flipY = false;
                    texturel.needsUpdate = true;
                    if (canvasr == null) canvasr = document.createElement(
                        'canvas');
                    canvasr.height = img.height;
                    canvasr.width = img.width/2;
                    var ctxr = canvasr.getContext('2d');
                    ctxr.drawImage(img, img.width/2, 0, img.width/2,img.height, 0, 0, canvasr.width, canvasr.height);
					ctxr.lineWidth = 5;
					ctxr.strokeStyle = 'rgb(0, 0, 0)';
					ctxr.strokeRect(2, 2, canvasr.width-4, canvasr.height-4);
                    texturer = new THREE.Texture(canvasr);
                    texturer.flipY = false;
                    texturer.needsUpdate = true;
                    isVideo = false;
					isStart = true;
					if (showbtn) showmenu();
                    render();
                });
                img.src = createObjectURL(file);
            }
        }

    geometry = new THREE.SphereBufferGeometry(100, 128, 64);
    geometry.scale(1, 1, 1);
    var uvs = geometry.attributes.uv.array;
    for (var i = 0; i < uvs.length; i+=2) {
      uvs[i] *= 2;
      uvs[i] -= 1;
    }

    material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        color: 0xffffff,
        specular: 0xcccccc,
        shininess: 50,
        ambient: 0xffffff,
        map: texturel
    });
//	material.map.minFilter = THREE.LinearFilter;
    ///////// MESH
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.y = 0;
    plane.rotation.x = Math.PI;
  //  plane.rotation.x += this.degree[0];
  //  plane.rotation.y += this.degree[1];
  //  plane.rotation.z += this.degree[2];
	initx=plane.rotation.x;
	inity=plane.rotation.y;
	initz=plane.rotation.z;
    scene.add(plane);

    function setstereomode(stn) {
		if(effect!=null){
	        effect.dispose();
	        effect = null;
			}
        stType = stn;
        var width = window.innerWidth;
        var height = window.innerHeight;
        if (stType==3 || stType==4 || stType==5) effect = new THREE.AnaglyphEffect(renderer,
            stType - 3);
        else if (stType < 3 || stType>7) effect = new THREE.StereoEffect(renderer,
            stType);
        else if (stType == 7)  effect = new THREE.ParallaxBarrierEffect2(renderer);
	else effect = new THREE.ParallaxBarrierEffect(renderer);
        effect.setSize(width, height);
        if (stType == 1) camera.aspect = window.innerWidth/(window.innerHeight*2);
        else camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
    };
    setstereomode(stType);

    function makeframe() {
			if (video==null) return;
            if (video.paused) return;
            vw = video.videoWidth;
            vh = video.videoHeight;
            if (vw > 0 && vh > 0 && ChangeCanvas) {
                ChangeCanvas = false;
                if (canvas == null) canvas = document.createElement(
                    'canvas');
                canvas.height = vh;
                canvas.width = vw;
				if (ctx == null) ctx = canvas.getContext('2d');
                if (canvasl == null) canvasl = document.createElement(
                    'canvas');
                canvasl.height = vh;
                canvasl.width = vw/2;
                ctxl = canvasl.getContext('2d');
                texturel = new THREE.Texture(canvasl);
                texturel.flipY = false;
                if (canvasr == null) canvasr = document.createElement(
                    'canvas');
                canvasr.height = vh;
                canvasr.width = vw/2;
                ctxr = canvasr.getContext('2d');
                texturer = new THREE.Texture(canvasr);
                texturer.flipY = false;
            }
	//		ctx.drawImage(video,0,0);
    //        ctxl.drawImage(canvas, 0, 0, vw/2, vh, canvasl.width*0.01, canvasl.height*0.01, canvasl.width*0.98, canvasl.height*0.98);
    //        if (texturel != null) texturel.needsUpdate = true;
    //        ctxr.drawImage(canvas, vw/2, 0, vw/2, vh, canvasr.width*0.01, canvasr.height*0.01, canvasr.width*0.98, canvasr.height*0.98);
    //        if (texturer != null) texturer.needsUpdate = true;
            try {
				ctxl.drawImage(video, 0, 0, vw/2, vh, 0, 0, canvasl.width, canvasl.height);
				ctxl.lineWidth = 5;
				ctxl.strokeStyle = 'rgb(0, 0, 0)';
				ctxl.strokeRect(2, 2, canvasl.width-4, canvasl.height-4);
	            if (texturel != null) texturel.needsUpdate = true;
	            ctxr.drawImage(video, vw/2, 0, vw/2, vh, 0, 0, canvasr.width, canvasr.height);
				ctxr.lineWidth = 5;
				ctxr.strokeStyle = 'rgb(0, 0, 0)';
				ctxr.strokeRect(2, 2, canvasr.width-4, canvasr.height-4);
	            if (texturer != null) texturer.needsUpdate = true;
				}
			catch(err) {}

        }

    function render() {
		_animationID = requestAnimationFrame(render);
        if (effect != null && isStart) {
            var time1;
            var time2;
            var startT = new Date();
            time1 = startT.getTime();
			if(is1st){
				showmenu();
				setTimeout(menutimer, 100);
				is1st=false;
				}
            if ((self.rotation)) {
                self.mesh.rotation.y += self.speed;
                if (self.sync) {
                    self.sync.mesh.rotation.y += self.speed;
                }
            }
            if (isVideo && isStart) makeframe();

			if(texturel!=null && texturer!=null){
				texturel.anisotropy = renderer.getMaxAnisotropy();
				texturer.anisotropy = renderer.getMaxAnisotropy();
				}

            if (swap) material.map = texturel;
            else material.map = texturer;
			plane.rotation.set(initx+dlty * Math.PI / 180,inity+dltx * Math.PI / 180,initz+rota * Math.PI / 180);
            effect.render0(scene, camera);
            if (swap) material.map = texturer;
            else material.map = texturel;
			plane.rotation.set(initx-dlty * Math.PI / 180,inity-dltx * Math.PI / 180,initz-rota * Math.PI / 180);
            effect.render(scene, camera);
            var endT = new Date();
            time2 = endT.getTime();
            var dtime = time2 - time1;
            timecnt++;
            timeall = timeall + dtime;
            dtime = timeall / timecnt;
            dtime = (parseInt(dtime * 100)) / 100;
            var stname = " ";
            var swpname = " ";
            if (stType == 0) stname = "2D ";
            else if (stType == 1) stname = "SBS ";
            else if (stType == 2) stname = "LR/RL ";
            else if (stType == 3) stname = "Dubois ";
            else if (stType == 4) stname = "Color ";
            else if (stType == 5) stname = "Glay ";
            else if (stType == 6) stname = "H_Int ";
            else if (stType == 7) stname = "3DLCD ";
            else if (stType == 8) stname = "HSBS ";
            if (swap) swpname = "L/R ";
            else swpname = "R/L ";
            button0.innerHTML = "" + stname;
            button3.innerHTML = " " + swpname;
            if (devrot) button5.innerHTML = " Dev ";
            else button5.innerHTML = " Tch ";
			if(dltx!=0 || dlty!=0 || rota!=0) document.getElementById("filename").innerHTML="X="+dltx.toFixed(1)+",Y="+dlty.toFixed(1)+",R="+rota.toFixed(1);
			else document.getElementById("filename").innerHTML=message;
            if (isVideo && video!=null) {
                if (video.paused) button4.innerHTML = " Play ";
                else button4.innerHTML = " Pause";
            } else button4.innerHTML = " Still";
        }
    };
    render();
}

THREE.StereoEffect = function(renderer, stType) {
    this.setSize = function(width, height) {
        renderer.setSize(width, height);
    };
    this.render0 = function(scene, camera, eyemode) {
        scene.updateMatrixWorld();
        if (camera.parent === null) camera.updateMatrixWorld();
        var size = renderer.getSize();
		var sw=size.width*98 / 200;
		var sh=size.height*98 / 200;
		var sw0=size.width*15 / 2000;
		var sh0=size.height*15 / 2000;
        renderer.setScissorTest(true);
        renderer.clear();
        var sw;
        if (stType == 0) {
	        renderer.setScissor(0, 0, size.width, size.height);
	        renderer.setViewport(0, 0, size.width, size.height);
			}
        else if (stType == 2) {
			renderer.setScissor( size.width-sw-sw0, sh0, sw, sh );
			renderer.setViewport( size.width-sw-sw0, sh0+size.height/2-size.height*zoomfac/200, sw*zoomfac/100, sh*zoomfac/100 );
			renderer.render(scene, camera);
			renderer.setScissor( sw0, size.height-sh-sh0, sw, sh );
			renderer.setViewport( sw0+size.width/2-size.width*zoomfac/200, size.height-sh-sh0, sw*zoomfac/100, sh*zoomfac/100 );
			}
        else if (stType == 8) {
	        renderer.setScissor(0, 0, size.width/2, size.height);
        	renderer.setViewport(size.width/2-size.width/2, size.height-size.height, size.width/2, size.height);
			}
        else {
	        renderer.setScissor(0, 0, size.width/2, size.height);
        	renderer.setViewport(size.width/2-size.width*zoomfac/200, size.height-size.height*zoomfac/100, size.width*zoomfac/200, size.height*zoomfac/100);
			}
        renderer.render(scene, camera);
    };
    this.render = function(scene, camera, eyemode) {
        if (stType == 0) return;
        var size = renderer.getSize();
		var sw=size.width*98 / 200;
		var sh=size.height*98 / 200;
		var sw0=size.width*15 / 2000;
		var sh0=size.height*15 / 2000;
        if (stType == 2) {
			renderer.setScissor( sw0, sh0, sw, sh );
			renderer.setViewport( sw0+size.width/2-size.width*zoomfac/200, sh0+size.height/2-size.height*zoomfac/200, sw*zoomfac/100, sh*zoomfac/100 );
			renderer.render(scene, camera);
			renderer.setScissor( size.width-sw-sw0, size.height-sh-sh0, sw, sh );
			renderer.setViewport( size.width-sw-sw0, size.height-sh-sh0, sw*zoomfac/100, sh*zoomfac/100 );
			}
        else if (stType == 8) {
	        renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
			renderer.setViewport(size.width / 2, size.height-size.height, size.width/2, size.height);
			}
		else{
	        renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
			renderer.setViewport(size.width / 2, size.height-size.height*zoomfac/100, size.width*zoomfac/200, size.height*zoomfac/100);
			}
        renderer.render(scene, camera);
        renderer.setScissorTest(false);
    };
    this.dispose = function() {};
};
THREE.ParallaxBarrierEffect = function(renderer, width, height) {
    var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var _scene = new THREE.Scene();
    var _params = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat
    };
    var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
    var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);
    var _material = new THREE.ShaderMaterial({
        uniforms: {
            "mapLeft": {
                type: "t",
                value: _renderTargetL
            },
            "mapRight": {
                type: "t",
                value: _renderTargetR
            }
        },
        vertexShader: ["varying vec2 vUv;", "void main() {",
            "	vUv = vec2( uv.x, uv.y );",
            "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
            "}"
        ].join("\n"),
        fragmentShader: ["uniform sampler2D mapLeft;",
            "uniform sampler2D mapRight;", "varying vec2 vUv;",
            "void main() {", "	vec2 uv = vUv;",
            "	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {",
            "		gl_FragColor = texture2D( mapLeft, uv );",
            "	} else {",
            "		gl_FragColor = texture2D( mapRight, uv );", "	}",
            "}"
        ].join("\n")
    });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2),
        _material);
    _scene.add(mesh);
    this.setSize = function(width, height) {
        renderer.setSize(width, height);
        var pixelRatio = renderer.getPixelRatio();
        _renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
        _renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
    };
    this.render0 = function(scene, camera, bSwap) {
        scene.updateMatrixWorld();
        if (camera.parent === null) camera.updateMatrixWorld();
        renderer.render(scene, camera, _renderTargetL, true);
    };
    this.render = function(scene, camera, bSwap) {
        renderer.render(scene, camera, _renderTargetR, true);
        renderer.render(_scene, _camera);
    };
    this.dispose = function() {
        if (_renderTargetL) _renderTargetL.dispose();
        if (_renderTargetR) _renderTargetR.dispose();
        _scene.remove(mesh);
        _material.dispose();
    };
};
THREE.ParallaxBarrierEffect2 = function(renderer, width, height) {
    var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var _scene = new THREE.Scene();
    var _params = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat
    };
    var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
    var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);
    var _material = new THREE.ShaderMaterial({
        uniforms: {
            "mapLeft": {
                type: "t",
                value: _renderTargetL
            },
            "mapRight": {
                type: "t",
                value: _renderTargetR
            }
        },
        vertexShader: ["varying vec2 vUv;", "void main() {",
            "	vUv = vec2( uv.x, uv.y );",
            "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
            "}"
        ].join("\n"),
        fragmentShader: ["uniform sampler2D mapLeft;",
            "uniform sampler2D mapRight;", "varying vec2 vUv;",
            "void main() {", "	vec2 uv = vUv;",
	    "	if ( gl_FragCoord.x > 2048.0 ) {",
 	    "	gl_FragColor = vec4(0.2,0.2,0.2,1.0);}",
            "	else if ( ( mod( gl_FragCoord.x, 2.0 ) ) > 0.80 ) {",
            "		gl_FragColor = texture2D( mapRight, uv );",
            "	} else {",
            "		gl_FragColor = texture2D( mapLeft, uv );", "	}",
            "}"
        ].join("\n")
    });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2),
        _material);
    _scene.add(mesh);
    this.setSize = function(width, height) {
        renderer.setSize(width, height);
        var pixelRatio = renderer.getPixelRatio();
        _renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
        _renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
    };
    this.render0 = function(scene, camera, bSwap) {
        scene.updateMatrixWorld();
        if (camera.parent === null) camera.updateMatrixWorld();
        renderer.render(scene, camera, _renderTargetL, true);
    };
    this.render = function(scene, camera, bSwap) {
        renderer.render(scene, camera, _renderTargetR, true);
        renderer.render(_scene, _camera);
    };
    this.dispose = function() {
        if (_renderTargetL) _renderTargetL.dispose();
        if (_renderTargetR) _renderTargetR.dispose();
        _scene.remove(mesh);
        _material.dispose();
    };
};
THREE.AnaglyphEffect = function(renderer, stType) {
    // Matrices generated with angler.js https://github.com/tschw/angler.js/
    // (in column-major element order, as accepted by WebGL)
    if (stType == 2) {
        this.colorMatrixLeft = new THREE.Matrix3().fromArray([
            0.299, 0, 0, // r out
            0.587, 0, 0, // g out
            0.114, 0, 0 // b out
        ]);
        //		red						green 						blue  						in
        this.colorMatrixRight = new THREE.Matrix3().fromArray([
            0, 0.299, 0.299, // r out
            0, 0.587, 0.587, // g out
            0, 0.114, 0.114 // b out
        ]);
    } else if (stType == 1) {
        this.colorMatrixLeft = new THREE.Matrix3().fromArray([
            1, 0, 0, // r out
            0, 0, 0, // g out
            0, 0, 0 // b out
        ]);
        //		red						green 						blue  						in
        this.colorMatrixRight = new THREE.Matrix3().fromArray([
            0, 0, 0, // r out
            0, 1, 0, // g out
            0, 0, 1 // b out
        ]);
    } else {
        this.colorMatrixLeft = new THREE.Matrix3().fromArray([
            0.456100, -0.0400822, -0.0152161, // r out
            0.500484, -0.0378246, -0.0205971, // g out
            0.176381, -0.0157589, -0.00546856 // b out
        ]);
        //		red						green 						blue  						in
        this.colorMatrixRight = new THREE.Matrix3().fromArray([-0.0434706,
            0.378476, -0.0721527, // r out
            -0.0879388, 0.73364, -0.112961, // g out
            -0.00155529, -0.0184503, 1.2264 // b out
        ]);
    }
    var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var _scene = new THREE.Scene();
    var _params = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat
    };
    var _renderTargetL = new THREE.WebGLRenderTarget(512, 512, _params);
    var _renderTargetR = new THREE.WebGLRenderTarget(512, 512, _params);
    var _material = new THREE.ShaderMaterial({
        uniforms: {
            "mapLeft": {
                type: "t",
                value: _renderTargetL
            },
            "mapRight": {
                type: "t",
                value: _renderTargetR
            },
            "colorMatrixLeft": {
                type: "m3",
                value: this.colorMatrixLeft
            },
            "colorMatrixRight": {
                type: "m3",
                value: this.colorMatrixRight
            }
        },
        vertexShader: ["varying vec2 vUv;", "void main() {",
            "	vUv = vec2( uv.x, uv.y );",
            "	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
            "}"
        ].join("\n"),
        fragmentShader: ["uniform sampler2D mapLeft;",
            "uniform sampler2D mapRight;", "varying vec2 vUv;",
            "uniform mat3 colorMatrixLeft;",
            "uniform mat3 colorMatrixRight;",
            // These functions implement sRGB linearization and gamma correction
            "float lin( float c ) {",
            "	return c <= 0.04045 ? c * 0.0773993808 :",
            "			pow( c * 0.9478672986 + 0.0521327014, 2.4 );",
            "}", "vec4 lin( vec4 c ) {",
            "	return vec4(  c.r ,  c.g ,  c.b , c.a );", "}",
            "float dev( float c ) {",
            "	return c <= 0.0031308 ? c * 12.92",
            "			: pow( c, 0.41666 ) * 1.055 - 0.055;", "}",
            "void main() {", "	vec2 uv = vUv;",
            "	vec4 colorL = lin( texture2D( mapLeft, uv ) );",
            "	vec4 colorR = lin( texture2D( mapRight, uv ) );",
            "	vec3 color = clamp(",
            "			colorMatrixLeft * colorL.rgb +",
            "			colorMatrixRight * colorR.rgb, 0., 1. );",
            "	gl_FragColor = vec4(",
            "			 color.r ,  color.g ,  color.b ,",
            "			max( colorL.a, colorR.a ) );", "}"
        ].join("\n")
    });
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2),
        _material);
    _scene.add(mesh);
    this.setSize = function(width, height) {
        renderer.setSize(width, height);
        var pixelRatio = renderer.getPixelRatio();
        _renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
        _renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
    };
    this.render0 = function(scene, camera, bSwap) {
        scene.updateMatrixWorld();
        if (camera.parent === null) camera.updateMatrixWorld();
        renderer.render(scene, camera, _renderTargetL, true);
    };
    this.render = function(scene, camera, bSwap) {
        renderer.render(scene, camera, _renderTargetR, true);
        renderer.render(_scene, _camera);
    };
    this.dispose = function() {
        if (_renderTargetL) _renderTargetL.dispose();
        if (_renderTargetR) _renderTargetR.dispose();
        _scene.remove(mesh);
        _material.dispose();
    };
};

