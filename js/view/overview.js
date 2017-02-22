var Overview = function(container, model) {

	////// FOR TESTING PURPOSES ////
	//model.addDishToMenu(2);
	//model.addDishToMenu(100);
	//model.addDishToMenu(201);

	///////////////////////////////

	var starter;
	var main;
	var dessert;
	var guests = model.getNumberOfGuests();
	container.append('<div class="row" id="overview_banner"> <div class="col-md-4"> <h2 id="dinnerGuests"></h2> </div> <div class="col-md-4"> </div> <div class="col-md-4"> <button class="btn-default" type="button" id="goBackAndEdit"> Go back and edit dinner </button> </div> </div> <div class="row" id="overview_food"> <div class="col-md-3"> </div> <div class="col-md-2"> <img id="startImage"> <span class="name" id="startName"></span> <span class="price" id="startPrice"></span> </div> <div class="col-md-2"> <img id="mainImage"> <span class="name" id="mainName"></span> <span class="price" id="mainPrice"> </span> </div> <div class="col-md-2"> <img id="dessertImage"> <span class="name" id="dessertName"></span> <span class="price" id="dessertPrice"> </span> </div> <div class="col-md-3" id="verticalLine"> <span class="total"> Total:</span> <br> <span class="price" id="totalPriceSpan" style="text-align:left; padding-bottom:0px;"></span></div> </div> <hr> <div class="row" id="overview_print"> <div class="col-md-4"> </div> <div class="col-md-4"> <button class="btn-default" type="button" id="printRecipe"> Print Full Recipe </button> </div> <div class="col-md-4"> </div> </div>')

	model.addObserver(this);
	this.update = function (obj) {
		starter = model.getSelectedDish("starter");
		main = model.getSelectedDish("main dish");
		dessert = model.getSelectedDish("dessert");
		guests = model.getNumberOfGuests();
		container.find("#dinnerGuests").html("My Dinner: " + guests + " people");

		if(!(typeof(starter) == 'undefined')){
			container.find("#startImage").attr('src', 'images/' + starter.image);
			container.find("#startName").html(starter.name);
			container.find('#startPrice').html(this.getTotalDishPrice(starter,guests) + ' SEK');

		}else{
			container.find("#startImage").attr('src', '');
			container.find("#startName").html('');
			container.find('#startPrice').html('');
		}

		if(!(typeof(main) == 'undefined')){
			container.find("#mainImage").attr('src', 'images/' + main.image);
			container.find("#mainName").html(main.name);
			container.find('#mainPrice').html(this.getTotalDishPrice(main,guests) + ' SEK');
		}else{
			container.find("#mainImage").attr('src', '');
			container.find("#mainName").html('');
			container.find('#mainPrice').html('');
		}

		if(!(typeof(dessert) == 'undefined')){
			container.find("#dessertImage").attr('src', 'images/' + dessert.image);
			container.find("#dessertName").html(dessert.name);
			container.find('#dessertPrice').html(this.getTotalDishPrice(dessert,guests) + ' SEK');

		}else{
			container.find("#dessertImage").attr('src', '');
			container.find("#dessertName").html('');
			container.find('#dessertPrice').html('');
		}
		container.find("#totalPriceSpan").html(model.getTotalMenuPrice() + ' SEK');

	}
		

    this.goBackButton = container.find("#goBackAndEdit").get(0); 
    this.printRecipeButton = container.find("#printRecipe").get(0); 

	this.getTotalDishPrice = function (dish, guests){
		var ingredients = dish.ingredients;
		var price = 0;
		for(var i = 0; i < ingredients.length; i++){
			price += ingredients[i].price;
		}
		return price * guests;
	}
}

