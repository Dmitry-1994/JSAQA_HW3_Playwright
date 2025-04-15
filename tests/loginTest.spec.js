const { test, expect } = require('@playwright/test');
const { userLogin, userPassword } = require('../user.js');

test('Valid login page', async ({ page }) => {
    test.setTimeout(180000);

    await page.goto('https://netology.ru/?modal=sign_in');

    await page.click("[placeholder='Email']");
    await page.getByRole('textbox', { name: 'Email' }).fill(userLogin);
    await page.click("[placeholder='Пароль']");
    await page.getByRole('textbox', { name: 'Пароль' }).fill(userPassword);
    await page.getByTestId('login-submit-btn').click();
    await page.goto('https://netology.ru/profile/8303388');

    await expect(
        page.locator('.src-components-pages-Profile-Programs--title--Kw5NH')
    ).toBeVisible();
    await expect(
        page.locator('.src-components-pages-Profile-Programs--title--Kw5NH')
    ).toContainText('Моё обучение');
});

test('Invalid login without userData', async ({ page }) => {
    test.setTimeout(180000);

    await page.goto('https://netology.ru/?modal=sign_in');

    await page.getByTestId('login-submit-btn').click();

    await expect(page.locator('//form//div[1]//span[1]')).toBeVisible();
    await expect(
        page.locator('//form//div[1]//span[1]')
    ).toContainText('Обязательное поле');
});

test('Invalid login with invalid userData', async ({ page }) => {
    test.setTimeout(180000);

    await page.goto('https://netology.ru/?modal=sign_in');

    await page.click("[placeholder='Email']");
    await page.getByRole('textbox', { name: 'Email' }).fill('test' + userLogin);
    await page.click("[placeholder='Пароль']");
    await page
        .getByRole('textbox', { name: 'Пароль' })
        .fill('1234' + userPassword);
    await page.getByTestId('login-submit-btn').click();

    await expect(
        page.locator('[data-testid="login-error-hint"]')
    ).toBeVisible();
    await expect(
        page.locator('[data-testid="login-error-hint"]')
    ).toContainText('Вы ввели неправильно логин или пароль.');
});
