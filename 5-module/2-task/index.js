function toggleText() {
  let btn = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  function check() {
    if (text.hidden == true) text.hidden = false;
    else text.hidden = true;
  }
  btn.addEventListener('click', check);
}
