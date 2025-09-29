/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client.js":
/*!***********************!*\
  !*** ./src/client.js ***!
  \***********************/
/***/ (() => {

eval("{const API_URL = 'http://localhost:3000';\n\n\n  \n  const updateUserList = async () => {\n    const response = await fetch('/getUsers', { method: 'GET' });\n    const json = await response.json();\n    const content = document.getElementById('content');\n    content.textContent = JSON.stringify(json.users, null, 2);\n  };\n\nconst addUser = async (name, age) => {\n  try {\n    const response = await fetch(`${API_URL}/addUser`, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n        Accept: 'application/json',\n      },\n      body: JSON.stringify({ name, age }),\n    });\n\n    const content = document.getElementById('content');\n\n    // 204 No Content\n    if (response.status === 204) {\n      content.textContent = `User ${name} updated successfully.`;\n      return;\n    }\n\n    const json = await response.json();\n    content.textContent = `[${json.statusName}] ${json.message}`;\n  } catch (err) {\n    console.error(err);\n  }\n};\n\nconst sendRequest = async (path, method = 'GET') => {\n  try {\n    const response = await fetch(`${API_URL}${path}`, {\n      method,\n      headers: { Accept: 'application/json' },\n    });\n\n    const content = document.getElementById('content');\n\n    if (method === 'HEAD') {\n      content.textContent = `[HEAD] Status: ${response.status}`;\n      return;\n    }\n\n    const json = await response.json();\n    updateUserList();\n    content.textContent = `[${json.statusName}] ${json.message}\n                        \\nUsers:${JSON.stringify(json.users || {}, null, 2)}`;\n  } catch (err) {\n    console.error(err);\n  }\n};\n\n\nwindow.onload = () => {\n  const nameForm = document.getElementById('nameForm');\n  const nameInput = document.getElementById('nameField');\n  const ageInput = document.getElementById('ageField');\n\n  userForm.onsubmit = (e) => {\n    e.preventDefault();\n\n    const path = urlField.value;\n    const method = methodSelect.value.toUpperCase();\n    sendRequest(path, method);\n  };\n\n  nameForm.onsubmit = (e) => {\n    e.preventDefault();\n\n    const name = nameInput.value.trim();\n    const age = parseInt(ageInput.value, 10);\n\n    if (!name || isNaN(age)) {\n      alert('Please enter a valid name and age.');\n      return;\n    }\n\n    addUser(name, age);\n  };\n};\n\n\n//# sourceURL=webpack://http-api-assignment-ii/./src/client.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client.js"]();
/******/ 	
/******/ })()
;