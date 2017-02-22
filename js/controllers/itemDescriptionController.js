var ItemDescriptionController = function (view, model, sc) {

	view.backButton.onclick = function (e){
    	model.setDishToShow(-1);
		sc.backButtonItemDesc();
	}

	view.confirmButton.onclick = function (e){
		view.confirmDish();
		sc.confirmDish();
	}
}