const cardsContainer = document.getElementById('cardsContainer');
const searchInput = document.getElementById('searchInput');

function renderStars(rating, index) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    const starClass = i <= rating ? 'star filled' : 'star';
    stars += `<span class="${starClass}" data-index="${index}" data-value="${i}">★</span>`;
  }
  return stars;
}

function renderCards(data) {
  cardsContainer.innerHTML = '';

  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h2>${item.title}</h2>
      
      <div class="info-section">
        <h4>Especialización</h4>
        <p>${item.especializacion}</p>
      </div>
      
      <div class="info-section">
        <h4>Científicos Destacados</h4>
        <p>${item.cientificos}</p>
      </div>
      
      <div class="rating-section">
        <h4>Califica esta tecnología:</h4>
        <div class="stars-container">
          ${renderStars(item.rating, index)}
        </div>
        <p class="rating-text">${item.rating === 0 ? 'Sin calificar' : `${item.rating} de 5 estrellas`}</p>
      </div>
    `;

    cardsContainer.appendChild(card);
  });

  // Add event listeners to stars
  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      const value = parseInt(this.dataset.value);
      technologies[index].rating = value;
      renderCards(technologies.filter(item =>
        item.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        item.especializacion.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        item.cientificos.toLowerCase().includes(searchInput.value.toLowerCase())
      ));
    });
    
    star.addEventListener('mouseover', function() {
      const index = parseInt(this.dataset.index);
      const value = parseInt(this.dataset.value);
      const container = this.closest('.stars-container');
      container.querySelectorAll('.star').forEach((s, i) => {
        if (i < value) {
          s.classList.add('hover');
        } else {
          s.classList.remove('hover');
        }
      });
    });
  });

  document.querySelectorAll('.stars-container').forEach(container => {
    container.addEventListener('mouseleave', function() {
      this.querySelectorAll('.star').forEach(s => s.classList.remove('hover'));
    });
  });
}

renderCards(technologies);

searchInput.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = technologies.filter(item =>
    item.title.toLowerCase().includes(value) ||
    item.especializacion.toLowerCase().includes(value) ||
    item.cientificos.toLowerCase().includes(value)
  );
  renderCards(filtered);
});