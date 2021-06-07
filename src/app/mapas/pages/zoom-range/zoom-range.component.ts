import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width: 400px;
      }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;

  constructor() { 
    // console.log('constructor', this.divMapa);
  }

  ngAfterViewInit(): void {

    // console.log('ngAfterViewInit', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ 2.143742860076139, 41.39697204509331 ],
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', (ev) => {
      // console.log('zoom');
      // console.log(ev);
      // const zoomActual = this.mapa.getZoom();
      // console.log(zoomActual);
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });
    
  }

  zoomOut(){
    // console.log('zoom out');
    this.mapa.zoomOut();
    // console.log('zoomOut', this.divMapa);
    //this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn(){
    // console.log('zoom in');
    this.mapa.zoomIn();
    //this.zoomLevel = this.mapa.getZoom();
  }

  zoomCambio( valor: string){
    //console.log(valor);
    this.mapa.zoomTo( Number(valor) );
  }

}
