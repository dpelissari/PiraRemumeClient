import { afterNextRender, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { Farmacia } from '../../app/core/models/farmacia.models';

@Component({
  selector: 'app-modal-farmacia',
  templateUrl: './modal-farmacia.html',
  styleUrl: './modal-farmacia.css',
})
export class ModalFarmacia {
  farmacia = input.required<Farmacia>();
  fechou = output();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    afterNextRender(() => {
      this.dialog().nativeElement.showModal();
    });
  }

  fechar(): void {
    this.dialog().nativeElement.close();
  }

  aoFechar(): void {
    this.fechou.emit();
  }

  aoCliqueFundo(evento: MouseEvent): void {
    if (evento.target === evento.currentTarget) {
      this.fechar();
    }
  }

  formatarTelefone(telefone: string): string {
    const digitos = telefone.replace(/\D/g, '');
    if (digitos.length === 8) {
      return `(19) ${digitos.slice(0, 4)}-${digitos.slice(4)}`;
    }
    if (digitos.length === 9) {
      return `(19) ${digitos.slice(0, 5)}-${digitos.slice(5)}`;
    }
    return telefone;
  }

  telHref(telefone: string): string {
    return `tel:+5519${telefone.replace(/\D/g, '')}`;
  }

  whatsappHref(telefone: string): string {
    return `https://wa.me/5519${telefone.replace(/\D/g, '')}`;
  }

  mapsHref(farmacia: Farmacia): string {
    const query = `${farmacia.endereco}, ${farmacia.bairro}, Piracicaba, SP`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }
}
