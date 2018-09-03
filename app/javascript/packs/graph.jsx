import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// See react-d3-graph docs at https://goodguydaniel.com/react-d3-graph/docs/index.html
import { Graph as D3Graph } from 'react-d3-graph';

class Graph extends React.Component {
  static CONFIG = {
      linkHighlightBehavior: true,
      width: 900,
      height: 600,
      node: {
          color: 'yellow',
          size: 120,
          highlightStrokeColor: 'blue'
      },
      link: {
          highlightColor: '#efefef'
      }
  }

  constructor(props) {
      super(props);
      this.props = props;

      this.state = {
          inspector: {
              source: undefined,
              target: undefined,
              topics: []
          },
          data: {
              nodes: [{ id: 'Harry' }, { id: 'Sally' }, { id: 'Alice' }],
              links: [{ source: 'Harry', target: 'Sally' }, { source: 'Harry', target: 'Alice' }]
          }
      }
  }

  onClickNode = (nodeId) => {};

  onMouseOverNode = (nodeId) => {};

  onMouseOutNode = (nodeId) => {};

  onClickLink = (source, target) => {};

  onMouseOverLink = (source, target) => {
      this.setState({inspector: { topics: "Cheese and Wine", source: source, target: target }})
  };

  onMouseOutLink = (source, target) => {};

  renderInspector = () => {
      const {source, target, topics} = this.state.inspector;

      if (source && target) {
          return <p>{source} and {target} chatted about {topics}</p>
      } else {
          return <p>Hover your cursor over a connection line.</p>
      }
  }

  render() {
      return (
          <div className="graph-container">
            <div className="graph-inspector">
              {this.renderInspector()}
            </div>
            <D3Graph
                id="graph"
                data={this.state.data}
                config={Graph.CONFIG}
                onClickNode={this.onClickNode}
                onClickLink={this.onClickLink}
                onMouseOverNode={this.onMouseOverNode}
                onMouseOutNode={this.onMouseOutNode}
                onMouseOverLink={this.onMouseOverLink}
                onMouseOutLink={this.onMouseOutLink}
            />
          </div>
      );
  }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Graph name="React" data={SNAPSHOT_DATA} />,
        document.getElementById('layout-wrapper').appendChild(document.createElement('div')),
    )
})
