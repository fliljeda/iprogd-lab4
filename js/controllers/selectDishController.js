var SelectDishController = function(view, model, sc){

    view.searchButton.onclick = function(e){
    	var foodList = $("#selectDish").find("#foodList").get(0);
        foodList.innerHTML = '';
    	var filter = $("#selectDish").find("#selectedDishSearch").get(0).value;
    	var type = $("#selectDish").find("#chosenCourse").get(0).value;
    	var dishesToShow = model.getAllDishes(type,filter);

    	var counter = 0;
    	for(var i = 0; i < dishesToShow.length; i++){
    		var dish = dishesToShow[i];

	        //FOOD CONTAINER 1
	        var foodContainer = document.createElement("div");
	        foodContainer.className += "col col-md-2 foodContainer";
	        if(!counter){ //HOT FIX MOTHERFUCKERS
	        	foodContainer.id = "firstFood";
	        }
	        counter++;
	        foodList.append(foodContainer);

	        //FOOD PICTURE 2
	        var pictureOfFood = document.createElement("img");
	        pictureOfFood.setAttribute("src", "images/" + dish.image);
	        pictureOfFood.className += " selectDishFoodPicture";
	        foodContainer.append(pictureOfFood);

	        //FOOD TITLE 3 (button)
	        var foodTitle = document.createElement("button");
	        foodContainer.append(foodTitle);
	        foodTitle.className += "btn button-default selectDishFoodTitle";
	        foodTitle.innerHTML = dish.name;
	        foodTitle.setAttribute("type", "button");
	        foodTitle.clickId = dish.id;
	        foodTitle.onclick = function(e){
	        	model.setDishToShow(this.clickId);
	        	sc.showItemDescription();
	        }

	        //FOOD DESCRIPTION 4 (text)
	        var foodDescription = document.createElement("p");
	        foodDescription.innerHTML = dish.description;
	        foodContainer.append(foodDescription);
	    }
    }
    view.searchButton.click();

}
