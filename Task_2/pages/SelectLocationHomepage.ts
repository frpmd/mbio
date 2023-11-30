import { expect, Locator, Page } from "@playwright/test";

export class SelectLocationHomepage {
    // Define selectors
    readonly page: Page;
    readonly agreeToAllCookiesButton: Locator;
    readonly selectStateDropdown: Locator;
    readonly postalCodeInput: Locator;
    readonly purposeRadio: Locator;
    readonly continueButton: Locator;

    // Initialize selectors using a constructor
    constructor(page:Page) {
        this.page = page;
        this.agreeToAllCookiesButton = page.getByRole('button', { name: 'Agree to all' });
        this.selectStateDropdown = page.getByLabel('* Your state');
        this.postalCodeInput = page.getByText('* Postal Code');
        this.purposeRadio = page.getByText('Private').first();
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    // Method to visit the Mercedes-Benz Shop Australia page 
    async visit(){
        await this.page.goto('https://shop.mercedes-benz.com/en-au/shop/vehicle/srp/demo');
        await this.agreeToAllCookiesButton.waitFor();
    }

    // Method that accept the cookies policy
    async acceptCookieSettings(){
        await this.agreeToAllCookiesButton.click();
        await expect(this.agreeToAllCookiesButton).not.toBeVisible();
        
    }

    // Method that selects the location provided by the 
    async selectYourLocation(option: string, postalCode: string){
        await this.selectStateDropdown.selectOption(option);
        await this.postalCodeInput.fill(postalCode);
        await this.purposeRadio.check();
        await expect(this.purposeRadio).toBeChecked();
        await this.continueButton.click();
    }    
}