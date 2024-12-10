/*
 * Given the deprecation of the sphinx search as you type extension (https://readthedocs-sphinx-search.readthedocs.io/en/latest/) 
 * this custom javascript is necessary in order to link the RTD search as you type addon that typically appears on the bottom right 
 * (https://about.readthedocs.com/blog/2024/04/enable-beta-addons/) with the html search field on the left sidebar
*/
document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.querySelector('div[role=search] input[type=search]');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            var event = new Event('readthedocs-search-show');
            document.dispatchEvent(event);
        });
    }
});
