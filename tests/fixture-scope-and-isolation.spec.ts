import {test as base} from '@playwright/test'

let counter=0;

type TestFixtures = {}
type WorkerFixtures = {
  counterFixture: number
}
const test=base.extend<TestFixtures, WorkerFixtures>({
    counterFixture:[ async ({},use)=>{
        counter++;
        await use(counter)
    },{scope:'worker'}] 
    //if kept scope as 'test', Runs for every test (default)
    //if kept scope as 'worker, Runs once per worker, shared across its tests
})

test('Test 1', async ({counterFixture})=>{
    console.log(`Test 1 counter: ${counterFixture}`)
})

test('Test 2', async ({ counterFixture }) => {
  console.log(`Test 2 counter: ${counterFixture}`)
})

test('Test 3', async ({ counterFixture }) => {
  console.log(`Test 3 counter: ${counterFixture}`)
})