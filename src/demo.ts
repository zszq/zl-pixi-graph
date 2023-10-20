import { PixiGraph } from './graph';
import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import dataJson from './data/data1000-3000.json';

window.onload = () => {
  const container = document.querySelector('#graph') as HTMLElement;
  const graph = new Graph({
    multi: true,
    type: 'undirected'
  });

  addData();
  function addData() {
    console.log('data', dataJson);
    const { nodes, links } = dataJson;

    nodes.forEach(node => {
      graph.addNode(node.id, { ...node });
    });
    links.forEach(link => {
      if (!graph.hasEdge(`${link.source}->${link.target}`)) {
        graph.addEdgeWithKey(`${link.source}->${link.target}`, link.source, link.target, { ...link });
      }
    });

    graph.forEachNode(node => {
      graph.setNodeAttribute(node, 'x', Math.random());
      graph.setNodeAttribute(node, 'y', Math.random());
    });
    console.time('compute-time');
    forceAtlas2.assign(graph, { iterations: 300, settings: { ...forceAtlas2.inferSettings(graph), scalingRatio: 500 } });
    console.timeEnd('compute-time');
  }

  const IPixiGraph = new PixiGraph({
    graph,
    container
  });
  console.log('IPixiGraph', IPixiGraph);
};
