<html>
<head>
	<script type="text/javascript" src="js/glMatrix-0.9.5.min.js"></script>
	<script id="shader-fs" type="x-shader/x-fragment">
	    precision mediump float;

	    varying vec2 vTextureCoord;

	    uniform sampler2D uSampler;

	    void main(void) {
	        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
	    }
	</script>

	<script id="shader-vs" type="x-shader/x-vertex">
	    attribute vec3 aVertexPosition;
	    attribute vec2 aTextureCoord;

	    uniform mat4 uMVMatrix;
	    uniform mat4 uPMatrix;

	    varying vec2 vTextureCoord;


	    void main(void) {
	        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	        vTextureCoord = aTextureCoord;
	    }
	</script>
	<script type="text/javascript" src="js/webgl-utils.js"></script>
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
	<script language="javascript" type="text/javascript" src="js/dialog.js"></script>
	<script language="javascript" type="text/javascript" src="js/battle.js"></script>
	<script language="javascript" type="text/javascript" src="js/display.js"></script>
	<script language="javascript" type="text/javascript" src="js/cookie.js"></script>
	<script language="javascript" type="text/javascript" src="js/index.js"></script>
</head>
<body>
<img src="./img/sprites.png" id="sprites">
<div id="battleDiv">
	<canvas id="battleCanvas">Your browser doesn't support this game. My condolences.</canvas>
	<div id="battleHUD">
		<div id="innerHUD">
			My Health: <span id="healthHUD">20/20</span> XP: <span id="xpHUD"></span> XP
			<div id="enemyInfo">Enemy Health: <span id="enemyHealth">20/20</span></div>
		</div>
	</div>
	<div id="toastHolder">
		<div id="battleToast">Toast toast toast.</div>
	</div>
	<div id="toastHolder2">
		<div id="battleToast2">Toast toast toast.</div>
	</div>
	<div id="battleMenu">
		<div id="battleOption1" class="battleOption"><span class="underlined">1</span>. Attack</div>
		<div id="battleOption2" class="battleOption"><span class="underlined">2</span>. Use Item</div>
		<div id="battleOption3" class="battleOption"><span class="underlined">3</span>.</div>
		<div id="battleOption4" class="battleOption"><span class="underlined">4</span>. Run</div>
	</div>
</div>
<div id="gameDiv">
	<canvas id="myCanvas">Your browser doesn't support this game. My condolences.</canvas>
		<div id="sideContent" class="panel">
			<div id="sidePanel" class="panel">
				<ul>
					<!--This section introduces the tabs and titles them-->
					<li><a href="#tabs-1">Stats</a></li>
					<li><a href="#tabs-2"><span class="underlined">E</span>quipment</a></li>
					<li><a href="#tabs-3"><span class="underlined">I</span>nventory</a></li>
					<li><a href="#tabs-4"><span class="underlined">Q</span>uests</a></li>

				</ul>

				<!--This section creates the content within each tab-->
				<div id="tabs-1" class="tab">
					Stats:
					<div id="statBox">
						Name: <span id="nameStat">Hero</span><br>
						Health: <span id="healthStat">0/0</span><br><br>
						Gold: <span id="goldStat">0 G</span><br><br>
						Level: <span id="levelStat">0</span><br>
						XP: <span id="xpStat">0</span> XP<br><br>
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
					Active Quests:
					<div id="questBox">No active quests.</div>
					Completed Quests:
					<div id="completedQuestBox">No quests completed.</div>
				</div>

			</div>
			<div id="optionsPanel" class="panel">
					<button id="saveButton"><span class="underlined">S</span>ave</button>
					<button id="loadButton"><span class="underlined">L</span>oad</button>
					<button id="eraseButton">Erase Data</button>
					<button id="debugButton"><span class="underlined">D</span>ebug</button>
					<button id="clearButton">Clear</button><br>
					<button id="flexButton1">Talk To Master</button>
					<button id="flexButton2">Fight Master</button>
				<!-- 	<button id="flexButton3">Show</button>
					<button id="flexButton4">Hide</button> -->
					<button id="flexButton5">Generic Encounter</button>
			</div>
		</div>

	<div id="bottomPanel" class="panel">
		<div id="scrollBox"></div>
	</div>
</div>
<div id="bottomSpace">jordan-silver.com</div>
</body>
</html>