class SearchResultsPage {
   /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;
    }

    async getSearchResultsCount() {
        await this.page.waitForSelector('.search-result-item');
        const searchResults = await this.page.$$('.search-result-item');
        return searchResults.length;
    }
}
module.exports = SearchResultsPage;
