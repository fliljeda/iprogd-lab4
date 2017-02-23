//DinnerModel Object constructor
var DinnerModel = function() {

    var numberOfGuests = 2;
    var selectedDishes = []; //dishes on the menu
    var currentDishId;
    var APIHeader = {
    	'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    };
    var dinnerSelf = this;

    var documentReadyForNotifies = false;
    this.setDocReady = function(){
        documentReadyForNotifies = true;
    }

    var observers = [];

    //add an observer to the obsever array
    this.addObserver = function(observer){
    	observers.push(observer);
    }

    this.setDishToShow = function(dishId){
        var messengerObj = {
        	dishId:dishId
        };
        currentDishId = dishId;
        notifyObservers(messengerObj);

    }

    this.getDishToShow = function(){
    	return currentDishId;
    }

    //call the update method on all of the observers
    var notifyObservers = function (obj) {
    	for(var i = 0; i < observers.length; i++){
            //if(documentReadyForNotifies){
                observers[i].update(obj);
            //}
    	}
    }

	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
		notifyObservers();
	}

	// should return
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
        for(var i = 0; i < selectedDishes.length; i++){
            if(selectedDishes[i].type == type){
                return selectedDishes[i];
            }
        }
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return selectedDishes;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
        var allIngredients = [];
        for(var i = 0; i < selectedDishes.length; i++){
	        if (!(typeof(selectedDishes[i].ingredients) == 'undefined')){
            	var dishIngredients = selectedDishes[i].ingredients;
	            for(var j = 0; j < dishIngredients.length; j++){
	                allIngredients.push(dishIngredients[j]);
	            }
	        }
        }
        return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
        var ingredients = this.getAllIngredients();
        var price = 0;
        for(var i = 0; i < ingredients.length; i++){
            price += ingredients[i].price;
        }
        return price * numberOfGuests;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
        var dishToAdd = {};
        this.getDish(id, function (dishToGet) {
        	dishToAdd = dishToGet;

	        for(var i = 0; i < selectedDishes.length; i++){
	          if(selectedDishes[i].type === dishToAdd.type){
	            dinnerSelf.removeDishFromMenu(selectedDishes[i].id);
	          }
	        }

	        selectedDishes.push(dishToAdd);
	        notifyObservers();
        });

	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
        for(var i = 0; i < selectedDishes.length; i++){
          if(selectedDishes[i].id == id){
              selectedDishes.splice(i, 1);
          }
        }
        notifyObservers();
	}

	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (type,filter, cb, cberr) {
	  /*return dishes.filter(function(dish) {
		var found = true;
		if(filter){
			found = false;
			dish.ingredients.forEach(function(ingredient) {
				if(ingredient.name.indexOf(filter)!=-1) {
					found = true;
				}
			});
			if(dish.name.indexOf(filter) != -1)
			{
				found = true;
			}
		}
	  	return dish.type == type && found;
	  });*/
		var numberOfDishesToGet = 10;
		var searchString = filter;
		var dishType = type;

		$.ajax( {
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
			headers: APIHeader,
			data: {
				number : numberOfDishesToGet,
				query : searchString,
				type : dishType
			},
			success: function(data) {
				if(data.results.length == 0) cberr(-3000);

				for (var i = 0; i < data.results.length; i++){
					var dish = {};
					dish.name = data.results[i].title;
					dish.image = data.results[i].image;
					dish.id = data.results[i].id;
					dish.type = dishType;
					dinnerSelf.addRecipeInformation(dish, cb, numberOfDishesToGet);
				}
				
			},
			error: function(data) {
				cberr(404);
			}
		});
	}

	//function that returns a dish of specific ID
	this.getDish = function (id,cb) {
	  $.ajax({
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information',
			headers : APIHeader,
			
			success: function(data){
				var dish = {};
				dish.name = data.title;
				dish.image = data.image;
				dish.description = data.instructions;
				dish.id = id;
				dish.type = dinnerSelf.findProperDishType(data.dishTypes);
				dish.ingredients = [];
				for (var j = 0; j < data.extendedIngredients.length; j++){
					dish.ingredients.push({});
					dish.ingredients[j].name = data.extendedIngredients[j].name;
					dish.ingredients[j].quantity = data.extendedIngredients[j].amount;
					dish.ingredients[j].unit = data.extendedIngredients[j].unitShort;
					dish.ingredients[j].price = data.extendedIngredients[j].amount;
				}
				cb(dish);

			}
			
		});
	}

	this.findProperDishType = function (obj) {
		for(var i = 0; i < obj.length; i++){
			if(obj[i] == 'starter' || obj[i] == 'main course' || obj[i] == 'dessert'){
				return obj[i];
			}
		}
	}

	this.addRecipeInformation = function (dish, cb, numberOfDishesToGet){
		$.ajax({
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + dish.id + '/information',
			headers : APIHeader,
			success: function(data){
				dish.description = data.instructions;
				dish.ingredients = [];
				for (var j = 0; j < data.extendedIngredients.length; j++){
					dish.ingredients.push({});
					dish.ingredients[j].name = data.extendedIngredients[j].name;
					dish.ingredients[j].quantity = data.extendedIngredients[j].amount;
					dish.ingredients[j].unit = data.extendedIngredients[j].unitShort;
					dish.ingredients[j].price = data.extendedIngredients[j].amount;
				}
				cb(dish, numberOfDishesToGet);
			}
		});
	}


	// the dishes variable contains an array of all the
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name,
	// quantity (a number), price (a number) and unit (string
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];

}
