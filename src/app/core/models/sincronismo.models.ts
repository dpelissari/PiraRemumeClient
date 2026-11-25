export type StatusSincronismo =
  | 'SemAlteracao'
  | 'FonteAlterou'
  | 'CatalogoAtualizado'
  | 'PrimeiraLeitura'
  | 'Erro';

export interface Sincronismo {
  id: string;
  urlFonte: string;
  urlFarmacias: string;
  intervaloDias: number;
  ativo: boolean;
  ultimaVerificacaoEm: string | null;
  proximaVerificacaoEm: string | null;
  ultimoStatus: StatusSincronismo | null;
  ultimaMensagem: string | null;
  linksDetectados: string[];
}

export interface AtualizarSincronismo {
  urlFonte: string;
  urlFarmacias: string;
  intervaloDias: number;
  ativo: boolean;
}
