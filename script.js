function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      /// EXAM: COMPLÉTEZ LE CODE ICI !
      console.log(data);
      

      // TODO 1: REMPLIR LE HEADER

      let nomJournal = document.getElementById('nom-journal');
      nomJournal.textContent = data.journal.nomJournal ;
      let phraseAccroche = document.getElementById('phrase-accroche');
      phraseAccroche.textContent = data.journal.phraseAccroche ;

      // TODO 2: REMPLIR LA NAVIGATION

      let themes = data.journal.themes;
      let themesNav = document.getElementById("themes-nav");
      let btnTous = document.createElement("button");
      btnTous.textContent = "Tous";
      btnTous.classList.add("nav-theme-btn", "active");
      themesNav.appendChild(btnTous);

      themes.forEach(theme => {
      let btn = document.createElement("button");
      btn.textContent = theme.nom;
      btn.classList.add("nav-theme-btn");
      themesNav.appendChild(btn);

    });
    
      // TODO 3: REMPLIR L'ARTICLE PRINCIPAL

let articlePrincipal = data.journal.articlePrincipal;

let articlePrincipalElement = document.querySelector("#article-principal");

articlePrincipalElement.innerHTML = `
   <img src="${articlePrincipal.image}" alt="${articlePrincipal.titre}">

   <div class="article-content">
      <span class="badge-theme">
         ${articlePrincipal.theme}
      </span>

      <h1>${articlePrincipal.titre}</h1>

      <p>${articlePrincipal.description}</p>

      <span class="date">${articlePrincipal.date}</span>
   </div>
`;

      // TODO 4: REMPLIR LA GRILLE D'ARTICLES

      let articleGrid = document.getElementById('articles-grid');
      let articles = data.journal.articles;
      

      articles.forEach(article => {

      let image = article.image;
      let titre = article.titre;
      let date = article.date;
      let badgeTheme = article.theme;
      

      let card = `<div id="articles-grid" class="article-card">
            <img src="${image}" alt="">
            <span class="badge-theme">${badgeTheme}</span>
            <h3>${titre}</h3>
            <span class="date">${date}</span>
         </div>` ;

        articleGrid.insertAdjacentHTML('beforeend', card);
      });

      // TODO 5: REMPLIR LES THEMES
      let themesList = document.getElementById('themes-list');
      

      themes.forEach(theme => {
        let nom = theme.nom;
        let description = theme.description;
        let card = `<div id="themes-list" class="theme-item">
            <h3>${theme.nom}</h3>
            <p>${theme.description}</p>
         </div>`;
        
        themesList.insertAdjacentHTML('beforeend', card);
      });

      // TODO 6: REMPLIR LES AUTEURS
        let authorsList = document.querySelector(".authors-list");
        let auteurs = data.journal.auteurs;
       
        auteurs.forEach(auteur => {
        let photo = auteur.photo;
        let prenom = auteur.prenom;
        let typeExperience = auteur.typeExperience;
        let presentation = auteur.presentation;
        let card = `<div class="author-card">
            <img class="author-image" src="${photo}" alt="">
            <h3>${prenom}</h3>
            <h3>${typeExperience}</h3>
            <p>${presentation}</p>
         </div>`;
         authorsList.insertAdjacentHTML("beforeend" , card);
        });

      // TODO 7: REMPLIR LE CALL TO ACTION
        // TODO 7: REMPLIR LE CALL TO ACTION
let txtAppelAction = document.getElementById('call-to-action');
txtAppelAction.innerHTML = `<p>${data.journal.texteAppelAction}</p>`;


let btnCta = document.createElement("button");
btnCta.textContent = "S'abonner";
btnCta.classList.add("cta-button", "active");

txtAppelAction.appendChild(btnCta);
      
      /// FIN DU CODE

      // BONUS 1 : Alert sur le bouton CTA

      // BONUS 2 : Filtrage par thème

      // BONUS 3 : Tri par popularité
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}

getData();
