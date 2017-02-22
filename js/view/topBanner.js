var TopBanner = function (container) {

    var navBar = document.createElement("nav");
    navBar.className += " navbar navbar-default navbar-fixed-top";
    container.append(navBar);

    var navContainer = document.createElement("div");
    navContainer.className += " container";
    navContainer.id = "navContainer";
    navBar.append(navContainer);

    this.navHeader = document.createElement("button");
    this.navHeader.style.background = "transparent";
    this.navHeader.style.border = "none";
    this.navHeader.setAttribute("type", "link");
    this.navHeader.id = "myHeader";
    //this.navHeader.onclick = setStartScreen;
    this.navHeader.innerHTML = "HOMELETTE";
    navContainer.append(this.navHeader);

    var navQuote = document.createElement("p");
    navQuote.id = "quote";
    navQuote.innerHTML = "From the best chefs in the world directly into your kitchen";
    navContainer.append(navQuote);
    
}


 
