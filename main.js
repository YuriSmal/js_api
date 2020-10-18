// 1. Створити сайт використовуючи swapi.dev. вибрати 1 з 6 проперті (films, characters etc..)
// і зробити запит по них, вибрати одну з перших проперті що отримаєте і витягнувши з неї "url"
//  - отримати конкретну(планету,фільм, персонажа) з всією інформацією про нього. 
//  Додати кнопку при натисканні на яку вивести всю наявну інформацію на екран красиво структуровано. 


let node = null;
let initialUrl = "https://swapi.dev/api/";
let wrapper = document.getElementById("wrapper");


window.onload = function () {
    node = fetch(initialUrl)
    .then(response => response.json())
    .then(result => node = result)
    .then(function() {
        node = fetch(node.films)
            .then(response => response.json())
            .then(result => node = result)
    });
};

function showFilmInfo(hiddenInfo) {
    for (let i = 0; i < node.results.length; i++) {
       let table = document.createElement("table");
       let div = document.createElement('div');
       let h2 = document.createElement("h2");
       h2.innerHTML = `Episode ${node.results[i].episode_id} - ${node.results[i].title}`;
       
       div.appendChild(h2);
       div.appendChild(table);

       let button = document.createElement("button");
       button.innerHTML = "Show more info";
       button.classList.add("show-more");
       table.after(button);
       

       button.onclick = function() {

           let buttonClose = document.createElement("button");
           buttonClose.innerHTML = "Close";
           buttonClose.classList.add("show-more");
           buttonClose.classList.add("btn-close");
           h2.after(buttonClose);
           button.style.display = "none";

           buttonClose.onclick = function() {
               while(div.firstChild) {
                   div.removeChild(table);
                   button.style.display = "block";
                   div.appendChild(button);
                   if (buttonClose) {
                       div.removeChild(buttonClose);
                   }
               }
           }

           for (let key in node.results[i]) {
               let tr = document.createElement("tr");
               let tdKey = document.createElement("td");
               tdKey.classList.add("td-key");
               tdKey.innerHTML = key;
               let tdVal = document.createElement("td");
               tdVal.innerHTML = node.results[i][key];

               tr.appendChild(tdKey);
               tr.appendChild(tdVal);
               table.appendChild(tr);
               div.appendChild(table);
           }
           
       }
       wrapper.appendChild(div);
}}; 

// 2. Використовуючи параметр серч, розробити сайт який буде з допомогою інпута робити
//  пошук за конкретним параметром і виводити дані на сторінку. 
//  (якщо 1 знахідка - вивести всю інфу про айтем, якщо більше 1 то вивести список по філду).

let searchUrl = "https://swapi.dev/api/films/?search=";
let nodeSearch = null;

let filter = function() {
    let value = document.getElementById("input").value;
    nodeSearch = fetch(`${searchUrl}${value}`)
        .then(response => response.json())
        .then(result => nodeSearch = result)
        .then(function() {
            for (let i = 0; i < nodeSearch.results.length; i++) {

                let table = document.createElement("table");
                let div = document.createElement('div');
                let h2 = document.createElement("h2");
                h2.innerHTML = `Movie ${nodeSearch.results[i].episode_id}`;
                div.appendChild(h2);
                div.appendChild(table);

                    for (let key in nodeSearch.results[i]) {

                        let tr = document.createElement("tr");
                        let tdKey = document.createElement("td");
                        tdKey.classList.add("td-key");
                        tdKey.innerHTML = key;
                        let tdVal = document.createElement("td");
                        tdVal.innerHTML = nodeSearch.results[i][key];

                        tr.appendChild(tdKey);
                        tr.appendChild(tdVal);
                        table.appendChild(tr);
                        div.appendChild(table);
                        }
                wrapper.appendChild(div);
            }
        }    
)}

