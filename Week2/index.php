<html>
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
<body>
<div id="gameDiv">
	<div><canvas id="myCanvas"></canvas>
		<div id="sideContent" class="panel">
			<div id="sidePanel" class="panel">
				<ul>
					<!--This section introduces the tabs and titles them-->
					<li><a href="#tabs-1">Stats</a></li>
					<li><a href="#tabs-2">Equipment</a></li>
					<li><a href="#tabs-3">Quests</a></li>
				</ul>

				<!--This section creates the content within each tab-->
				<div id="tabs-1" class="tab">
					<div id="statBox">
						Health: <span id="healthStat">0/0</span><br>
						Gold: <span id="goldStat">0 G</span><br><br>
						Weapon: <span id="weaponName">Fists</span><br><br>
						Chest: <span id="chestName">Shirt</span><br>
						Legs: <span id="legsName">Pants</span><br>
						Head: <span id="headName"></span><br>
						Feet: <span id="feetName">Shoes</span><br>
						Neck: <span id="neckName"></span><br>
					</div>
				</div>
				<div id="tabs-2" class="tab">
					Inventory:
					<div id="inventoryBox">No items in inventory.</div><!--to do, update height of this & other boxes so they don't overflow into options box-->
				</div>
				<div id="tabs-3" class="tab">
					Quests:
					<div id="questBox">No active quests.</div>
				</div>

			</div>
			<div id="optionsPanel" class="panel">
				<button id="saveButton">Save</button>
				<button id="loadButton">Load</button>
				<button id="eraseButton">Erase Data</button>
			</div>
		</div>

	<div id="bottomPanel" class="panel">
		<div id="scrollBox"></div>
	</div>
</div>
<div id="bottomSpace">jordan-silver.com</div>
</body>
</html>