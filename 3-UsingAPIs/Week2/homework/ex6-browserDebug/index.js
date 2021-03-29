'use strict';
async function getData(url) {
  const response = await fetch(url);
  return response.json();
}
function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'text') {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}
function addTableRow(table, label, value) {
  const tr = createAndAppend('tr', table);
  createAndAppend('th', tr, { text: label });
  createAndAppend('td', tr, { text: value });
}
function renderLaureate(
  ul,
  {
    knownName,
    birth,
    death = { date: '', place: { locationString: { en: 'still alive' } } },
  }
) {
  const li = createAndAppend('li', ul);
  const table = createAndAppend('table', li);
  addTableRow(table, 'Name', knownName.en);
  addTableRow(
    table,
    'Birth',
    `${birth.date}, ${birth.place.locationString.en}`
  );
  addTableRow(
    table,
    'Death',
    `${death.date}, ${death.place.locationString.en}`
  );
}
function renderLaureates(laureates) {
  const ul = createAndAppend('ul', document.body);
  laureates.forEach((laureate) => renderLaureate(ul, laureate));
  console.log(laureates);
}
async function fetchAndRender() {
  try {
    const data = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(data.laureates);
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}
window.addEventListener('load', fetchAndRender);