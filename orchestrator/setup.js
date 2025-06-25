const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function setupOrchestrator() {
  console.log('🚀 Setting up GenesisOS Orchestrator...');

  // Create .env file if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, '.env'))) {
    if (fs.existsSync(path.join(__dirname, '.env.example'))) {
      console.log('Creating .env file from example...');
      fs.copyFileSync(path.join(__dirname, '.env.example'), path.join(__dirname, '.env'));
      console.log('⚠️  Please update the .env file with your actual API keys!');
    } else {
      console.log('Creating basic .env file...');
      const envContent = 
`PORT=3000
AGENT_SERVICE_URL=http://localhost:8001
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
REDIS_URL=redis://localhost:6379
`;
      fs.writeFileSync(path.join(__dirname, '.env'), envContent);
      console.log('⚠️  .env file created with placeholder values. Please update with actual keys!');
    }
  }

  // Install dependencies
  console.log('Installing Node.js dependencies...');
  try {
    execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    return false;
  }

  // Build TypeScript
  console.log('Building TypeScript...');
  try {
    execSync('npm run build', { cwd: __dirname, stdio: 'inherit' });
    console.log('✅ TypeScript build completed successfully!');
  } catch (error) {
    console.error('❌ Failed to build TypeScript:', error.message);
    return false;
  }

  console.log('\n✅ Orchestrator setup completed successfully!');
  console.log('\nTo run the orchestrator, use the following command:');
  console.log('  - npm run dev');
  
  return true;
}

setupOrchestrator();