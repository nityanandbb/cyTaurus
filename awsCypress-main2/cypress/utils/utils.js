import commonProductPageElements from "..path";
import CategoryPage from "../path";
const catObj = new CategoryPage();
const prodObj = new commonProductPageElements();

export function clickingOnWebElement(locatorEle) {
  cy.log(" Clicking on the web-Element ");
  locatorEle().click();
  cy.log("clicked on WebElement");
}

export function clickIfVisible(locatorEle) {
  cy.log("Clicking on the web element if it is visible");
  locatorEle().should("be.visible").click();
  cy.log("Clicked on web element");
}

export function clickLinkAndStayOnPage(locatorEle) {
  cy.log(
    "Removing target attribute and clicking on the link to continue test on the same page"
  );
  locatorEle().should("be.visible").invoke("removeAttr", "target").click();
}

export function testElementVisibilityWithHaveText(locatorElement, expText) {
  cy.log(" Expected Text of the webElement with have Text ");
  locatorElement().should("have.text", expText);
}

// cypress/support/utils.js

/**
 * Verifies the placeholder text of an input field.
 * @param {function} element - A function that returns the Cypress element.
 * @param {string} expectedPlaceholder - The expected placeholder text.
 */
export function verifyPlaceholder(element, expectedPlaceholder) {
  element().invoke("attr", "placeholder").should("equal", expectedPlaceholder);
}

/**
 * Verifies if an element is visible and has a specific aria-label or value attribute.
 * @param {Function} element - The function that represents the Cypress command to select the element.
 * @param {string} expectedAriaLabelOrValue - The expected value of the aria-label or value attribute.
 */
export function verifyAriaLabelOrValue(element, expectedAriaLabelOrValue) {
  cy.log(
    `Verifying if element is visible and has aria-label or value "${expectedAriaLabelOrValue}"`
  );

  element()
    .should("be.visible")
    .then(($el) => {
      const ariaLabel = $el.attr("aria-label");
      const value = $el.attr("value");

      if (ariaLabel !== undefined) {
        expect(ariaLabel).to.equal(expectedAriaLabelOrValue);
      } else if (value !== undefined) {
        expect(value).to.equal(expectedAriaLabelOrValue);
      } else {
        throw new Error(`Element does not have aria-label or value attribute`);
      }
    });
}

/**
 * Verifies if a <p> element is visible and has specific text content.
 * @param {Function} element - The function that represents the Cypress command to select the <p> element.
 * @param {string} expectedText - The expected text content of the <p> element.
 */
export function verifyParagraphText(element, expectedText) {
  cy.log(`Verifying if <p> element is visible and has text "${expectedText}"`);

  element()
    .should("be.visible")
    .should("have.text", expectedText)
    .then(() => {
      cy.log(`Element is visible and has text "${expectedText}"`);
    })
    .should("not.exist"); // This line ensures the command fails if the element does not exist
}

export function testElementVisibility(locatorElement) {
  // ExpText.
  // Add more logic as needed here. You can also return.
  // The result of your `cy.` call.
  cy.log("css value = " + locatorElement);
  locatorElement().should("be.visible");
  cy.log("css  checked  ");
}

export function testElementNotEmpty(locatorElement) {
  cy.log("Checking that the webElement is not empty");
  locatorElement().should("not.be.empty");
}

export function testElementVisibleHaveTextAndHaveFontWeight(
  locatorElement,
  expectedText,
  expectedFontWeight
) {
  cy.log("Checking visibility, text, and font-weight of the webElement");
  locatorElement()
    .should("be.visible")
    .and("have.text", expectedText)
    .and("have.css", "font-weight", expectedFontWeight); // Ensure text is in bold
}

export function checkInputBoxIsVisibleEnabledAndEditable(locatorElement) {
  cy.log(
    "Checking that the input box is visible, neither disabled nor read-only"
  );
  locatorElement().should(($input) => {
    expect($input).to.be.visible; // Added assertion for visibility
    expect($input).to.not.have.attr("disabled");
    expect($input).to.not.have.attr("readonly");
  });
}

export function verifyListItemTitles(elementLocatorOfList, expTitle) {
  cy.log(" verifying hrefs of mega-menu links "); // verifying text
  elementLocatorOfList().each(($ele, index) => {
    cy.wrap($ele)
      .invoke("text")
      .then((text) => {
        cy.log(" Mega menu text log = " + $ele.text());
        expect(text.trim()).equal(expTitle[index]);
      });
  });
}

// Multi dim array.
export function verifyListItemTitlesWithURL(elementLocatorOfList, expTitle) {
  // The exphrefURL for separate arrays.
  cy.log("verifying brand Footer Link Items Loading Properly ");
  // Verifying text
  elementLocatorOfList().each(($ele, index) => {
    cy.wrap($ele)
      .invoke("text")
      .then((text) => {
        cy.log("$$ text log = " + $ele.text());
        cy.log("$$$$ text log fixture title = " + expTitle[index].itemTitle);
        expect(text.trim()).equal(expTitle[index].itemTitle);
        cy.log("verifying hrefs of  Title links ");
        cy.wrap($ele)
          .should("include.text", expTitle[index].itemTitle)
          .and("have.attr", "href", expTitle[index].href);
      });
  });
}

// Test 2 separate Arrays.
export function verifyListItemTitlesWithURL_Method2(
  elementLocatorOfList,
  expTitle,
  exphrefURL
) {
  cy.log("verifying List Item titles with URLs Loading Properly ");
  // Verifying text.
  elementLocatorOfList().each(($ele, index) => {
    cy.wrap($ele)
      .invoke("text")
      .then((text) => {
        expect(text.trim()).equal(expTitle[index]);
      });
    cy.log("verifying hrefs of footer brand links ");
    cy.wrap($ele)
      .should("include.text", expTitle[index])
      .and("have.attr", "href", exphrefURL[index]);
  });
}

// Use this function if you have multidimensional array with somme Targer = blank urls.
export function verifyListItemTitlesWithURLAndExcludedLinkItem(
  elementLocatorOfList,
  expTitle
) {
  cy.log(
    "verifying List Item titles with URLs Loading Properly and Excluding Target Blank urls "
  );
  elementLocatorOfList().each(($ele, index) => {
    if ($ele.attr("target") === "_blank") {
      cy.log(" #!found excluded attr = " + $ele);
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          cy.log(" #! Excluded block text log = " + $ele.text());
          cy.log("{*} expected link test found   = " + $ele.text);
          cy.log("{*} text log fixture title = " + expTitle[index].itemTitle);
          expect(text.trim()).equal(expTitle[index].itemTitle);
          // Use if error.
          // cy.wrap($ele).click()
          return !true;
        });
    } else {
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          cy.log("$$ text log = " + $ele.text());
          cy.log("expected link test found   = " + $ele.text);
          cy.log("$$$$ text log fixture title = " + expTitle[index].itemTitle);
          expect(text.trim()).equal(expTitle[index].itemTitle);
          cy.log("verifying hrefs of  Title links ");
          // Verifying hrefs.
          cy.wrap($ele)
            .should("include.text", expTitle[index].itemTitle)
            .and("have.attr", "href", expTitle[index].href);
        });
    }
  });
}

// If dynamic set of data is present then use this function to verify list items.
export function verifyDropdownOptions(selector, expectedOptions) {
  cy.get(selector).each(($option) => {
    cy.wrap($option)
      .invoke("text")
      .then((text) => {
        const optionText = text.trim();
        expect(expectedOptions).to.include(optionText);
      });
  });
}

// If element exists on the page.
export function clickIfExist(element) {
  cy.get("body").then((body) => {
    cy.wait(5000).then(() => {
      if (body.find(element).length > 0) {
        cy.log("Element found, proceeding with test");
        cy.get(element).click();
      } else {
        cy.log("Element not found, skipping test");
      }
    });
  });
}

// Test urls from Fixture.json file array.
export function urlTest(fixtureFileName) {
  return cy.fixture(fixtureFileName).then((data) => {
    return data.urls;
  });
}
// Test urls from fixture.json array or .csv
const { setBaseUrl } = require("../scripts/setBaseUrl");

// Call setBaseUrl function to set the base URL before running tests
setBaseUrl();

export function runURLTestingFromFixtureFile(
  suiteName,
  testDescription,
  baseUrl,
  fixtureFileName,
  verifyFunction
) {
  describe(suiteName, () => {
    beforeEach(() => {
      // Assuming setBaseUrl needs to be called before visiting any URL
      setBaseUrl(baseUrl);
    });

    it(testDescription, () => {
      cy.log("describe = " + suiteName);
      cy.log("It test = " + testDescription);
      cy.fixture(fixtureFileName).then((data) => {
        cy.wrap(data.urls).each((url, index) => {
          if (!url || url.trim() === "") {
            cy.log(`Empty or null URL at index ${index}`);
            return; // Skip to next iteration if URL is empty or null
          }

          cy.visit(baseUrl + "/" + url, { failOnStatusCode: false }).then(
            () => {
              if (cy.state("failures") === 0) {
                visitAndAssert(url, verifyFunction);
              } else {
                cy.log(
                  `Error at index ${index}: Failed to visit ${baseUrl}/${url}`
                );
              }
            }
          );
        });
      });
    });
  });
}

function visitAndAssert(url, verifyfunction) {
  cy.log(" Visit and Assert ");
  cy.visit(`/${url}`);
  cy.url().should("include", url);
  verifyfunction();
}

// To verify commn webelements of the product page.
export function testPaginatonOfProductCategoryPage() {
  cy.log(" clicking on next page button. ");
  cy.clickLink(catObj.getNextPaginationBtn);
  cy.log(" clicking on prev page button. ");
  cy.clickLink(catObj.getPrevPaginationBtn);
}

// To verify common webelements of product page.
export function testProductPage() {
  cy.log("Navigating to the product page.");
  cy.log("Verifying product title is visible.");
  cy.elementIsVisible(prodObj.getProductTitle);

  cy.log("Verifying CTA Block Technical Purchase Support Text.");
  cy.elementIsVisible(prodObj.getTechnicalSupportTextForQuote);

  cy.log("Verifying CTA Contact Us button.");
  cy.elementIsVisible(prodObj.getContactUsCtaBtn);

  cy.log("Verifying CTA where to buy button.");
  cy.elementIsVisible(prodObj.getWhereToBuyCTABtn);

  cy.log("Verifying product availability warning text.");
  prodObj.getWarningTextBtn().click();
  cy.elementIsVisible(prodObj.getWarningText);
}

//  Navigate to SKU page.
export function navigateToSkuPage() {
  cy.log("Clicking on catalog link from table.");
  cy.clickLink(prodObj.getSKUCatalogLink);
}

// To verify the SKU page webElements.
export function testSkuPage() {
  cy.log("Verifying product-SKU title is visible.");
  cy.get(".product-hero__title").should("be.visible");

  cy.log("Verifying SKU Catalog Number is visible.");
  cy.get(".product-hero__catalog").should("be.visible");

  cy.log("Verifying CTA Block Technical Purchase Support Text. ");
  cy.elementIsVisible(prodObj.getTechnicalSupportTextForQuote);

  cy.log("Verifying CTAContact Us button.");
  cy.elementIsVisible(prodObj.getContactUsCtaBtn);

  cy.log("Verifying CTA where to buy button.");
  cy.elementIsVisible(prodObj.getWhereToBuyCTABtn);

  cy.log("Verifying  product availability warning text.");
  prodObj.getWarningTextBtn().click();
  cy.elementIsVisible(prodObj.getWarningText);
}

// To verify the Category page filter elementes are loading properly.
export function testCategoryFilterElements() {
  cy.log("Test: Verifying Filter selection.");

  cy.log("Applying filter.");
  cy.clickLink(catObj.getApplicationsFacet);

  cy.log("Verifying facet pill is loading properly.");
  cy.wait(5000);

  // Verifying filter applied text and subcategories text.
  cy.log("Get filter applied text and subcategories text.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getSubcategories,
    "Subcategories"
  );

  cy.log("Checking filter item has Text as 'Applications'.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getFacetItemLabel,
    "Applications"
  );

  cy.log("Verifying Filter by section title.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getFilterBySectiontitile,
    "Filter by"
  );

  cy.log("Verifying Collapse all button.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getCollapseAllBtn,
    "Collapse all"
  );
  cy.elementAttributeState_value(
    catObj.getFilterAreaExpandStateForCollapeAll_expandAllbtn,
    "aria-expanded",
    "true"
  );

  cy.log("Clicking on Collapse all button.");
  cy.clickLink(catObj.getCollapseAllBtn);

  cy.log("Verifying Expand all button.");
  cy.elementIsVisibleAndHaveTextByTrim(catObj.getExpandAllBtn, "Expand all");
  cy.elementAttributeState_value(
    catObj.getFilterAreaExpandStateForCollapeAll_expandAllbtn,
    "aria-expanded",
    "false"
  );

  cy.log("Verifying Clear filters button.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getClearFiltersButton,
    "Clear filters"
  );
  cy.clickLink(catObj.getClearFiltersButton);
}

export function testCategoryFilterapplyremove(
  appliedFilterTextExpectedPersistOnFilterPill
) {
  cy.log("Test: Verifying Filter apply and remove.");

  cy.log("Applying filter.");
  cy.clickLink(catObj.getApplicationsFacet);

  cy.log("Verifying facet pill is loading properly.");
  cy.wait(5000);

  // Verifying filter applied text and subcategories text.
  cy.log("Get filter applied text and subcategories text.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getSubcategories,
    "Subcategories"
  );

  // Verify applied filter text
  cy.log("Verifying applied filter text.");
  testElementVisibilityWithHaveText(
    catObj.getApplicationFacetPill,
    appliedFilterTextExpectedPersistOnFilterPill
  );

  // Verify applied filter pill
  cy.log("Verifying facet pill is loaded with the expected text.");
  testElementVisibilityWithHaveText(
    catObj.getApplicationFacetPill,
    appliedFilterTextExpectedPersistOnFilterPill
  );

  cy.log("Checking filter item has Text as 'Applications'.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getFacetItemLabel,
    "Applications"
  );

  cy.log("Verifying Filter by section title.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getFilterBySectiontitile,
    "Filter by"
  );

  cy.log("Verifying Collapse all button.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getCollapseAllBtn,
    "Collapse all"
  );
  cy.elementAttributeState_value(
    catObj.getFilterAreaExpandStateForCollapeAll_expandAllbtn,
    "aria-expanded",
    "true"
  );

  cy.log("Clicking on Collapse all button.");
  cy.clickLink(catObj.getCollapseAllBtn);

  cy.log("Verifying Expand all button.");
  cy.elementIsVisibleAndHaveTextByTrim(catObj.getExpandAllBtn, "Expand all");
  cy.elementAttributeState_value(
    catObj.getFilterAreaExpandStateForCollapeAll_expandAllbtn,
    "aria-expanded",
    "false"
  );

  cy.log("Verifying Clear filters button.");
  cy.elementIsVisibleAndHaveTextByTrim(
    catObj.getClearFiltersButton,
    "Clear filters"
  );
  cy.clickLink(catObj.getClearFiltersButton);
}
