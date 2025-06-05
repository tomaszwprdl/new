const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  opts.port = chrome.port;
  const results = await lighthouse(url, opts, config);
  await chrome.kill();
  return results;
}

async function checkPerformance() {
  const url = 'http://localhost:3000'; // Change this to your production URL when needed
  const opts = {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      disabled: false,
    },
  };

  try {
    console.log('Running Lighthouse audit...');
    const results = await runLighthouse(url, opts);
    
    // Create reports directory if it doesn't exist
    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    // Save the full report
    const reportPath = path.join(reportsDir, `lighthouse-report-${new Date().toISOString().split('T')[0]}.html`);
    fs.writeFileSync(reportPath, results.report);

    // Log the scores
    console.log('\nPerformance Scores:');
    console.log('------------------');
    console.log(`Performance: ${results.lhr.categories.performance.score * 100}`);
    console.log(`Accessibility: ${results.lhr.categories.accessibility.score * 100}`);
    console.log(`Best Practices: ${results.lhr.categories['best-practices'].score * 100}`);
    console.log(`SEO: ${results.lhr.categories.seo.score * 100}`);

    // Log opportunities for improvement
    console.log('\nOpportunities for Improvement:');
    console.log('----------------------------');
    results.lhr.audits['render-blocking-resources']?.details?.items?.forEach(item => {
      console.log(`- Remove render-blocking resource: ${item.url}`);
    });

    results.lhr.audits['unused-css-rules']?.details?.items?.forEach(item => {
      console.log(`- Remove unused CSS: ${item.url}`);
    });

    results.lhr.audits['unused-javascript']?.details?.items?.forEach(item => {
      console.log(`- Remove unused JavaScript: ${item.url}`);
    });

    console.log(`\nFull report saved to: ${reportPath}`);
  } catch (error) {
    console.error('Error running Lighthouse:', error);
    process.exit(1);
  }
}

checkPerformance(); 