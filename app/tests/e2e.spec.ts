import chai, { expect } from "chai";

import { spawn } from "child_process";

import { chaiImage } from "chai-image";
chai.use(chaiImage);

import { writeFile, readFile } from "fs/promises";

// import server from "../entry.server";
import puppeteer from "puppeteer";

describe("e2e", () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  before(async () => {
    spawn("npm", ["run", "dev"], { stdio: "inherit", shell: true }).on(
      "exit",
      process.exit
    );
    browser = await puppeteer.launch();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    page.close();
  });
  it("allow screenshots", async () => {
    await page.goto("http://www.localhost:3000");
    await page.waitForSelector("body");
    const screenshot = await page.screenshot();
    await writeFile(`${__dirname}/__snapshots__/test.png`, screenshot);
    const f = await readFile(`${__dirname}/__snapshots__/test.png`);
    expect(screenshot).to.matchImage(f);
  });
  it("allow metrics", async () => {
    await page.goto("http://www.localhost:3000");
    await page.waitForSelector("body");
    const metrics = await page.metrics();
    console.info("**** METRICS (google.com) ****", metrics);
  });
  //   ...
});
