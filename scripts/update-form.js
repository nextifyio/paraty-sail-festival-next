#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = 'src/app/admin/pessoas/new/page.tsx';
const fullPath = path.join(process.cwd(), filePath);

let content = fs.readFileSync(fullPath, 'utf8');

// Update the especialidade input
content = content.replace(
  /(<input[^>]*name="especialidade"[^>]*)\s*className="([^"]*)"([^>]*>)/s,
  '$1 value={formData.especialidade}\n                onChange={handleChange}\n                className="$2"$3'
);

// Update the bio textarea
content = content.replace(
  /(<textarea[^>]*name="bio"[^>]*)\s*className="([^"]*)"([^>]*>)/s,
  '$1 value={formData.bio}\n                onChange={handleChange}\n                className="$2"$3'
);

// Update the instagram input
content = content.replace(
  /(<input[^>]*name="instagram"[^>]*)\s*className="([^"]*)"([^>]*>)/s,
  '$1 value={formData.instagram}\n                onChange={handleChange}\n                className="$2"$3'
);

// Replace the image URL section with ImageUpload component
const imageUrlSection = `            <div>
              <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
                URL da Imagem
              </label>
              <input
                type="url"
                name="imagem"
                id="imagem"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>`;

const imageUploadSection = `          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto da Pessoa
            </label>
            <ImageUpload
              bucket="pessoas"
              currentImageUrl={imageUrl}
              onImageChange={setImageUrl}
            />
          </div>`;

content = content.replace(imageUrlSection, imageUploadSection);

// Update the submit button
content = content.replace(
  /(<button[^>]*type="submit"[^>]*className="[^"]*")([^>]*>)/,
  '$1" disabled={loading}$2'
);

content = content.replace(
  /Salvar Pessoa/,
  '{loading ? \'Salvando...\' : \'Salvar Pessoa\'}'
);

fs.writeFileSync(fullPath, content);
console.log('✅ Updated pessoas/new form with controlled inputs and ImageUpload');