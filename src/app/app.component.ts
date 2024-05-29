import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var require: any;
const cytoscape = require('cytoscape');
const domNode = require('cytoscape-node-edge-html-label');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  component: any;
  @ViewChild('cy') cyRef: ElementRef | undefined;
  cy: any;
  constructor() {}

  ngOnInit(): void {
    cytoscape.use(domNode);
    this.cy = cytoscape({
      container: document.getElementById('cy'),

      elements: [
        // flat array of nodes and edges
        {
          // node n1
          group: 'nodes', // 'nodes' for a node, 'edges' for an edge
          // NB the group field can be automatically inferred for you but specifying it
          // gives you nice debug messages if you mis-init elements

          data: {
            // element data (put json serialisable dev data here)
            id: 'n1', // mandatory (string) id for each element, assigned automatically on undefined
            parent: 'nparent', // indicates the compound node parent id; not defined => no parent
            // (`parent` can be effectively changed by `eles.move()`)
          },

          // scratchpad data (usually temp or nonserialisable data)
          scratch: {
            _foo: 'bar', // app fields prefixed by underscore; extension fields unprefixed
          },

          position: {
            // the model position of the node (optional on init, mandatory after)
            x: 0,
            y: 0,
          },
          classes: ['foo', 'bar'], // an array (or a space separated string) of class names that the element has

          // DO NOT USE THE `style` FIELD UNLESS ABSOLUTELY NECESSARY
          // USE THE STYLESHEET INSTEAD
          style: {
            // style property overrides
            'background-color': 'red',
          },
        },

        {
          // node n2
          data: { id: 'n2' },
          renderedPosition: { x: 400, y: 400 }, // can alternatively specify position in rendered on-screen pixels
        },

        {
          // node n3
          data: { id: 'n3', parent: 'nparent' },
          position: { x: -123, y: 134 },
        },

        {
          // node n2
          data: { id: 'n4' },
          renderedPosition: { x: 600, y: 600 }, // can alternatively specify position in rendered on-screen pixels
        },

        {
          // node nparent
          data: { id: 'nparent' },
        },

        {
          // edge e1
          data: {
            id: 'e1',
            // inferred as an edge because `source` and `target` are specified:
            source: 'n1', // the source node id (edge comes from this node)
            target: 'n2', // the target node id (edge goes to this node)
            // (`source` and `target` can be effectively changed by `eles.move()`)
          },

          pannable: true, // whether dragging on the edge causes panning
        },
        {
          // edge e2
          data: {
            id: 'e2',
            // inferred as an edge because `source` and `target` are specified:
            source: 'n2', // the source node id (edge comes from this node)
            target: 'n4', // the target node id (edge goes to this node)
            // (`source` and `target` can be effectively changed by `eles.move()`)
          },
        },
      ],

      layout: {
        name: 'preset',
      },

      // so we can see the ids
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(id)',
          },
        },
        {
          selector: 'edge',
          style: {},
        },
        {
          selector: '#e2',
          style: {
            'curve-style': 'unbundled-bezier',
            'control-point-weights': '0.25 0.5 0.75',
            'control-point-distances': '-50 0 50',
          },
        },
      ],
    });

    this.cy.nodeHtmlLabel([
      {
        query: '#e1', // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: '', // any classes will be as attribute of <div> container for every title,
        edgehtmlLocation: 'center', //location on edge to render html. Can be 'start','end','center'. 'center' will be default
        edgehtmlTiltPoint1: 'sourceNode', // first point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        edgehtmlTiltPoint2: 'targetNode', // second point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        tpl(data: any) {
          return `<div style='background:greenyellow;color:red;width:100px'> click and check console <button onclick="console.log(
            'button clicked'
          )">click</button></div>`;
          // your html template here
        },
      },
      {
        query: '#e2', // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: '', // any classes will be as attribute of <div> container for every title,
        edgehtmlLocation: 'center', //location on edge to render html. Can be 'start','end','center'. 'center' will be default
        edgehtmlTiltPoint1: 0, // first point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        edgehtmlTiltPoint2: 2, // second point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        tpl(data: any) {
          return `<div > 
          <div style='color:yellow ;background:black; margin:5px'>Above Edge</div> 
          <div style='color:red ;background:black; margin:5px'>below Edge</div> 
          </div>`;
          // your html template here
        },
      },
      {
        query: 'node', // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: '', // any classes will be as attribute of <div> container for every title,
        edgehtmlLocation: 'center', //location on edge to render html. Can be 'start','end','center'. 'center' will be default
        edgehtmlTiltPoint1: 0, // first point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        edgehtmlTiltPoint2: 2, // second point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        tpl(data: any) {
          return `<div style='background:yellow'> 
          <em>this is </em>
          <div><strong>Node </strong><div>  
          </div>`;
          // your html template here
        },
      },
    ]);
  }
}
