import { Pipe, PipeTransform } from '@angular/core';
import { FormaFarmaceutica, formaFarmaceuticaDescription } from '../core/enums/formaFarmaceutica';

@Pipe({
  name: 'formaFarmaceuticaDescription',
  standalone: true 
})

export class FormaFarmaceuticaPipe implements PipeTransform {

  // 'any' ou tipos nulos, pois o Signal inicia vazio no HTML
  transform(value: any): string {

    // Tratamento para evitar que o app quebre se o valor for nulo ou indefinido
    if (value === null || value === undefined) {
      return 'Não informado';
    }

    // Converte o valor recebido em número para garantir o mapeamento do enum numérico do .NET
    const numericKey = Number(value) as FormaFarmaceutica;

    // Busca no objeto e retorna o texto, ou 'Outros' se o número não existir no enum
    return formaFarmaceuticaDescription[numericKey] || 'Outros';
  }
}
