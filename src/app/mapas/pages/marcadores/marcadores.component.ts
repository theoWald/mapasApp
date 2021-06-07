import { ViewChild, ElementRef, Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ 2.143742860076139, 41.39697204509331 ];

  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const marker = new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

  }

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    // console.log(color);

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat (this.center)
      .addTo( this.mapa );

    this.marcadores.push({
      color: color,
      marker: nuevoMarcador
    });
  }

  irMarcador(marcador: mapboxgl.Marker) {
    // const {lng, lat} = marcador.getLngLat();
    // this.mapa.flyTo({
    //   center: [lng, lat]
    // });
    this.mapa.flyTo({
        center: marcador.getLngLat()
    });
  }

  guardarMarcadoresLocalStorage() {

  }

  leerLocalStorage(){
    
  }

}
