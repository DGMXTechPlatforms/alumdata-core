// const baseUrl = process.env.REACT_APP_API_URL;
// const baseUrl = process.env.REACT_APP_WS_URI;
let baseUrl;
baseUrl = `https://${window.location.host}/api`;
if (/localhost:300/.test(window.location.host)) {
  baseUrl = process.env.REACT_APP_API_URL;
  baseUrl = 'https://alumdata-server.herokuapp.com/api/v1';
}

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

// const fetchConToken = (endpoint, data, method = 'GET') => {
//   const url = `${baseUrl}/${endpoint}`;
//   const token = localStorage.getItem('token') || '';
//   if (method === 'GET') {
//     return fetch(url, {
//       method,
//       headers: {
//         'x-token': token,
//       },
//     });
//   } else {
//     return fetch(url, {
//       method,
//       headers: {
//         'Content-type': 'application/json',
//         'x-token': token,
//       },
//       body: JSON.stringify(data),
//     });
//   }
// };

const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('token') || '';
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
};

const fetchConTokenColaborador = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('tokencolaborador') || '';

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }
};

export { fetchSinToken, fetchConToken, fetchConTokenColaborador };
