const { test, expect } = require("@playwright/test");
const { userLogin, userPassword } = require("../user.js");

test("Valid login page", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_validLogin/login_page.png",
        type: "png"
    });

    await page.click("[placeholder='Email']");
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_validLogin/selected_email.png",
        type: "png"
    });

    await page.getByRole("textbox", { name: "Email" }).fill(userLogin);
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_validLogin/input_email.png",
        type: "png"
    });

    await page.click("[placeholder='Пароль']");
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_validLogin/selected_password.png",
        type: "png"
    });

    await page.getByRole("textbox", { name: "Пароль" }).fill(userPassword);
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_validLogin/input_password.png",
        type: "png"
    });

    await page.getByTestId("login-submit-btn").click();
    await page.goto("https://netology.ru/profile/8303388");
    await page.screenshot({
        path: "test-results/screenshots/test_validLogin/dashboard_page.png",
        fullPage: true,
        type: "png"
    });

    await expect(
        page.locator(".src-components-pages-Profile-Programs--title--Kw5NH")
    ).toBeVisible();
    await expect(
        page.locator(".src-components-pages-Profile-Programs--title--Kw5NH")
    ).toContainText("Моё обучение");
});

test("Invalid login without userData", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_invalidLogin_withoutUserData/login_page.png",
        type: "png"
    });

    await page.getByTestId("login-submit-btn").click();
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_invalidLogin_withoutUserData/error_page.png",
        type: "png"
    });

    await expect(page.locator("//form//div[1]//span[1]")).toBeVisible();
    await expect(page.locator("//form//div[1]//span[1]")).toContainText(
        "Обязательное поле"
    );
});

test("Invalid login with invalid userData", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_invalidLogin_invalidUserData/login_page.png",
        type: "png"
    });

    await page.click("[placeholder='Email']");
    await page.getByRole("textbox", { name: "Email" }).fill("test" + userLogin);
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_invalidLogin_invalidUserData/inputInvalidEmail.png",
        type: "png"
    });

    await page.click("[placeholder='Пароль']");
    await page
        .getByRole("textbox", { name: "Пароль" })
        .fill("1234" + userPassword);
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_invalidLogin_invalidUserData/inputInvalidPassword.png",
        type: "png"
    });
    await page.getByTestId("login-submit-btn").click();
    await page.locator(".modal_content__DUfb6").screenshot({
        path: "test-results/screenshots/test_invalidLogin_invalidUserData/error_page.png",
        type: "png"
    });

    await expect(
        page.locator("[data-testid=\"login-error-hint\"]")
    ).toBeVisible();
    await expect(
        page.locator("[data-testid=\"login-error-hint\"]")
    ).toContainText("Вы ввели неправильно логин или пароль.");
});
