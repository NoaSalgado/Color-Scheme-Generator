const formEl = document.querySelector('#form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  displayColorScheme();
});

async function getColorScheme() {
  const color = document.querySelector('#color').value.slice(1);
  const mode = document.querySelector('#scheme-mode').value;
  const apiUrl = `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const schemeColors = data.colors;
  return schemeColors;
}

async function displayColorScheme() {
  const schemeColors = await getColorScheme();
  console.log(schemeColors);
  const colorSchemeContainer = document.querySelector('#color-scheme');
  colorSchemeContainer.innerHTML = '';

  schemeColors.forEach((color) => {
    const colorInfo = document.createElement('div');
    colorInfo.innerHTML = `
      <span class="color-info__value" data-color=${color.hex.value}>${color.hex.value}</span>
      <span class="color-info__name">${color.name.value}</span>
      `;
    colorInfo.classList.add('color-info');
    colorInfo.style.color = color.contrast.value;
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-container');
    colorContainer.style.backgroundColor = color.hex.value;
    colorContainer.append(colorInfo);
    colorSchemeContainer.append(colorContainer);
  });
  addcolorEventHandler();
}

function addcolorEventHandler() {
  const colors = document.querySelectorAll('[data-color]');
  colors.forEach((color) =>
    color.addEventListener('click', (e) => {
      copyToClippboard(e.target.dataset.color);
    })
  );
}

async function copyToClippboard(color) {
  const response = await navigator.permissions.query({
    name: 'clipboard-write',
  });
  const state = response.state;

  if (state === 'granted' || state === 'prompt') {
    try {
      await navigator.clipboard.writeText(color);
      displayModal();
    } catch (err) {
      console.log('Failed to copy: ', err);
    }
  }
}

function displayModal() {
  const modal = document.querySelector('#modal');
  modal.classList.add('display');
  setTimeout(() => {
    modal.classList.remove('display');
  }, 1500);
}
