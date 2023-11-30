import { expect, Locator, Page } from "@playwright/test";

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

    async fillEnquireForm(){
        await this.firstName.fill('Fábio');
        await this.lastName.fill('Dias');
        await this.email.fill('mail.com');
        await this.phone.fill('0441234567');
        await expect(this.emailErrorMessage).toHaveText('Please enter a valid email address using a minimum of six characters.');
        await this.postalCode.fill('2007');
        await this.privacyCheck.check();
    }

    async submitEnquireForm(){        
        await this.proceedButton.click();        
        await expect(this.errorMessage).toBeVisible();
    }
}