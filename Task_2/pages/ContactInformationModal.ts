import { expect, Locator, Page } from "@playwright/test";

// Class where are defined all the locators and methods for the contact information modal
export class ContactInformationModal {
    // Define selectors
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phone: Locator;
    readonly postalCode: Locator;
    readonly privacyCheck: Locator;
    readonly proceedButton: Locator;
    readonly emailErrorMessage: Locator;
    readonly errorMessage: Locator;


    // Initialize selectors using a constructor
    constructor(page:Page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('').first();
        this.lastName = page.getByPlaceholder('').nth(1);
        this.email = page.locator('div.dcp-default-input:nth-child(3) > wb-input-control > wb-input > input');
        this.phone = page.locator('div.dcp-default-input:nth-child(4) > wb-input-control > wb-input > input');
        this.postalCode = page.locator('div.dcp-default-input:nth-child(5) > wb-input-control > wb-input > input');
        this.privacyCheck = page.locator('wb-checkbox-control:nth-child(1) > label > wb-icon').first();
        this.proceedButton = page.locator('data-test-id=dcp-rfq-contact-button-container__button-next');
        this.emailErrorMessage = page.locator('div.dcp-default-input:nth-child(3) > wb-input-control > wb-control-error'); 
        this.errorMessage = page.locator('.dcp-error-message');
    }

    // Method to fill in all the required fields from the enquire form
    async fillEnquireForm(firstName: string, lastName: string, email: string, phone: string, postalCode: string){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.phone.fill(phone);
        await expect(this.emailErrorMessage).toHaveText('Please enter a valid email address using a minimum of six characters.');
        await this.postalCode.fill(postalCode);
        await this.privacyCheck.check();
        await this.page.pause();
    }

    // Method to submit the enquire form and validate the error
    async submitEnquireFormWithError(){        
        await this.proceedButton.click();        
        await expect(this.errorMessage).toBeVisible();
    }
}