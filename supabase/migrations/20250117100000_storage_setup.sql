-- Criação dos buckets para armazenamento de imagens

-- Bucket para imagens de pessoas (palestrantes e atrações)
INSERT INTO storage.buckets (id, name, public)
VALUES ('pessoas', 'pessoas', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para logos de patrocinadores
INSERT INTO storage.buckets (id, name, public)  
VALUES ('patrocinadores', 'patrocinadores', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket para imagens gerais do festival
INSERT INTO storage.buckets (id, name, public)
VALUES ('festival', 'festival', true) 
ON CONFLICT (id) DO NOTHING;

-- Políticas para o bucket pessoas
CREATE POLICY "Public read access for pessoas images" ON storage.objects
FOR SELECT USING (bucket_id = 'pessoas');

CREATE POLICY "Authenticated users can upload pessoas images" ON storage.objects  
FOR INSERT WITH CHECK (bucket_id = 'pessoas' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update pessoas images" ON storage.objects
FOR UPDATE USING (bucket_id = 'pessoas' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete pessoas images" ON storage.objects
FOR DELETE USING (bucket_id = 'pessoas' AND auth.role() = 'authenticated');

-- Políticas para o bucket patrocinadores  
CREATE POLICY "Public read access for patrocinadores images" ON storage.objects
FOR SELECT USING (bucket_id = 'patrocinadores');

CREATE POLICY "Authenticated users can upload patrocinadores images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'patrocinadores' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update patrocinadores images" ON storage.objects  
FOR UPDATE USING (bucket_id = 'patrocinadores' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete patrocinadores images" ON storage.objects
FOR DELETE USING (bucket_id = 'patrocinadores' AND auth.role() = 'authenticated');

-- Políticas para o bucket festival
CREATE POLICY "Public read access for festival images" ON storage.objects
FOR SELECT USING (bucket_id = 'festival');

CREATE POLICY "Authenticated users can upload festival images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'festival' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update festival images" ON storage.objects
FOR UPDATE USING (bucket_id = 'festival' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete festival images" ON storage.objects  
FOR DELETE USING (bucket_id = 'festival' AND auth.role() = 'authenticated');