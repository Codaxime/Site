// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).hide();
        });
    });
}

// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div"); // Creer une div pour contenir une carte Bootstrap
                card.classList.add("col-lg-4", "mt-4");    // Avec les classes: 3 cartes par ligne et marge top 4 *1.5rem
                // Remplit le HTML de la carte avec image/titre/texte
                card.innerHTML = `                       
                    <div class="card skillsText">          
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="skill"/> 
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `; 

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        });
}
// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item, index) => {
                const modalId = `modalProjet${index}`;

                // Carte du projet
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="images/${item.image}" style="width:100%; height:150px;" alt="${item.title}">
                        <div class="card-body">
                            <h3 class="card-title">${item.title}</h3>
                            
                            <div class="text-center">
                                
                                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">Voir plus</button>
                            </div>
                        </div>
                    </div>
                `;
                row.appendChild(card);

                // Modal du projet
                const modal = document.createElement("div");
                modal.classList.add("modal", "fade");
                modal.id = modalId;
                modal.tabIndex = -1;
                modal.setAttribute("aria-labelledby", `${modalId}Label`);
                modal.setAttribute("aria-hidden", "true");
                modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content custom-bg">
                            <div class="modal-header">
                                <h5 class="modal-title" id="${modalId}Label">${item.title}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                            </div>
                            <div class="modal-body">
                                <h6 class="fw-bold mb-2">Résumé</h6>
                                <p class="mb-4">${item.resume}</p>
                                <h6>Objectifs</h6>
                                <p>${item.objectives}</p>
                                <h6>Travail accompli</h6>
                                    ${Array.isArray(item.work) 
                                    ? `<ul>${item.work.map(point => `<li>${point}</li>`).join("")}</ul>`
                                    : `<p>${item.work}</p>`}

                            </div>

    <div class="modal-footer">
            <a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener noreferrer">Lien Google drive des livrables</a>
            

                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                // Tous les 3 projets, on injecte une nouvelle ligne
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch((error) => {
            console.error("Erreur lors du chargement du fichier portfolio.json :", error);
        });
}


// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
