// Helper function for fetch
const fetchHelper = (method, path, token, body) => {
  const request = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  if (token !== null) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  console.log(request);

  return new Promise((resolve, reject) => {
    // have to call either resolve or reject
    fetch(path, request)
      .then((response) => {
        if (response.status === 400 || response.status === 403) {
          response.json().then((errorMsg) => {
            reject(errorMsg.error);
          });
        } else if (response.status === 200) {
          return response.json().then(data => {
            resolve(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

export { fetchHelper };
