exports.YoutubeHomePage = class YoutubeHomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://www.youtube.com/');
    }

    async searchVideo(videoName) {
        const searchInput = this.page.locator('#search-input');
        await searchInput.click();
        await searchInput.type(videoName);
        await this.page.keyboard.press('Enter');
    }

    async enterToFirstVideo() {
        await this.page.locator('(//div[@id="contents"]//ytd-video-renderer)[1]//ytd-thumbnail//a')
            .click();
    }

    async getSearchResultsCount() {
        await this.page.waitForSelector('#contents ytd-video-renderer', { state: 'attached' });
        const searchResults = await this.page.$$('#contents ytd-video-renderer');
        return searchResults.length;
    }

    async selectSearchCategory(category) {
        const categoryButton = await this.page.locator(`#search-filter-button yt-formatted-string:has-text("${category}")`);
        if (categoryButton) {
            await categoryButton.click();
        } else {
            throw new Error(`Category '${category}' not found`);
        }
    }
};
