class Storage {
  static addHighestScores(scores) {
    const hScores = localStorage.getItem('h_scores')
      ? localStorage.getItem('h_scores')
      : 0;

    console.log(hScores, scores);

    if (scores > hScores) {
      localStorage.setItem('h_scores', scores);
      return true;
    }
  }
}

export default Storage;
