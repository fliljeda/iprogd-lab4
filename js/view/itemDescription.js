var ItemDescription = function (container, model){
	model.addObserver(this);
	var dishToShow = model.getDish(770213, function (dishToGet) {
		dishToShow = dishToGet;
	});
	var itemSelf = this;

	var guests = model.getNumberOfGuests();
	container.append('<div class="row"> <div class="col-md-5" style="padding-left:30px;"> <h3 style="margin-top:10px;" id="dishToShowName"></h3> <img src="" id="foodImage"> <p style="padding-top:15px;" id="dishToShowDesc"></p> <button class="btn-default" type="button" id="itemDescToSelDishButton">back to Select Dish</button> </div> <div class="col-md-5" id="ingredients"> <p id="ingBoxGuestNumber" style="padding-top:10px;"></p> <hr> <div class="row"> <div class="col-md-2" id="ingredientAmount"></div> <div class="col-md-6" id="ingredientName"></div> <div class="col-md-2" id="ingredientCurrency"></div> <div class="col-md-2" id="ingredientPrice"></div> </div> <hr> <div class="row"> <div class="col-md-8"> <button class="btn-default" type="button" id="confirmDishButton"> Confirm dish </button> </div> <div class="col-md-2"> SEK </div> <div class="col-md-2" id="totalPrice"></div> </div> </div> </div> <div class="row" style="padding:30px; padding-top:0px;"> <div class="col-md-2"> </div> <div class="col-md-10"> <h3 style="margin-top:0px;">PREPARATIONS</h3> <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? <br> <br> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p></div> </div>');

	var ingBoxGuestNumber = container.find("#ingBoxGuestNumber"); 
	var dishToShowName = container.find("#dishToShowName");
	var foodImage = container.find("#foodImage");
	var dishToShowDesc = container.find("#dishToShowDesc");

	ingBoxGuestNumber.html('INGREDIENTS FOR ' + guests + ' PEOPLE');

	this.update = function (obj) {
        //If obj contains a dishId it will change dish it

        if(!(typeof(obj) == 'undefined') && !(typeof(obj.dishId) == 'undefined')){
        	foodImage.innerHTML = "";
        	dishToShowName.innerHTML = '';
        	dishToShowDesc.innerHTML = "";
        	if(obj.dishId != -1){
        		model.getDish(obj.dishId, function (dishToGet) {
        			dishToShow = dishToGet;
        			itemSelf.fillIngredients();
	        		dishToShowName.html(dishToShow.name);
	        		foodImage.attr('src', dishToShow.image);
	        		dishToShowDesc.html(dishToShow.description);
        		});
        	}
        }

        guests = model.getNumberOfGuests();
        ingBoxGuestNumber.html('INGREDIENTS FOR ' + guests + ' PEOPLE');
    }

    this.backButton = container.find("#itemDescToSelDishButton").get(0);
    
    this.confirmButton = container.find("#confirmDishButton").get(0);

    this.confirmDish = function () {
    	model.addDishToMenu(dishToShow.id);
    	model.setDishToShow(-1);
    }

    //fills the ingredient list with the ingredients of the given dish object. 
    this.fillIngredients = function (){
    	var ingredients = dishToShow.ingredients;

		//fetch id's and nullify thier (possible) previous content.
		var ingredientName = container.find("#ingredientName");
		ingredientName.html("");

		var ingredientPrice = container.find("#ingredientPrice");
		ingredientPrice.html("");

		var ingredientAmount = container.find("#ingredientAmount");
		ingredientAmount.html("");

		var ingredientCurrency = container.find("#ingredientCurrency");
		ingredientCurrency.html("");

		var totalPrice = container.find("#totalPrice");
		totalPrice.html("");

		var totalCost = 0;

		for(var i = 0; i < ingredients.length; i++){

			//populate names
			var name = document.createElement("p");
			name.innerHTML = ingredients[i].name;
			ingredientName.append(name);

			//populate prices
			var prices = document.createElement("p");
			var price = ingredients[i].price * guests;
			prices.innerHTML = Math.round(price*100)/100;
			ingredientPrice.append(prices);

			//populate amounts
			var amount = document.createElement("p");
			amount.innerHTML = Math.round(((ingredients[i].quantity) * guests* 100))/100 + " " + ingredients[i].unit; //round to max 2 dec. places
			ingredientAmount.append(amount);

			//populate currency
			var currency = document.createElement("p");
			currency.innerHTML = "SEK"; // SEK by default
			ingredientCurrency.append(currency);

			//to calculate the total cost of the ingredients
			totalCost += price;
		}

		var total = document.createElement("p");
		total.innerHTML = totalCost;
		totalPrice.append(total);

	}
}




