import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrestamoService } from '../../services/prestamo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="mb-4">Registro de Solicitud</h2>
    <div class="card p-4 shadow-sm">
      <h5 class="text-primary mb-3">1. Datos del Cliente</h5>
      <div class="row mb-3">
        <div class="col"><input [(ngModel)]="nombre" class="form-control" placeholder="Nombre Completo"></div>
        <div class="col"><input [(ngModel)]="dni" class="form-control" placeholder="DNI"></div>
      </div>

      <h5 class="text-success mb-3 mt-3">2. Datos del Préstamo</h5>
      <div class="row mb-3">
        <div class="col">
          <label>Monto (S/.)</label>
          <input type="number" [(ngModel)]="monto" class="form-control">
        </div>
        <div class="col">
          <label>Tasa Anual (%)</label>
          <input type="number" [(ngModel)]="tasa" class="form-control">
        </div>
        <div class="col">
          <label>Plazo (Meses)</label>
          <input type="number" [(ngModel)]="meses" class="form-control">
        </div>
      </div>
      <button (click)="registrar()" class="btn btn-success btn-lg w-100">Aprobar y Guardar</button>
    </div>
  `
})
export class RegistroComponent {
  nombre = '';
  dni = '';
  monto = 5000;
  tasa = 15;
  meses = 12;

  constructor(private prestamoService: PrestamoService, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.dni) return alert('Complete los datos');

    const cronograma = this.prestamoService.generarCronograma(this.monto, this.tasa, this.meses);

    const nuevoCliente = {
      nombre: this.nombre,
      dni: this.dni,
      prestamo: {
        monto: this.monto,
        tasaAnual: this.tasa,
        meses: this.meses,
        cronograma: cronograma
      }
    };

    this.prestamoService.agregarCliente(nuevoCliente);
    alert('Cliente Registrado');
    this.router.navigate(['/clientes']); // Redirige a la tabla automáticamente
  }
}