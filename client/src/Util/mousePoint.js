const cards = document.getElementsByClassName("card");

document.addEventListener("mousemove", function (event) {
  for (let i = 0; i < cards.length; i++) {
    let x = event.pageX - cards[i].offsetLeft;
    let y = event.pageY - cards[i].offsetTop;
    cards[i].style.setProperty("--x", x + "px");
    cards[i].style.setProperty("--y", y + "px");
  }
});
