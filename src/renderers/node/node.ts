import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';
import { Container } from '@pixi/display';
import { TypedEmitter } from 'tiny-typed-emitter2';
import type { Viewport } from 'pixi-viewport';

import Icon_yz from '@/images/yz.png';
import Icon_bz from '@/images/bz.jpeg';

// interface PixiNodeEvents {
//   mousemove: (event: MouseEvent) => void;
//   mouseover: (event: MouseEvent) => void;
//   mouseout: (event: MouseEvent) => void;
//   mousedown: (event: MouseEvent) => void;
//   mouseup: (event: MouseEvent) => void;
//   rightclick: (event: MouseEvent) => void;
//   click: (event: MouseEvent) => void;
//   dbclick: (event: MouseEvent) => void;
// }
// interface PixiNodeOptions {
//   nodeKey: string;
//   attributes: any;
//   viewport: Viewport;
// }

// export class PixiNode extends TypedEmitter<PixiNodeEvents> {
//   private nodeCache = new Map<string, PixiNode>();

//   constructor(options: PixiNodeOptions) {
//     super();
//   }
// }

const nodeCache = new Map();
let currentNode: Sprite | Container | null = null;

export function createNode(nodeKey: string, attributes: any, viewport: Viewport) {
  let attr = Object.assign({}, attributes);

  const circle = new Graphics();
  circle.beginFill(0xffffff);
  // circle.lineStyle(5, 0x00ff00, 1);
  // circle.lineTextureStyle({ width: 5, color: '#ff3300' });
  circle.drawCircle(0, 0, 30);
  circle.endFill();
  // circle.position = { x: attr.x, y: attr.y };

  const texture = Texture.from(Icon_yz);
  const image = new Sprite(texture);
  image.anchor.set(0.5);
  image.scale.x = (image.width / 10) * image.width;
  image.scale.y = (image.height / 10) * image.height;
  // image.position = { x: attr.x, y: attr.y };

  const border = new Graphics();
  border.beginFill(0x00ff00);
  // border.lineStyle(5, 0x00ff00);
  border.drawCircle(0, 0, 35);
  border.endFill();
  // border.position = { x: attr.x, y: attr.y };

  const nodeCircle = new Container();
  // nodeCircle.anchor.set(0.5);
  // nodeCircle.texture = texture;
  nodeCircle.position = { x: attr.x, y: attr.y };
  nodeCircle.addChild(border);
  nodeCircle.addChild(circle);
  nodeCircle.addChild(image);

  nodeCircle.eventMode = 'static';
  nodeCircle.cursor = 'pointer';
  nodeCircle.on('click', () => {
    image.texture = Texture.from(Icon_bz);
    // image.texture = Texture.from('https://pixijs.com/assets/bunny.png');
    border.clear().beginFill(0xff3300).drawCircle(0, 0, 35);
  });
  nodeCircle.on('mouseover', () => {
    // border.clear().beginFill(0xff3300).drawCircle(0, 0, 35);
  });
  nodeCircle.on('mouseout', () => {
    image.texture = Texture.from(Icon_yz);
  });

  nodeCircle.on('mousedown', () => {
    currentNode = nodeCircle;
    viewport.pause = true;
  });
  nodeCircle.on('mouseup', () => {
    currentNode = null;
    viewport.pause = false;
  });
  nodeCircle.on('globalmousemove', e => {
    if (currentNode) {
      currentNode.position = viewport.toWorld(e.x, e.y);
    }
  });

  nodeCache.set(nodeKey, nodeCircle);

  return nodeCircle;
}

export function updateNode() {}
