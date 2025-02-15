'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map
      map.on(`click`, mapE => {
        mapEvent = mapE;
        form.classList.remove(`hidden`);
        inputDistance.focus();
      });
    },
    function () {
      alert(`Could not get your position`);
    }
  );

form.addEventListener(`submit`, e => {
  e.preventDefault();

  // Clear input fiedls
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      ``;

  // Display marker
  L.marker(mapEvent.latlng)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `running-popup`,
      })
    )
    .setPopupContent(`popup test`)
    .openPopup();
});

inputType.addEventListener(`change`, e => {
  inputElevation.closest(`.form__row`).classList.toggle(`form__row--hidden`);
  inputCadence.closest(`.form__row`).classList.toggle(`form__row--hidden`);
});
