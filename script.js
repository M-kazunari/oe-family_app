const hamburger = document.getElementById('js-hamburger');
const nav = document.getElementById('js-nav');
const loading = document.getElementById('js-loading');

//ローディング
window.addEventListener('load', () => {
    setTimeout( () => {
        loading.classList.add('is-loaded');
    },1000);
}); 

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
});