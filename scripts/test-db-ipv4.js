const { Client } = require('pg');
require('dotenv').config();

// Extrair componentes da URL do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL não encontrada');
  process.exit(1);
}

// Extrair hostname do Supabase URL
const hostname = new URL(supabaseUrl).hostname;
console.log(`🔍 Hostname extraído: ${hostname}`);

// Resolver DNS para IPv4
const dns = require('dns');

console.log('🔍 Resolvendo DNS para IPv4...');

dns.lookup(hostname, { family: 4 }, async (err, address) => {
  if (err) {
    console.error('❌ Erro ao resolver DNS:', err.message);
    return;
  }

  console.log(`✅ Endereço IPv4 resolvido: ${address}`);

  // Configurações de teste com IPv4 forçado
  const testConfigs = [
    {
      name: 'Porta 5432 (SSL: true, IPv4)',
      config: {
        host: address,
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: process.env.SUPABASE_SERVICE_ROLE_KEY,
        ssl: {
          rejectUnauthorized: false
        }
      }
    },
    {
      name: 'Porta 6543 (SSL: true, IPv4)',
      config: {
        host: address,
        port: 6543,
        database: 'postgres',
        user: 'postgres',
        password: process.env.SUPABASE_SERVICE_ROLE_KEY,
        ssl: {
          rejectUnauthorized: false
        }
      }
    },
    {
      name: 'Porta 5432 (SSL: false, IPv4)',
      config: {
        host: address,
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: process.env.SUPABASE_SERVICE_ROLE_KEY,
        ssl: false
      }
    }
  ];

  console.log('\n🔍 Testando conexões com IPv4 forçado...\n');

  for (const test of testConfigs) {
    console.log(`${test.name}`);
    
    const client = new Client(test.config);
    
    try {
      await client.connect();
      console.log('   ✅ Conexão bem-sucedida!');
      
      // Testar uma query simples
      const result = await client.query('SELECT version()');
      console.log('   ✅ Query executada com sucesso');
      
      await client.end();
      
      // Se chegou aqui, esta configuração funciona
      console.log('\n🎉 CONFIGURAÇÃO FUNCIONANDO ENCONTRADA!');
      console.log(`Host: ${address}`);
      console.log(`Porta: ${test.config.port}`);
      console.log(`SSL: ${!!test.config.ssl}`);
      
      // Gerar DATABASE_URL para esta configuração
      const sslParam = test.config.ssl ? '?sslmode=require' : '?sslmode=disable';
      const databaseUrl = `postgresql://postgres:${process.env.SUPABASE_SERVICE_ROLE_KEY}@${address}:${test.config.port}/postgres${sslParam}`;
      
      console.log('\n📝 DATABASE_URL para usar:');
      console.log(databaseUrl);
      
      return;
      
    } catch (error) {
      console.log(`   ❌ Falhou: ${error.message}`);
    }
  }

  console.log('\n❌ Nenhuma configuração IPv4 funcionou.');
  console.log('💡 Pode ser necessário verificar se o projeto Supabase está pausado ou com restrições de IP.');
});