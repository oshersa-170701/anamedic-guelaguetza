import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { gift, chevronBack, chevronForward } from 'ionicons/icons';

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CatalogPage implements OnInit, OnDestroy {

  public currentIndex: number = 0;
  private autoSlideTimer: any = null;
  private returnToIdleTimer: any = null;
  
  private readonly SLIDE_INTERVAL = 4000; // Cambia de tarjeta cada 4 segundos
  private readonly IDLE_TIMEOUT = 60000; // Tiempo total en el catálogo antes de volver fuertemente al inicio (Ej. 60 segundos o cámbialo a minutos)

  public products: ProductItem[] = [
    {
      id: 1,
      name: 'Tote Bag Perrito Guelaguetza',
      price: 150,
      image: 'assets/img/BOLSA 1.png',
      tag: '¡MÁS VENDIDO!'
    },
    {
      id: 2,
      name: 'Tote Bag Penca de Maguey',
      price: 150,
      image: 'assets/img/BOLSA 2.png'
    },
    {
      id: 3,
      name: 'Tote Bag Bailaria Folclórica',
      price: 150,
      image: 'assets/img/BOLSA 3.png'
    },
    {
      id: 4,
      name: 'Tote Bag Mujer Istmeña',
      price: 150,
      image: 'assets/img/BOLSA 4.png',
      tag: 'EDICIÓN ESPECIAL'
    },
    {
      id: 5,
      name: 'Tazas de Cerámica Guelaguetza',
      price: 50,
      image: 'assets/img/TASA 4.png',
      tag: 'VARIOS DISEÑOS!'
    },
    {
      id: 6,
      name: 'Taza de Cerámica Tiliche',
      price: 50,
      image: 'assets/img/TASA 3.png'
    },
    {
      id: 7,
      name: 'Taza de Cerámica Monte Albán',
      price: 50,
      image: 'assets/img/TASA 2.png'
    },
    {
      id: 8,
      name: 'Taza de Cerámica Bailarines Folclóricos',
      price: 50,
      image: 'assets/img/TASA 1.png'
    }
  ];

  constructor(private router: Router) {
    addIcons({ gift, chevronBack, chevronForward });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.currentIndex = 0; // Inicia siempre en el primer producto
    this.startAutoSlide();
    this.startReturnToIdleTimer();
  }

  ionViewWillLeave() {
    this.stopAllTimers();
  }

  ngOnDestroy() {
    this.stopAllTimers();
  }

  startAutoSlide() {
    this.stopAutoSlideTimer();
    this.autoSlideTimer = setInterval(() => {
      this.nextProductAutomatic();
    }, this.SLIDE_INTERVAL);
  }

  stopAutoSlideTimer() {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
      this.autoSlideTimer = null;
    }
  }

  /**
   * Temporizador estricto para regresar a la pantalla de inicio (Idle)
   */
  startReturnToIdleTimer() {
    this.stopReturnToIdleTimer();
    this.returnToIdleTimer = setTimeout(() => {
      this.router.navigate(['/idle']);
    }, this.IDLE_TIMEOUT);
  }

  stopReturnToIdleTimer() {
    if (this.returnToIdleTimer) {
      clearTimeout(this.returnToIdleTimer);
      this.returnToIdleTimer = null;
    }
  }

  stopAllTimers() {
    this.stopAutoSlideTimer();
    this.stopReturnToIdleTimer();
  }

  // Rotación automática de las tarjetas sin resetear el tiempo límite de salida
  nextProductAutomatic() {
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  // Interacción manual por botones (adelante)
  nextProduct() {
    this.stopAutoSlideTimer();
    if (this.currentIndex < this.products.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.startAutoSlide();
  }

  // Interacción manual por botones (atrás)
  prevProduct() {
    this.stopAutoSlideTimer();
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.products.length - 1;
    }
    this.startAutoSlide();
  }

  goToProduct(index: number) {
    this.stopAutoSlideTimer();
    this.currentIndex = index;
    this.startAutoSlide();
  }
}