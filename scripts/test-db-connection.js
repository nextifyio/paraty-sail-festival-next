#!/usr/bin/env node

/**
 * Script para testar diferentes formatos de DATABASE_URL com o Supabase
 */

const { Client } = require('pg');

const baseConfig = {
  host: 'db.gotwnlmvdjmexxfhbclr.supabase.co',
  user: 'postgres',
  password: '2U6afVKe1955Ajsh',
  database: 'postgres',
};

const configs = [
  { ...baseConfig, port: 5432, ssl: false },
  { ...baseConfig, port: 5432, ssl: { rejectUnauthorized: false } },
  { ...baseConfig, port: 6543, ssl: false },
  { ...baseConfig, port: 6543, ssl: { rejectUnauthorized: false } },
];

console.log('🔍 Testando conexões diretas com PostgreSQL...\n');

async function testConnection(config, index) {
  const client = new Client(config);
  
  try {
    console.log(`${index + 1}. Testando porta ${config.port} (SSL: ${!!config.ssl})`);
    
    await client.connect();
    const result = await client.query('SELECT version()');
    
    console.log('   ✅ SUCESSO! Conexão funcionou');
    console.log(`   📊 PostgreSQL: ${result.rows[0].version.split(' ')[1]}`);
    
    // Gerar a DATABASE_URL correspondente
    const sslParam = config.ssl ? '?sslmode=require' : '';
    const url = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}${sslParam}`;
    
    console.log(`\n🎉 Use esta DATABASE_URL:\n${url}\n`);
    return url;
    
  } catch (error) {
    console.log(`   ❌ Falhou: ${error.message}`);
  } finally {
    await client.end().catch(() => {});
  }
  
  return null;
}

async function main() {
  let workingUrl = null;
  
  for (let i = 0; i < configs.length && !workingUrl; i++) {
    workingUrl = await testConnection(configs[i], i);
    console.log(''); // Linha em branco
  }
  
  if (workingUrl) {
    // Atualizar o arquivo .env
    const fs = require('fs');
    try {
      const envContent = fs.readFileSync('.env', 'utf8');
      const updatedContent = envContent.replace(
        /DATABASE_URL=.*/,
        `DATABASE_URL=${workingUrl}`
      );
      fs.writeFileSync('.env', updatedContent);
      console.log('✅ Arquivo .env atualizado!');
      console.log('🚀 Agora você pode executar: npm run setup');
    } catch (error) {
      console.log('⚠️  Não foi possível atualizar .env automaticamente');
      console.log(`📝 Atualize manualmente com: DATABASE_URL=${workingUrl}`);
    }
  } else {
    console.log('❌ Nenhuma configuração funcionou.');
    console.log('� Verifique:');
    console.log('   1. Se o projeto Supabase está ativo');
    console.log('   2. Se a senha está correta');
    console.log('   3. Se há firewall bloqueando');
  }
}

main().catch(console.error);