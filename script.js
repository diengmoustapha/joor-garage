let panier = JSON.parse(localStorage.getItem("panier")) || [];


// =========================
// SAUVEGARDER LE PANIER
// =========================

function sauvegarderPanier() {
    localStorage.setItem("panier", JSON.stringify(panier));
}


// =========================
// AJOUTER AU PANIER
// =========================

function AjouterPanier(nom, prix) {

    let produitExiste = panier.find(
        produit => produit.nom === nom
    );

    if (produitExiste) {
        produitExiste.quantite++;
    } else {
        panier.push({
            nom: nom,
            prix: prix,
            quantite: 1
        });
    }

    sauvegarderPanier();
    afficherPanier();
}


// =========================
// AFFICHER LE PANIER
// =========================

function afficherPanier() {

    let listePanier =
        document.getElementById("liste-panier");

    let totalElement =
        document.getElementById("total");

    let compteurElement =
        document.getElementById("compteur");


    if (!listePanier || !totalElement || !compteurElement) {
        return;
    }


    listePanier.innerHTML = "";

    let total = 0;
    let compteur = 0;


    panier.forEach(function(produit, index) {

        let sousTotal =
            produit.prix * produit.quantite;

        total += sousTotal;
        compteur += produit.quantite;


        let ligne =
            document.createElement("div");

        ligne.className = "article-panier";


        ligne.innerHTML = `
            <p>
                <strong>${produit.nom}</strong>
                <br>
                Prix : ${produit.prix.toLocaleString()} FCFA
                <br>
                Quantité : ${produit.quantite}
                <br>
                Sous-total : ${sousTotal.toLocaleString()} FCFA
            </p>

            <button onclick="diminuerProduit(${index})">
                −
            </button>

            <button onclick="augmenterProduit(${index})">
                +
            </button>

            <button onclick="supprimerProduit(${index})">
                Supprimer
            </button>
        `;


        listePanier.appendChild(ligne);
    });


    compteurElement.textContent = compteur;

    totalElement.textContent =
        total.toLocaleString();


    if (panier.length === 0) {

        listePanier.innerHTML =
            "<p>Votre panier est vide.</p>";
    }
}


// =========================
// AUGMENTER LA QUANTITE
// =========================

function augmenterProduit(index) {

    panier[index].quantite++;

    sauvegarderPanier();
    afficherPanier();
}


// =========================
// DIMINUER LA QUANTITE
// =========================

function diminuerProduit(index) {

    if (panier[index].quantite > 1) {

        panier[index].quantite--;

    } else {

        panier.splice(index, 1);
    }

    sauvegarderPanier();
    afficherPanier();
}


// =========================
// SUPPRIMER UN PRODUIT
// =========================

function supprimerProduit(index) {

    panier.splice(index, 1);

    sauvegarderPanier();
    afficherPanier();
}


// =========================
// PASSER COMMANDE
// =========================

function passerCommande() {

    if (panier.length === 0) {

        alert("Votre panier est vide !");

        return;
    }


    let formulaire =
        document.getElementById("formulaire-commande");


    if (formulaire) {

        formulaire.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =========================
// ENVOYER LA COMMANDE
// =========================

function envoyerCommande(event) {

    event.preventDefault();


    if (panier.length === 0) {

        alert("Votre panier est vide !");

        return;
    }


    let nom =
        document.getElementById("nom-client").value;

    let telephone =
        document.getElementById("telephone-client").value;

    let adresse =
        document.getElementById("adresse-client").value;


    let messageClientElement =
        document.getElementById("message-client");


    let messageClient = "";

    if (messageClientElement) {

        messageClient =
            messageClientElement.value;
    }


    let message =
        "Bonjour Joor Garage Automobile !\n\n";

    message +=
        "Nouvelle commande\n\n";

    message +=
        "Nom : " + nom + "\n";

    message +=
        "Téléphone : " + telephone + "\n";

    message +=
        "Adresse : " + adresse + "\n";


    if (messageClient.trim() !== "") {

        message +=
            "Précision : " +
            messageClient +
            "\n";
    }


    message +=
        "\nProduits commandés :\n";


    let totalCommande = 0;


    panier.forEach(function(produit) {

        let sousTotal =
            produit.prix * produit.quantite;

        totalCommande += sousTotal;


        message +=
            "- " +
            produit.nom +
            " x" +
            produit.quantite +
            " = " +
            sousTotal.toLocaleString() +
            " FCFA\n";
    });


    message +=
        "\nTotal : " +
        totalCommande.toLocaleString() +
        " FCFA";


    let numeroGarage =
        "221787816539";


    let lienWhatsApp =
        "https://wa.me/" +
        numeroGarage +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        lienWhatsApp,
        "_blank"
    );
}


// =========================
// OUVRIR LE PANIER
// =========================

function ouvrirPanier() {

    document
        .getElementById("panier-panel")
        .classList.add("ouvert");


    document
        .getElementById("fond-panier")
        .classList.add("ouvert");
}


// =========================
// FERMER LE PANIER
// =========================

function fermerPanier() {

    document
        .getElementById("panier-panel")
        .classList.remove("ouvert");


    document
        .getElementById("fond-panier")
        .classList.remove("ouvert");
}


// =========================
// AFFICHER LE PANIER AU DEMARRAGE
// =========================

afficherPanier();

function rechercherProduit() {

    let recherche = document
        .getElementById("recherche")
        .value
        .toLowerCase();

    let produits = document.querySelectorAll(".produit");

    produits.forEach(function(produit) {

        let nom = produit
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (nom.includes(recherche)) {
            produit.style.display = "";
        } else {
            produit.style.display = "none";
        }

    });
}


function filtrerProduits(categorie) {

    let produits = document.querySelectorAll(".produit");

    produits.forEach(function(produit) {

        if (
            categorie === "tous" ||
            produit.dataset.categorie === categorie
        ) {
            produit.style.display = "";
        } else {
            produit.style.display = "none";
        }

    });

}