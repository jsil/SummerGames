<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
<link href="css/modals.css" rel="stylesheet">
<script language="javascript"  type="text/javascript" src="js/modals.js"> </script>	
<?php include "modals.html"; ?>   
<link href="css/main.css" rel="stylesheet">
<script language="javascript" type="text/javascript" src="js/game.js"></script>
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
					Health: <span id="healthStat">0/0</span><br>
					Gold: <span id="goldStat">0 G</span>
				</div>
				<div id="tabs-2" class="tab">
					Inventory:
					<div id="inventoryBox">No items in inventory.</div>
				</div>
				<div id="tabs-3" class="tab">
					Quests:<br><br>
					<div id="questBox">No active quests.</div>
				</div>

			</div>
			<div id="optionsPanel" class="panel"></div>
		</div>

	<div id="bottomPanel" class="panel"></div>
</div>
</body>
</html>