export type AbrangenciaDisponibilidade = 'TodasAsFarmaciasMunicipais' | 'Restrito';
export type TipoFiltroMedicamento = 'nome' | 'grupo';

export interface RemumeFonte {
  nome: string;
  publicadoEm: string;
  url: string;
}

export interface UnidadeFarmacia {
  id: string;
  nome: string;
  slug: string;
}

export interface Apresentacao {
  id: string;
  descricao: string;
  abrangencia: AbrangenciaDisponibilidade;
  abrangenciaDescricao: string;
  observacao: string | null;
  unidades: UnidadeFarmacia[];
}

export interface Medicamento {
  id: string;
  nome: string;
  grupoFarmacologico: string;
  classeTerapeutica: string;
  apresentacoes: Apresentacao[];
  todasAsFarmacias: boolean;
  algumaRestrita: boolean;
}

export interface MedicamentoDetalheResponse {
  medicamento: Medicamento;
  fonte: RemumeFonte;
}
