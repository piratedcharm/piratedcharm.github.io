let menu = document.querySelector('#menu-icon');
let navlink = document.querySelector('.nav-links');


menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navlink.classList.toggle('open');
}





ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2500,
  delay: 400
});

ScrollReveal().reveal('.hero-text', { delay: 600, origin: 'top' }); 
ScrollReveal().reveal('.hero-img', { delay: 150 }); 
ScrollReveal().reveal('.footer', { delay: 650, origin: 'top' }); 