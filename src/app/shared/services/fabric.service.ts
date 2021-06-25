
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

import { fabric } from 'fabric';

@Injectable({ providedIn: 'root' })
export class FabricService {
  public strokeWidth: number;
  public strokeColor: string;
  private storage?: StorageService;
  private _canvas?: fabric.Canvas;

  constructor(private storageService: StorageService) {
    this.strokeWidth = 2;
    this.strokeColor = '#000000';
    this.storage = storageService;
  }

  public set canvas(surface: fabric.Canvas) {
    if (surface !== undefined && surface != null && surface instanceof fabric.Canvas) {
      this._canvas = surface;
    }
  }

  public clear(): void {
    if (this._canvas) {
      this._canvas.clear();
      this.storage?.updateDrawing(JSON.stringify(this._canvas.toJSON()));
    }
  }
  public mouseDown(evt: fabric.IEvent) {
    if (this._canvas) {
      this._canvas.renderAll();
      this.storage?.updateDrawing(JSON.stringify(this._canvas.toJSON()));
    }
  }

  public changeBrush(size: number) {
    if (this._canvas) {
      this._canvas.freeDrawingBrush.width = size;
    }
  }
  public changeColor(color: string) {
    if (this._canvas) {
      this._canvas.freeDrawingBrush.color = color;
    }
  }
  k
  public eraser() {
    if (this._canvas) {
      this._canvas.freeDrawingBrush.color = "white";
    }
  }
  public init() {
    this.storage?.getDrawing()
      .then(result => {
        result.data() ?
          this._canvas?.loadFromJSON(JSON.parse(result.data()?.drawing as string), () => this._canvas?.renderAll()) : null;
      });
  }
}