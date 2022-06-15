let highlightSearchTerms = function() {
    let searchInput = document.getElementsByName('searchTerm')[0];
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

highlightSearchTerms();
