const { test, expect } = require('@playwright/test');


test.describe('Youtube video failed search', () => {
    let page;
    let youtubeHomePage;
    let SearchResultsPage; 

    test('Verify Search Results', async ({ page }) => {
    const searchResultsPage = new SearchResultsPage(page);

    
    await page.goto('https://www.youtube.com/');
    await page.type('input#search', 'Subaru cars');
    await page.click('button#search-icon-legacy');

    
    await page.waitForSelector('.nonexistent-selector', { state: 'attached' })
        .catch(error => console.error('Search results not loaded:', error));

    
    const searchResultsCount = await searchResultsPage.getSearchResultsCount();

    expect(searchResultsCount).toBeGreaterThan(0);

    });
});