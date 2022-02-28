'use strict';

import UI from './UI.js';

const cardsEl = document.querySelector('.cards');
const totalCardsEl = document.querySelector('.total_cards strong');
const scoresEl = document.querySelector('.scores strong');
const restLifesEls = document.querySelectorAll('.rest_lifes div');
const overlayEl = document.querySelector('.overlay');
const gameInfoEl = document.querySelector('.game_info');
const showInfoEl = document.querySelector('.show_info');
const soundInfoEl = document.querySelector('.sounds_info');
const playAudioEl = document.querySelector('#playAudio');
const tempImgEl = document.querySelector('.temp_img');

const uiCL = new UI(
  cardsEl,
  totalCardsEl,
  scoresEl,
  restLifesEls,
  overlayEl,
  gameInfoEl,
  soundInfoEl,
  playAudioEl
);

function init() {
  uiCL.display();
  setTimeout(() => uiCL.display(), 1000);
}

///////////////////////////////
init();
showInfoEl.addEventListener('click', () => uiCL.gameInfoElShowHide());
soundInfoEl.addEventListener('click', () => uiCL.soundToggle());

/* tempImgEl.onload = function () {
  alert('Image loaded');
};

setTimeout(() => {
  tempImgEl.src = 'img/1.png';
}, 5000);
 */
