import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var require: any;
const cytoscape = require('cytoscape');
const domNode = require('../assets/cytoscape-node-html-label');
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
            x: 100,
            y: 100,
          },

          selected: false, // whether the element is selected (default false)

          selectable: true, // whether the selection state is mutable (default true)

          locked: false, // when locked a node's position is immutable (default false)

          grabbable: true, // whether the node can be grabbed and moved by the user

          pannable: false, // whether dragging the node causes panning instead of grabbing

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
          renderedPosition: { x: 200, y: 200 }, // can alternatively specify position in rendered on-screen pixels
        },

        {
          // node n3
          data: { id: 'n3', parent: 'nparent' },
          position: { x: 123, y: 234 },
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
      ],
    });
    this.cy.nodeHtmlLabel([
      {
        query: 'edge', // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: '', // any classes will be as attribute of <div> container for every title,
        edgehtmlLocation: 'start', //location on edge to render html. Can be 'start','end','center'. 'center' will be default
        edgehtmlTiltPoint1: 'sourceNode', // first point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        edgehtmlTiltPoint2: 'targetNode', // second point to get angle of tilt for html.Can be 'sourceNode','targetNode', control point (i.e 0,1,2...)
        tpl(data: any) {
          return '<div>this is div</div>';
          // your html template here
        },
      },
    ]);
  }
}
