const URL = {
  production: 'production',
  quality: 'quality',
  delivery: 'delivery',
  control: 'control',
  packing: 'packing',
  shipping: 'shipping',
  final: 'final'
};

const statusText = {
  empty: '',
  inProgress: 'IN PROGRESS',
  done: 'DONE!'
};

const productionText = document.querySelector('#production .status');
const productionStatus = document.querySelector('#production .circle');
const qualityText = document.querySelector('#quality .status');
const qualityStatus = document.querySelector('#quality .circle');
const deliveryText = document.querySelector('#delivery .status');
const deliveryStatus = document.querySelector('#delivery .circle');
const controlText = document.querySelector('#control .status');
const controlStatus = document.querySelector('#control .circle');
const packingText = document.querySelector('#packing .status');
const packingStatus = document.querySelector('#packing .circle');
const shippingText = document.querySelector('#shipping .status');
const shippingStatus = document.querySelector('#shipping .circle');


function production() {
  productionText.innerHTML = statusText.inProgress;
  productionStatus.classList.add('in-progress');
}

function removeClass(...args) {
  args.forEach(el => el.classList.remove('done'))
}

function quality() {
  productionText.innerHTML = statusText.done;
  productionStatus.classList.add('done');
  qualityText.innerHTML = statusText.inProgress;
  qualityStatus.classList.add('in-progress');
}

function delivery() {
  quality();
  qualityText.innerHTML = statusText.done;
  qualityStatus.classList.add('done');
  deliveryText.innerHTML = statusText.inProgress;
  deliveryStatus.classList.add('in-progress');
}

function control() {
  delivery();
  deliveryText.innerHTML = statusText.done;
  deliveryStatus.classList.add('done');
  controlText.innerHTML = statusText.inProgress;
  controlStatus.classList.add('in-progress');
}

function packing() {
  control();
  controlText.innerHTML = statusText.done;
  controlStatus.classList.add('done');
  packingText.innerHTML = statusText.inProgress;
  packingStatus.classList.add('in-progress');
}

function shipping() {
  packing();
  packingText.innerHTML = statusText.done;
  packingStatus.classList.add('done');
  shippingText.innerHTML = statusText.inProgress;
  shippingStatus.classList.add('in-progress');
}

function final() {
  shipping();
  shippingText.innerHTML = statusText.done;
  shippingStatus.classList.add('done');
}


function showCycle(active = "active", url) {
  if (active && url === URL.production) {
    history.pushState(null, null, url );
    production();
    removeClass(productionStatus, qualityStatus,deliveryStatus)
  } else if (active && url === URL.quality) {
    history.pushState(null, null, url );
    quality();
  } else if (active && url === URL.delivery) {
    history.replaceState(null, null, url );
    delivery();
  } else if (active && url === URL.control) {
    history.replaceState(null, null, url );
    control();
  } else if (active && url === URL.packing) {
    history.replaceState(null, null, url );
    packing();
  } else if (active && url === URL.shipping) {
    history.replaceState(null, null, url );
    shipping();
  } else if (active && url === URL.final) {
    history.replaceState(null, null, url );
    final()
  }
}
//Call the function
//showCycle('active', 'production');


window.addEventListener('popstate', function (event) {
  // Log the state data to the console
  console.log(event.state);
});



function locationHashChanged() {
  if (window.location.pathname.replace(/\//g, "") === 'delivery') {
    showCycle('active', 'delivery' );
    alert("ajaja")
  }
  else if (window.location.pathname.replace(/\//g, "") === 'quality') {
    showCycle('active', 'quality' );
    alert("ajaja")
  }
}

window.onpathchange = locationHashChanged;

function ChangeUrl(title, url) {
  if (typeof (history.pushState) != "undefined") {
    var obj = { Title: title, Url: url };
    history.pushState(obj, obj.Title, obj.Url);
  } else {
    alert("Browser does not support HTML5.");
  }
}
ChangeUrl('production', production);