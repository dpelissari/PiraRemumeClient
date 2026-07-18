// Espelha o enum FormaFarmaceutica da API (.NET serializa como número)
export enum ClasseTerapeutica {
    Analgesico = 10,
    Antipiretico = 20,
    AntiInflamatorio = 30,
    Antibiotico = 40,
    Antifungico = 50,
    Antiviral = 60,
    Antialergico = 70,
    AntiHipertensivo = 80,
    Antidiabetico = 90,
    Antidepressivo = 100,
    Ansiolitico = 110,
    Gastroprotetor = 120
}

// Mapeamento numérico para string descritiva
export const ClasseTerapeuticaDescription: Record<ClasseTerapeutica, string> = {
    [ClasseTerapeutica.Analgesico]: 'Analgésico',
    [ClasseTerapeutica.Antipiretico]: 'Antipirético',
    [ClasseTerapeutica.AntiInflamatorio]: 'Anti-inflamatório',
    [ClasseTerapeutica.Antibiotico]: 'Antibiótico',
    [ClasseTerapeutica.Antifungico]: 'Antifúngico',
    [ClasseTerapeutica.Antiviral]: 'Antiviral',
    [ClasseTerapeutica.Antialergico]: 'Antialérgico',
    [ClasseTerapeutica.AntiHipertensivo]: 'Anti-hipertensivo',
    [ClasseTerapeutica.Antidiabetico]: 'Antidiabético',
    [ClasseTerapeutica.Antidepressivo]: 'Antidepressivo',
    [ClasseTerapeutica.Ansiolitico]: 'Ansiolítico',
    [ClasseTerapeutica.Gastroprotetor]: 'Gastroprotetor'
};
