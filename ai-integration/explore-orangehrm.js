const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function exploreOrangeHRM() {
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: './videos/' }
  });
  
  const page = await context.newPage();
  
  const data = {
    loginPage: {},
    homePage: {},
    menuItems: [],
    menuMap: []
  };
  
  try {
    console.log('===== STEP 1: Navigate to Login Page =====');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      waitUntil: 'networkidle'
    });
    
    // Wait for page to fully load
    await page.waitForTimeout(2000);
    
    console.log('Page Title:', await page.title());
    console.log('Current URL:', page.url());
    
    // Analyze login page
    data.loginPage = await analyzeLoginPage(page);
    
    console.log('Login Page Analysis:', JSON.stringify(data.loginPage, null, 2));
    console.log('\n===== STEP 2: Perform Login =====');
    
    // Wait for user to see login page
    await page.waitForTimeout(3000);
    
    // Perform login
    await page.fill('input[name="username"]', 'Admin');
    console.log('Entered username: Admin');
    
    await page.fill('input[name="password"]', 'admin123');
    console.log('Entered password: admin123');
    
    // Click login button
    await page.click('button[type="submit"]');
    console.log('Clicked login button');
    
    // Wait for login to complete and dashboard to load
    try {
      await page.waitForNavigation({ waitUntil: 'load', timeout: 15000 });
    } catch (e) {
      console.log('Navigation timeout, waiting for dashboard elements...');
    }
    await page.waitForTimeout(5000);
    
    console.log('Logged in successfully');
    console.log('Current URL:', page.url());
    console.log('Page Title:', await page.title());
    
    console.log('\n===== STEP 3: Analyze Home Page =====');
    data.homePage = await analyzeHomePage(page);
    console.log('Home Page Analysis:', JSON.stringify(data.homePage, null, 2));
    
    console.log('\n===== STEP 4: Explore Menu Items =====');
    data.menuItems = await exploreMenuItems(page, data);
    
    console.log('\n===== STEP 5: Create Menu Map =====');
    data.menuMap = createMenuMap(data.menuItems);
    
    // Save data to JSON for processing
    fs.writeFileSync(
      path.join(__dirname, 'exploration-data.json'),
      JSON.stringify(data, null, 2)
    );
    
    console.log('Exploration data saved to exploration-data.json');
    
  } catch (error) {
    console.error('Error during exploration:', error);
  } finally {
    await browser.close();
  }
}

async function analyzeLoginPage(page) {
  const analysis = {
    title: await page.title(),
    url: page.url(),
    formElements: [],
    buttons: [],
    errors: []
  };
  
  // Get form elements
  const inputs = await page.$$('input');
  for (const input of inputs) {
    const type = await input.getAttribute('type');
    const name = await input.getAttribute('name');
    const placeholder = await input.getAttribute('placeholder');
    const id = await input.getAttribute('id');
    
    analysis.formElements.push({
      type,
      name,
      placeholder,
      id
    });
  }
  
  // Get buttons
  const buttons = await page.$$('button');
  for (const button of buttons) {
    const text = await button.textContent();
    const type = await button.getAttribute('type');
    analysis.buttons.push({
      text: text.trim(),
      type
    });
  }
  
  return analysis;
}

async function analyzeHomePage(page) {
  const analysis = {
    title: await page.title(),
    url: page.url(),
    mainElements: [],
    menuStructure: []
  };
  
  // Get main headings
  const headings = await page.$$('h1, h2, h3');
  for (const heading of headings) {
    const text = await heading.textContent();
    const tag = await heading.evaluate(el => el.tagName);
    analysis.mainElements.push({
      type: tag,
      text: text.trim()
    });
  }
  
  // Get sidebar menu items
  const sidebarItems = await page.$$('[class*="menu"], [class*="sidebar"], [class*="nav"] a');
  for (const item of sidebarItems.slice(0, 30)) { // Limit to first 30
    const text = await item.textContent();
    const href = await item.getAttribute('href');
    if (text.trim() && href) {
      analysis.menuStructure.push({
        text: text.trim(),
        href,
        isClickable: true
      });
    }
  }
  
  return analysis;
}

async function exploreMenuItems(page, data) {
  const menuItems = [];
  const homeUrl = page.url();
  
  // Get all clickable menu items (links with navigation)
  const navigationLinks = await page.$$('a[href*="/web/index.php/"], nav a, [class*="menu"] a, aside a');
  
  console.log(`Found ${navigationLinks.length} potential menu items`);
  
  // Process each menu item
  for (let i = 0; i < Math.min(navigationLinks.length, 15); i++) {
    try {
      // Navigate back to home
      await page.goto(homeUrl, { waitUntil: 'load', timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1000);
      
      // Get fresh menu links after going back to home
      const links = await page.$$('a[href*="/web/index.php/"], nav a, [class*="menu"] a, aside a');
      
      if (i < links.length) {
        const link = links[i];
        const text = (await link.textContent()).trim();
        const href = await link.getAttribute('href');
        
        // Skip certain links
        if (!text || !href || href.includes('logout') || text === '') {
          continue;
        }
        
        console.log(`\nExploring menu item ${i + 1}: ${text}`);
        
        // Click the menu item
        try {
          await link.click();
          // Wait for navigation with timeout
          await Promise.race([
            page.waitForNavigation({ waitUntil: 'load', timeout: 8000 }),
            page.waitForTimeout(3000)
          ]).catch(() => {});
          await page.waitForTimeout(2000);
        } catch (e) {
          console.log(`Navigation didn't trigger, waiting for content...`);
          await page.waitForTimeout(2000);
        }
        
        const currentUrl = page.url();
        const pageTitle = await page.title();
        let bodyText = '';
        try {
          bodyText = await page.$eval('body', el => el.innerText);
        } catch (e) {
          bodyText = 'N/A';
        }
        
        const menuItem = {
          name: text,
          originalHref: href,
          navigatedUrl: currentUrl,
          pageTitle,
          bodyPreview: bodyText.substring(0, 300),
          mainHeadings: []
        };
        
        // Get main content headings
        const headings = await page.$$('h1, h2');
        for (const heading of headings) {
          const h = await heading.textContent();
          menuItem.mainHeadings.push(h.trim());
        }
        
        menuItems.push(menuItem);
        console.log(`  URL: ${currentUrl}`);
        console.log(`  Title: ${pageTitle}`);
        console.log(`  Headings: ${menuItem.mainHeadings.join(', ')}`);
      }
    } catch (error) {
      console.log(`Error exploring menu item: ${error.message}`);
    }
  }
  
  return menuItems;
}

function createMenuMap(menuItems) {
  const map = [];
  
  for (const item of menuItems) {
    map.push({
      menuItem: item.name,
      navigationLink: item.originalHref,
      destinationUrl: item.navigatedUrl,
      pageTitle: item.pageTitle,
      mainHeadings: item.mainHeadings,
      contentPreview: item.bodyPreview
    });
  }
  
  return map;
}

exploreOrangeHRM().catch(console.error);
