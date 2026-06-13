// register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

function getNumber(elementId) {
  return parseInt(document.getElementById(elementId).value || 0);
}

function setNumber(elementId, value) {
  document.getElementById(elementId).innerHTML = value;
}

function compute() {
  const product1 = getNumber("product-1");
  setNumber("total", patientsToContact);
}
