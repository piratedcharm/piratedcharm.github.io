// toogle navbar
let menu = document.querySelector('#menu-icon');
let navlink = document.querySelector('.nav-links');


menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlink.classList.toggle('open');
}





// Store references to the elements
const openPopupButton = document.getElementById("openPopupButton");
const popupForm = document.getElementById("popupForm");
const form = document.getElementById("form");
const closeButtons = document.getElementsByClassName("close");
const cardContainer = document.getElementById("cardContainer");
const cautionDiv = document.getElementById('ht1');
const cautionDiv2 = document.getElementById('ht2');
const cautionDiv3 = document.getElementById('ht3');
const checklistContainer = document.getElementById("taskarea-checklist");
const streakContainer = document.getElementById("taskarea-streak");


// Function to toggle the visibility of the hiddentext element
function toggleHiddenText() {
  const hiddentext = document.getElementById("ht1");
  const hiddentext2 = document.getElementById("ht2");
  const hiddentext3 = document.getElementById("ht3");
  const cards = document.getElementsByClassName("card");

  if (cards.length > 0) {
    hiddentext.style.display = "none";
    hiddentext2.style.display = "none";
    hiddentext3.style.display = "none";
  } else {
    hiddentext.style.display = "block";
    hiddentext2.style.display = "block";
    hiddentext3.style.display = "block";
  }
}

// Update the visibility of hiddentext when a card is added or removed
function updateHiddenText() {
  toggleHiddenText();
}

// Get existing data from Local Storage
let DATA = localStorage.getItem("data");
DATA = DATA ? JSON.parse(DATA) : {};

// Display existing cards on page load
for (const title in DATA) {
  const cardData = DATA[title];
  const card = createCard(title, cardData);
  cardContainer.appendChild(card);
}

// Display popup form when the "Open Popup" button is clicked
openPopupButton.addEventListener("click", function () {
  popupForm.classList.add("show");
});

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get the values from the input fields
  const title = document.getElementById("title").value;
  const note = document.getElementById("note").value;

  // Create a new card element
  const cardData = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };
  cardData.note = note;
  DATA[title] = cardData;
  saveDataToLocalStorage(); // Save updated data to Local Storage

  const card = createCard(title, cardData);
  cardContainer.appendChild(card);

   // Call the updateHiddenText function
   updateHiddenText();


  // Hide the popup form and reset the form fields
  popupForm.classList.remove("show");
  form.reset();
});

// Hide the popup form when the close button is clicked
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function () {
    popupForm.classList.remove("show");
  });

  // Call the updateHiddenText function
  updateHiddenText();
}

// Hide the popup form when clicking outside the form
window.addEventListener("click", function (event) {
  if (event.target == popupForm) {
    popupForm.classList.remove("show");
    // Call the updateHiddenText function
    updateHiddenText();
  }
});

// Function to create a card element
function createCard(title, cardData) {
  const card = document.createElement("button");
  card.className = "card";
  card.innerHTML = `<h3>${title}</h3><p>${cardData.note}</p>`;

  // Create a delete button and add an event listener to remove the card
  const deleteButton = document.createElement("button");

  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function (event) {
    event.stopPropagation();
    if (confirm("Are you sure you want to delete this card?")) {
      card.remove();
      checklistContainer.innerHTML = "";
      streakContainer.innerHTML = "";
      updateHiddenText();
      delete DATA[title]; // Remove data from the DATA object
      saveDataToLocalStorage(); // Save updated data to Local Storage
    }
  });
  card.appendChild(deleteButton);

  card.addEventListener("click", function (event) {
    const id = this.children[0].innerText;

    // Remove existing checklist and streak
    checklistContainer.innerHTML = "";
    streakContainer.innerHTML = "";

    // Create checkboxes for each day of the week
    const daysOfWeek = ["   Monday", "   Tuesday", "   Wednesday", "   Thusrday", "   Friday", "   Saturday", "   Sunday"];
    daysOfWeek.forEach(function (day) {
      const checked = cardData[day] == 1 ? "checked" : "";
      const checklistItem = document.createElement("div");
      checklistItem.className = "checklist-item";
      checklistItem.innerHTML = `<label><input type="checkbox" ${checked}>${day}</label>`;
      checklistContainer.appendChild(checklistItem);
    });

    // Add event listeners to checkboxes
    const checkboxes = checklistContainer.getElementsByClassName("checklist-item");
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i].querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", function (event) {
        cardData[daysOfWeek[i]] = event.target.checked ? 1 : 0;
        updateStreak(streakContainer, checkboxes);
        //ProgressBar(streakContainer, checkboxes);
        saveDataToLocalStorage(); // Save updated data to Local Storage
      });
    }

    updateStreak(streakContainer, checkboxes);
    //ProgressBar(streakContainer, checkboxes);
  });

  return card;
}

// Update streak and progress
function updateStreak(container, checkboxes) {
  const checkedCount = Array.from(checkboxes).filter(function (checkbox) {
    return checkbox.querySelector("input[type='checkbox']").checked;
  }).length;

  const streakPercentage = (checkedCount / checkboxes.length) * 100;

  container.innerHTML = `Streak : ${checkedCount}/${checkboxes.length} Days`;
  ProgressBar(streakContainer, checkboxes);
  container.innerHTML += `<br>Overall Progress : ${streakPercentage.toFixed(2)}%`;
  ProgressBar2(streakContainer, checkboxes);
}
// Function to create progress bar
function ProgressBar(container, checkboxes) {
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";

  const checkedCount = Array.from(checkboxes).filter(function (checkbox) {
    return checkbox.querySelector("input[type='checkbox']").checked;
  }).length;

  const progressPercentage = (checkedCount / checkboxes.length) * 100;

  progressBar.style.background = `linear-gradient(to right, #3D6090 ${progressPercentage}%, #d6d6d6 ${progressPercentage}% 100%)`;
  container.appendChild(progressBar);
}

// Function to create progress bar
function ProgressBar2(container, checkboxes) {
  const progressBar2 = document.createElement("div");
  progressBar2.className = "progress-bar2";

  const checkedCount = Array.from(checkboxes).filter(function (checkbox) {
    return checkbox.querySelector("input[type='checkbox']").checked;
  }).length;

  const progressPercentage = (checkedCount / checkboxes.length) * 100;

  progressBar2.style.background = `conic-gradient(#3D6090 ${progressPercentage}%, #d6d6d6 ${progressPercentage}% 100%)`;
  container.appendChild(progressBar2);
}



// Function to save data to Local Storage
function saveDataToLocalStorage() {
  localStorage.setItem("data", JSON.stringify(DATA));
}
