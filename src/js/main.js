
(function() {
    'use strict';

    let sections = document.getElementsByTagName('section');
    let btPrev = document.querySelectorAll('.bt-prev');
    let btNext = document.querySelectorAll('.bt-next');

    let sports_input = document.querySelectorAll('.sec-seletor__custom_radio input');
    let sports_btProx = document.querySelector('.sec-seletor__custom_radio + .bt');
    
    let teams_input = document.querySelector('.sec-qtd-equipes__input');
    let teams_btProx = document.querySelector('.bt.sec-qtd-equipes__bt.bt-next');

    let sports_selected = '';
    let teams_qtd = 0;
    
    sports_input.forEach((el) => {
        el.addEventListener('change', () => {
            if(el.checked) {
                sports_btProx.removeAttribute('disabled');

                sports_selected = el.value;
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
    
    teams_input.addEventListener('input', () => {

        if(teams_input.value != '' && teams_input.value >= 2 && teams_input.value <= 20) {
            teams_btProx.removeAttribute('disabled');
        } else {
            teams_btProx.setAttribute('disabled', '');
        }
    });

    teams_btProx.addEventListener('click', () => {
        teams_qtd = teams_input.value;
    })



    
    
    
})();