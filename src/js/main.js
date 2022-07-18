
(function() {
    'use strict';

    let sections = document.getElementsByTagName('section');
    let btPrev = document.querySelectorAll('.bt-prev');
    let btNext = document.querySelectorAll('.bt-next');

    let sports_input = document.querySelectorAll('.sec-seletor__custom_radio input');
    let sports_btProx = document.querySelector('.sec-seletor__custom_radio + .bt');
    
    sports_input.forEach((el) => {
        el.addEventListener('change', () => {
            if(el.checked) {
                sports_btProx.removeAttribute('disabled');
            }
        });
    });

    btNext.forEach((el, i) => {
        el.addEventListener('click', () => {
            sections[i].style.marginLeft = '-100%';
        });
    });

    btPrev.forEach((el, i) => {
        el.addEventListener('click', () => {
            sections[i].style.marginLeft = '';
        });
    });


    
    
    
})();