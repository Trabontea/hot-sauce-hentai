
window.addEventListener( "load", function () {
  const form = document.getElementById( "myForm" );
  const close = document.getElementById('close');
  const open = document.querySelectorAll('.open');
  const modal = document.getElementById('modal');
  const paragr = document.querySelector('.modal-content p');
  
// Show modal
  [].forEach.call(open, el => {
    el.onclick = () => {
      modal.classList.add('show-modal');
    }
  });
  
// Hide modal
  close.addEventListener('click', () => modal.classList.remove('show-modal'));

// Hide modal on outside click
  window.addEventListener('click', e =>
    e.target === modal ? modal.classList.remove('show-modal') : false
  );

  function sendData() {
    const XHR = new XMLHttpRequest();
    
    const objForm = Object.values(form).reduce((obj,field) => {
      obj[field.name] = field.value;
      return obj },  {});
    
    XHR.addEventListener( "load", function(event) {
      document.getElementById('message').innerHTML = `<p>Thank you for your order ${objForm.fullname}</p>
      <p>Youl will receive information on this email address: ${objForm.email}</p>`;
      form.style.display = "none";
      paragr.style.display = "none"
    } );
    
    XHR.addEventListener( "error", function( event ) {
      document.getElementById('message').innerHTML = `Your order has a problem!`
    } );

    XHR.open( "POST", "https://jsonplaceholder.typicode.com/posts" );
    XHR.send( [objForm.fullname, objForm.city, objForm.email, objForm.country]);
  }

  form.addEventListener( "submit", function ( event ) {
    event.preventDefault();
    sendData();
  });
});

