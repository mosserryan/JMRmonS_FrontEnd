function changeURL(destination) {
  if (destination === "create") {
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/create");
  } else if (destination === "monsters") {
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/monsters");
  } else if (destination === "home") {
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/home");
  } else if (destination === "friends") {
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/friends");
  } else if (destination === "chat") {
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/chat");
  } else if (destination === "battle") {
    location.assign("https://mosserryan.github.io/JMRmonS_FrontEnd/battle");
  } else if (destination === "signout") {
    location.assign("https://monster-collector.herokuapp.com/auth/logout");
  }
}
