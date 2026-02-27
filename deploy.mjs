#!/usr/bin/env node
/**
 * Deploy Scout Docs to onhyper.io
 * 
 * Usage: ONHYPER_API_KEY=oh_live_xxx pnpm deploy
 * 
 * Or set ONHYPER_API_KEY in .env.local
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const APP_ID = '3207fc1a-ef55-40c2-8b74-9891e571bde9';
const APP_SLUG = 'scout-docs-ae35b7bd';

function getApiKey() {
  // Check environment variable first
  if (process.env.ONHYPER_API_KEY) {
    return process.env.ONHYPER_API_KEY;
  }

  // Backward-compatible token name
  if (process.env.ONHYPER_TOKEN) {
    return process.env.ONHYPER_TOKEN;
  }
  
  // Check .env.local
  const envLocalPath = join(__dirname, '.env.local');
  if (existsSync(envLocalPath)) {
    const content = readFileSync(envLocalPath, 'utf-8');
    const apiKeyMatch = content.match(/ONHYPER_API_KEY=(.+)/);
    if (apiKeyMatch) return apiKeyMatch[1].trim();
    const tokenMatch = content.match(/ONHYPER_TOKEN=(.+)/);
    if (tokenMatch) return tokenMatch[1].trim();
  }
  
  // Check ~/.onhyper-api-key
  const homeKeyPath = join(homedir(), '.onhyper-api-key');
  if (existsSync(homeKeyPath)) {
    return readFileSync(homeKeyPath, 'utf-8').trim();
  }
  
  console.error('❌ No API key found. Set ONHYPER_API_KEY or ONHYPER_TOKEN.');
  console.error('   Example: ONHYPER_API_KEY=oh_live_xxx pnpm deploy');
  process.exit(1);
}

function run(cmd, options = {}) {
  console.log(`▶ ${cmd}`);
  return execSync(cmd, { stdio: 'inherit', ...options });
}

async function main() {
  const apiKey = getApiKey();
  const zipFile = join(__dirname, 'scout-docs.zip');
  
  console.log('\n🚀 Deploying Scout Docs to onhyper.io\n');
  
  // Step 1: Build
  console.log('📦 Step 1: Building static site...');
  run('pnpm build');
  
  // Step 2: Create zip
  console.log('\n📁 Step 2: Creating zip archive...');
  if (existsSync(zipFile)) {
    run(`rm -f "${zipFile}"`);
  }
  run(`zip -r scout-docs.zip out/`);
  
  // Step 3: Upload to onhyper.io
  console.log('\n☁️  Step 3: Uploading to onhyper.io...');
  const uploadCmd = `curl -s -X POST "https://onhyper.io/api/apps/${APP_ID}/zip" -H "X-API-Key: ${apiKey}" -F "file=@${zipFile}"`;
  const uploadResult = JSON.parse(execSync(uploadCmd).toString());
  
  if (uploadResult.success) {
    console.log(`   ✅ Uploaded ${uploadResult.files_count} files`);
  } else {
    console.error('   ❌ Upload failed:', uploadResult);
    process.exit(1);
  }
  
  // Step 4: Publish
  console.log('\n🚀 Step 4: Publishing...');
  const publishCmd = `curl -s -X POST "https://onhyper.io/api/apps/${APP_ID}/publish" -H "X-API-Key: ${apiKey}"`;
  const publishResult = JSON.parse(execSync(publishCmd).toString());
  
  if (publishResult.success) {
    console.log('   ✅ Published successfully');
  } else {
    console.error('   ❌ Publish failed:', publishResult);
    process.exit(1);
  }
  
  // Cleanup
  if (existsSync(zipFile)) {
    run(`rm -f "${zipFile}"`);
  }
  
  console.log('\n✨ Deployment complete!\n');
  console.log(`📍 Live at: https://scout-docs.onhyper.io`);
  console.log(`📍 Alt URL: https://onhyper.io/a/${APP_SLUG}\n`);
}

main().catch(err => {
  console.error('❌ Deployment failed:', err);
  process.exit(1);
});
