window.searchEngine = 'd';
window.searchEngineUrlMap = {
  G: 'https://www.google.com/',
  d: 'https://duckduckgo.com/',
  a: 'https://wiki.archlinux.org/',
  g: 'https://github.com/',
  s: 'https://stackoverflow.com/',
  y: 'https://www.youtube.com/',
  p: 'https://thepiratebay.org/',
  r: 'https://www.reddit.com/',
};
window.searchEngineIconMap = {
  G: 'icons/google.svg',
  d: 'icons/duckduckgo.svg',
  a: 'icons/archlinux.svg',
  g: 'icons/github.svg',
  s: 'icons/stackoverflow.svg',
  y: 'icons/youtube.svg',
  p: 'icons/thepiratebay.svg',
  r: 'icons/reddit.svg',
};
setSearchEngine('d')

function start() {
  setupClock();
  document.addEventListener("keypress", handleKeyPress);
};

function setupClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout(setupClock, 500);
};

function handleKeyPress(event) {
  const isTyping = document.activeElement.id === 'search';
  const hasCtrl = event.ctrlKey;
  const search = document.getElementById('search');
  const key = event.shiftKey ? event.key.toUpperCase() : event.key;
  
  if (!isTyping && key === ' ') return search.focus();
  if (isTyping && key === 'Escape') return search.blur();
  if (isTyping && !hasCtrl) return;
  event.preventDefault();
  if (isTyping && hasCtrl) return setSearchEngine(key);
};

function setSearchEngine(engineId) {
  window.searchEngine = engineId;
  document.getElementById('search-label').innerHTML = `
  <object data="${window.searchEngineIconMap[engineId]}" type="image/svg+xml" height="40px" />
  `;
};

function search() {
  const searchValue = document.getElementById('search').value;
  const searchToolId = window.searchLabel || 'd';
  const searchToolUrl = document.querySelector(`[data-key='${searchToolId}']`).href;
};
