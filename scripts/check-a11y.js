const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

async function checkAccessibility() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    // Set viewport to a common desktop size
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to your local development server
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
    });

    // Analyze the page
    const results = await new AxePuppeteer(page).analyze();

    // Log the results
    console.log('\n🔍 Accessibility Check Results:\n');

    if (results.violations.length === 0) {
      console.log('✅ No accessibility violations found!');
    } else {
      console.log(`❌ Found ${results.violations.length} accessibility violations:\n`);
      
      results.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.help} (${violation.impact} impact)`);
        console.log(`   Description: ${violation.description}`);
        console.log('   Elements affected:');
        violation.nodes.forEach(node => {
          console.log(`   - ${node.html}`);
          if (node.failureSummary) {
            console.log(`     Fix: ${node.failureSummary}`);
          }
        });
        console.log('\n');
      });
    }

    // Check for color contrast issues specifically
    const contrastResults = results.violations.filter(v => v.id === 'color-contrast');
    if (contrastResults.length > 0) {
      console.log('🎨 Color Contrast Issues:');
      contrastResults.forEach(violation => {
        violation.nodes.forEach(node => {
          console.log(`- ${node.html}`);
          console.log(`  Fix: ${node.failureSummary}\n`);
        });
      });
    }

    // Check for keyboard navigation issues
    const keyboardResults = results.violations.filter(v => 
      ['keyboard', 'focus-order-semantics'].includes(v.id)
    );
    if (keyboardResults.length > 0) {
      console.log('⌨️ Keyboard Navigation Issues:');
      keyboardResults.forEach(violation => {
        console.log(`- ${violation.help}`);
        violation.nodes.forEach(node => {
          console.log(`  Element: ${node.html}`);
          console.log(`  Fix: ${node.failureSummary}\n`);
        });
      });
    }

  } catch (error) {
    console.error('Error running accessibility checks:', error);
  } finally {
    await browser.close();
  }
}

// Run the checks
checkAccessibility().catch(console.error); 