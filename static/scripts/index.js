let highlightSearchTerms = function(searchInput) {
    let searchTerm = searchInput.value;
    if (searchTerm !== undefined && searchTerm !== null) {
        let searchResults = document.querySelectorAll('p.search-result');
        let splitRegex = new RegExp(searchTerm, 'i');
        for (let searchResult of searchResults) {
            let searchResultText = searchResult.innerText;
            let textParts = searchResultText.split(splitRegex);
            searchResult.innerHTML = '';
            for (let part of textParts) {
                searchResult.append(part);
                let highlightSpan = document.createElement('span')
                highlightSpan.innerText = searchTerm;
                highlightSpan.classList.add('highlight');
                searchResult.append(highlightSpan);
            }
            if (searchResult.lastChild) {
                searchResult.lastChild.remove();
            }
        }
    }
}

let searchForm = document.getElementById('search-form');
let searchInput = document.getElementsByName('searchTerm')[0];
let searchResultContainer = document.getElementById('search-result-container');

searchInput.addEventListener('keyup', async event => {
    let queryString = new URLSearchParams();
    queryString.set('searchTerm', searchInput.value);
    let fetchUrl = '/api/search?' + queryString.toString();
    let response = await fetch(fetchUrl, { method: 'get' });
    let searchResults = await response.json();
    const searchResultList = searchResults['searchResults'];
    searchResultContainer.textContent = '';
    let searchResultFragment = new DocumentFragment();
    for (const searchResult of searchResultList) {
        let searchResultParagraph = document.createElement('p');
        searchResultParagraph.classList.add('search-result');
        searchResultParagraph.textContent = searchResult;
        searchResultFragment.appendChild(searchResultParagraph);
    }
    searchResultContainer.appendChild(searchResultFragment);
    highlightSearchTerms(searchInput);
});

highlightSearchTerms(searchInput);
