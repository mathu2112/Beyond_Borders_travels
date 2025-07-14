document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-bar');
  const input = document.querySelector('.search-bar input[name="q"]');
  const resultsDiv = document.getElementById('search-results');
  const resetBtn = form.querySelector('button[type="reset"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = input.value.trim().toLowerCase();

    let category = null;
    if (["beach", "beaches"].includes(keyword)) {
      category = "beaches";
    } else if (["temple", "temples"].includes(keyword)) {
      category = "temples";
    } else if (["country", "countries"].includes(keyword)) {
      category = "countries";
    } else {
      resultsDiv.innerHTML = `<p>Please enter a valid keyword: beach, temple, or country.</p>`;
      return;
    }

    fetch('beyond_borders_travel.json')
      .then(res => res.json())
      .then(data => {
        let resultsHTML = "";

        if (category === "countries") {
          const countries = data.countries;
          if (countries.length === 0) {
            resultsDiv.innerHTML = "<p>No countries found.</p>";
            return;
          }
          countries.forEach(country => {
            resultsHTML += `<h2>${country.name}</h2>`;
            country.cities.forEach(city => {
              resultsHTML += `
                <div class="result-item" style="margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
                  <h3>${city.name}</h3>
                  <img src="${city.imageUrl}" alt="${city.name}" style="max-width: 100%; border-radius: 10px; margin-top: 10px;">
                  <p>${city.description}</p>
                  <button class="visit-btn" onclick="visitPlace('${city.name}')">Visit</button>
                </div>
              `;
            });
          });

        } else {
          const items = data[category];
          if (!items || items.length === 0) {
            resultsDiv.innerHTML = `<p>No ${category} found.</p>`;
            return;
          }

          items.forEach(item => {
            resultsHTML += `
              <div class="result-item" style="margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 100%; border-radius: 10px; margin-top: 10px;">
                <p>${item.description}</p>
                <button class="visit-btn" onclick="visitPlace('${item.name}')">Visit</button>
              </div>
            `;
          });
        }

        resultsDiv.innerHTML = resultsHTML;
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        resultsDiv.innerHTML = "<p>Failed to load recommendations.</p>";
      });
  });

  resetBtn.addEventListener('click', () => {
    resultsDiv.innerHTML = "";   // Clear the search results div
  });
});

// Visit button handler function 
function visitPlace(placeName) {
  alert(`You clicked Visit for ${placeName}!`);
  
}
