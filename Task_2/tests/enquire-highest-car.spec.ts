import { test, expect } from '@playwright/test';
import { SelectLocationHomepage } from '../pages/SelectLocationHomepage';
import { ListingPage } from '../pages/ListingPage';
import { STATE, POSTAL_CODE, SORT_PRICE_DESCENDING, FIRST_NAME, LAST_NAME, WRONG_EMAIL, PHONE } from '../constants';
import { CarDetailPage } from '../pages/CarDetailPage';
import { ContactInformationModal } from '../pages/ContactInformationModal';


test.describe('Enquire highest car', () => {  
  let selectLocationHomepage: SelectLocationHomepage;
  let listingPage: ListingPage;
  let carDetailPage: CarDetailPage;
  let contactModal: ContactInformationModal;

  test ('Error scenario - wrong email', async ({ page }) => {
    selectLocationHomepage = new SelectLocationHomepage(page);
    listingPage = new ListingPage(page);
    carDetailPage = new CarDetailPage(page);
    contactModal = new ContactInformationModal(page);

    // Open the Mercedes-Benz Shop Australia page
    await selectLocationHomepage.visit();

    // Accept Cookie settings
    await selectLocationHomepage.acceptCookieSettings();

    // Select the New South Wales location with the Postal code 2007
    await selectLocationHomepage.selectYourLocation(STATE, POSTAL_CODE);

    // Open the filters drawer
    await listingPage.openFilters();

    // Select the Pre-Owned tab
    await listingPage.selectPreOwnedTab();

    // Select the first colour from the list
    await listingPage.chooseFirstColour();

    // Sort the filtered results by price descending and access the first car on the list
    await listingPage.sortAndchooseFirstCar(SORT_PRICE_DESCENDING);
    
    // Save Model Year and VIM to file
    await carDetailPage.saveToFileCarInformation();
    
    // Proceed to enquire the select car
    await carDetailPage.enquireCar();

    // Fill the enquire form with a misformatted e-mail
    await contactModal.fillEnquireForm(FIRST_NAME, LAST_NAME, WRONG_EMAIL, PHONE, POSTAL_CODE);

    // Submit the enquire and validate the error
    await contactModal.submitEnquireFormWithError();
  })
})


