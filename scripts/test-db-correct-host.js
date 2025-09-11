const { Client } = require('pg');
require('dotenv').config();

// Host correto do banco de dados
const dbHost = 'db.gotwnlmvdjmexxfhbclr.supabase.co';
console.log(`🔍 Testando com host correto: ${dbHost}`);

// Resolver DNS para IPv4
const dns = require('dns');

console.log('🔍 Resolvendo DNS para IPv4...');

dns.lookup(dbHost, { family: 4 }, async (err, address) => {
  if (err) {
    console.error('❌ Erro ao resolver DNS:', err.message);
    return;
  }

  console.log(`✅ Endereço IPv4 resolvido: ${address}`);

  // Configurações de teste com IPv4 forçado
  const testConfigs = [
    {
      name: 'Porta 5432 (SSL: require)',
      config: {
        host: address,
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: process.env.SUPABASE_SERVICE_ROLE_KEY,
        ssl: {
          rejectUnauthorized: false
        }
      },
      urlSuffix: '?sslmode=require'
    },
    {
      name: 'Porta 6543 (SSL: require)',
      config: {
        host: address,
        port: 6543,
        database: 'postgres',
        user: 'postgres',
        password: process.env.SUPABASE_SERVICE_ROLE_KEY,
        ssl: {
          rejectUnauthorized: false
        }
      },
      urlSuffix: '?sslmode=require'
    }
  ];

  console.log('\n🔍 Testando conexões com host correto...\n');

  for (const test of testConfigs) {
    console.log(`${test.name}`);
    
    const client = new Client(test.config);
    
    try {
      await client.connect();
      console.log('   ✅ Conexão bem-sucedida!');
      
      // Testar uma query simples
      const result = await client.query('SELECT version()');
      console.log('   ✅ Query executada com sucesso');
      console.log(`   📋 Versão: ${result.rows[0].version.substring(0, 50)}...`);
      
      await client.end();
      
      // Se chegou aqui, esta configuração funciona
      console.log('\n🎉 CONFIGURAÇÃO FUNCIONANDO ENCONTRADA!');
      console.log(`Host: ${address} (${dbHost})`);
      console.log(`Porta: ${test.config.port}`);
      console.log(`SSL: requerido`);
      
      // Gerar DATABASE_URL para esta configuração usando o hostname
      const databaseUrl = `postgresql://postgres:${process.env.SUPABASE_SERVICE_ROLE_KEY}@${dbHost}:${test.config.port}/postgres${test.urlSuffix}`;
      
      console.log('\n📝 DATABASE_URL para usar:');
      console.log(databaseUrl);
      
      return;
      
    } catch (error) {
      console.log(`   ❌ Falhou: ${error.message}`);
    }
  }

  console.log('\n❌ Nenhuma configuração funcionou.');
});