import { test, expect, chromium } from '@playwright/test';

//The test when we use playeright's built-in fixtures.
test('sign In button is vissible',async ({page})=>{
    await page.goto('https://binaryville.com/account')
    const signInBtn=await page.getByRole('button',{name:'Sign in'})
    expect(signInBtn).toBeVisible
});