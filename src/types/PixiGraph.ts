import type { IPointData } from '@pixi/core';
import type Graph from 'graphology';

export interface PixiGraphOptions {
  graph: Graph;
  container: HTMLElement;
  // nodeReducer: null | ((node: string, data: Attributes) => Partial<NodeDisplayData>);
}

export interface PixiGraphEvents {
  nodeMousemove: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeMouseover: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeMouseout: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeMousedown: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeMouseup: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeClick: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeDbclick: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeRightclick: (event: MouseEvent, nodeKey: string, nodeData: Partial<{}>) => void;
  nodeMoveStart: (event: MouseEvent, nodeKey: string, point: IPointData) => void;
  nodeMove: (event: MouseEvent, nodeKey: string, point: IPointData) => void;
  nodeMoveEnd: (event: MouseEvent, nodeKey: string, point: IPointData) => void;

  edgeClick: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;
  edgeMousemove: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;
  edgeMouseover: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;
  edgeMouseout: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;
  edgeMousedown: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;
  edgeMouseup: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;
  edgeRightclick: (event: MouseEvent, edgeKey: string, edgeData: Partial<{}>) => void;

  viewportClick: (event: MouseEvent) => void;
  viewportRightClick: (event: MouseEvent) => void;
}
