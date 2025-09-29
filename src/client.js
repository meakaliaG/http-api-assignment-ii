const API_URL = 'http://localhost:3000';

const addUser = async (name, age) => {
  try {
    const response = await fetch(`${API_URL}/addUser`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
          'Accept': 'application/json' },
      body: JSON.stringify({ name, age }),
    });

    const content = document.getElementById('content');

    // 204 No Content
    if (response.status === 204) {
      content.textContent = `User ${name} updated successfully.`;
      return;
    }

    const json = await response.json();
    content.textContent = `[${json.statusName}] ${json.message}`;
  } catch (err) {
    console.error(err);
  }
};

const sendRequest = async (path, method = 'GET') => {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      headers: { 'Accept': 'application/json' },
    });

    const content = document.getElementById('content');

    if (method === 'HEAD') {
      content.textContent = `[HEAD] Status: ${response.status}`;
      return;
    }

    const json = await response.json();
    content.textContent = `[${json.statusName}] ${json.message}
                        \nUsers:${JSON.stringify(json.users || {}, null, 2)}`;
  } catch (err) {
    console.error(err);
  }
};

window.onload = () => {
    const nameForm = document.getElementById('nameForm');
    const nameInput = document.getElementById('nameField');
    const ageInput = document.getElementById('ageField');
  
    userForm.onsubmit = (e) => {
        e.preventDefault(); 
    
        const path = urlField.value;
        const method = methodSelect.value.toUpperCase();
        sendRequest(path, method);
    };

    nameForm.onsubmit = (e) => {
      e.preventDefault(); 
  
      const name = nameInput.value.trim();
      const age = parseInt(ageInput.value, 10);
  
      if (!name || isNaN(age)) {
        alert('Please enter a valid name and age.');
        return;
      }
  
      addUser(name, age);
    };
  };
  
