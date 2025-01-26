import puppeteer from 'puppeteer';
import { readdirSync, unlinkSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))
const directory = join(__dirname, "screenshots");

if (!existsSync(directory)){
    mkdirSync(directory);
}

const files = readdirSync(directory);
for (const file of files) {
    unlinkSync(join(directory, file))
}


let count = 0;
const pngFiles = [];

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('https://blazer.dokkuapp.com/');

await page.setViewport({ width: 1080, height: 1024 });

let file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file)

await page
  .locator('a')
  .filter(button => button.innerText === 'New Query')
  .click();

await page.waitForNavigation({waitUntil: 'networkidle2'})

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);

await page.goto('https://blazer.dokkuapp.com/queries/2-smart-column');
await page.waitForNetworkIdle()
file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file)

await page.goto('https://blazer.dokkuapp.com/queries/1-smart-variable/');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file)

await page.locator(".selectize-input").click()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);


await page.locator(".option.active").click()
await page.waitForNavigation({waitUntil: 'networkidle2'})
file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);

await page.goto('https://blazer.dokkuapp.com/queries/3-linked-column');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);

await page.goto('https://blazer.dokkuapp.com/queries/17-pie-chart');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);

await page.goto('https://blazer.dokkuapp.com/queries/16-scatter-chart');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);


await page.goto('https://blazer.dokkuapp.com/queries/10-check-for-bad-data');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);


await page.goto('https://blazer.dokkuapp.com/queries/11-check-for-missing-data');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);


await page.goto('https://blazer.dokkuapp.com/queries/19-cohort-analysis-from-first-order');
await page.waitForNetworkIdle()

file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);



await page.goto('https://blazer.dokkuapp.com/queries/new');
await page.waitForNetworkIdle();
await page.locator(".selectize-control.single").click();


file = `demo_${++count}.png`;
await page.screenshot({
    path: join(directory, file)
});
pngFiles.push(file);

await browser.close();

let content = "";

pngFiles.forEach(f => {
    content += `import ${f.split('.')[0]} from "./${f}?url"\n`;
});
content+= `\nexport default [${pngFiles.map(f=> f.split('.')[0]).join(', ')}]`;

writeFileSync(join(directory, "index.ts"), content)