var SideBarController = function (view, model, sc) {

	view.buttonUp.onclick = function (e) {
		view.incrementValue();
	}

	view.buttonDown.onclick = function (e) {
		view.decrementValue();
	}

	view.confButton.onclick = function (e) {
		sc.confirmDinner();
	}

	view.removeStarter.onclick = function (e) {
		model.removeDishFromMenu(this.getAttribute("dishId"));
		view.removeStarterDish();

	}

	view.removeMain.onclick = function (e) {
		model.removeDishFromMenu(this.getAttribute("dishId"));
		view.removeMainDish();

	}

	view.removeDessert.onclick = function (e) {
		model.removeDishFromMenu(this.getAttribute("dishId"));
		view.removeDessertDish();

	}
}