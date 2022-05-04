function changeURL(destination) {
  if (destination === "create") {
    // location.assign("http://127.0.0.1:5502/create.html");
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/create");
  } else if (destination === "monsters") {
    // location.assign("http://127.0.0.1:5502/monsters.html");
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/monsters");
  } else if (destination === "home") {
    // location.assign("http://127.0.0.1:5502/home.html");
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/home");
  } else if (destination === "friends") {
    // location.assign("http://127.0.0.1:5502/friends.html");
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/friends");
  } else if (destination === "chat") {
    // location.assign("http://127.0.0.1:5502/chat.html");
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/chat");
  } else if (destination === "battle") {
    // location.assign("http://127.0.0.1:5502/battle.html");
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/battle");
  } else if (destination === "signout") {
    // location.assign("http://127.0.0.1:5502/index.html");
    location.assign("https://monster-collector.herokuapp.com/auth/logout");
  }

  // href="https://monster-collector.herokuapp.com/auth/logout"
}
