// Create table function inspired by u /Cerbrus at https://stackoverflow.com/a/14644462
function createTable(headers, data) {
    const tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.borderCollapse = 'collapse';
    tbl.style.marginTop = '10px';
  
    // Create the header row
    const headerRow = tbl.insertRow();
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.appendChild(document.createTextNode(headerText));
      th.style.border = '1px solid black';
      th.style.padding = '8px';
      th.style.backgroundColor = '#f2f2f2';
      headerRow.appendChild(th);
    });
  
    // Create rows for data
    data.forEach(rowData => {
      const row = tbl.insertRow();
      rowData.forEach(cellData => {
        const td = row.insertCell();
        td.appendChild(document.createTextNode(cellData));
        td.style.border = '1px solid black';
        td.style.padding = '8px';
      });
    });
  
    return tbl;
    
}

// Fetch users from the Google Cloud Run backend API and display them in the HTML / DOM
async function getUsers(url) {

  try {

    usersDiv = document.createElement('div');
    usersDiv.id = 'users';
    document.body.appendChild(usersDiv);
    usersDiv.innerHTML = '<h2>Attempting to fetch users...</h2>';
    
    // Fetch response from the backend
    const requestUrl = `${url}/users`;
    const response = await fetch(requestUrl)
    
    if (!response.ok) {
      throw new Error(`HTTP error, status: ${response.status}`);
    }

    const users = await response.json();

    usersDiv.innerHTML = '<h2>Users</h2>';

    // Create the table
    const headers = ['Name', 'Email', 'Age'];
    const rows = users.map(user => [user.name, user.email, user.age]);
    const table = createTable(headers, rows);
    usersDiv.appendChild(table);

  } catch (error) {
    console.error('Error fetching users:', error);
    document.getElementById('users').innerText = 'Failed to load users, error can be found in console';
  }

}