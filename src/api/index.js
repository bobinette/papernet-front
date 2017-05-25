import 'whatwg-fetch';

// API url depends on the browser url
let apiURL = 'https://api.bobi.space';
if (
  window.location.hostname.indexOf('localhost') !== -1 ||
  window.location.hostname.indexOf('127.0.0.1') !== -1) {
  apiURL = 'http://127.0.0.1:1705';
} else if (window.location.hostname.indexOf('local-bobi') !== -1) {
  apiURL = 'http://api.local-bobi.space';
}

const parseJSON = response => (
  new Promise(resolve => response.json()
  .then(json => resolve({
    status: response.status,
    ok: response.ok,
    json,
  })))
);

export default function (path, options) {
  return new Promise((resolve, reject) => {
    fetch(`${apiURL}${path}`, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        // extract the error from the server's json
        return reject({ status: response.status, json: response.json });
      })
      .catch(error => reject({
        networkError: error.message,
      }));
  });
}
