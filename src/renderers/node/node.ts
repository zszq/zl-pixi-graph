import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';

import Icon_yz from '@/images/yz.png';
import Icon_bz from '@/images/bz.jpeg';

const nodeCache = new Map();

export function createNode(nodeKey: string, attributes: any) {
  let attr = Object.assign({}, attributes);

  const circle = new Graphics();
  circle.beginFill(0xffffff);
  // circle.lineStyle(5, 0x00ff00, 1);
  // circle.lineTextureStyle({ width: 5, color: '#ff3300' });
  circle.drawCircle(0, 0, 30);
  circle.endFill();
  circle.position = { x: attr.x, y: attr.y };

  const texture = Texture.from(Icon_yz);
  const image = new Sprite(texture);
  image.anchor.set(0.5);
  image.scale.x = (image.width / 10) * image.width;
  image.scale.y = (image.height / 10) * image.height;
  image.position = { x: attr.x, y: attr.y };

  const border = new Graphics();
  border.beginFill(0x00ff00);
  // border.lineStyle(5, 0x00ff00);
  border.drawCircle(0, 0, 35);
  border.endFill();
  border.position = { x: attr.x, y: attr.y };

  const nodeCircle = new Sprite();
  nodeCircle.anchor.set(0.5);
  // nodeCircle.texture = texture;
  nodeCircle.addChild(border);
  nodeCircle.addChild(circle);
  nodeCircle.addChild(image);

  nodeCircle.eventMode = 'static';
  nodeCircle.cursor = 'pointer';
  nodeCircle.on('click', () => {
    image.texture = Texture.from(Icon_bz);
  });
  nodeCircle.on('mouseover', () => {
    border.clear().beginFill(0xff3300).drawCircle(0, 0, 35);
  });
  nodeCircle.on('mouseout', () => {
    border.clear().beginFill(0x00ff00).drawCircle(0, 0, 35);
    image.texture = Texture.from(Icon_yz);
  });

  nodeCache.set('nodeKey', nodeCircle);

  return nodeCircle;
}

export function updateNode() {}
