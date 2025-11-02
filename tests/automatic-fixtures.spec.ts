import {test as base,expect,Page} from '@playwright/test'

//We defined TestFixtures — a custom type describing your fixture (testData).
type TestFixtures={
    testData:{
        email:string,
        password:string
    },
    authenticatedUser:Page
}
//Then we passed it as <TestFixtures> to base.extend() to tell TypeScript,“Hey, expect a fixture called testData with this shape.”
const test=base.extend<TestFixtures>({
    testData: async ({ },use)=>{
        const data={
            email:'test@example.com',
            password:'pass123'
        }
        await use(data)
    },
    //“automatic fixtures” in Playwright means a fixture that runs automatically before every test without needing to call it explicitly.
    authenticatedUser:[ async ({page, testData},use)=>{
        await page.goto('https://binaryville.com/account');

        const emailInput=page.getByRole('textbox',{name:'Email'});
        await emailInput.fill(testData.email)

        const passwordInput=page.getByRole('textbox',{name:'Password'});
        await passwordInput.fill(testData.password)

        const signInBtn=page.getByRole('button',{name:'sign in'})
        await signInBtn.click()

        await use(page)
    }, {auto:true}]
})

test('Should log in with test data', async ({page, testData})=>{
    const url=page.url();
    expect(url).toContain(testData.password);
});