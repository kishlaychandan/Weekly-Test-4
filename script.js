let input = document.getElementsByClassName("input")[0];
let searchBtn = document.getElementsByClassName("searchBtn")[0];
let card = document.querySelector(".card");

function cardFormat(image, phone_name, brand) {
    let div = `
        <div class="cards">
            <img src="${image}" alt="${phone_name}">
            <h1>${phone_name}</h1>
            <h2>${brand}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <button>SHOW DETAILS</button>
        </div>
    `;
    return div;
}

let dataDetail;
async function fetchData() {
    console.log("Fetching data...");
    let query = input.value.toLowerCase();
    let fetched = await fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`);
    dataDetail = await fetched.json();

    if (input.value === "") {
        console.log("hii");
        console.log(dataDetail);
        createCard(dataDetail.data);
    } else {
        let filteredData = dataDetail.data.filter(phone => 
            phone.phone_name.toLowerCase().includes(query) || 
            phone.brand.toLowerCase().includes(query)
        );
        if (filteredData.length > 0) {
            createCard(filteredData);
        } else {
            notFound();
        }
    }
}

function createCard(filterData) {
    console.log("creating",filterData);
    card.innerHTML = "";  // Clear previous results
    filterData.forEach(element => {
        card.innerHTML += cardFormat(element.image, element.phone_name, element.brand);
    });
}

function notFound() {
    let divNot = `<h1>No Mobile Phone Found in this Store</h1>`;
    card.innerHTML = divNot;
}

searchBtn.addEventListener("click", fetchData);
