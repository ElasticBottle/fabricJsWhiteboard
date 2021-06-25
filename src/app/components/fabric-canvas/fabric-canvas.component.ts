import { AfterContentInit, AfterViewInit, Component, Input, NgZone } from '@angular/core';
import { fabric } from 'fabric';
import { FabricService } from 'src/app/shared/services/fabric.service';

@Component({
  selector: 'app-fabric-canvas',
  templateUrl: './fabric-canvas.component.html',
  styleUrls: ['./fabric-canvas.component.css'],
})
export class FabricCanvasComponent {
  canvas?: fabric.Canvas;

  constructor(private fabricService: FabricService, private _zone: NgZone) {
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {
      const outerCanvasContainer = document.getElementById('canvas-wrapper');
      this.canvas = new fabric.Canvas('canvas', {
        selection: true,
        preserveObjectStacking: true,
        isDrawingMode: true,
        width: outerCanvasContainer?.clientWidth,
        height: 500
      });
      this.fabricService.canvas = this.canvas;
      this.canvas.on('mouse:up', e => this._zone.run(() => this.fabricService.mouseDown(e)));
    });
  }

  ngAfterViewInit(): void {
    this.fabricService.init()
  }

  public onResize() {
    const outerCanvasContainer = document.getElementById('canvas-wrapper');
    const ratio = (this.canvas?.width ?? 0) / (this.canvas?.getHeight() ?? 1);
    const containerWidth = outerCanvasContainer?.clientWidth ?? 0;
    const scale = containerWidth / (this.canvas?.getWidth() ?? 1);
    const zoom = (this.canvas?.getZoom() ?? 0) * scale;
    this.canvas?.setDimensions({ width: containerWidth, height: containerWidth / ratio });
    this.canvas?.setViewportTransform([zoom, 0, 0, zoom, 0, 0, 0]);
    this.canvas?.renderAll();
  }

  public changeBrushSize(e: any) {
    this._zone.run(() => this.fabricService.changeBrush(e.target.value));
  }
  public erase() {
    this._zone.run(() => this.fabricService.eraser());
  }
  public clear() {
    this._zone.run(() => this.fabricService.clear());
  }
  public changeColor(color: string) {
    console.log('color :>> ', color);
    this._zone.run(() => this.fabricService.changeColor(color));
  }
}
