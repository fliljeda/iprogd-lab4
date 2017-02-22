var Print = function (container, model){

	////// FOR TESTING PURPOSES ////
	//model.addDishToMenu(1);
	//model.addDishToMenu(100);
	//model.addDishToMenu(201);
	//model.setNumberOfGuests(5);
	///////////////////////////////

	model.addObserver(this);
	var guests = model.getNumberOfGuests();
	
	this.button = document.createElement("button");
	this.button.type = "button";
	this.button.className = "btn-default";
	this.button.id = "goBackAndEditFromPrint";
	this.button.innerHTML = "Go back and edit dinner";

	this.update = function (obj) {
		guests = model.getNumberOfGuests();
		var menu = model.getFullMenu();

		container.html("");
		container.append('<div class="row" id="overview_banner"> <div class="col-md-4"> <h2>My Dinner: ' + guests + ' people </h2> </div> <div class="col-md-4"> </div> <div class="col-md-4" id="backButtonDiv"> </div> </div> </div>');
		//this.button = container.find("#goBackAndEditFromPrint").get(0);
		container.find("#backButtonDiv").append(this.button); 

		//Add banner to container element

		for(var i = 0; i < menu.length; i++){

			//Add a new row for each new dish
			var dishSummary = document.createElement("div");
			dishSummary.className += "row";
			dishSummary.id = "dishSummary";

			//Create a column with its image
			var image = document.createElement("div");
			image.className += "col-md-2";
			image.innerHTML = "<img src=\"images/" + menu[i].image + "\">";

			//Create a column with its description
			var desc = document.createElement("div");
			desc.className += "col-md-4";
			desc.innerHTML = "<h2>" + menu[i].name + "</h2><br><p>" + menu[i].description + "</p>"

			//Create a column with its preparation in
			var prep = document.createElement("div");
			prep.className += "col-md-4";
			prep.innerHTML = "<h4>PREPARATION</h4><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>"

			//append everything to generate html code
			dishSummary.append(image);
			dishSummary.append(desc);	
			dishSummary.append(prep);
			container.append(dishSummary);

		}

	
	}

	this.update();

}



