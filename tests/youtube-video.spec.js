const { test, expect, chromium } = require('@playwright/test');
const { YoutubeHomePage } = require('../pages/youtube-home-page');
const { YoutubeVideoPlayerPage } = require('../pages/youtube-video-player-page');

test.describe('Youtube video search and play', () => {
    let browser;
    let page;
    let youtubeHomePage;
    let youtubePlayerPage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 50 });
    });

    test.beforeEach(async () => {
        page = await browser.newPage();
        youtubeHomePage = new YoutubeHomePage(page);
        youtubePlayerPage = new YoutubeVideoPlayerPage(page);
    });

    test.afterEach(async () => {
        await page.close();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('should search and play a video in miniplayer', async () => {
        await youtubeHomePage.navigate();
        await youtubeHomePage.searchVideo('Subaru cars');
        await youtubeHomePage.enterToFirstVideo();
        await youtubePlayerPage.waitForPlayer();
        await youtubePlayerPage.playVideoInMiniplayer();
        const miniplayerSize = await youtubePlayerPage.getMiniplayerSize();
        await youtubePlayerPage.verifyMiniplayerSize(miniplayerSize);
    });

    test('should display search results when a valid search term is entered', async () => {
        await youtubeHomePage.navigate();
        await youtubeHomePage.searchVideo('Roller Derby');
        const searchResultsCount = await youtubeHomePage.getSearchResultsCount();
        expect(searchResultsCount).toBeGreaterThan(0);
    });

    test('should not display search results when an invalid search term is entered', async () => {
        await youtubeHomePage.navigate();
        await youtubeHomePage.searchVideo('Invalid Search Term');
        const searchResultsCount = await youtubeHomePage.getSearchResultsCount();
        expect(searchResultsCount).toBe();
    });

});
