
(function() {
    'use strict';

    let sections = document.getElementsByTagName('section');
    let btPrev = document.querySelectorAll('.bt-prev');
    let btNext = document.querySelectorAll('.bt-next');

    let sports_input = document.querySelectorAll('.sec-seletor__custom_radio input');
    let sports_btProx = document.querySelector('.sec-seletor__custom_radio + .bt');
    
    let teams_input = document.querySelector('.sec-qtd-equipes__input');
    let teams_btProx = document.querySelector('.bt.sec-qtd-equipes__bt.bt-next');

    let players_section = document.querySelector('.sec-jogadores');
    let players_wrapper = document.querySelector('.sec-jogadores__wrapper');
    let players_input = [];
    let players_btMontar = document.querySelector('.sec-jogadores .bt.sec-jogadores__bt.bt-montar');

    let result_wrapper = document.querySelector('.sec-resultado .sec-resultado__wrapper');

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
                <input type="text" maxlength="13" class="sec-jogadores__wrapper__jogador__input" data-position="goleiro"
                placeholder="Nome do Goleiro" />
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
                <input type="text" maxlength="25" class="sec-jogadores__wrapper__jogador__input" data-position="linha"
                placeholder="Nome do Jogador" />
            </div>
            `;
        }

        players_input = document.querySelectorAll('.sec-jogadores__wrapper__jogador__input');

        players_input.forEach((el, i, arr) => {
            
            el.addEventListener('input', () => {
                if(el.value == '') {
                    players_btMontar.setAttribute('disabled', '');
                } else {
                    players_btMontar.removeAttribute('disabled');

                    arr.forEach((input) => {
                        if(input.value == '') {
                            players_btMontar.setAttribute('disabled', '');
                        }
                    });
                }
            });
        });
    });

    function shuffleArray(arr) {
        
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        
        return arr;
    }

    players_btMontar.addEventListener('click', () => {
        let gkPlayers = [];
        let linePlayers = [];
        let totPlayers = 0;
        
        players_section.style.marginLeft = "-100%";

        players_input.forEach((el) => {
            if(el.dataset.position == 'goleiro') {
                gkPlayers.push(el.value);
            } else if (el.dataset.position == 'linha') {
                linePlayers.push(el.value);
            }
        });

        totPlayers = gkPlayers.length + linePlayers.length;
        let randomGK = shuffleArray(gkPlayers);
        let randomPlayer = shuffleArray(linePlayers);
        let spliceIndex = linePlayers.length / teams_qtd;

        for(let i = 0; i < teams_qtd; i++) {

            result_wrapper.innerHTML +=
            `
                <div class="sec-resultado__wrapper__equipe">
                    <h3 class="sec-resultado__wrapper__equipe__title">
                        Time ${i + 1}
                    </h3>

                    <div class="sec-resultado__wrapper__equipe__jogador">
                        <span class="sec-resultado__wrapper__equipe__jogador__posicao gol">
                            GOL
                        </span>

                        <span class="sec-resultado__wrapper__equipe__jogador__numero">
                            1
                        </span>

                        <span class="sec-resultado__wrapper__equipe__jogador__nome">
                            ${randomGK[i]}
                        </span>
                    </div>

                    ${
                        randomPlayer.map((el, j) => {
                            let html = ``;

                            for(let count = 0; count < linePlayers.length / teams_qtd && j < linePlayers.length / teams_qtd; count++) {

                                html += `
                                <div class="sec-resultado__wrapper__equipe__jogador">
                                    <span class="sec-resultado__wrapper__equipe__jogador__posicao linha">
                                        LINHA
                                    </span>
                    
                                    <span class="sec-resultado__wrapper__equipe__jogador__numero">
                                        ${2 + j++}
                                    </span>
                    
                                    <span class="sec-resultado__wrapper__equipe__jogador__nome">
                                        ${el}
                                    </span>
                                </div>
                                `;
                            }

                            return html;
                        
                        }).join('')
                    }

                </div>
            `;

            randomPlayer.splice(0, spliceIndex);
            

            
        }

        

    });

})();