function encodeValue(value, key) {
  let encodedValue = "";
  if (Array.isArray(value)) {
    value.forEach((v, _) => {
      encodedValue += encodeURIComponent(key) + "=" + encodeURIComponent(v) + "&";
    })
  } else {
    encodedValue +=
      encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  return encodedValue;
}

export function buildUrl(url, parameters) {
  let qs = "";
  for (const key in parameters) {
    if (parameters.hasOwnProperty(key)) {
      const value = parameters[key];
      qs += encodeValue(value, key);
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }

  return url;
}

export function fetchData(url, cb) {
  fetch(url, {cache: 'no-cache'})
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => cb(data))
    .catch(function () {
      console.log("error");
    })
}

export function fetchDataWithParams(url, params, cb) {
  fetchData(buildUrl(url, params), cb);
}