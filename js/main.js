function start() {
  setupClock();
  document.getElementById('search').focus();
  document.getElementById('search').onkeydown = function(e) {
    if (e.key === 'Enter') search();
    if (e.key === 'Escape') searchEl.blur();
  };
  document.addEventListener("keypress", handleKeyPress);
}

function setupClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" + seconds;
    setTimeout(setupClock, 500);
}

function handleKeyPress(event) {
  const hasCtrl = event.ctrlKey;
  const key = event.shiftKey ? event.key.toUpperCase() : event.key.toLowerCase();
  const link = document.querySelector(`[data-key='${key}']`);
  window.searchLabel = key;

  if (!link) return;
  if (document.activeElement.id === 'search') return event.preventDefault();
  if (!hasCtrl) return link.click();

  event.preventDefault();
}

function search() {
  const searchValue = document.getElementById('search').value;
  const searchToolId = window.searchLabel || 'd';
  const searchToolUrl = document.querySelector(`[data-key='${searchToolId}']`).href;
}
