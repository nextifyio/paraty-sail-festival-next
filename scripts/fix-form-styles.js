#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const files = [
  'src/app/admin/patrocinadores/new/NewSponsorForm.tsx',
  'src/app/admin/pessoas/new/page.tsx',
  'src/app/admin/pessoas/[id]/EditPersonForm.tsx',
  'src/app/admin/atividades/new/page.tsx',
  'src/app/admin/atividades/[id]/EditActivityForm.tsx'
];

// Map of old className patterns to new ones
const classNameUpdates = [
  // Add text color to admin forms with mt-1 block pattern
  {
    old: 'className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"',
    new: 'className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"'
  },
  // Add text color to admin forms with w-full px-3 py-2 pattern  
  {
    old: 'className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"',
    new: 'className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"'
  }
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Arquivo não encontrado: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  classNameUpdates.forEach(update => {
    if (content.includes(update.old)) {
      content = content.replaceAll(update.old, update.new);
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Atualizado: ${file}`);
  } else {
    console.log(`➖ Nenhuma alteração necessária: ${file}`);
  }
});

console.log('\n🎉 Correção de estilos de formulários concluída!');