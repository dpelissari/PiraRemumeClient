// Espelha o enum FormaFarmaceutica da API (.NET serializa como número)
export enum FormaFarmaceutica {
  Comprimido = 10,
  Capsula = 20,
  Drageas = 30,
  Outros = 40
}

// Mapeamento numérico para string descritiva
export const formaFarmaceuticaDescription: Record<FormaFarmaceutica, string> = {
  [FormaFarmaceutica.Comprimido]: 'Comprimido',
  [FormaFarmaceutica.Capsula]: 'Cápsula',
  [FormaFarmaceutica.Drageas]: 'Drágea',
  [FormaFarmaceutica.Outros]: 'Outros formatos'
};