var StartMessage = function (container) {

    var welcomeBox = document.createElement("div");
    welcomeBox.className += " container";
    welcomeBox.id = "welcomeBox";
    container.append(welcomeBox);

    var header1 = document.createElement("h1");
    header1.innerHTML = "A Home Dinner Service";
    welcomeBox.append(header1);
    welcomeBox.append(document.createElement("hr"));

    var message = document.createElement("p");
    message.innerHTML = " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat";
    welcomeBox.append(message);

    var linebreak = document.createElement("br");
    welcomeBox.append(linebreak);
    welcomeBox.append(linebreak);

    var buttonInformation = document.createElement("p");
    buttonInformation.innerHTML = "start quickly";
    welcomeBox.append(buttonInformation);

    this.startButton = document.createElement("button");
    this.startButton.setAttribute("type", "button");
    this.startButton.className += " btn-default";
    this.startButton.innerHTML = "Create new dinner";
    welcomeBox.append(this.startButton);
}

