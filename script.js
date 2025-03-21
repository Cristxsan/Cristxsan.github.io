function updateText() {
    let userInput = document.getElementById("userInput").value;
    document.getElementById("displayText").textContent = userInput;
  }
  
  function fetchNews() {
    const apiKey = 'ac3ad03471c64def8ef3722206508946';
    const url = `https://newsapi.org/v2/top-headlines?category=music&pageSize=10&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const newsContainer = document.getElementById('newsContainer');
        if(data.articles && data.articles.length > 0) {
          data.articles.forEach(article => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            
            const card = document.createElement('div');
            card.className = 'card h-100';
            
            if(article.urlToImage) {
              const img = document.createElement('img');
              img.src = article.urlToImage;
              img.className = 'card-img-top';
              img.alt = article.title;
              card.appendChild(img);
            }
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = article.title;
            cardBody.appendChild(cardTitle);
            
            const source = document.createElement('p');
            source.className = 'card-text';
            source.innerHTML = `<small class="text-muted">${article.source.name}</small>`;
            cardBody.appendChild(source);
            
            if(article.description) {
              const description = document.createElement('p');
              description.className = 'card-text';
              description.textContent = article.description;
              cardBody.appendChild(description);
            }
            
            card.appendChild(cardBody);
            col.appendChild(card);
            newsContainer.appendChild(col);
          });
        } else {
          newsContainer.innerHTML = "<p>No se encontraron noticias.</p>";
        }
      })
      .catch(error => {
        console.error('Error al obtener noticias:', error);
        document.getElementById('newsContainer').innerHTML = "<p>Error al cargar las noticias.</p>";
      });
  }
  
  document.addEventListener("DOMContentLoaded", fetchNews);
  