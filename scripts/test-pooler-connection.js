const { Client } = require('pg');
require('dotenv').config();

console.log('🔍 Testando nova DATABASE_URL via pooler...\n');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('❌ DATABASE_URL não encontrada');
  process.exit(1);
}

console.log(`📋 DATABASE_URL: ${databaseUrl.substring(0, 50)}...`);

// Testar conexão com Prisma via npx
console.log('\n1. Testando via npx prisma db pull...');

const { spawn } = require('child_process');

const prismaTest = spawn('npx', ['prisma', 'db', 'pull', '--preview-feature'], {
  cwd: process.cwd(),
  stdio: 'inherit'
});

prismaTest.on('close', async (code) => {
  console.log(`\n📊 Prisma db pull terminou com código: ${code}`);
  
  if (code === 0) {
    console.log('✅ Prisma conseguiu conectar!');
    console.log('🚀 Agora vamos tentar o setup completo...');
    
    // Se o pull funcionou, tentar o setup
    const setupProcess = spawn('npm', ['run', 'setup'], {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    
    setupProcess.on('close', (setupCode) => {
      console.log(`\n📋 Setup terminou com código: ${setupCode}`);
      if (setupCode === 0) {
        console.log('🎉 SETUP COMPLETO COM SUCESSO!');
      } else {
        console.log('❌ Setup falhou, mas Prisma está conectando');
      }
    });
    
  } else {
    console.log('❌ Prisma ainda não consegue conectar');
    console.log('🔍 Vamos testar conexão direta...');
    
    // Testar conexão direta
    const client = new Client({
      connectionString: databaseUrl
    });
    
    try {
      await client.connect();
      console.log('✅ Conexão direta PostgreSQL funcionou!');
      
      const result = await client.query('SELECT version()');
      console.log(`📋 Versão: ${result.rows[0].version.substring(0, 50)}...`);
      
      await client.end();
      
    } catch (error) {
      console.log(`❌ Conexão direta falhou: ${error.message}`);
    }
  }
});