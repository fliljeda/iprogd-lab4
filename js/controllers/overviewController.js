var OverviewController = function (view,model,sc){

	view.goBackButton.onclick = function (e){
		sc.backToSelectDish();
	}

	view.printRecipeButton.onclick = function (e){
		sc.printFullRecipe();
	}
}