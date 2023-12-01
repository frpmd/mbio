import { expect, Locator, Page } from "@playwright/test";

// Class where are defined all the locators and methods for the car listing page
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
    readonly filterSidebar: Locator;
    readonly closeButtonFilterSidebar: Locator;

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
        this.filterSidebar = page.locator('.sidebar-filter');
        this.closeButtonFilterSidebar = page.locator('span.close-button.show');
    }

    // Method to open filters
    async openFilters(){
        await this.filterButton.click();
    }

    // Method to select the Pre-owned tab
    async selectPreOwnedTab(){
        await this.preOwnedButton.click();
        await expect(this.loadingSpinner).toHaveCSS('opacity', '0', {timeout: 30000});
    }

    // Method to choose the first available colour form the list
    async chooseFirstColour(){
        /* This condition is included due to the fact that after navigating to the list with pre-owned cars
           sometimes the filters tab closes automatically.
           With this, it's guaranteed that the test can continue without the associated flakiness of this step
        */
        if(await this.closeButtonFilterSidebar.isVisible()){
            await this.colourFilter.click();
        }
        else{
            this.openFilters();
            await this.colourFilter.click();
        }
        await this.colourDropdown.click();
        await this.firstColour.click();
        await expect(this.loadingSpinner).toHaveCSS('opacity', '0', {timeout: 30000});
    }

    // Method to sort the results for price ascending and click on the first available car (more expensive)
    async sortAndchooseFirstCar(sort: string){
        await this.sortingDropdown.selectOption(sort);
        await this.selectCar.click({timeout: 100000});
        const response = await this.page.waitForResponse((response) => response.url().includes("fields=FULL&upg=au-nsw-price-group-p"));
        // Assert the response status
        await expect(response.status()).toBe(200);
    }
}