
(function() {
    'use strict';

    let sections = document.getElementsByTagName('section');
    let btPrev = document.querySelectorAll('.bt-prev');
    let btNext = document.querySelectorAll('.bt-next');

    let sports_input = document.querySelectorAll('.sec-seletor__custom_radio input');
    let sports_btProx = document.querySelector('.sec-seletor__custom_radio + .bt');
    
    let teams_input = document.querySelector('.sec-qtd-equipes__input');
    let teams_btProx = document.querySelector('.bt.sec-qtd-equipes__bt.bt-next');

    let players_wrapper = document.querySelector('.sec-jogadores__wrapper');
    let players_input = [];
    let players_btMontar = document.querySelector('.sec-jogadores .bt.sec-jogadores__bt.bt-montar');

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
        let linePlayers = 0;
        let gkPlayers = 0;

        teams_qtd = teams_input.value;

        if (sports_selected == 'Futebol') {
            linePlayers = teams_qtd * 10;
            gkPlayers = teams_qtd;
        } else if (sports_selected == 'Futsal') {
            linePlayers = teams_qtd * 4;
            gkPlayers = teams_qtd;
        } else if (sports_selected == 'FUT7') {
            linePlayers = teams_qtd * 6;
            gkPlayers = teams_qtd;
        } else if (sports_selected == 'Basquete') {
            linePlayers = teams_qtd * 5;
            gkPlayers = 0;
        } else if (sports_selected == 'Basquete 3X3') {
            linePlayers = teams_qtd * 3;
            gkPlayers = 0;
        } else if (sports_selected == 'Vôlei') {
            linePlayers = teams_qtd * 6;
            gkPlayers = 0;
        }

        players_wrapper.innerHTML = '';

        for(let i = 0; i < gkPlayers; i++) {
            players_wrapper.innerHTML += 
            `
            <div class="sec-jogadores__wrapper__jogador">
                <span class="sec-jogadores__wrapper__jogador__posicao gol">
                GOL
                </span>
                <input type="text" maxlength="13" class="sec-jogadores__wrapper__jogador__input"
                placeholder="Nome do Goleiro" value="Cássio" />
            </div>
            `;
        }

        for(let i = 0; i < linePlayers; i++) {
            players_wrapper.innerHTML += 
            `
            <div class="sec-jogadores__wrapper__jogador">
                <span class="sec-jogadores__wrapper__jogador__posicao linha">
                Linha
                </span>
                <input type="text" maxlength="25" class="sec-jogadores__wrapper__jogador__input"
                placeholder="Nome do Jogador" value="teste" />
            </div>
            `;
        }

        players_input = document.querySelectorAll('.sec-jogadores__wrapper__jogador__input');

        players_input.forEach((el, i, arr) => {
            
            el.addEventListener('input', () => {
                if(el.value == '') {
                    players_btMontar.setAttribute('disabled', '');
                }
            });
        });

    });

    

    


    
    
    
})();