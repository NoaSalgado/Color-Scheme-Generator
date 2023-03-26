(function init() {
  displayColorScheme();
  addFormEventHandler();
})();

function addFormEventHandler() {
  const formEl = document.querySelector('#form');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    displayColorScheme();
  });
}

async function displayColorScheme() {
  const schemeColors = await getColorScheme();
  const colorSchemeContainer = document.querySelector('#color-scheme');
  colorSchemeContainer.innerHTML = '';

  schemeColors.forEach((color) => {
    const colorInfoContainer = document.createElement('div');
    const colorContainer = document.createElement('div');

    colorInfoContainer.innerHTML = `
      <span class="color-info__value" data-color=${color.hex.value}>${color.hex.value}</span>
      <span class="color-info__name">${color.name.value}</span>
      `;
    colorInfoContainer.classList.add('color-info');
    colorInfoContainer.style.color = color.contrast.value;

    colorContainer.classList.add('color-container');
    colorContainer.style.backgroundColor = color.hex.value;
    colorContainer.append(colorInfoContainer);
    colorSchemeContainer.append(colorContainer);
  });
  addColorValueEventHandler();
}

async function getColorScheme() {
  const color = document.querySelector('#color').value.slice(1);
  const mode = document.querySelector('#scheme-mode').value;
  const apiUrl = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const schemeColors = data.colors;
  return schemeColors;
}

function addColorValueEventHandler() {
  const colors = document.querySelectorAll('[data-color]');
  colors.forEach((color) =>
    color.addEventListener('click', (e) => {
      copyToClippboard(e.target.dataset.color);
    })
  );
}

async function copyToClippboard(color) {
  try {
    await navigator.clipboard.writeText(color);
    displayModal();
  } catch (err) {
    console.log('Failed to copy: ', err);
  }
}

function displayModal() {
  const modal = document.querySelector('#modal');
  modal.classList.add('display');
  setTimeout(() => {
    modal.classList.remove('display');
  }, 1500);
}
