<html>
<head>
	<script type="text/javascript" src="js/glMatrix-0.9.5.min.js"></script>
	<script id="shader-fs" type="x-shader/x-fragment">
	    precision mediump float;

	    varying vec4 vColor;

	    void main(void) {
	        gl_FragColor = vColor;
	    }
	</script>

	<script id="shader-vs" type="x-shader/x-vertex">
	    attribute vec3 aVertexPosition;
	    attribute vec4 aVertexColor;

	    uniform mat4 uMVMatrix;
	    uniform mat4 uPMatrix;

	    varying vec4 vColor;

	    void main(void) {
	        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	        vColor = aVertexColor;
	    }
	</script>
	<script type="text/javascript" src="js/webGL.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
	<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
	<link href="css/modals.css" rel="stylesheet">
	<script language="javascript"  type="text/javascript" src="js/modals.js"> </script>	
	<?php include "modals.html"; ?>   
	<link href="css/main.css" rel="stylesheet">
	<script language="javascript" type="text/javascript" src="js/items.js"></script>	
	<script language="javascript" type="text/javascript" src="js/quests.js"></script>
	<script language="javascript" type="text/javascript" src="js/people.js"></script>
	<script language="javascript" type="text/javascript" src="js/game.js"></script>
	<script language="javascript" type="text/javascript" src="js/cookie.js"></script>
</head>
<body onload="webGLStart();">
<img src="./img/sprites.png" id="sprites">
<canvas id="battleCanvas">Your browser doesn't support this game. My condolences.</canvas>
<div id="gameDiv">
	<div><canvas id="myCanvas">Your browser doesn't support this game. My condolences.</canvas>
		<div id="sideContent" class="panel">
			<div id="sidePanel" class="panel">
				<ul>
					<!--This section introduces the tabs and titles them-->
					<li><a href="#tabs-1">Stats</a></li>
					<li><a href="#tabs-2">Equipment</a></li>
					<li><a href="#tabs-3">Inventory</a></li>
					<li><a href="#tabs-4">Quests</a></li>

				</ul>

				<!--This section creates the content within each tab-->
				<div id="tabs-1" class="tab">
					Stats:
					<div id="statBox">
						Name: <span id="nameStat">Hero</span><br>
						Health: <span id="healthStat">0/0</span><br>
						Gold: <span id="goldStat">0 G</span><br><br>
					</div>
				</div>
				<div id="tabs-2" class="tab">
					Equipment:
					<div id="equipmentBox">
					</div>
				</div>
				<div id="tabs-3" class="tab">
					Inventory:
					<div id="inventoryBox">No items in inventory.</div>
				</div>
				<div id="tabs-4" class="tab">
					Quests:
					<div id="questBox">No active quests.</div>
				</div>

			</div>
			<div id="optionsPanel" class="panel">
					<button id="saveButton">Save</button>
					<button id="loadButton">Load</button>
					<button id="eraseButton">Erase Data</button>
					<button id="debugButton">Debug</button>
					<button id="clearButton">Clear</button><br>
					<button id="flexButton1">Talk To Master</button>
					<button id="flexButton2">Fight Master</button>
					<button id="flexButton3">Show</button>
					<button id="flexButton4">Hide</button>
			</div>
		</div>

	<div id="bottomPanel" class="panel">
		<div id="scrollBox"></div>
	</div>
</div>
<div id="bottomSpace">jordan-silver.com</div>
</body>
</html>