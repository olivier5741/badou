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

function setValue(elementId, value) {
  document.getElementById(elementId).value = value;
}

const products = [
  {
    id: "product-1",
    key: "soft",
    price: 2.5,
    type: "glass",
  },
  {
    id: "product-2",
    key: "pils",
    price: 2.5,
    type: "glass",
  },
  {
    id: "product-3",
    key: "special",
    price: 3.5,
    type: "glass",
  },
  {
    id: "product-4",
    key: "maitrank",
    price: 3.5,
    type: "glass",
  },
  {
    id: "jug-1",
    key: "pils-jug",
    price: 14,
    type: "jug",
  },
  {
    id: "jug-2",
    key: "special-jug",
    price: 18,
    type: "jug",
  },
  {
    id: "jug-3",
    key: "half-maitrank-jug",
    price: 18,
    type: "jug",
  },
  {
    id: "jug-4",
    key: "maitrank-jug",
    price: 36,
    type: "jug",
  },
];

const returns = [
  {
    id: "return-1",
    key: "glass",
    price: 1,
  },
  {
    id: "return-2",
    key: "jug",
    price: 2,
  },
];

function compute() {
  let productTotal = 0;
  let depositTotal = 0;
  let returnsTotal = 0;

  for (const product of products) {
    const quantity = getNumber(product.id);
    productTotal += quantity * product.price;
    depositTotal +=
      returns.find((r) => r.key === product.type).price * quantity;
  }

  for (const returnItem of returns) {
    const quantity = getNumber(returnItem.id);
    returnsTotal += quantity * returnItem.price;
  }

  setNumber("total", productTotal + depositTotal - returnsTotal);
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Dirty hack, will use templating in the future
  for (const line of products.concat(returns)) {
    const lineElement = document.getElementById(line.id);
    lineElement.outerHTML =
      `
      <div class="input-group">
        <button id="${line.id}-minus" class="btn btn-outline-secondary" type="button">
            <i class="bi bi-dash"></i>
        </button>` +
      lineElement.outerHTML +
      `
        <button id="${line.id}-plus" class="btn btn-outline-secondary" type="button">
          <i class="bi bi-plus"></i>
        </button>
      </div>`;
  }

  for (const product of products) {
    const productElement = document.getElementById(product.id);
    productElement.addEventListener("input", compute);
  }

  for (const returnItem of returns) {
    const returnElement = document.getElementById(returnItem.id);
    returnElement.addEventListener("input", compute);
  }

  document.getElementById("reset").addEventListener("click", function () {
    setNumber("total", 0);
  });

  for (const line of products.concat(returns)) {
    const minuslineElement = document.getElementById(line.id + "-minus");
    const pluslineElement = document.getElementById(line.id + "-plus");

    minuslineElement.addEventListener("click", function () {
      setValue(line.id, Math.max(0, getNumber(line.id) - 1));
      compute();
    });

    pluslineElement.addEventListener("click", function () {
      setValue(line.id, Math.max(0, getNumber(line.id) + 1));
      compute();
    });
  }
});
