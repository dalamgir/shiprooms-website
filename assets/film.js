const film = document.getElementById('shiprooms-film');
const play = document.getElementById('film-play');
const error = document.getElementById('film-error');

if (film && play && error) {
  // Native controls remain available when JavaScript is disabled.
  film.controls = false;
  play.hidden = false;

  play.addEventListener('click', async () => {
    play.hidden = true;
    film.controls = true;
    error.hidden = true;
    film.focus({ preventScroll: true });
    try {
      await film.play();
    } catch {
      error.hidden = false;
    }
  });

  film.addEventListener('error', () => {
    play.hidden = true;
    film.controls = true;
    error.hidden = false;
  });
}
