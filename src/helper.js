export function postData(url, data, method = 'POST') {
  // Default options are marked with *
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    method, // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, cors, *same-origin
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // parses response to JSON
}

export function fetchData(url) {
  return fetch(url)
    .then(response => response.json());
}