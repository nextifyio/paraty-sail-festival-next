require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupStoragePolicies() {
  try {
    console.log('Configurando políticas de storage...');

    // Política para permitir upload para bucket pessoas
    const uploadPolicy = `
      CREATE POLICY "Allow authenticated uploads to pessoas bucket" ON storage.objects
      FOR INSERT WITH CHECK (bucket_id = 'pessoas' AND auth.role() = 'authenticated');
    `;

    // Política para permitir leitura pública
    const selectPolicy = `
      CREATE POLICY "Allow public read access to pessoas bucket" ON storage.objects
      FOR SELECT USING (bucket_id = 'pessoas');
    `;

    // Política para permitir delete para usuários autenticados
    const deletePolicy = `
      CREATE POLICY "Allow authenticated delete from pessoas bucket" ON storage.objects
      FOR DELETE USING (bucket_id = 'pessoas' AND auth.role() = 'authenticated');
    `;

    // Executar as políticas via SQL
    console.log('Criando política de upload...');
    const { error: uploadError } = await supabase.rpc('exec_sql', { 
      sql: uploadPolicy 
    });
    
    if (uploadError && !uploadError.message.includes('already exists')) {
      console.error('Erro ao criar política de upload:', uploadError);
    } else {
      console.log('✓ Política de upload criada/já existe');
    }

    console.log('Criando política de leitura...');
    const { error: selectError } = await supabase.rpc('exec_sql', { 
      sql: selectPolicy 
    });
    
    if (selectError && !selectError.message.includes('already exists')) {
      console.error('Erro ao criar política de leitura:', selectError);
    } else {
      console.log('✓ Política de leitura criada/já existe');
    }

    console.log('Criando política de delete...');
    const { error: deleteError } = await supabase.rpc('exec_sql', { 
      sql: deletePolicy 
    });
    
    if (deleteError && !deleteError.message.includes('already exists')) {
      console.error('Erro ao criar política de delete:', deleteError);
    } else {
      console.log('✓ Política de delete criada/já existe');
    }

    console.log('Configuração concluída!');
  } catch (error) {
    console.error('Erro:', error);
  }
}

setupStoragePolicies();
