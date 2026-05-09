import { menuData, MenuItem } from './menu-data';

export function initSearch() {
  const searchInput = document.getElementById('nav-search-input') as HTMLInputElement;
  const dropdown = document.getElementById('search-results-dropdown') as HTMLDivElement;

  if (!searchInput || !dropdown) return;

  let highlightIndex = -1;
  let currentResults: MenuItem[] = [];

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
      dropdown.style.display = 'none';
      highlightIndex = -1;
    }
  });

  function levenshtein(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix: number[][] = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            Math.min(matrix[i][j - 1] + 1, // insertion
                     matrix[i - 1][j] + 1) // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  // Calculate a simple match score for ordering
  function getScore(item: MenuItem, queryTokens: string[]): number {
    let score = 0;
    const itemName = item.name.toLowerCase();
    const itemDesc = item.description.toLowerCase();
    const itemTags = item.tags ? item.tags.join(' ').toLowerCase() : '';

    const nameTokens = itemName.split(/\s+/);

    queryTokens.forEach(token => {
      // Exact / substring matches
      if (itemName.includes(token)) score += 10;
      if (itemName.startsWith(token)) score += 5; // Bonus for starting match
      if (itemDesc.includes(token)) score += 3;
      if (itemTags.includes(token)) score += 5;

      // Typo tolerance (fuzzy matching)
      nameTokens.forEach(nameToken => {
        const dist = levenshtein(token, nameToken);
        if (dist === 1 && token.length > 3) {
          score += 4; // allow 1-character typo
        } else if (dist === 2 && token.length > 5) {
          score += 2; // allow 2-character typos for longer words
        }
      });
    });

    return score;
  }

  // Handle typing inside the search input
  searchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.trim().toLowerCase();
    
    if (query.length < 2) {
      dropdown.style.display = 'none';
      currentResults = [];
      highlightIndex = -1;
      return;
    }

    // Split the query for tokenized search (e.g., "low calorie")
    const queryTokens = query.split(/\s+/).filter(t => t.length > 0);

    const matches = menuData.map(item => ({
      item,
      score: getScore(item, queryTokens)
    })).filter(match => match.score > 0)
     .sort((a, b) => b.score - a.score)
     .slice(0, 6) // Max 6 results
     .map(match => match.item);

    currentResults = matches;
    highlightIndex = -1;

    renderResults(matches, query);
  });

  // Keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    if (dropdown.style.display === 'none') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightIndex = Math.min(highlightIndex + 1, currentResults.length - 1);
      updateHighlight();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightIndex = Math.max(highlightIndex - 1, -1);
      updateHighlight();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < currentResults.length) {
        selectResult(currentResults[highlightIndex]);
      } else if (currentResults.length > 0) {
        selectResult(currentResults[0]); // Select best match if no specific highlight
      }
    } else if (e.key === 'Escape') {
      dropdown.style.display = 'none';
      searchInput.blur();
    }
  });

  function renderResults(results: MenuItem[], query: string) {
    if (results.length === 0) {
      dropdown.innerHTML = `<div class="search-no-results">No results found for "${query}"</div>`;
      dropdown.style.display = 'block';
      return;
    }

    const html = results.map((item, index) => {
      return `
        <div class="search-result-item" data-index="${index}" data-id="${item.id}">
          <div class="search-result-thumbnail">${item.emoji}</div>
          <div class="search-result-info">
            <div class="search-result-title">${item.name}</div>
            <div class="search-result-desc">${item.description}</div>
          </div>
          <div class="search-result-price">£${item.price.toFixed(2)}</div>
        </div>
      `;
    }).join('');

    dropdown.innerHTML = html;
    dropdown.style.display = 'block';

    // Add click listeners to items
    const items = dropdown.querySelectorAll('.search-result-item');
    items.forEach(el => {
      el.addEventListener('click', (e) => {
        const idx = parseInt(el.getAttribute('data-index') || '0', 10);
        selectResult(results[idx]);
      });
      
      el.addEventListener('mouseenter', () => {
        highlightIndex = parseInt(el.getAttribute('data-index') || '0', 10);
        updateHighlight();
      });
    });
  }

  function updateHighlight() {
    const items = dropdown.querySelectorAll('.search-result-item');
    items.forEach((el, index) => {
      if (index === highlightIndex) {
        el.classList.add('selected');
        // ensure visibility in scroll container
        (el as HTMLElement).scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });

    // Sync input slightly if desired, or keep user query. better to keep user query.
  }

  function selectResult(item: MenuItem) {
    // In a real app we might navigate to a details page or flash a notification
    // Let's increment cart and show a quick success message next to the search bar 
    // or just redirect to menu
    const queryParam = new URLSearchParams(window.location.search);
    
    // Quick notification that item was added to order
    alert(`Added ${item.name} to order!`);
    
    // Reset search
    searchInput.value = '';
    dropdown.style.display = 'none';
    currentResults = [];
    highlightIndex = -1;
    searchInput.blur();
  }
}
