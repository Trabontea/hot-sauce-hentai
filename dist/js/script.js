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

function supports_history_api() {
  return !!(window.history && history.pushState);
}

function viewCycle() {
  var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "active";
  var cycle = arguments.length > 1 ? arguments[1] : undefined;
  var url = 'history/' + cycle + '.html',
      xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("timeline").innerHTML = xhttp.responseText;
    }
  };

  xhttp.open('GET', url, true);
  xhttp.send();
  history.replaceState(null, null, cycle + '.html');
} //viewCycle('production');


window.onload = function () {
  if (!supports_history_api()) {
    return;
  }

  window.setTimeout(function () {
    window.addEventListener("popstate", function (e) {
      viewCycle(location.pathname);
    }, false);
  }, 1);
}; //call the function in console
//viewCycle('active', 'production');
//the cycles are:
//production
//quality
//delivery
//control
//packing
//shipping
//final