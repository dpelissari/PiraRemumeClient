import { Fabricante } from "./fabricante.models";

// Espelha o enum FormaFarmaceutica da API (.NET serializa como número)
export enum FormaFarmaceutica {
  Comprimido = 0,
  Capsula = 1,
  Drageas = 2,
  Outros = 3
}

// Formato do JSON retornado por GET /medicamentos
export interface Medicamento {
  id: string;
  nome: string;
  formaFarmaceutica: FormaFarmaceutica;
  disponivel: boolean;
  qtdeDisponivel: number;
  fabricanteId: string;
  fabricante: Fabricante;
}
