export interface LoginPedido {
  nomeUsuario: string;
  senha: string;
}

export interface LoginResposta {
  token: string;
  nome: string;
  perfil: 'Admin' | 'User';
  expiraEm: string;
}

export interface Sessao {
  token: string;
  nome: string;
  perfil: 'Admin' | 'User';
  expiraEm: string;
}
