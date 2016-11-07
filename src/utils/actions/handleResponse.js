export default (response) => {
  const json = response.json();
  if (response.ok) {
    return json;
  }
  return json.then(Promise.reject.bind(Promise));
};
