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
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-container');
    colorContainer.style.backgroundColor = color.hex.value;
    colorSchemeContainer.append(colorContainer);
  });
}
