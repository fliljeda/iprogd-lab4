$(function() {
	//We instantiate our model
	var model = new DinnerModel();
    var sc = new StateController();

	
	//And create the needed controllers and views
    var topBanner = new TopBanner($("#topBanner1"));
    var topBannerController = new TopBannerController(topBanner, model, sc);

    var startMessage = new StartMessage($("#mainStart"));
    var startMessageController = new StartMessageController(startMessage, model, sc);

    var itemDescription = new ItemDescription($("#page3"), model);
    var itemDescriptionController = new ItemDescriptionController(itemDescription, model, sc);

    var overview = new Overview($("#overview_page"), model);
    var overviewController = new OverviewController(overview, model, sc);

    var print = new Print($("#print_page"), model);
    var printController = new PrintController(print, model, sc);

    var selectDish = new SelectDish($("#selectDish"), model);
    var selectDishController = new SelectDishController(selectDish, model, sc);

    var sideBar = new SideBar($("#sideBarDiv"), model);
    var sideBarController = new SideBarController(sideBar, model, sc);

    sc.startApp();
   

});
