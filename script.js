let cardCount = 0;
let cardBody;
let cardImg;
let currentMonsterId;
let desc =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nisi laboriosam voluptatem expedita tempora quidem quisquam quos, nostrum dicta sit obcaecati aspernatur distinctio beatae esse odit eveniet exercitationem! Voluptate, quam.";

function toggleModal(selected) {
  console.log(selected);
  currentMonsterId = selected.children[0].getAttribute("id");
  cardBody = selected.children[0].children[1];
  cardImg = selected.children[0].children[0];
  document
    .getElementById("modal_img")
    .setAttribute("src", cardImg.getAttribute("src"));
  const [cardId, name, codeType] = cardBody.children;
  console.log(cardId.innerText);
  document.getElementById("modal_card_id").innerText = cardId.innerText;
  document.getElementById("modal_name").innerText = name.innerText;
  document.getElementById("modal_code_type").innerText = codeType.innerText;
  document.getElementById("modal_desc").innerText = desc;
  // document.getElementById("modal_photo").value = cardImg.getAttribute("src");

  document.getElementById("monster_name").value = name.innerText;
  document.getElementById("code_type").value = codeType.innerText;
  document.getElementById("monster_description").value = desc;

  const putURL = `https://monster-collector.herokuapp.com/monster/${currentMonsterId}`;
  document.getElementById("modal_edit_form").setAttribute("action", putURL);
}

// refactor with time.
function editMonster() {
  console.log(currentMonsterId);
  toggleHide();
}

function toggleHide() {
  document.getElementById("input_forms").classList.remove("hidden");
  document.getElementById("monster_info").classList.add("hidden");
  document.getElementById("input_buttons").classList.remove("hidden");
  document.getElementById("info_buttons").classList.add("hidden");
}

function displayFormData({ _id, name, isScary, owner }) {
  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  if (name) {
    name = capitalizeFirstLetter(name);
    name = name.replace(" ", "");
  }

  const card = document.createElement("div");

  card.setAttribute("id", _id);

  card.classList.add("card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const photoEle = document.createElement("img");

  let photoURL = `https://api.kwelo.com/v1/media/identicon/${name}`;

  photoEle.setAttribute("src", photoURL);
  photoEle.setAttribute("loading", "lazy");

  photoEle.classList.add("card-img-top");
  card.appendChild(photoEle);

  const countIdElement = document.createElement("h4");
  countIdElement.classList.add("card_count_id");
  countIdElement.innerText = `# ${++cardCount}`;
  cardBody.appendChild(countIdElement);

  const nameElement = document.createElement("h3");
  nameElement.classList.add("card-text", "top");
  nameElement.innerText = name;
  cardBody.appendChild(nameElement);

  const typeElement = document.createElement("span");
  typeElement.classList.add("status");
  if (name && name.length % 2 === 0) {
    typeElement.innerHTML = "Javascript";
    typeElement.classList.add("javascript");
  } else if (name && name.length % 3 === 0) {
    typeElement.innerHTML = "C#";
    typeElement.classList.add("CSharp");
  } else {
    typeElement.innerHTML = "Python";
    typeElement.classList.add("python");
  }

  cardBody.appendChild(typeElement);
  card.appendChild(cardBody);

  const cardDiv = document.createElement("div");
  cardDiv.appendChild(card);
  cardDiv.classList.add("card_div");

  cardDiv.setAttribute("data-toggle", "modal");
  cardDiv.setAttribute("data-target", "#currentModal");
  cardDiv.setAttribute("onclick", "toggleModal(this)");

  // const editBtn = document.createElement("i");
  //
  // editBtn.classList.add("fa-solid", "fa-pen-to-square", "btn", "edit_icon");
  // card.appendChild(editBtn);

  document.getElementById("cards_container").appendChild(cardDiv);
}

async function getMonsterData() {
  const URL = `https://monster-collector.herokuapp.com/monster`;

  const response = await fetch(URL);
  const data = await response.json();

  console.log(data.find((monster) => monster.name === "ryan"));

  if (data.errors) {
    return { error: "Could not get information" };
  }

  data.forEach((monster) => {
    displayFormData(monster);
  });

  return data;
}

// function createMonster() {
//   const inputValues = getFormInputValues();
//   createRoute(`https://monster-collector.herokuapp.com/monster/${userId}`);
// }

// function getFormInputValues() {
//   return {
//     name: document.getElementById("destination").value,
//     codeType: document.getElementById("codeType").value,
//     description: document.getElementById("description").value,
//   };
// }
