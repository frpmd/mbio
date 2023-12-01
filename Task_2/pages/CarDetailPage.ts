import { Locator, Page } from "@playwright/test";
import { writeToPath } from "fast-csv";

// Class where are defined all the locators and methods for the car detail page
export class CarDetailPage {
    // Define selectors
    readonly page: Page;
    readonly enquireNowButton: Locator;
    readonly modelYearValue: Locator;
    readonly vinValue: Locator;

    // Initialize selectors using a constructor
    constructor(page:Page) {
        this.page = page;
        this.enquireNowButton = page.locator('data-test-id=dcp-buy-box__contact-seller');
        this.modelYearValue = page.locator('data-test-id=dcp-vehicle-details-list-item-3');
        this.vinValue = page.locator('data-test-id=dcp-vehicle-details-list-item-11');
    }

    // Method to save to a CSV the Model Year and VIN car informations
    async saveToFileCarInformation(){
       const arr: any = Array.from([]);
       await arr.push({
        ModelYear: await this.modelYearValue.textContent(),
        VINNumber: await this.vinValue.textContent(),
       });
       writeToPath('./carInformation.csv', arr);
    }

    // Method to click the Enquire Now button
    async enquireCar() {
        await this.enquireNowButton.click();
    }
}