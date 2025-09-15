
import { useState } from 'react'
import { createClient } from '@/lib/supabase-server'
import { Pessoa } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { Edit, Plus, User, Music } from 'lucide-react'
import { deletePessoa } from './actions'
import { DeleteForm } from '@/components/admin/DeleteForm'


async function getPessoas() {
  const supabase = await createClient()
  const { data: pessoas, error } = await supabase
    .from('pessoas_festival')
    .select('*')
    .order('nome')
  if (error) {
    console.error('Erro ao buscar pessoas:', error)
    return []
  }
  return pessoas || []
}
import PessoasPageClient from './PessoasPageClient'

export default async function PessoasPage() {
  const pessoas = await getPessoas()
  return <PessoasPageClient pessoas={pessoas} />
}