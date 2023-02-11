console.log(`Client side JS file is loaded`);

// fetch(`https://puzzle.mead.io/puzzle`).then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const messageLoading = document.querySelector('#message-1');
const messageForecast = document.querySelector('#message-2');
const messageLocation = document.querySelector('#message-3');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  // console.log(`testing`);

  const location = document.querySelector('input').value;
  console.log(location);
  messageLoading.textContent = 'Loading...';

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      // console.log(data);
      if (data.error) {
        // console.log(data.error);
        messageLoading.textContent = `❌ ${data.error}`;
        messageLocation.textContent = ``;
        messageForecast.textContent = ``;
      } else {
        // console.log(`Location: ${data.location}`);
        // console.log(`Forecast: ${data.forecast}`);
        messageLoading.textContent = `search complete 👍`;
        messageLocation.textContent = `Location: ${data.location}`;
        messageForecast.textContent = `Forecast: ${data.forecast}`;
      }
    });
  });
});
