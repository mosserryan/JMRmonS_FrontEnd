function changeURL(destination) {
  if (destination === "monsters") {
    location.assign("http://127.0.0.1:5502/monsters.html");
    // location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/monsters");
  } else if (destination === "home") {
    location.assign("http://127.0.0.1:5502/home.html");
    // location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/home");
  }
}
