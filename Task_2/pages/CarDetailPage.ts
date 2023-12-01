import { Locator, Page } from "@playwright/test";
import { writeToPath } from "fast-csv";

// Class where are defined all the locators and methods for the car detail page
export class CarDetailPage {
    // Define selectors
    readonly page: Page;
    readonly enquireNowButton: Locator;
    readonly modelYearValue: Locator;
    readonly vimValue: Locator;

    // Initialize selectors using a constructor
    constructor(page:Page) {
        this.page = page;
        this.enquireNowButton = page.locator('data-test-id=dcp-buy-box__contact-seller');
        this.modelYearValue = page.locator('data-test-id=dcp-vehicle-details-list-item-3');
        this.vimValue = page.locator('data-test-id=dcp-vehicle-details-list-item-11');
    }

    async saveToFileCarInformation(){
       const arr: any = Array.from([]);
       await arr.push({
        ModelYear: await this.modelYearValue.textContent(),
        VIMNumber: await this.vimValue.textContent(),
       });
       writeToPath('./carInformation.csv', arr);
    }

    async enquireCar() {
        await this.enquireNowButton.click();
    }
}