'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2 } from 'lucide-react';
import { createInscricao } from '@/app/admin/inscricoes/actions';
import { CategoriaRegata } from '@/types';

interface InscricaoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const categorias: CategoriaRegata[] = [
  'Força Livre: Barcos com medição IRC, ORC, RGS, barcos One Design e ou + 40 pés',
  'Aço: Barcos de cruzeiro com casco de aço / restrição de tamanho',
  'Clássicos: Barcos de projeto clássico ou com data de construção anterior 1975',
  'Cruzeiro 18: Barcos de até 22,9 pés.',
  'Cruzeiro 23: Barcos de 23 a 26,9 pés.',
  'Cruzeiro 27: Barcos de 27 a 31,9 pés.',
  'Cruzeiro 32: Barcos de 32 a 35,9 pés.',
  'Cruzeiro 36: Barcos de 36 a 39,9 pés.'
];

export default function InscricaoPopup({ isOpen, onClose, onSuccess }: InscricaoPopupProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      await createInscricao(formData);
      
      setSuccess(true);
      
      setTimeout(() => {
        onSuccess?.();
        onClose();
        setSuccess(false);
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar inscrição');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Inscrição 1ª Regata Amyr Klink</h2>
                <p className="text-teal-100 mt-1">Paraty Sail Festival 2025</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {success ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Inscrição Enviada!</h3>
                <p className="text-gray-600">
                  Sua inscrição foi recebida com sucesso. Você receberá um e-mail de confirmação em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm">
                    <strong>Importante:</strong> Valor da inscrição: R$ 200,00 por tripulante. 
                    Após o envio, você deverá efetuar o pagamento via PIX.
                  </p>
                </div>

                {/* Dados do Responsável */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Comandante *
                    </label>
                    <input
                      type="text"
                      name="nome_comandante"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone do Comandante (com DDD) *
                  </label>
                  <input
                    type="tel"
                    name="telefone_comandante"
                    required
                    placeholder="(11) 99999-9999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Dados da Embarcação */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados da Embarcação</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Barco *
                      </label>
                      <input
                        type="text"
                        name="nome_barco"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clube, Associação Náutica ou Marina
                      </label>
                      <input
                        type="text"
                        name="clube_marina"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo do barco e tamanho *
                    </label>
                    <textarea
                      name="modelo_barco_tamanho"
                      required
                      rows={3}
                      placeholder="Exemplo: Barco: Velamar 33, Fabricante: Carbrasmar, Tamanho: 33 pés"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Especifique o modelo, estaleiro/fabricante e comprimento total (LOA) em pés
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Classe *
                    </label>
                    <select
                      name="categoria"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="">Selecione uma classe</option>
                      {categorias.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tripulação */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tripulação</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lista de Tripulantes (incluindo o comandante) *
                    </label>
                    <textarea
                      name="lista_tripulantes"
                      required
                      rows={4}
                      placeholder="João da Silva, 35, M&#10;Maria Santos, 28, P&#10;Pedro Costa, 42, G"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Liste o NOME COMPLETO, IDADE e TAMANHO DA CAMISETA de cada tripulante, um por linha
                    </p>
                  </div>
                </div>

                {/* Contato de Emergência */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato de Emergência</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Contato de Emergência em Terra *
                      </label>
                      <input
                        type="text"
                        name="nome_contato_emergencia"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone do Contato de Emergência (com DDD) *
                      </label>
                      <input
                        type="tel"
                        name="telefone_contato_emergencia"
                        required
                        placeholder="(11) 99999-9999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Upload de Comprovante */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comprovante de Pagamento</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 text-sm">
                      <strong>PIX:</strong> bc6e3feb-e12b-408b-a985-114eb87c02d3<br/>
                      <strong>Valor:</strong> R$ 200,00 por tripulante<br/>
                      <strong>Alternativa:</strong> Envie por email para regata@paratysailfestival.com
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anexar Comprovante do PIX (opcional)
                    </label>
                    <input
                      type="file"
                      name="comprovante_pix"
                      accept="image/*,.pdf"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Termos */}
                <div className="border-t pt-6">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="aceita_termos"
                      value="true"
                      required
                      className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>Declaro que li e concordo com o Aviso de Regata do Paraty Sail Festival. *</strong>
                      <br/>
                      Assumo total responsabilidade por mim, minha tripulação e meu barco, isentando a comissão organizadora 
                      e qualquer pessoa ou entidade envolvida na organização de toda e qualquer responsabilidade por danos 
                      materiais, físicos ou morte que possam ocorrer.
                    </span>
                  </label>
                </div>

                {/* Botões */}
                <div className="border-t pt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg hover:from-teal-700 hover:to-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{loading ? 'Enviando...' : 'Enviar Inscrição'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}