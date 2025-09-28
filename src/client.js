const sendRequest = async (url, method) => {
  try {
    const response = await fetch(url, { method });

    console.log('Status: ${response.status');

    if (method === 'HEAD') {
      console.log('HEAD request - no body');
      return;
    }

    if (response.status !== 204) {
      const json = await response.json();
      console.log(json);
    }
  } catch (err) {
    console.error(err);
  }
};

const addUser = async (name, age) => {
  try {
    const response = await fetch('/addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age }),
    });

    console.log(`Status: ${response.status}`);

    if (response.status !== 204) {
      const json = await response.json();
      console.log(json);
    }
  } catch (err) {
    console.error(err);
  }
};

// button connection
window.onload = () => {
  const getBtn = document.getElementById('getBtn');
  const addBtn = document.getElementById('addBtn');

  if (getBtn) {
    getBtn.onclick = () => sendRequest('/getUsers', 'GET');
  }
  if (addBtn) {
    addBtn.onclick = () => addUser('TestUser', 25);
  }
};
