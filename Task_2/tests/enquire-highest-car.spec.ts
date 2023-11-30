import { test, expect } from '@playwright/test';
import { SelectLocationHomepage } from '../pages/SelectLocationHomepage';
import { ListingPage } from '../pages/ListingPage';
import { STATE, POSTAL_CODE, SORT_PRICE_DESCENDING } from '../constants';
import { ProductPage } from '../pages/ProductPage';
import { ContactInformationModal } from '../pages/ContactInformationModal';


test.describe('Enquire highest car', () => {  
  let selectLocationHomepage: SelectLocationHomepage;
  let listingPage: ListingPage;
  let productPage: ProductPage;
  let contactModal: ContactInformationModal;

  test ('Error scenario - wrong email', async ({ page }) => {
    selectLocationHomepage = new SelectLocationHomepage(page);
    listingPage = new ListingPage(page);
    productPage = new ProductPage(page);
    contactModal = new ContactInformationModal(page);

    // Open the Mercedes-Benz Shop Australia page
    await selectLocationHomepage.visit();

    // Accept Cookie settings
    await selectLocationHomepage.acceptCookieSettings();

    // Select the New South Wales location with the Postal code 2007
    await selectLocationHomepage.selectYourLocation(STATE, POSTAL_CODE);

    await listingPage.openFilters();

    await listingPage.selectPreOwnedTab();

    await listingPage.chooseFirstColour();
    await listingPage.sortAndchooseFirstCar(SORT_PRICE_DESCENDING);
    await productPage.saveToFileCarInformation();
    await productPage.enquireCar();
    await contactModal.fillEnquireForm();
    await contactModal.submitEnquireForm();
  })
})


