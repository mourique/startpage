window.searchEngine = 'd';
window.searchEngineUrlMap = {
  G: 'https://www.google.com',
  d: 'https://duckduckgo.com',
  a: 'https://wiki.archlinux.org',
  g: 'https://github.com',
  s: 'https://stackoverflow.com',
  y: 'https://www.youtube.com',
  p: 'https://thepiratebay.org',
  r: 'https://www.reddit.com',
  N: 'https://www.netflix.com',
  y: 'https://www.youtube.com',
  p: 'https://thepiratebay.org',
  f: 'https://www.facebook.com',
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
  N: 'icons/netflix.svg',
  y: 'icons/youtube.svg',
  p: 'icons/thepiratebay.svg',
  f: 'icons/facebook.svg',
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
  const isTyping = event.target.id === 'search';
  const hasCtrl = event.ctrlKey;
  const key = event.shiftKey ? event.key.toUpperCase() : event.key;
  const search = document.getElementById('search');
  const choice = document.querySelector(`[data-key='${key}']`);

  const stop = event.preventDefault;
  console.log(event);
  
  if (!isTyping && key === ' ') return search.focus();
  if (isTyping && key === 'Escape') return search.blur();
  if (isTyping && key === 'Enter') return submit();
  if (isTyping && !hasCtrl) return;
  if (isTyping && hasCtrl && choice) {
    event.preventDefault();
    return setSearchEngine(key);
  }
  if (!isTyping && !hasCtrl && choice) return choice.click()
};

function setSearchEngine(engineId) {
  window.searchEngine = engineId;
  document.getElementById('search-label').innerHTML = `
  <img src="${window.searchEngineIconMap[engineId]}" height="40px" id="search-engine-icon" />
  `;
};

function submit() {
  const search = document.getElementById('search').value;
  const tool = window.searchEngineUrlMap[window.searchEngine];
  switch (window.searchEngine) {
    case 'G':
      window.location = `${tool}/search?q=${search}`;
      break;
    case 'd':
      window.location = `${tool}/?q=${search}`;
      break;
    case 'a':
      window.location = `${tool}/index.php?search=${search}`;
      break;
    case 'g':
      window.location = `${tool}/search?utf8=✓&q=${search}`;
      break;
    case 's':
      window.location = `${tool}/search?q=${search}`;
      break;
    case 'N':
      window.location = `${tool}/search?q=${search}`;
      break;
    case 'y':
      window.location = `${tool}/results?search_query=${search}`;
      break;
    case 'p':
      window.location = `${tool}/search/${search}/0/99/0`;
      break;
    case 'r':
      window.location = `${tool}/search?q=${search}`;
      break;
    case 'f':
      window.location = `${tool}/search/top/?q=${search}`;
      break;
    default:
      return;
  };
};
