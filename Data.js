class Data {
  #pendingTotalImg = 170;
  #currentTotalImg = null;
  #rightImg = null;

  constructor() {
    this.imgArr = [];
    this.indexArr = [];
    this.totalArr = null;
    this.totalCards = 1;
    this.scores = 0;
    this.lifes = 5;
  }

  randomNum() {
    if (this.#pendingTotalImg <= 0) return;

    return Math.floor(Math.random() * this.#pendingTotalImg) + 1;
  }

  addInArr() {
    const num = this.randomNum();
    this.indexArr = [];

    if (!this.imgArr.includes(num)) {
      this.imgArr.push(num);
      this.#rightImg = this.imgArr[this.imgArr.length - 1];
      this.totalArr = this.imgArr.length;
      this.#pendingTotalImg--;
      this.#currentTotalImg++;
    } else this.addInArr();
  }

  shuffleArr() {
    const rand = Math.floor(Math.random() * this.#currentTotalImg);
    if (!this.indexArr.includes(rand)) {
      this.indexArr.push(rand);
      this.totalArr--;
    }

    if (this.totalArr <= 0) {
      return;
    } else {
      this.shuffleArr();
    }
  }

  rightOrWrong(num) {
    return this.#rightImg === num ? true : false;
  }

  userRight() {
    this.scores += 1;
    return this.scores;
  }

  userWrong() {
    this.lifes -= 1;
    return this.lifes;
  }

  cardNumsIncrease() {
    return this.totalCards++;
  }
}

export default Data;
