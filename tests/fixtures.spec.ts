import { test, expect, chromium } from '@playwright/test';

//The test would look like without using built-in fixtures.
test('sign In button is vissible',async ()=>{
    const browser=await chromium.launch()
    const page=await browser.newPage()

    await page.goto('https://binaryville.com/account')
    const signInBtn=await page.getByRole('button',{name:'Sign in'})
    expect(signInBtn).toBeVisible

    await browser.close()
});