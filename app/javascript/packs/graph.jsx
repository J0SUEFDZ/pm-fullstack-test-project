import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// See react-d3-graph docs at https://goodguydaniel.com/react-d3-graph/docs/index.html
import { Graph as D3Graph } from "react-d3-graph";

const D3_GRAPH_CONFIG = {
  linkHighlightBehavior: true,
  width: 900,
  height: 600,
  node: {
    color: "yellow",
    size: 120,
    highlightStrokeColor: "blue"
  },
  link: {
    highlightColor: "#efefef"
  }
};

const Inspector = ({ source, target, topics }) => (
  <p>
    {source && target ? (
      `${source} and ${target} chatted about ${topics}`
    ) : (
      <em>Hover your cursor over a connection line</em>
    )}
  </p>
);

Inspector.propTypes = {
  source: PropTypes.string,
  target: PropTypes.string,
  topics: PropTypes.string
};

const NodeShape = PropTypes.shape({
  id: PropTypes.string.isRequired
});

const LinkShape = PropTypes.shape({
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired
});

const SnaphotShape = PropTypes.shape({
  nodes: PropTypes.arrayOf(NodeShape).isRequired,
  links: PropTypes.arrayOf(LinkShape).isRequired
});

class Graph extends React.Component {
  static propTypes = {
    snapshot: SnaphotShape.isRequired
  };

  state = {
    currentSource: undefined,
    currentTarget: undefined
  };

  handleClickNode = nodeId => {};

  handleMouseOverNode = nodeId => {};

  handleMouseOutNode = nodeId => {};

  handleClickLink = (source, target) => {};

  handleMouseOverLink = (source, target) => {
    this.setState({
      currentSource: source,
      currentTarget: target
    });
  };

  handleMouseOutLink = (source, target) => {
    this.setState({
      currentSource: undefined,
      currentTarget: undefined
    });
  };

  render() {
    const { snapshot } = this.props;
    const { currentSource, currentTarget } = this.state;

    const topics = "Cheese and Wine"; // FIXME

    return (
      <div>
        <div>
          <Inspector
            source={currentSource}
            target={currentTarget}
            topics={topics}
          />
        </div>
        <D3Graph
          id="graph"
          data={snapshot}
          config={D3_GRAPH_CONFIG}
          onClickNode={this.handleClickNode}
          onClickLink={this.handleClickLink}
          onMouseOverNode={this.handleMouseOverNode}
          onMouseOutNode={this.handleMouseOutNode}
          onMouseOverLink={this.handleMouseOverLink}
          onMouseOutLink={this.handleMouseOutLink}
        />
      </div>
    );
  }
}

const DUMMY_SNAPSHOT = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
  links: [
    { source: "Harry", target: "Sally" },
    { source: "Harry", target: "Alice" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Graph snapshot={SNAPSHOT_DATA || DUMMY_SNAPSHOT} />,
    document
      .getElementById("layout-wrapper")
      .appendChild(document.createElement("div"))
  );
});
