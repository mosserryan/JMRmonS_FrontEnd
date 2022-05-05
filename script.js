let cardCount = 0;
let cardBody;
let cardImg;
let currentMonsterId;
let toggled = false;
let defaultDesc =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nisi laboriosam voluptatem expedita tempora quidem quisquam quos, nostrum dicta sit obcaecati aspernatur distinctio beatae esse odit eveniet exercitationem! Voluptate, quam.";

function toggleModal(selected) {
  // Setting the currently selected monster's Id and setting to the
  // global currentId for later use. (Same with cardBody and cardImg)
  currentMonsterId = selected.children[0].getAttribute("id");
  cardBody = selected.children[0].children[1];
  cardImg = selected.children[0].children[0];

  // Rebuilding the card for modal view.
  const [cardId, name, codeType, description] = cardBody.children;
  const removedClass = document.getElementById("modal_code_type").classList[1];
  const addedClass = codeType.classList[1];

  document.getElementById("modal_card_id").innerText = cardId.innerText;
  document.getElementById("modal_name").innerText = name.innerText;
  document.getElementById("modal_code_type").innerText = codeType.innerText;
  document.getElementById("modal_code_type").classList.remove(removedClass);
  document.getElementById("modal_code_type").classList.add(addedClass);
  document.getElementById("modal_desc").innerText = description.innerText;
  document
    .getElementById("modal_img")
    .setAttribute("src", cardImg.getAttribute("src"));

  // Presetting data incase the user want's to edit the monster.
  document.getElementById("monster_name").value = name.innerText;
  document.getElementById("code_type").value = codeType.innerText;
  document.getElementById("monster_description").value = description.innerText;

  // Prepping edit button for modal with the currentId of monster.
  const putURL = `https://monster-collector.herokuapp.com/monster/${currentMonsterId}`;
  document.getElementById("modal_edit_form").setAttribute("action", putURL);

  console.log(document.getElementById("modal_delete_form"));

  const deleteURL = `https://monster-collector.herokuapp.com/monster/${currentMonsterId}?_method=DELETE`;
  document
    .getElementById("modal_delete_form")
    .setAttribute("action", deleteURL);
  toggled = false;
  toggleHide();
}

function editMonster() {
  console.log(currentMonsterId);
  toggled = true;
  toggleHide();
}

function toggleHide() {
  if (toggled) {
    document.getElementById("input_forms").classList.remove("hidden");
    document.getElementById("monster_info").classList.add("hidden");
    document.getElementById("input_buttons").classList.remove("hidden");
    document.getElementById("info_buttons").classList.add("hidden");
  } else {
    document.getElementById("input_forms").classList.add("hidden");
    document.getElementById("monster_info").classList.remove("hidden");
    document.getElementById("input_buttons").classList.add("hidden");
    document.getElementById("info_buttons").classList.remove("hidden");
  }
}

function displayFormData({ _id, name, codeType, description }) {
  // function capitalizeFirstLetter(name) {
  //   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  // }
  // if (name) {
  //   name = capitalizeFirstLetter(name);
  //   name = name.replace(" ", "");
  // }

  // Everything goes into the card-div and add modal capabilties
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card_div");
  cardDiv.setAttribute("data-toggle", "modal");
  cardDiv.setAttribute("data-target", "#currentModal");
  cardDiv.setAttribute("onclick", "toggleModal(this)");

  // Creating card and setting Monster Id to the card
  const card = document.createElement("div");
  card.setAttribute("id", _id);
  card.classList.add("card");

  // Using a public API to get an image based on :name".
  const photoElement = document.createElement("img");
  let photoURL = `https://api.kwelo.com/v1/media/identicon/${name}`;
  photoElement.setAttribute("src", photoURL);
  photoElement.setAttribute("loading", "lazy");
  photoElement.classList.add("card-img-top");
  card.appendChild(photoElement);

  // Creating card-body to place the remainer elements in.
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Add a count to keep track of the total number of monsters.
  const countIdElement = document.createElement("h4");
  countIdElement.classList.add("card_count_id");
  countIdElement.innerText = `# ${++cardCount}`;
  cardBody.appendChild(countIdElement);

  // Creating name and place in card body.
  const nameElement = document.createElement("h3");
  nameElement.classList.add("card-text", "top");
  nameElement.innerText = name;
  cardBody.appendChild(nameElement);

  // Creating type and place in card body.
  const typeElement = document.createElement("span");
  typeElement.classList.add("status");
  if (codeType === "C#" || codeType === "c#") {
    typeElement.classList.add("cSharp");
    typeElement.innerText = "C#";
  } else if (codeType === "C++" || codeType === "c++") {
    typeElement.classList.add("cPlus");
    typeElement.innerText = "C++";
  } else if (codeType === "Visual Basic") {
    typeElement.classList.add("vbasic");
    typeElement.innerText = "Visual Basic";
  } else if (codeType) {
    typeElement.innerText = codeType;
    typeElement.classList.add(codeType.toLowerCase());
  } else {
    // Javascript is default if "undifined".
    typeElement.innerHTML = "JavaScript";
    typeElement.classList.add("javascript");
  }
  cardBody.appendChild(typeElement);

  // Save description to a hidden element for modal use later.
  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("hidden");
  if (!description) {
    description = defaultDesc;
  }
  descriptionElement.innerText = description;
  cardBody.appendChild(descriptionElement);

  // Combine the card components for a complete card.
  // Append to predifined card container.
  card.appendChild(cardBody);
  cardDiv.appendChild(card);
  document.getElementById("cards_container").appendChild(cardDiv);
}

async function getMonsterData() {
  const URL = `https://monster-collector.herokuapp.com/monster`;

  const response = await fetch(URL);
  const data = await response.json();

  if (data.errors) {
    return { error: "Could not get information" };
  }

  data.forEach((monster) => {
    displayFormData(monster);
  });

  return data;
}
