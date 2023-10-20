import type { Point } from '@pixi/core';

type Attributes = { [name: string]: any };

type DisplayData = {
  label: string | null;
  size: number;
  color: string;
  hidden: boolean;
  forceLabel: boolean;
  zIndex: number;
};

export interface NodeDisplayData extends Point, DisplayData {
  highlighted: boolean;
}

export interface EdgeDisplayData extends Point, DisplayData {
  highlighted: boolean;
}

export interface Settings {
  nodeReducer: null | ((node: string, data: Attributes) => Partial<NodeDisplayData>);
  edgeReducer: null | ((edge: string, data: Attributes) => Partial<EdgeDisplayData>);
}
