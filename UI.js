import Data from './Data.js';
import Storage from './Storage.js';

class UI {
  constructor(
    cardsEl,
    totalCardsEl,
    scoresEl,
    restLifesEls,
    overlayEl,
    gameInfoEl,
    soundInfoEl,
    playAudioEl
  ) {
    this.dataCL = new Data();
    this.cardsEl = cardsEl;
    this.totalCardsEl = totalCardsEl;
    this.scoresEl = scoresEl;
    this.restLifesEls = restLifesEls;
    this.overlayEl = overlayEl;
    this.gameInfoEl = gameInfoEl;
    this.soundInfoEl = soundInfoEl;
    this.playAudioEl = playAudioEl;
  }

  display() {
    this.dataCL.addInArr();
    this.dataCL.shuffleArr();
    this.cardsEl.innerHTML = '';

    //add card to DOM
    this.dataCL.imgArr.forEach((_, index) => {
      this.cardsEl.innerHTML += `
			<div class="img_content"><img src="img/${
        this.dataCL.imgArr[this.dataCL.indexArr[index]]
      }.png" alt="${this.dataCL.imgArr[this.dataCL.indexArr[index]]}"></div>
			`;
    });

    //add Event to img
    document
      .querySelectorAll('.img_content')
      .forEach((el) =>
        el.addEventListener('click', this.getClickedImg.bind(this))
      );

    this.totalCardsEl.textContent = this.dataCL.cardNumsIncrease();
  }

  getClickedImg(e) {
    const clicked = e.target.closest('.img_content');
    const imgNum = +clicked.querySelector('img').getAttribute('alt');

    //if answer is right
    if (this.dataCL.rightOrWrong(imgNum)) {
      const incScores = this.dataCL.userRight();

      clicked.classList.add('right');
      this.scoresEl.textContent = incScores;
    } else {
      //if answer is wrong
      const lessLifes = this.dataCL.userWrong();

      clicked.classList.add('wrong');
      this.restLifesEls[lessLifes].classList.add('wrong');
      //show/hide game_info el
      this.gameInfoElShowHide();

      if (lessLifes === 0) this.gameOver();
    }

    //pointer events remove
    this.cardsEl.style.pointerEvents = 'none';

    setTimeout(() => {
      this.display();
      //pointer events add
      this.cardsEl.style.pointerEvents = 'auto';

      window.onload = () => {
        alert(123);
      };
    }, 2000);
  }

  gameOver() {
    //show overlay
    this.overlayEl.classList.add('active');

    //show over info
    if (Storage.addHighestScores(this.dataCL.scores)) {
      this.overlayEl.innerHTML = `
			<div class="overlay_content">
				<p class="highest_scores">You got highest scores</p>
				<p class="your_scores">Your Scores: <strong>${this.dataCL.scores}</strong></p>
				<p class="win_img">
					<img src="img/cup.png" alt="cup" />
				</p>
			</div>
			`;
    } else {
      this.overlayEl.innerHTML = `
			<div class="overlay_content">
				<p class="your_scores">Your Scores: <strong>${this.dataCL.scores}</strong></p>
			</div>
			`;
    }

    setTimeout(() => location.reload(), 3000);
  }

  gameInfoElShowHide() {
    this.gameInfoEl.classList.add('active');

    setTimeout(() => this.gameInfoEl.classList.remove('active'), 1000);
  }

  soundToggle() {
    const img = this.soundInfoEl.querySelector('img');
    let isOn = img.getAttribute('alt');

    if (isOn === 'on') {
      img.src = 'img/sound_off.png';
      img.setAttribute('alt', 'off');
      this.playAudioEl.muted = true;
    } else {
      img.src = 'img/sound_on.png';
      img.setAttribute('alt', 'on');
      this.playAudioEl.muted = false;
    }
  }
}

export default UI;
