import { Application } from '@pixi/app';
import { Container } from '@pixi/display';
import type { Point, IPointData } from '@pixi/core';
import { Cull } from '@pixi-essentials/cull';
import { TypedEmitter } from 'tiny-typed-emitter2';
import { Viewport } from 'pixi-viewport';
import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';
import type { PixiGraphOptions, PixiGraphEvents } from './types/PixiGraph';

import '@pixi/events';
import '@pixi/extract';

import Icon from '@/images/yz.png';
import { createNode } from './renderers/node/node';
import { createEdge, createEdgeGfx } from './renderers/edge/edge';

export class PixiGraph extends TypedEmitter<PixiGraphEvents> {
  container: HTMLElement;
  graph: PixiGraphOptions['graph'];

  private app: Application;
  private viewport: Viewport;
  private cull: Cull;
  cullDirty: boolean;
  private nodeLayer: Container;
  private nodeLabelLayer: Container;
  private edgeLayer: Container;
  private edgeLabelLayer: Container;
  // private edgeArrowLayer: Container;

  constructor(options: PixiGraphOptions) {
    super();

    this.graph = options.graph;
    console.log('graph', this.graph);
    this.container = options.container;

    if (!(this.container instanceof HTMLElement)) {
      throw new Error('container should be a HTMLElement');
    }

    // create PIXI application
    this.app = new Application({
      resizeTo: this.container,
      resolution: window.devicePixelRatio,
      backgroundAlpha: 0,
      antialias: true,
      autoDensity: true,
      powerPreference: 'high-performance'
      // autoStart: false
    });
    this.container.appendChild(this.app.view as HTMLCanvasElement);
    console.log('pixi-app', this.app);

    (globalThis as any).__PIXI_APP__ = this.app; // PixiJS Devtools

    // create PIXI viewport
    this.viewport = new Viewport({
      screenWidth: this.container.clientWidth,
      screenHeight: this.container.clientHeight,
      worldWidth: this.container.clientWidth,
      worldHeight: this.container.clientHeight,
      events: this.app.renderer.events,
      disableOnContextMenu: true,
      passiveWheel: false
      // stopPropagation: true
    })
      .drag({
        mouseButtons: 'left',
        keyToPress: null
      })
      .pinch()
      .wheel();
    // .clampZoom({ minScale: 0.1, maxScale: 1.5 });
    // .decelerate();
    console.log('pixi-viewport', this.viewport);
    this.app.stage.addChild(this.viewport);

    // create cull
    this.cull = new Cull({
      // recursive: false,
      // toggle: 'renderable' // visible or renderable
    }).addAll(this.viewport.children);

    this.cullDirty = false;
    this.viewport.on('frame-end', e => {
      // console.log('frame-end', this.viewport.dirty);
      if (this.viewport.dirty || this.cullDirty) {
        this.cull.cull(this.app.renderer.screen);

        this.viewport.dirty = false;
        this.cullDirty = false;
        // this.app.start();
      }
      // else {
      //   this.app.stop();
      // }
    });

    this.nodeLayer = new Container();
    this.nodeLabelLayer = new Container();
    this.edgeLayer = new Container();
    this.edgeLabelLayer = new Container();
    // this.edgeArrowLayer = new Container();

    const circle = new Graphics();
    circle.beginFill(0xffffff);
    // circle.lineStyle(5, 0x00ff00, 1);
    circle.drawCircle(0, 0, 30);
    circle.endFill();
    circle.position = { x: 500, y: 500 };
    // console.log('circle', circle);

    const texture = Texture.from(Icon);
    const image = new Sprite(texture);
    image.anchor.set(0.5);
    image.scale.x = (image.width / 10) * image.width;
    image.scale.y = (image.height / 10) * image.height;
    circle.addChild(image);

    this.nodeLayer.addChild(circle);
    this.viewport.addChild(this.edgeLayer);
    this.viewport.addChild(this.nodeLayer);

    this.process();

    // this.culling();
  }

  private process() {
    this.graph.forEachNode((nodeKey, attributes) => {
      let node = createNode(nodeKey, attributes, this.viewport);
      this.nodeLayer.addChild(node);
    });

    this.graph.forEachEdge((edgeKey, attributes) => {
      // console.log(edgeKey, attributes);
      const sourceNodeKey = this.graph.source(edgeKey);
      const targetNodeKey = this.graph.target(edgeKey);
      const sourceNodeAttributes = this.graph.getNodeAttributes(sourceNodeKey);
      const targetNodeAttributes = this.graph.getNodeAttributes(targetNodeKey);
      const sourceNodePosition = { x: sourceNodeAttributes.x, y: sourceNodeAttributes.y };
      const targetNodePosition = { x: targetNodeAttributes.x, y: targetNodeAttributes.y };

      let edge = createEdge(edgeKey, attributes, sourceNodePosition, targetNodePosition);
      // let edge = createEdgeGfx(edgeKey, attributes, sourceNodePosition, targetNodePosition);
      // this.edgeLayer.addChild(edge);
    });
  }

  // 剔除
  culling() {
    this.cull.addAll((this.viewport.children as Container[]).map(layer => layer.children).flat());
    this.cull.cull(this.app.renderer.screen);
  }
}
