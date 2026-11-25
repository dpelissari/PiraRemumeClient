export type TipoFarmacia = 'AtencaoBasica' | 'AltoCusto' | 'Cedic';

export interface FarmaciaFonte {
  nome: string;
  publicadoEm: string;
  url: string;
}

export interface Farmacia {
  id: string;
  slug: string;
  nome: string;
  tipo: TipoFarmacia;
  tipoDescricao: string;
  zonaRural: boolean;
  endereco: string;
  bairro: string;
  telefone: string | null;
  whatsapp: boolean;
  horario: string;
  unidadesReferencia: string[];
  observacao: string | null;
}

export interface FarmaciasResponse {
  itens: Farmacia[];
  fonte: FarmaciaFonte;
}

export interface FarmaciaDetalheResponse {
  farmacia: Farmacia;
  fonte: FarmaciaFonte;
}
