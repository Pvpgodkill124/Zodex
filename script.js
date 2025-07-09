// script.js for ZODEX V3

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');
const overlay = document.getElementById('search-overlay');

const searchEngines = {
  zodex: query => {
    // Dummy data simulation
    const dummyResults = [
      { title: 'Welcome to Zodex!', link: '#' },
      { title: 'Zodex Elite Engine', link: '#' },
      { title: `Search result for: ${query}`, link: '#' }
    ];
    return new Promise(resolve => setTimeout(() => resolve(dummyResults), 1000));
  },
  google: query => {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  },
  bing: query => {
    window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  },
  duckduckgo: query => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  }
};

const getSelectedEngine = () => {
  const select = document.getElementById('engine-select');
  return select ? select.value : 'zodex';
};

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();
  const engine = getSelectedEngine();
  if (!query) return;

  if (engine !== 'zodex') {
    searchEngines[engine](query);
    return;
  }

  overlay.classList.remove('hidden');
  results.innerHTML = '';
  try {
    const data = await searchEngines.zodex(query);
    overlay.classList.add('hidden');
    if (data.length === 0) {
      results.innerHTML = '<p>No results found.</p>';
    } else {
      data.forEach(item => {
        const el = document.createElement('p');
        el.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a>`;
        results.appendChild(el);
      });
    }
  } catch (err) {
    overlay.classList.add('hidden');
    results.innerHTML = '<p>Error while searching.</p>';
  }
});
