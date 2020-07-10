function supports_history_api() {
  return !!(window.history && history.pushState);
}

function viewCycle(active="active", cycle) {
  const url = 'history/' + cycle + '.html',
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("timeline").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
  history.replaceState(null, null, cycle + '.html');
}
//viewCycle('production');

window.onload = function() {
  if (!supports_history_api()) { return; }
  window.setTimeout(function() {
    window.addEventListener("popstate", function(e) {
      viewCycle(location.pathname);
    }, false);
  }, 1);
};


//call the function in console
//viewCycle('active', 'production');

//the cycles are:
//production
//quality
//delivery
//control
//packing
//shipping
//final
