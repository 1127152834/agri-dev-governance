(function () {
  const data = window.developmentLifecycleData;
  const viewportHelpers = window.developmentLifecycleViewport;
  const { Graph } = window.X6;

  const graphContainer = document.getElementById("blueprint-graph");
  const DEFAULT_MOUSEWHEEL_MAX_SCALE = 1.25;
  const detailElements = {
    title: document.getElementById("detail-title"),
    description: document.getElementById("detail-description"),
    role: document.getElementById("detail-role"),
    input: document.getElementById("detail-input"),
    output: document.getElementById("detail-output"),
    gate: document.getElementById("detail-gate"),
    skill: document.getElementById("detail-skill"),
    prompt: document.getElementById("detail-prompt")
  };
  const viewButtons = document.querySelectorAll(".view-button");

  const state = {
    selectedId: data.defaultNodeId,
    view: data.defaultView || "main"
  };

  const nodesById = new Map(data.nodes.map((node) => [node.id, node]));
  const mainEdges = [];
  const exceptionEdges = [];
  const mainNodes = new Map();
  const groupNodes = new Map();
  const viewportState = {
    fitScale: 1
  };

  document.getElementById("meta-version").textContent = data.meta.version;
  document.getElementById("meta-date").textContent = data.meta.date;
  document.getElementById("meta-scope").textContent = data.meta.scope;

  function updateLegend() {
    const legendRoot = document.getElementById("legend-list");
    legendRoot.innerHTML = "";
    data.legend.forEach((item) => {
      const wrapper = document.createElement("div");
      wrapper.className = "legend-item";
      wrapper.innerHTML = `
        <span class="legend-swatch" style="background:${item.color};"></span>
        <span>${item.label}</span>
      `;
      legendRoot.appendChild(wrapper);
    });
  }

  function updateDetails(nodeId) {
    const node = nodesById.get(nodeId);
    if (!node) return;
    detailElements.title.textContent = node.title;
    detailElements.description.textContent = node.description;
    detailElements.role.textContent = node.role;
    detailElements.input.textContent = node.input;
    detailElements.output.textContent = node.output;
    detailElements.gate.textContent = node.gate;
    detailElements.skill.textContent = node.skill || "未定义";
    detailElements.prompt.textContent = node.prompt || "暂无参考提示词";
  }

  function isExceptionVisible() {
    return state.view === "all";
  }

  function isNodeVisible(node) {
    return isExceptionVisible() || node.layer !== "exception";
  }

  function getNodeVisual(node) {
    if (node.kind === "start") {
      return {
        fill: "rgba(34, 211, 238, 0.18)",
        stroke: "rgba(34, 211, 238, 0.96)",
        labelColor: "#ecfeff"
      };
    }

    if (node.kind === "focus") {
      return {
        fill: "rgba(34, 211, 238, 0.1)",
        stroke: "rgba(34, 211, 238, 0.8)",
        labelColor: "#e0fbff"
      };
    }

    if (node.kind === "gate") {
      return {
        fill: "rgba(148, 163, 184, 0.1)",
        stroke: "rgba(191, 219, 254, 0.86)",
        labelColor: "#f8fbff"
      };
    }

    if (node.kind === "support") {
      return {
        fill: "rgba(56, 189, 248, 0.06)",
        stroke: "rgba(125, 211, 252, 0.72)",
        labelColor: "#e0f2fe"
      };
    }

    if (node.type === "danger") {
      return {
        fill: "rgba(249, 115, 22, 0.08)",
        stroke: "rgba(249, 115, 22, 0.72)",
        labelColor: "#ffd8b4"
      };
    }

    if (node.type === "done") {
      return {
        fill: "rgba(52, 211, 153, 0.12)",
        stroke: "rgba(52, 211, 153, 0.85)",
        labelColor: "#d1fae5"
      };
    }

    return {
      fill: "rgba(255, 255, 255, 0.05)",
      stroke: "rgba(255, 255, 255, 0.84)",
      labelColor: "#f8fbff"
    };
  }

  function createGraph() {
    return new Graph({
      container: graphContainer,
      width: graphContainer.clientWidth || 1200,
      height: viewportHelpers.resolveViewportHeight(isExceptionVisible()),
      panning: {
        enabled: true,
        modifiers: null
      },
      mousewheel: {
        enabled: true,
        minScale: 0.75,
        maxScale: DEFAULT_MOUSEWHEEL_MAX_SCALE
      },
      interacting: {
        nodeMovable: false,
        edgeMovable: false,
        vertexMovable: false,
        arrowheadMovable: false
      },
      background: {
        color: "transparent"
      }
    });
  }

  const graph = createGraph();

  function createBlueprintFrame() {
    graph.addNode({
      id: "frame-outer",
      shape: "rect",
      x: 24,
      y: 24,
      width: 1972,
      height: 712,
      zIndex: 0,
      attrs: {
        body: {
          fill: "transparent",
          stroke: "rgba(255,255,255,0.16)",
          strokeWidth: 1
        }
      }
    });

    graph.addNode({
      id: "frame-inner",
      shape: "rect",
      x: 42,
      y: 42,
      width: 1936,
      height: 676,
      zIndex: 0,
      attrs: {
        body: {
          fill: "transparent",
          stroke: "rgba(96,165,250,0.14)",
          strokeWidth: 1
        }
      }
    });
  }

  function createGroups() {
    data.groups.forEach((group) => {
      const cell = graph.addNode({
        id: group.id,
        shape: "rect",
        x: group.x,
        y: group.y,
        width: group.width,
        height: group.height,
        zIndex: 1,
        attrs: {
          body: {
            fill: "rgba(5, 15, 28, 0.18)",
            stroke: "rgba(96,165,250,0.38)",
            strokeDasharray: "10 8",
            rx: 20,
            ry: 20
          },
          label: {
            text: group.title,
            fill: "#22d3ee",
            fontSize: 15,
            fontFamily: "IBM Plex Mono, Courier New, monospace",
            refX: 24,
            refY: 16,
            textAnchor: "start",
            textVerticalAnchor: "top"
          }
        }
      });

      groupNodes.set(group.id, cell);
    });
  }

  function createNodes() {
    data.nodes.forEach((node) => {
      const visual = getNodeVisual(node);
      const selected = state.selectedId === node.id;

      const cell = graph.addNode({
        id: node.id,
        shape: "rect",
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        zIndex: 3,
        attrs: {
          body: {
            fill: selected ? "rgba(34,211,238,0.16)" : visual.fill,
            stroke: selected ? "#22d3ee" : visual.stroke,
            strokeWidth: selected ? 2.2 : 1.4,
            rx: 14,
            ry: 14,
            filter: selected ? {
              name: "dropShadow",
              args: { dx: 0, dy: 0, blur: 8, color: "rgba(34,211,238,0.55)" }
            } : undefined
          },
          label: {
            text: node.title,
            fill: selected ? "#ecfeff" : visual.labelColor,
            fontSize: 14,
            fontFamily: "IBM Plex Mono, Courier New, monospace",
            fontWeight: 500
          }
        }
      });

      mainNodes.set(node.id, cell);
    });
  }

  function createEdge(source, target, options = {}) {
    const selected = state.selectedId === source || state.selectedId === target;

    return graph.addEdge({
      source: { cell: source },
      target: { cell: target },
      zIndex: 2,
      router: {
        name: "orth"
      },
      connector: {
        name: "rounded"
      },
      attrs: {
        line: {
          stroke: options.exception
            ? selected ? "#fb923c" : "rgba(249,115,22,0.42)"
            : selected ? "#22d3ee" : "rgba(255,255,255,0.78)",
          strokeWidth: options.exception ? 1.25 : 2,
          strokeDasharray: options.exception ? "8 8" : undefined,
          targetMarker: {
            name: "classic",
            size: 7
          }
        }
      }
    });
  }

  function createEdges() {
    data.edges.forEach(([source, target]) => {
      mainEdges.push(createEdge(source, target));
    });

    data.exceptionEdges.forEach(([source, target]) => {
      exceptionEdges.push(createEdge(source, target, { exception: true }));
    });
  }

  function updateNodeStyles() {
    data.nodes.forEach((node) => {
      const cell = mainNodes.get(node.id);
      if (!cell) return;

      const visual = getNodeVisual(node);
      const selected = state.selectedId === node.id;
      const visible = isNodeVisible(node);

      cell.setVisible(visible);
      cell.attr("body/fill", selected ? "rgba(34,211,238,0.16)" : visual.fill);
      cell.attr("body/stroke", selected ? "#22d3ee" : visual.stroke);
      cell.attr("body/strokeWidth", selected ? 2.2 : 1.4);
      cell.attr("label/fill", selected ? "#ecfeff" : visual.labelColor);
      cell.attr(
        "body/filter",
        selected
          ? { name: "dropShadow", args: { dx: 0, dy: 0, blur: 8, color: "rgba(34,211,238,0.55)" } }
          : undefined
      );
    });
  }

  function updateGroupVisibility() {
    data.groups.forEach((group) => {
      const cell = groupNodes.get(group.id);
      if (!cell) return;
      cell.setVisible(isExceptionVisible() || group.id !== "g6");
    });
  }

  function updateEdgeVisibility() {
    mainEdges.forEach((edge) => edge.setVisible(true));
    exceptionEdges.forEach((edge) => edge.setVisible(isExceptionVisible()));
  }

  function render() {
    updateGroupVisibility();
    updateNodeStyles();
    updateEdgeVisibility();
    updateDetails(state.selectedId);
    applyViewport();
  }

  function selectNode(nodeId) {
    if (!nodesById.has(nodeId)) return;
    state.selectedId = nodeId;
    render();
  }

  function applyViewport() {
    const height = viewportHelpers.resolveViewportHeight(isExceptionVisible());
    graphContainer.style.height = `${height}px`;
    graph.resize(graphContainer.clientWidth || 1200, height);

    if (typeof graph.getCellsBBox === "function" && typeof graph.zoomToRect === "function") {
      const cells = graph.getCells().filter((cell) => !["frame-outer", "frame-inner"].includes(cell.id));
      const bbox = graph.getCellsBBox(cells);
      if (bbox) {
        graph.zoomToRect(bbox, {
          padding: { top: 30, right: 40, bottom: 30, left: 40 },
          maxScale: 1,
          preserveAspectRatio: true
        });

        const fitScale = typeof graph.zoom === "function" ? graph.zoom() : 1;
        viewportState.fitScale = Number.isFinite(fitScale) && fitScale > 0 ? fitScale : 1;
        viewportHelpers.syncMousewheelBounds(graph, viewportState.fitScale, DEFAULT_MOUSEWHEEL_MAX_SCALE);
      }
    }
  }

  function bindNodeEvents() {
    graph.on("node:mouseenter", ({ node }) => {
      if (!nodesById.has(node.id)) return;
      node.attr("body/filter", {
        name: "dropShadow",
        args: { dx: 0, dy: 0, blur: 10, color: "rgba(34,211,238,0.5)" }
      });
      if (state.selectedId !== node.id) {
        node.attr("body/stroke", "#7dd3fc");
        node.attr("body/strokeWidth", 2);
      }
    });

    graph.on("node:mouseleave", ({ node }) => {
      if (!nodesById.has(node.id)) return;
      if (state.selectedId === node.id) {
        node.attr("body/filter", {
          name: "dropShadow",
          args: { dx: 0, dy: 0, blur: 8, color: "rgba(34,211,238,0.55)" }
        });
      } else {
        render();
      }
    });

    graph.on("node:click", ({ node }) => {
      if (!nodesById.has(node.id)) return;
      selectNode(node.id);
    });
  }

  function bindViewToggle() {
    viewButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.view = button.dataset.view;
        viewButtons.forEach((item) => item.classList.toggle("is-active", item === button));
        if (!isExceptionVisible() && nodesById.get(state.selectedId)?.type === "danger") {
          state.selectedId = data.defaultNodeId;
        }
        render();
      });
    });
  }

  function bindDomFallbackSelection() {
    graphContainer.addEventListener("click", (event) => {
      const target = event.target.closest("[data-cell-id]");
      if (!target) return;
      const nodeId = target.getAttribute("data-cell-id");
      if (!nodesById.has(nodeId)) return;
      selectNode(nodeId);
    });
  }

  updateLegend();
  createBlueprintFrame();
  createGroups();
  createNodes();
  createEdges();
  bindNodeEvents();
  bindDomFallbackSelection();
  bindViewToggle();
  viewButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.view === state.view));
  window.addEventListener("resize", render);
  render();
})();
