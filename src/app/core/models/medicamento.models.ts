import { ClasseTerapeutica } from "../enums/classeTerapeutica";
import { FormaFarmaceutica } from "../enums/formaFarmaceutica";
import { Fabricante } from "./fabricante.models";

/** Valores de `tipo` aceitos por GET /medicamentos */
export type TipoFiltroMedicamento = 'nome' | 'classeTerapeutica';

// Formato do JSON retornado por GET /medicamentos
export interface Medicamento {
  id: string;
  nome: string;
  formaFarmaceutica: FormaFarmaceutica;
  classeTerapeutica: ClasseTerapeutica;
  fornecidoPeloSUS: boolean;
  fabricanteId: string;
  fabricante: Fabricante;
}
