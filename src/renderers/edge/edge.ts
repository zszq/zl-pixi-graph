import { Graphics } from '@pixi/graphics';
import { Sprite } from '@pixi/sprite';
import { Texture, BatchRenderer } from '@pixi/core';
import { Container } from '@pixi/display';
import type { IPointData } from '@pixi/core';

const nodeCache = new Map();

export function createEdge(edgeKey: string, attributes: any, sourceNodePosition: IPointData, targetNodePosition: IPointData) {
  // edge
  const edgeLine = new Sprite(Texture.WHITE);
  edgeLine.anchor.set(0.5);

  // const rotation = -Math.atan2(targetNodePosition.x - sourceNodePosition.x, targetNodePosition.y - sourceNodePosition.y);
  // const st_length = Math.hypot(targetNodePosition.x - sourceNodePosition.x, targetNodePosition.y - sourceNodePosition.y);
  // const line_length = st_length - (Math.sqrt(3) / 2) * 5 - 5 - 5 - 5 - 5;
  // const line_length_half = line_length / 2 + 5 + (Math.sqrt(3) / 2) * 5 + 5;
  // const centerPosition = { x: targetNodePosition.x + Math.sin(rotation) * line_length_half, y: targetNodePosition.y - Math.cos(rotation) * line_length_half };

  edgeLine.tint = '#ccc';
  edgeLine.alpha = 1;
  // 计算中心点
  let position = { x: (sourceNodePosition.x + targetNodePosition.x) / 2, y: (sourceNodePosition.y + targetNodePosition.y) / 2 };
  edgeLine.position.copyFrom(position);
  // 计算角度（弧度值）
  const angleRadians = -Math.atan2(targetNodePosition.x - sourceNodePosition.x, targetNodePosition.y - sourceNodePosition.y);
  edgeLine.rotation = angleRadians;
  // 计算距离
  const distance = Math.sqrt(Math.pow(targetNodePosition.x - sourceNodePosition.x, 2) + Math.pow(targetNodePosition.y - sourceNodePosition.y, 2));
  edgeLine.height = distance;

  edgeLine.eventMode = 'static';
  edgeLine.cursor = 'pointer';
  edgeLine.on('mouseover', () => {
    edgeLine.tint = '#ff3300';
  });
  edgeLine.on('mouseout', () => {
    edgeLine.tint = '#ccc';
  });

  nodeCache.set(edgeKey, edgeLine);

  return edgeLine;
}

export function createEdgeGfx(edgeKey: string, attributes: any, sourceNodePosition: IPointData, targetNodePosition: IPointData) {
  const line = new Graphics();
  line.lineStyle(2, 0x0000ff, 1);
  line.moveTo(sourceNodePosition.x, sourceNodePosition.y);
  line.lineTo(targetNodePosition.x, targetNodePosition.y);
  // line.endFill();

  const edgeLine = new Container();
  // edgeLine.anchor.set(0.5);
  edgeLine.addChild(line);

  edgeLine.eventMode = 'static';
  edgeLine.cursor = 'pointer';
  edgeLine.on('mouseover', e => {
    console.log('mouseover', e);
    line.clear().lineStyle(2, 0xff3300, 1).moveTo(sourceNodePosition.x, sourceNodePosition.y).lineTo(targetNodePosition.x, targetNodePosition.y);
  });
  edgeLine.on('mouseout', () => {
    line.clear().lineStyle(2, 0x0000ff, 1).moveTo(sourceNodePosition.x, sourceNodePosition.y).lineTo(targetNodePosition.x, targetNodePosition.y);
  });

  nodeCache.set(edgeKey, edgeLine);

  return edgeLine;
}
