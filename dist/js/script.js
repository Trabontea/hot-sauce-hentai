"use strict";

window.addEventListener("load", function () {
  var form = document.getElementById("myForm");
  var close = document.getElementById('close');
  var open = document.querySelectorAll('.open');
  var modal = document.getElementById('modal');
  var paragr = document.querySelector('.modal-content p'); // Show modal

  [].forEach.call(open, function (el) {
    el.onclick = function () {
      modal.classList.add('show-modal');
    };
  }); // Hide modal

  close.addEventListener('click', function () {
    return modal.classList.remove('show-modal');
  }); // Hide modal on outside click

  window.addEventListener('click', function (e) {
    return e.target === modal ? modal.classList.remove('show-modal') : false;
  });

  function sendData() {
    var XHR = new XMLHttpRequest();
    var objForm = Object.values(form).reduce(function (obj, field) {
      obj[field.name] = field.value;
      return obj;
    }, {});
    XHR.addEventListener("load", function (event) {
      document.getElementById('message').innerHTML = "<p>Thank you for your order ".concat(objForm.fullname, "</p>\n      <p>Youl will receive information on this email address: ").concat(objForm.email, "</p>");
      form.style.display = "none";
      paragr.style.display = "none";
    });
    XHR.addEventListener("error", function (event) {
      document.getElementById('message').innerHTML = "Your order has a problem!";
    });
    XHR.open("POST", "https://jsonplaceholder.typicode.com/posts");
    XHR.send([objForm.fullname, objForm.city, objForm.email, objForm.country]);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
  });
});
"use strict";

var URL = {
  production: 'production',
  quality: 'quality',
  delivery: 'delivery',
  control: 'control',
  packing: 'packing',
  shipping: 'shipping',
  "final": 'final'
};
var statusText = {
  empty: '',
  inProgress: 'IN PROGRESS',
  done: 'DONE!'
};
var circles = document.querySelectorAll('circle');
console.log(circles); //   [].forEach.call(circles , function(div) {
//   // do whatever
//   div.style.color = "blue";
// console.log(cc)

var productionText = document.querySelector('#production .status');
var productionStatus = document.querySelector('#production .circle');
var qualityText = document.querySelector('#quality .status');
var qualityStatus = document.querySelector('#quality .circle');
var deliveryText = document.querySelector('#delivery .status');
var deliveryStatus = document.querySelector('#delivery .circle');
var controlText = document.querySelector('#control .status');
var controlStatus = document.querySelector('#control .circle');
var packingText = document.querySelector('#packing .status');
var packingStatus = document.querySelector('#packing .circle');
var shippingText = document.querySelector('#shipping .status');
var shippingStatus = document.querySelector('#shipping .circle');

function production() {
  productionText.innerHTML = statusText.inProgress;
  productionStatus.classList.add('in-progress');
}

function removeClass() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (el) {
    return el.classList.remove('done');
  });
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

function _final() {
  shipping();
  shippingText.innerHTML = statusText.done;
  shippingStatus.classList.add('done');
}

function showCycle() {
  var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "active";
  var url = arguments.length > 1 ? arguments[1] : undefined;

  if (active && url === URL.production) {
    //history.pushState(null, null, url + 'htm' );
    production();
    removeClass(productionStatus, qualityStatus, deliveryStatus);
  } else if (active && url === URL.quality) {
    //history.pushState(null, null, url );
    quality();
  } else if (active && url === URL.delivery) {
    //history.replaceState(null, null, url );
    delivery();
  } else if (active && url === URL.control) {
    //history.replaceState(null, null, url );
    control();
  } else if (active && url === URL.packing) {
    // history.replaceState(null, null, url );
    packing();
  } else if (active && url === URL.shipping) {
    //history.replaceState(null, null, url );
    shipping();
  } else if (active && url === URL["final"]) {
    // history.replaceState(null, null, url );
    _final();
  }
} //Call the function
// showCycle('active', 'production');
//showCycle('active', 'quality');


showCycle('active', 'control');
window.addEventListener('popstate', function (event) {
  // Log the state data to the console
  console.log(event.state);
});

function locationHashChanged() {
  if (window.location.pathname.replace(/\//g, "") === 'delivery') {
    showCycle('active', 'delivery');
    alert("ajaja");
  } else if (window.location.pathname.replace(/\//g, "") === 'quality') {
    showCycle('active', 'quality');
    alert("ajaja");
  }
}

window.onpathchange = locationHashChanged;

function ChangeUrl(title, url) {
  if (typeof history.pushState != "undefined") {
    var obj = {
      Title: title,
      Url: url
    };
    history.pushState(obj, obj.Title, obj.Url);
    showCycle('active', obj.Url);
  } else {
    alert("Browser does not support HTML5.");
  }
} //ChangeUrl('production', production);
//browser.omnibox.onInputChanged.addListener(listener)
//window.addEventListener('popstate', listener);


var pushUrl = function pushUrl(href) {
  history.pushState({}, '', href);
  window.dispatchEvent(new Event('popstate'));
  console.log('aliluia');
};