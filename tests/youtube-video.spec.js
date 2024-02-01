const {test, chromium } = require('@playwright/test');
const { YoutubeHomePage } = require('../pages/youtube-home-page');
const { YoutubeVideoPlayerPage } = require('../pages/youtube-video-player-page');
const SearchResultsPage = require('../pages/searchResultsPage');

test.describe('Youtube video search and play', () => {

    let browser;
    let page;
    let youtubeHomePage;
    let youtubePlayerPage;
    let SearchResultsPage;
    

    test.beforeAll(async() => {
        browser = await chromium.launch({ headless: false, slowMo: 50 });
        page = await browser.newPage();
        youtubeHomePage = new YoutubeHomePage(page);
        youtubePlayerPage = new YoutubeVideoPlayerPage(page);
    });

    test.afterAll(async() => {
        await browser.close();
    });


    test('should search and play a video in miniplayer', async() => {
        await youtubeHomePage.navigate();
        await youtubeHomePage.searchVideo('Subaru cars');
        await youtubeHomePage.enterToFirstVideo();
        await youtubePlayerPage.waitForPlayer();
        await youtubePlayerPage.playVideoInMiniplayer();
        const miniplayerSize = await youtubePlayerPage.getMiniplayerSize();
        await youtubePlayerPage.verifyMiniplayerSize(miniplayerSize);
    });

    /*test('Verify Search Results', async ({ page }) => {
        const searchResultsPage = new SearchResultsPage(page); 
        await youtubeHomePage.navigate();
        await youtubeHomePage.searchVideo('Subaru cars');
        const searchResultsCount = await searchResultsPage.getSearchResultsCount();
        expect(searchResultsCount).toBeGreaterThan(0);
    });
    */
    

});
