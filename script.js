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

      let card = `<div id="articles-grid" class="articles-grid">
            <img src="${image}" alt="">
            <span class="badge-theme">${badgeTheme}</span>
            <h3>${titre}</h3>
            <span class="date">${date}</span>
         </div>` ;

        articleGrid.insertAdjacentHTML('beforeend', card);
      });

      // TODO 5: REMPLIR LES THEMES

      // TODO 6: REMPLIR LES AUTEURS

      // TODO 7: REMPLIR LE CALL TO ACTION

      /// FIN DU CODE

      // BONUS 1 : Alert sur le bouton CTA

      // BONUS 2 : Filtrage par thème

      // BONUS 3 : Tri par popularité
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}

getData();
