'use strict'

import fs from 'fs'
import puppeteer from 'puppeteer'
import test from 'ava'

test.serial('check form searchResult', async (t) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.setViewport({width: 1200, height: 800})

  let searchResult

  try {
    await page.goto('https://www.gnavi.co.jp/dressing/')
    await page.type('input[name="fw"]', '恵比寿')
    await page.click('.search__btn')
    await page.waitForNavigation()

    searchResult = await page.evaluate(() => {
      return Promise.resolve(document.querySelector('.contents-header__title').textContent)
    })
  } catch (e) {
    t.fail(e)
  }

  const testFileDir = './test_file/'
  const fileName = `puppeteer${new Date().getTime()}.png`

  if (!fs.existsSync(testFileDir)) {
    fs.mkdirSync(testFileDir)
  }

  await page.screenshot({ path: `${testFileDir}${fileName}` })

  browser.close()
  console.log(searchResult)
  t.truthy(searchResult)
})
