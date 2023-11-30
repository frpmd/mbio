import { expect, Locator, Page } from "@playwright/test";

export class ListingPage {
    // Define selectors
    readonly page: Page;
    readonly filterButton: Locator;
    readonly preOwnedButton: Locator;
    readonly colourFilter: Locator;
    readonly loadingSpinner: Locator;
    readonly colourDropdown: Locator;
    readonly firstColour: Locator;
    readonly filterLabel: Locator;
    readonly sortingDropdown: Locator;
    readonly selectCar: Locator;

    // Initialize selectors using a constructor
    constructor(page:Page) {
        this.page = page;
        this.filterButton = page.locator('.filter-toggle');
        this.preOwnedButton = page.getByRole('button', { name: 'Pre-Owned' });
        this.colourFilter = page.getByText('Colour').first();
        this.loadingSpinner = page.locator('.dcp-loader--hide');
        this.colourDropdown = page.getByText('Colour 0');
        this.firstColour = page.getByText('BRILLANTBLUE metallic').first();
        this.filterLabel = page.locator('.dcp-selected-filters-widget-tag__name');
        this.sortingDropdown = page.getByLabel('Sorting');
        this.selectCar = page.locator('.dcp-cars-product-tile').first();
    }

    async openFilters(){
        await this.filterButton.click();
    }

    async selectPreOwnedTab(){
        await this.preOwnedButton.click();
        await expect(this.loadingSpinner).toHaveCSS('opacity', '0', {timeout: 15000});
    }

    async chooseFirstColour(){
        await this.page.waitForLoadState("load");
        await this.colourFilter.click();
        await this.colourDropdown.click();
        await this.firstColour.click();
        await expect(this.loadingSpinner).toHaveCSS('opacity', '0', {timeout: 15000});
    }

    async sortAndchooseFirstCar(sort: string){
        await this.sortingDropdown.selectOption(sort);
        await this.selectCar.click({timeout: 100000});
        const response = await this.page.waitForResponse((response) => response.url().includes("fields=FULL&upg=au-nsw-price-group-p"));
        // Assert the response status
        await expect(response.status()).toBe(200);
    }
}