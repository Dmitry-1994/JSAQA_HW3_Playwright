const { userLogin, userPassword } = require("./user.js");
const { test, expect } = require("@playwright/test");

test("Valid login page", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.click("input[placeholder='Email']").fill(userLogin);
    await page.click("input[placeholder='Пароль']").fill(userPassword);
    await page.click("[data-testid='login-submit-btn']");

    await expect(
        page.locator(".src-components-pages-Profile-Programs--title--Kw5NH")
    ).toContainText("Моё обучение");
});

// test("Invalid login", async ({ page }) => {
//     await page.goto("https://playwright.dev/");

//     // Click the get started link.
//     await page.getByRole("link", { name: "Get started" }).click();

//     // Expects page to have a heading with the name of Installation.
//     await expect(
//         page.getByRole("heading", { name: "Installation" })
//     ).toBeVisible();
// });
