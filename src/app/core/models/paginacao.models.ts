// Formato do JSON retornado pelos GETs paginados da API
export interface ResultadoPaginado<T> {
  itens: T[];
  pagina: number;
  tamanho: number;
  total: number;
  totalPaginas: number;
}
