let pageNumber = 1;

async function displayData() {
    let url = "https://dummyjson.com/products?skip=0&limit=100";

    let data = await (await fetch(url)).json();

    let totalRecords = (data.products).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    let html = "";

    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    let buttons = '';
    let activeClass = '';

    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    for (let i = startIndex; i <= endIndex; i++) {

        if (data.products[i] === undefined) {
            break;
        }

        html +=
        `
        <tr>
            <td>${i+1}</td>
            <td>${data.products[i].title}</td>
            <td>${data.products[i].brand}</td>
            <td>${data.products[i].category}</td>
            <td>$${data.products[i].price}</td>
            <td>${data.products[i].discountPercentage}%</td>
            <td>${data.products[i].rating}/5</td>
            <td>${data.products[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${data.products[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${data.products[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${i})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${i})">Delete</a>
            </td>
        </tr>
        `;
    }

    document.getElementById("data").innerHTML = html;
    document.getElementById(`page${pageNumber}`).classList.add('active');

    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }

}

function nxtBtn() {
    pageNumber++;
    displayData();
}

function pvsBtn() {
    pageNumber--;
    displayData();
}

function getPage(index) {
    pageNumber = index;
    displayData();
}

async function searchProduct() {
    let input = document.getElementById("search-box").value;

    let url = `https://dummyjson.com/products/search?q=${input}`;

    let data = await (await fetch(url)).json();
    
    document.getElementById("data").innerHTML = "";

    console.log(data);

    let totalRecords = (data.products).length;
    console.log(totalRecords);
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    let html = "";

    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    let buttons = '';
    let activeClass = '';

    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    for (let i = startIndex; i <= endIndex; i++) {

        if (data.products[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${data.products[i].title}</td>
            <td>${data.products[i].brand}</td>
            <td>${data.products[i].category}</td>
            <td>$${data.products[i].price}</td>
            <td>${data.products[i].discountPercentage}%</td>
            <td>${data.products[i].rating}/5</td>
            <td>${data.products[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${data.products[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${data.products[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${i})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${i})">Delete</a>
            </td>
        </tr>
        `;
    }

    document.getElementById("data").innerHTML = html;
    document.getElementById(`page${pageNumber}`).classList.add('active');

    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting Functionality starts from Here

// Single and Double click Functionality for title wise sorting
$("#titleTH").click(() => {
    sorting_A_To_Z_Title();
});

$("#titleTH").dblclick(() => {
    sorting_Z_To_A_Title();
});

// Single and Double click Functionality for brand wise sorting
$("#brandTH").click(() => {
    sorting_A_To_Z_Brand();
});

$("#brandTH").dblclick(() => {
    sorting_Z_To_A_Brand();
});

// Single and Double click Functionality for category wise sorting
$("#categoryTH").click(() => {
    sorting_A_To_Z_Category();
});

$("#categoryTH").dblclick(() => {
    sorting_Z_To_A_Category();
});

// Single and Double click Functionality for price wise sorting
$("#priceTH").click(() => {
    sorting_A_To_Z_Price();
});

$("#priceTH").dblclick(() => {
    sorting_Z_To_A_Price();
});

// Single and Double click Functionality for rating wise sorting
$("#ratingTH").click(() => {
    sorting_A_To_Z_Rating();
});

$("#ratingTH").dblclick(() => {
    sorting_Z_To_A_Rating();
});

// Single and Double click Functionality for discount percentage wise sorting
$("#discountPercentageTH").click(() => {
    sorting_A_To_Z_Discount_Percentage();
});

$("#discountPercentageTH").dblclick(() => {
    sorting_Z_To_A_Discount_Percentage();
});

// Single and Double click Functionality for stock wise sorting
$("#stockTH").click(() => {
    sorting_A_To_Z_Stock();
});

$("#stockTH").dblclick(() => {
    sorting_Z_To_A_Stock();
});

// Sorting whole data through title from A to Z
async function sorting_A_To_Z_Title() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through title from Z to A
async function sorting_Z_To_A_Title() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through Brand from A to Z
async function sorting_A_To_Z_Brand() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.brand.toLowerCase() < b.brand.toLowerCase()) ? -1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through Brand from Z to A
async function sorting_Z_To_A_Brand() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.brand.toLowerCase() < b.brand.toLowerCase()) ? 1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through category from A to Z
async function sorting_A_To_Z_Category() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.category.toLowerCase() < b.category.toLowerCase()) ? -1 : (a.category.toLowerCase() > b.category.toLowerCase()) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through category from Z to A
async function sorting_Z_To_A_Category() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.category.toLowerCase() < b.category.toLowerCase()) ? 1 : (a.category.toLowerCase() > b.category.toLowerCase()) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through price from A to Z
async function sorting_A_To_Z_Price() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through price from Z to A
async function sorting_Z_To_A_Price() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.price < b.price) ? 1 : (a.price > b.price) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through discountPercentage from A to Z
async function sorting_A_To_Z_Discount_Percentage() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.discountPercentage < b.discountPercentage) ? -1 : (a.discountPercentage > b.discountPercentage) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through discountPercentage from Z to A
async function sorting_Z_To_A_Discount_Percentage() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.discountPercentage < b.discountPercentage) ? 1 : (a.discountPercentage > b.discountPercentage) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through rating from A to Z
async function sorting_A_To_Z_Rating() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.rating < b.rating) ? -1 : (a.rating > b.rating) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through rating from Z to A
async function sorting_Z_To_A_Rating() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating > b.rating) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through stock from A to Z
async function sorting_A_To_Z_Stock() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.stock < b.stock) ? -1 : (a.stock > b.stock) ? 1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

// Sorting whole data through stock from Z to A
async function sorting_Z_To_A_Stock() {

    // URL of all Products
    let url = "https://dummyjson.com/products?skip=0&limit=1000";

    // Fetch data from URL and convert it into JSON Object
    let data = await (await fetch(url)).json();

    // Sort data using title property
    let sortedData = (data.products).sort((a, b) => (a.stock < b.stock) ? 1 : (a.stock > b.stock) ? -1 : 0);

    // Define total records, records per page and total page for data which is sorted
    let totalRecords = (sortedData).length;
    let recordsPerPage = 10;
    let totalPage = Math.ceil(totalRecords/recordsPerPage);

    // Set indexes
    let startIndex = (pageNumber - 1)*recordsPerPage;
    let endIndex = startIndex + (recordsPerPage - 1);

    // Variable to store all records
    let html = "";

    // Create previous button and store it in variable
    let previousButton = 
        `<li>
            <a href="javascript:void(0)" id="pvsBtn" onclick="pvsBtn()">Previous</a>
        </li>`;
    
    // Create Next button and store it in variable
    let nextButton = 
        `<li>
            <a href="javascript:void(0)" id="nxtBtn" onclick="nxtBtn()">Next</a>
        </li>`;

    // Create variable to store button and define active class of active page button
    let buttons = '';
    let activeClass = '';

    // Create buttons for each page
    for (let i = 1; i <= totalPage; i++) {

        buttons += `<li><a href="javascript:void(0)" id="page${i}" class=" ${activeClass}" onclick="getPage(${i})">${i}</a></li>`
    }

    // Append buttons to HTML page
    document.getElementById("add-buttons").innerHTML = `${previousButton} ${buttons} ${nextButton}`;

    // Get all records in created variable
    for (let i = startIndex; i <= endIndex; i++) {

        if (sortedData[i] === undefined) {
            break;
        }
        
        html += 
        
        `
        <tr>
            <td>${i+1}</td>
            <td>${sortedData[i].title}</td>
            <td>${sortedData[i].brand}</td>
            <td>${sortedData[i].category}</td>
            <td>$${sortedData[i].price}</td>
            <td>${sortedData[i].discountPercentage}%</td>
            <td>${sortedData[i].rating}/5</td>
            <td>${sortedData[i].stock}</td>
            <td>
                <a href="javascript:void(0)" onclick="displayThumbNail(${sortedData[i].id})" >Small Demo</a><br>
                <a href="javascript:void(0)" onclick="displayFullDemo(${sortedData[i].id})">Full Demo</a>
            </td>
            <td>
                <a href="javascript:void(0)" onclick="fillData(${(sortedData[i].id) - 1})">Edit</a><br>
                <a href="javascript:void(0)" onclick="deleteData(${(sortedData[i].id) - 1})">Delete</a>
            </td>
        </tr>
        `;
    }

    // Append all records to HTML page 
    document.getElementById("data").innerHTML = html;

    // Add style to active class
    document.getElementById(`page${pageNumber}`).classList.add('active');

    //Previous button disable logic 
    if (pageNumber == 1) {
        document.getElementById("pvsBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("pvsBtn").parentElement.classList.remove("disabled");
    }

    // Next button disable logic
    if (pageNumber == totalPage) {
        document.getElementById("nxtBtn").parentElement.classList.add("disabled");
    }
    else{
        document.getElementById("nxtBtn").parentElement.classList.remove("disabled");
    }
}

async function addProduct() {
    document.getElementById("add-product").style.display = "flex";

    let closeButton = document.getElementById("close");
    closeButton.style.display = "block";
    
    document.getElementById("container").classList.add("background-blur");
    document.getElementById("search-box").classList.add("search-box-blur");

    document.getElementById("add").classList.add("btn");
    document.getElementById("enter-search").classList.add("btn");

    let productBrand = document.getElementById("brand-value").value;
    let productTitle = document.getElementById("title-value").value;
    let productCategory = document.getElementById("category-value").value;
    let productDescription = document.getElementById("description-value").value;
    let productPrice = document.getElementById("price-value").value;
    let productDiscountPercentage = document.getElementById("discountPercentage-value").value;
    let productStock = document.getElementById("stock-value").value;
    let productRating = document.getElementById("rating-value").value;

    if (productBrand == "" || productTitle == "" || productCategory == "" || productDescription == "" || productPrice == "" || productDiscountPercentage == "" || productStock == "" || productRating == "") {
        return false;
    }
    else {
        let url = "https://dummyjson.com/products/add";

        let data = await (await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                brand: `${productBrand}`,
                category: `${productCategory}`,
                description: `${productDescription}`,
                discountPercentage: `${productDiscountPercentage}`,
                price: `${productPrice}`,
                rating: `${productRating}`,
                stock: `${productStock}`,
                title: `${productTitle}`,
            })
        })).json();

        console.log(data);

        addDataToCreateToastMessage(data);
    }

}

function addDataToCreateToastMessage(data) {

    document.getElementById("add-product").style.display = "none";

    let closeButton = document.getElementById("close");
    closeButton.style.display = "block";

    document.getElementById("toast-message").innerHTML = "";

    let html = document.createElement("p");

    html.innerHTML = 
    `
    <strong class="message">PRODUCT SUCCESSFULLY ADDED</strong> <br><br>
        ID : <strong class="body">${data.id}</strong> <br>
        TITLE : <strong class="body">${data.title}</strong> <br>
        BRAND : <strong class="body">${data.brand}</strong> <br>
        CATEGORY : <strong class="body">${data.category}</strong>  <br>
        PRICE : <strong class="body">${data.price}</strong>
    `;

    document.getElementById("toast-message").appendChild(html);

    document.getElementById("toast-message").style.display = "block";

    document.getElementById("container").classList.add("background-blur");
    document.getElementById("search-box").classList.add("search-box-blur");

    document.getElementById("add").classList.add("btn");
    document.getElementById("enter-search").classList.add("btn");
}

// This function is Update the Product
async function fillData(id) {

    key = id;
    let url = `https://dummyjson.com/products/${key+1}`;

    let data = await (await fetch(url)).json();

    console.log(data);

    let productBrand = data.brand;
    let productTitle = data.title;
    let productCategory = data.category;
    let productDescription = data.description;
    let productPrice = data.price;
    let productDiscountPercentage = data.discountPercentage;
    let productStock = data.stock;
    let productRating = data.rating;

    document.getElementById("add-product").style.display = "flex";

    let closeButton = document.getElementById("close");
    closeButton.style.display = "block";
    
    document.getElementById("container").classList.add("background-blur");
    document.getElementById("search-box").classList.add("search-box-blur");

    document.getElementById("add").classList.add("btn");
    document.getElementById("enter-search").classList.add("btn");

    document.getElementById("brand-value").value = productBrand;
    document.getElementById("title-value").value = productTitle;
    document.getElementById("category-value").value = productCategory;
    document.getElementById("description-value").value = productDescription;
    document.getElementById("price-value").value = productPrice;
    document.getElementById("discountPercentage-value").value = productDiscountPercentage;
    document.getElementById("stock-value").value = productStock;
    document.getElementById("rating-value").value = productRating;
}

async function updateData(key) {

    let updatedProductBrand = document.getElementById("brand-value").value;
    let updatedProductTitle = document.getElementById("title-value").value;
    let updatedProductCategory = document.getElementById("category-value").value;
    let updatedProductDescription = document.getElementById("description-value").value;
    let updatedProductPrice =  document.getElementById("price-value").value;
    let updatedProductDiscountPercentage = document.getElementById("discountPercentage-value").value;
    let updatedProductStock = document.getElementById("stock-value").value;
    let updatedProductRating = document.getElementById("rating-value").value;

    let updateUrl = `https://dummyjson.com/products/${key+1}`;

    let updatedData = await (await fetch(updateUrl, 
    {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            brand: `${updatedProductBrand}`,
            category: `${updatedProductCategory}`,
            description: `${updatedProductDescription}`,
            discountPercentage: `${updatedProductDiscountPercentage}`,
            price: `${updatedProductPrice}`,
            rating: `${updatedProductRating}`,
            stock: `${updatedProductStock}`,
            title: `${updatedProductTitle}`
        })
    })).json();

    addDataToUpdateToastMessage(updatedData);

    document.getElementById("brand-value").value = "";
    document.getElementById("title-value").value = "";
    document.getElementById("category-value").value = "";
    document.getElementById("description-value").value = "";
    document.getElementById("price-value").value = "";
    document.getElementById("discountPercentage-value").value = "";
    document.getElementById("stock-value").value = "";
    document.getElementById("rating-value").value = "";

    document.getElementById("add-product").style.display = "none";

}

function addDataToUpdateToastMessage(updatedData) {
    document.getElementById("toast-message").innerHTML = "";

    let html = document.createElement("p");

    html.innerHTML = 
    `
    <strong class="message">DATA SUCCESSFULLY UPDATED</strong> <br><br>
        ID : <strong class="body">${updatedData.id}</strong> <br>
        TITLE : <strong class="body">${updatedData.title}</strong> <br>
        BRAND : <strong class="body">${updatedData.brand}</strong> <br>
        CATEGORY : <strong class="body">${updatedData.category}</strong> <br>
        PRICE : <strong class="body">${updatedData.price}</strong> <br>
        STOCK : <strong class="body">${updatedData.stock}</strong> <br>
        RATING : <strong class="body">${updatedData.rating}</strong>
    `;

    document.getElementById("toast-message").appendChild(html);

    document.getElementById("toast-message").style.display = "block";

    document.getElementById("container").classList.add("background-blur");
    document.getElementById("add").classList.add("btn");
    document.getElementById("enter-search").classList.add("btn");
    document.getElementById("search-box").classList.add("search-box-blur");

    let closeButton = document.getElementById("close");
    closeButton.style.display = "block";
}

// This function is Delete the Product
async function deleteData(id) {

    let key = id;
    let url = `https://dummyjson.com/products/${key+1}`;

    let data = await (await fetch(url, {method:"DELETE"})).json();

    console.log(data);

    addDataToDeleteToastMessage(data);

}

function addDataToDeleteToastMessage(data) {

    document.getElementById("toast-message").innerHTML = "";

    let html = document.createElement("p");

    html.innerHTML = 
    `
    <strong class="message">DATA SUCCESSFULLY DELETED</strong> <br><br>
        ID : <strong class="body">${data.id}</strong> <br>
        TITLE : <strong class="body">${data.title}</strong> <br>
        BRAND : <strong class="body">${data.brand}</strong> <br>
        CATEGORY : <strong class="body">${data.category}</strong>  <br><br>
        IsDELETED : <strong class="body">${data.isDeleted}</strong> <br>
        DELETED ON : <strong class="body"> ${data.deletedOn}</strong> 
    `;

    document.getElementById("toast-message").appendChild(html);

    document.getElementById("toast-message").style.display = "block";

    document.getElementById("container").classList.add("background-blur");
    document.getElementById("search-box").classList.add("search-box-blur");

    document.getElementById("add").classList.add("btn");
    document.getElementById("enter-search").classList.add("btn");

    let closeButton = document.getElementById("close");
    closeButton.style.display = "block";
}

async function displayThumbNail(id) {

    let smallDemoContainer = document.getElementById("smallDemo");
    let closeButton = document.getElementById("close");

    if (smallDemoContainer.innerHTML = null) {

        smallDemoContainer.style.display = "block";

        let key = id;
        let url = `https://dummyjson.com/products/${key}`;

        let data = await (await fetch(url)).json();

        let smallDemo = document.createElement('img');
        console.log(smallDemo);
        smallDemo.src = data.thumbnail;

        document.getElementById("smallDemo").appendChild(smallDemo);

        document.getElementById("container").classList.add("background-blur");
        document.getElementById("search-box").classList.add("search-box-blur");

        closeButton.style.display = "block";
    }
    else {
        smallDemoContainer.innerHTML = null;

        smallDemoContainer.style.display = "block";

        let key = id;
        let url = `https://dummyjson.com/products/${key}`;

        let data = await (await fetch(url)).json();

        let smallDemo = document.createElement('img');
        console.log(smallDemo);
        smallDemo.src = data.thumbnail;

        document.getElementById("smallDemo").appendChild(smallDemo);

        document.getElementById("container").classList.add("background-blur");
        document.getElementById("search-box").classList.add("search-box-blur");

        document.getElementById("add").classList.add("btn");
        document.getElementById("enter-search").classList.add("btn");

        closeButton.style.display = "block";

    }
}

function closeSmallDemo() {

    document.getElementById("smallDemo").style.display = "none";
    document.getElementById("close").style.display = "none";

    document.getElementById("container").classList.remove("background-blur");
    document.getElementById("search-box").classList.remove("search-box-blur");

    document.getElementById("add-product").style.display = "none";

    document.getElementById("toast-message").style.display = "none";

    document.getElementById("add").classList.remove("btn");
    document.getElementById("enter-search").classList.remove("btn");
}

async function displayFullDemo(id) {

    let key = id;

    let url = `https://dummyjson.com/products/${key}`;

    let data = await (await fetch(url)).json();

    console.log(data);

    let fullDemo = document.getElementById("smallDemo");
    let closeButton = document.getElementById("close");

    if (fullDemo.innerHTML = null) {

        fullDemo.style.display = "block";

        // Create First Section of Product Page : Title, Brand (Category) and Description
        let tbd = document.createElement('div');
        tbd.classList.add('tbd');

        // Create title element and add Product's title to it
        let title = document.createElement('p');
        title.innerHTML = data.title;
        console.log(title);
        title.classList.add('title-style');

        // Create Brand element and add Product's Brand to it
        let brand = document.createElement('p');
        brand.innerHTML = `<strong>${data.brand}</strong> (${data.category})`;
        console.log(brand);
        brand.classList.add('brand-style');

        // Create Description element and add Product's Description to it
        let description = document.createElement('p');
        description.innerHTML = data.description;
        console.log(description);
        description.classList.add('description-style');

        // Create Second section of Product page : Thumbnail and 4 images of Product
        let allImageContainer = document.createElement('div');

        // Create Thumbnail container and element and add Product's Thumbnail to it
        let thumbNailContainer = document.createElement('div');
        thumbNailContainer.classList.add('thumbNailContainer');
        let thumbNail = document.createElement('img');
        thumbNail.src = data.thumbnail;
        console.log(thumbNail);

        thumbNail.width = 830;
        thumbNail.height = 400;

        // Create other image container and add images to it
        let productImage = document.createElement('div');
        productImage.classList.add('productImage');

        // Create 1st Image element and add image to it
        let productImage1 = document.createElement('img');

        productImage1.src = data.images[0];
        console.log(productImage1);

        productImage1.width = 200;
        productImage1.height = 110;

        // Create 2nd Image element and add image to it
        let productImage2 = document.createElement('img');

        productImage2.src = data.images[1];
        console.log(productImage2);

        productImage2.width = 200;
        productImage2.height = 110;

        // Create 3rd Image element and add image to it
        let productImage3 = document.createElement('img');

        productImage3.src = data.images[2];
        console.log(productImage3);

        productImage3.width = 200;
        productImage3.height = 110;

        // Create 4th Image element and add image to it
        let productImage4 = document.createElement('img');

        productImage4.src = data.images[3];
        console.log(productImage4);

        productImage4.width = 200;
        productImage4.height = 110;

        // Create Third section of Product page : Price, Discount Percentage and Rating
        let pdr = document.createElement('div');
        pdr.classList.add('pdr');

        // Create Discount Percentage element and add Product's Discount Percentage to it
        let discountPercentage = document.createElement('p');
        discountPercentage.classList.add('discountPercentage-style');

        discountPercentage.innerHTML = `(${data.discountPercentage}% off)`;
        console.log(discountPercentage);

        // Create Price element and add Product's Price to it
        let price = document.createElement('p');
        price.classList.add('price-style');

        price.innerHTML = `Price <br> <strong>$${data.price}</strong>`;
        console.log(price);

        // Create Rating element and add Product's Rating to it
        let rating = document.createElement('p');
        rating.classList.add('rating-style');

        rating.innerHTML = `Rating <br> <strong>${data.rating} / 5</strong>`;
        console.log(rating);

        // Append all three items of First section to tbd
        tbd.appendChild(title);
        tbd.appendChild(brand);
        tbd.appendChild(description);

        // Append all images of Second section to their container Images
        thumbNailContainer.appendChild(thumbNail);
        productImage.appendChild(productImage1);
        productImage.appendChild(productImage2);
        productImage.appendChild(productImage3);
        productImage.appendChild(productImage4);

        allImageContainer.appendChild(thumbNailContainer);
        allImageContainer.appendChild(productImage);

        // Append all three items of Third section to pdr
        pdr.appendChild(discountPercentage);
        pdr.appendChild(price);
        pdr.appendChild(rating);

        // Create one container and apend all sections to it
        let fullDemoContainer = document.createElement('div');

        fullDemoContainer.appendChild(tbd);
        fullDemoContainer.appendChild(allImageContainer);
        fullDemoContainer.appendChild(pdr);

        fullDemoContainer.classList.add("fullDemoContainer");

        // Append container to HTML
        let categoryContainer = document.getElementsByClassName("smallDemo");

        categoryContainer[0].appendChild(fullDemoContainer);

        closeButton.style.display = "block";
        document.getElementById("add").classList.add("btn");
        document.getElementById("enter-search").classList.add("btn");
    }
    else {
        fullDemo.innerHTML = null;

        fullDemo.style.display = "block";

        // Create First Section of Product Page : Title, Brand (Category) and Description
        let tbd = document.createElement('div');
        tbd.classList.add('tbd');

        // Create title element and add Product's title to it
        let title = document.createElement('p');
        title.innerHTML = data.title;
        console.log(title);
        title.classList.add('title-style');

        // Create Brand element and add Product's Brand to it
        let brand = document.createElement('p');
        brand.innerHTML = `<strong>${data.brand}</strong> (${data.category})`;
        console.log(brand);
        brand.classList.add('brand-style');

        // Create Description element and add Product's Description to it
        let description = document.createElement('p');
        description.innerHTML = data.description;
        console.log(description);
        description.classList.add('description-style');

        // Create Second section of Product page : Thumbnail and 4 images of Product
        let allImageContainer = document.createElement('div');

        // Create Thumbnail container and element and add Product's Thumbnail to it
        let thumbNailContainer = document.createElement('div');
        thumbNailContainer.classList.add('thumbNailContainer');
        let thumbNail = document.createElement('img');
        thumbNail.src = data.thumbnail;
        console.log(thumbNail);

        thumbNail.width = 830;
        thumbNail.height = 400;

        // Create other image container and add images to it
        let productImage = document.createElement('div');
        productImage.classList.add('productImage');

        // Create 1st Image element and add image to it
        let productImage1 = document.createElement('img');

        productImage1.src = data.images[0];
        console.log(productImage1);

        productImage1.width = 200;
        productImage1.height = 110;

        // Create 2nd Image element and add image to it
        let productImage2 = document.createElement('img');

        productImage2.src = data.images[1];
        console.log(productImage2);

        productImage2.width = 200;
        productImage2.height = 110;

        // Create 3rd Image element and add image to it
        let productImage3 = document.createElement('img');

        productImage3.src = data.images[2];
        console.log(productImage3);

        productImage3.width = 200;
        productImage3.height = 110;

        // Create 4th Image element and add image to it
        let productImage4 = document.createElement('img');

        productImage4.src = data.images[3];
        console.log(productImage4);

        productImage4.width = 200;
        productImage4.height = 110;

        // Create Third section of Product page : Price, Discount Percentage and Rating
        let pdr = document.createElement('div');
        pdr.classList.add('pdr');

        // Create Discount Percentage element and add Product's Discount Percentage to it
        let discountPercentage = document.createElement('p');
        discountPercentage.classList.add('discountPercentage-style');

        discountPercentage.innerHTML = `(${data.discountPercentage}% off)`;
        console.log(discountPercentage);

        // Create Price element and add Product's Price to it
        let price = document.createElement('p');
        price.classList.add('price-style');

        price.innerHTML = `Price <br> <strong>$${data.price}</strong>`;
        console.log(price);

        // Create Rating element and add Product's Rating to it
        let rating = document.createElement('p');
        rating.classList.add('rating-style');

        rating.innerHTML = `Rating <br> <strong>${data.rating} / 5</strong>`;
        console.log(rating);

        // Append all three items of First section to tbd
        tbd.appendChild(title);
        tbd.appendChild(brand);
        tbd.appendChild(description);

        // Append all images of Second section to their container Images
        thumbNailContainer.appendChild(thumbNail);
        productImage.appendChild(productImage1);
        productImage.appendChild(productImage2);
        productImage.appendChild(productImage3);
        productImage.appendChild(productImage4);

        allImageContainer.appendChild(thumbNailContainer);
        allImageContainer.appendChild(productImage);

        // Append all three items of Third section to pdr
        pdr.appendChild(discountPercentage);
        pdr.appendChild(price);
        pdr.appendChild(rating);

        // Create one container and apend all sections to it
        let fullDemoContainer = document.createElement('div');

        fullDemoContainer.appendChild(tbd);
        fullDemoContainer.appendChild(allImageContainer);
        fullDemoContainer.appendChild(pdr);

        fullDemoContainer.classList.add("fullDemoContainer");

        // Append container to HTML
        let categoryContainer = document.getElementsByClassName("smallDemo");

        categoryContainer[0].appendChild(fullDemoContainer);

        closeButton.style.display = "block";
        document.getElementById("add").classList.add("btn");
        document.getElementById("enter-search").classList.add("btn");

    }
}