
$(window).ready(function(){


	$(".modalLink").click(function(event){
		event.preventDefault();
		openModal($(this).attr('href'));
	});

	$("#modalOverlay").click(function(){
		closeModal();
	});

	$(".modal").hide();
	$("#jobPrice").change(function(){
		var num = $(this).val();
		num = parseInt(num, 10).toFixed(2);
		$(this).val(num);
	});

	$(".closeButton").click(function(event){

		event.preventDefault();
		closeModal();

	});


});


var closeModal = function(){
	
	//$(".modalSelected").removeClass("modalSelected");
	$(".modal").removeClass("modalSelected");
	$(".modal").hide();
	$(".modalOverlay").height(0);
	$("#modalOverlay").removeClass("modalOverlay");

}

$(window).resize(function(){

	var windowWidth = $(window).width() / 2;
	var windowHeight = $(window).height() / 2;
	var modalWidth = ($(".modalSelected").width() / 2);
	var modalHeight = ($(".modalSelected").height() / 2);
	var left = windowWidth - modalWidth;
	var top = windowHeight - modalHeight;
	$(".modalSelected").css({"left": left, "top": top});

	$(".modalOverlay").height($(document).height());

});

var openModal = function(id){

	var windowWidth = $(window).width() / 2;
	var windowHeight = $(window).height() / 2;
	//console.log(windowWidth);
	//$(id).show();
	$(id).addClass("modalSelected");
	var modalWidth = ($(".modalSelected").width() / 2);
	var modalHeight = ($(".modalSelected").height() / 2);
	var left = windowWidth - modalWidth;
	var top = windowHeight - modalHeight;
	$(".modalSelected").css({"left": left, "top": top});
	$(id).show();

	//$("#modalOverlay").addClass("modalOverlay");
	//$(".modalOverlay").height($(document).height());

}


var getCurrentTimeAndDate = function(){

	var info = {};

	var currentTime = new Date();

	var hours = currentTime.getHours();
	var mins = currentTime.getMinutes();

	var year = currentTime.getFullYear();
	var month = parseInt(currentTime.getMonth(), 10) + 1;
	var day = parseInt(currentTime.getDate(), 10);

	if(month < 10)
		month = "0" + month;

	if(day < 10)
		day = "0" + day;

	info.date = year + "-" + month + "-" + day;

	if(hours < 10)
		hours = "0" + hours.toString();
	else
		hours = hours.toString();

	if(mins < 10)
		mins = "0" + mins.toString();
	else
		mins = mins.toString();

	info.time = hours + ":" + mins;

	return info;

}

var setJobPostDimensions = function(){

	var widthText = $("#jobDescription").width();
	//console.log(widthText);
	$(".jobPostForm input").width(widthText);
	$(".jobPostForm select").width(widthText);
	$(".jobPostForm textarea").width(widthText);

}

var displayError = function(info){
	closeModal();

	
	$(".errorTitle").text(info.modal);
	if(info.modal === "Login Failure!"){
		$("#errorInfo").text("Email and password do not match!");
	}
	else
		$("#errorInfo").text(info.error.text);

	openModal("#errorModal");
	//console.log(info);

}

var displaySuccess = function(info){

	closeModal();

	//openModal("#successModal");
	$(".successTitle").text(info.modal);
	openModal("#successModal");
	//console.log(info);
}

































