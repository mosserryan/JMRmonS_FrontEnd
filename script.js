let cardCount = 0;

function displayFormData({ _id, name, isScary, owner }) {
  const card = document.createElement("div");

  card.setAttribute("id", _id);

  card.classList.add("card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const photoEle = document.createElement("img");

  let locationPhoto = `https://api.kwelo.com/v1/media/identicon/${cardCount}`;

  photoEle.setAttribute("src", locationPhoto);

  photoEle.classList.add("card-img-top");
  card.appendChild(photoEle);

  //   const IdElement = document.createElement("h5");
  //   IdElement.classList.add("card-title");
  //   IdElement.innerText = _id;
  //   cardBody.appendChild(IdElement);

  const countIdElement = document.createElement("h4");
  countIdElement.classList.add("card_count_id");
  countIdElement.innerText = `# ${++cardCount}`;
  cardBody.appendChild(countIdElement);

  const nameElement = document.createElement("h2");
  nameElement.classList.add("card-text", "top");
  nameElement.innerText = name;
  cardBody.appendChild(nameElement);

  const typeElement = document.createElement("span");
  typeElement.classList.add("status");
  if (cardCount % 2 === 0) {
    typeElement.innerHTML = "Javascript";
    typeElement.classList.add("javascript");
  } else if (cardCount % 3 === 0) {
    typeElement.innerHTML = "C#";
    typeElement.classList.add("CSharp");
  } else {
    typeElement.innerHTML = "Python";
    typeElement.classList.add("python");
  }

  cardBody.appendChild(typeElement);

  //   const placeholderDesc = "Place holder text.";

  //   const scaryElement = document.createElement("p");

  //   if (isScary) {
  //     scaryElement.innerText = isScary;
  //   } else {
  //     scaryElement.innerText = isScary;
  //   }
  //   scaryElement.classList.add("card-text");
  //   cardBody.appendChild(scaryElement);

  card.appendChild(cardBody);

  document.getElementById("cards_container").appendChild(card);
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
