// =============================================
// CLÉ API UNSPLASH
// =============================================
let UNSPLASH_KEY = 'iJxf3ZzyE4YKM0uoBX4887ubvuYw_6KdpDEQOz6uMyE';
let NEWS_DISABLED = true;
// =============================================
// CLÉ API NEWSAPI
// =============================================
let NEWS_KEY = '6e883ccd98dc4e159c84acdefb7be634';

// Fonction pour récupérer une image Unsplash selon un thème
async function getImage(theme) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(theme)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await res.json();
    return data.results?.[0]?.urls?.regular || 'assets/images/image1.png';
  } catch {
    return 'assets/images/image1.png';
  }
}

// Fonction pour récupérer les articles NewsAPI selon un thème
async function getNewsArticles(theme) {
  if (NEWS_DISABLED) return [];

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(theme)}&language=fr&sortBy=publishedAt&pageSize=5&apiKey=${NEWS_KEY}`
    );

    const data = await res.json();

    if (!data || data.status !== "ok") {
      return [];
    }

    return data.articles || [];
  } catch {
    return [];
  }
}


// =============================================
// CHARGEMENT DES DONNÉES
// =============================================
async function getData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    console.log(data);

    // TODO 1: REMPLIR LE HEADER
    let logoJournal = document.createElement("img");
    logoJournal.src = data.journal.logo;
    logoJournal.alt = "Logo du journal";
    logoJournal.id = "logo-journal";

    let header = document.querySelector("header");
    header.prepend(logoJournal);

    let nomJournal = document.getElementById('nom-journal');
    nomJournal.textContent = data.journal.nomJournal;

    let phraseAccroche = document.getElementById('phrase-accroche');
    phraseAccroche.textContent = data.journal.phraseAccroche;

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

    // TODO 3: REMPLIR L'ARTICLE PRINCIPAL (avec image Unsplash)
    let articlePrincipal = data.journal.articlePrincipal;
  

    let articlePrincipalElement = document.querySelector("#article-principal");
    articlePrincipalElement.innerHTML = `
      <img src="${articlePrincipal.image}" alt="${articlePrincipal.titre}">
      <div class="article-content">
        <p><span class="badge-theme">${articlePrincipal.theme}</span></p>
        <h1>${articlePrincipal.titre}</h1>
        <p>${articlePrincipal.description}</p>
        <span class="date">${articlePrincipal.date}</span>
      </div>
    `;

   

// TODO 4: REMPLIR LA GRILLE D'ARTICLES 
let articleGrid = document.getElementById('articles-grid');
let journal = data.journal;
journal.articles.forEach(article => {
  let card = `<div class="article-card">
    
    <img src="${article.image}" alt="${article.titre}">
    <p><span class="badge-theme">${article.theme}</span></p>
    <h3>${article.titre}</h3>
    <p class="date">${article.date}</p>
    
  </div>`;

  articleGrid.insertAdjacentHTML('beforeend', card);
});
  

    // TODO 5: REMPLIR LES THEMES
    let themesList = document.getElementById('themes-list');

    themes.forEach(theme => {
      let card = `<div class="theme-item">
        <h3>${theme.nom}</h3>
        <p>${theme.description}</p>
      </div>`;
      themesList.insertAdjacentHTML('beforeend', card);
    });

    // TODO 6: REMPLIR LES AUTEURS
    let authorsList = document.querySelector(".authors-list");
    let auteurs = data.journal.auteurs;

    for (const auteur of auteurs) {
      let imgAuteur = await getImage(auteur.typeExperience);

      let card = `<div class="author-card">
        <img class="author-image" src="${imgAuteur}" alt="${auteur.prenom}">
        <h3>${auteur.prenom}</h3>
        <h4>${auteur.typeExperience}</h4>
        <p>${auteur.presentation}</p>
      </div>`;
      authorsList.insertAdjacentHTML("beforeend", card);
    }

    // TODO 7: REMPLIR LE CALL TO ACTION
    let txtAppelAction = document.getElementById('call-to-action');
    txtAppelAction.innerHTML = `<p>${data.journal.texteAppelAction}</p>`;

    let btnCta = document.createElement("button");
    btnCta.textContent = "S'abonner";
    btnCta.classList.add("cta-button", "active");
    txtAppelAction.appendChild(btnCta);

    // BONUS 1 : Alert sur le bouton CTA
    btnCta.addEventListener("click", () => {
      alert("Merci pour votre abonnement !");
    });

    // BONUS 2 : Filtrage par thème
    document.querySelectorAll("#themes-nav .nav-theme-btn").forEach(btn => {
      btn.addEventListener("click", () => {

        document.querySelectorAll("#themes-nav .nav-theme-btn")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        let filtre = btn.textContent.trim();

        document.querySelectorAll(".article-card").forEach(card => {
          let theme = card.querySelector(".badge-theme")?.textContent?.trim();

          card.style.display =
            (filtre === "Tous" || theme === filtre) ? "block" : "none";
        });
      });
    });

    // BONUS 3 : Tri par popularité (non utilisé)
    
  } catch (error) {
    console.error('Erreur lors de la lecture des données :', error);
  }
}

getData();