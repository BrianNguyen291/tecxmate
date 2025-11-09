#!/usr/bin/env node

/**
 * Test script to verify robots.txt and sitemap.xml are generated correctly
 * Run this after starting your dev server: npm run dev
 * Then in another terminal: node test-robots-sitemap.js
 */

const http = require('http');

const baseUrl = 'http://localhost:3000';

async function testRoute(path, expectedContent) {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}${path}`;
    console.log(`\nTesting: ${url}`);
    
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Status: ${res.statusCode}`);
          console.log(`✅ Content-Type: ${res.headers['content-type']}`);
          console.log(`✅ Content Length: ${data.length} bytes`);
          console.log(`\nFirst 500 characters of response:`);
          console.log(data.substring(0, 500));
          if (data.length > 500) {
            console.log('... (truncated)');
          }
          resolve({ success: true, data, statusCode: res.statusCode });
        } else {
          console.log(`❌ Status: ${res.statusCode}`);
          console.log(`Response: ${data}`);
          resolve({ success: false, statusCode: res.statusCode, data });
        }
      });
    }).on('error', (err) => {
      console.log(`❌ Error: ${err.message}`);
      console.log(`\n💡 Make sure your dev server is running: npm run dev`);
      reject(err);
    });
  });
}

async function runTests() {
  console.log('🧪 Testing robots.txt and sitemap.xml routes');
  console.log('='.repeat(60));
  
  try {
    // Test robots.txt
    await testRoute('/robots.txt');
    
    // Test sitemap.xml
    await testRoute('/sitemap.xml');
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Tests completed!');
    console.log('\n💡 Next steps:');
    console.log('1. If tests passed, your routes are working locally');
    console.log('2. Deploy to production and test:');
    console.log('   - https://tecxmate.com/robots.txt');
    console.log('   - https://tecxmate.com/sitemap.xml');
    console.log('3. Submit sitemap to Google Search Console');
    console.log('4. Use Google\'s URL Inspection tool to test indexing');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();

