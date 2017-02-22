var StateController = function (model){

	this.startApp = function () {
		$('#selectDish').hide();
	    $('#page3').hide();
	    $('#overview_page').hide();
	    $('#print_page').hide();
	    $('#sideBarDiv').hide();
	}
	
	this.startDinnerPlanner = function(){
	    $('#mainStart').hide();
	    $('body').css('background-image', 'none');
	    $('#sideBarDiv').show();
	    $('#selectDish').show();
	}

	this.setStartScreen = function (){
	    $("#mainStart").show();
	    $("#page3").hide();
	    $("#selectDish").hide();
	    $("#sideBarDiv").hide();
	    $("#print_page").hide();
	    $("#overview_page").hide();
	    $("body").css("background-image", "url(images/background_tomato_eating.jpg)");
	}

	this.backButtonItemDesc = function () {
		$('#page3').hide();
    	$('#selectDish').show();
	}

	this.confirmDish = function (){
    	$('#page3').hide();
    	$('#selectDish').show();
    }

    this.printFullRecipe = function(){
	    $('#overview_page').hide();
	    $('#print_page').show();
	}

	this.backToSelectDish = function(){
	    $('#overview_page').hide();
	    $('#sideBarDiv').show();
	    $('#selectDish').show();
	}

	this.showItemDescription = function(){
		$('#selectDish').hide();
		$('#page3').show();
	}

	this.backToSelectDish2 = function (){
		$('#print_page').hide();
		$('#sideBarDiv').show();
		$('#selectDish').show();
	}

	this.confirmDinner = function (){
		$('#sideBarDiv').hide();
		$('#selectDish').hide();
		$('#page3').hide();
		$('#overview_page').show();
	}
}