(function () {
  const data = window.developmentLifecycleData;

  const canvas = document.getElementById("blueprint-canvas");
  const context = canvas.getContext("2d");
  const detailElements = {
    title: document.getElementById("detail-title"),
    description: document.getElementById("detail-description"),
    role: document.getElementById("detail-role"),
    input: document.getElementById("detail-input"),
    output: document.getElementById("detail-output"),
    gate: document.getElementById("detail-gate")
  };
  const viewButtons = document.querySelectorAll(".view-button");

  const state = {
    hoverId: null,
    selectedId: data.defaultNodeId,
    view: "all"
  };

  const nodesById = new Map(data.nodes.map((node) => [node.id, node]));
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
  }

  function isExceptionVisible() {
    return state.view === "all";
  }

  function getVisibleNodes() {
    return data.nodes.filter((node) => isExceptionVisible() || node.type !== "danger");
  }

  function isNodeHighlighted(nodeId) {
    return state.selectedId === nodeId || state.hoverId === nodeId;
  }

  function drawRoundedRect(x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.closePath();
  }

  function drawArrow(fromX, fromY, toX, toY, color, dashed) {
    context.save();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.lineWidth = dashed ? 2 : 2.6;
    if (dashed) {
      context.setLineDash([8, 8]);
    }

    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);

    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();

    context.setLineDash([]);
    context.beginPath();
    context.moveTo(toX, toY);
    context.lineTo(toX - 14 * Math.cos(angle - Math.PI / 7), toY - 14 * Math.sin(angle - Math.PI / 7));
    context.lineTo(toX - 14 * Math.cos(angle + Math.PI / 7), toY - 14 * Math.sin(angle + Math.PI / 7));
    context.closePath();
    context.fill();
    context.restore();
  }

  function getNodeAnchor(node, side) {
    const anchors = {
      left: { x: node.x, y: node.y + node.height / 2 },
      right: { x: node.x + node.width, y: node.y + node.height / 2 },
      top: { x: node.x + node.width / 2, y: node.y },
      bottom: { x: node.x + node.width / 2, y: node.y + node.height }
    };
    return anchors[side];
  }

  function getEdgePath(fromNode, toNode, exception) {
    if (exception) {
      const from = getNodeAnchor(fromNode, fromNode.y < toNode.y ? "bottom" : "top");
      const to = getNodeAnchor(toNode, toNode.y > fromNode.y ? "top" : "bottom");
      return { from, to };
    }

    if (fromNode.y === toNode.y) {
      return {
        from: getNodeAnchor(fromNode, "right"),
        to: getNodeAnchor(toNode, "left")
      };
    }

    return {
      from: getNodeAnchor(fromNode, "bottom"),
      to: getNodeAnchor(toNode, "top")
    };
  }

  function drawMeasurement(node, color) {
    context.save();
    context.strokeStyle = color;
    context.fillStyle = color;
    context.setLineDash([5, 7]);
    context.lineWidth = 1;

    const topY = node.y - 22;
    context.beginPath();
    context.moveTo(node.x, topY);
    context.lineTo(node.x + node.width, topY);
    context.moveTo(node.x, topY - 6);
    context.lineTo(node.x, topY + 6);
    context.moveTo(node.x + node.width, topY - 6);
    context.lineTo(node.x + node.width, topY + 6);
    context.stroke();

    context.setLineDash([]);
    context.font = "12px IBM Plex Mono, Courier New, monospace";
    context.textAlign = "center";
    context.fillText(`${node.width}px`, node.x + node.width / 2, topY - 8);
    context.restore();
  }

  function drawGroup(group) {
    context.save();
    context.strokeStyle = "rgba(96,165,250,0.4)";
    context.lineWidth = 1.5;
    context.setLineDash([12, 10]);
    drawRoundedRect(group.x, group.y, group.width, group.height, 18);
    context.stroke();
    context.setLineDash([]);

    context.fillStyle = "rgba(10,22,40,0.78)";
    context.fillRect(group.x + 18, group.y - 16, 130, 26);

    context.font = "15px IBM Plex Mono, Courier New, monospace";
    context.fillStyle = "#22d3ee";
    context.textBaseline = "middle";
    context.fillText(group.title, group.x + 26, group.y - 3);
    context.restore();
  }

  function getNodeColors(node) {
    const active = isNodeHighlighted(node.id);
    if (node.type === "danger") {
      return {
        border: active ? "#fb923c" : "rgba(249,115,22,0.76)",
        fill: active ? "rgba(249,115,22,0.18)" : "rgba(249,115,22,0.08)",
        glow: "rgba(249,115,22,0.3)"
      };
    }

    if (node.type === "done") {
      return {
        border: active ? "#6ee7b7" : "rgba(52,211,153,0.76)",
        fill: active ? "rgba(52,211,153,0.18)" : "rgba(52,211,153,0.08)",
        glow: "rgba(52,211,153,0.24)"
      };
    }

    return {
      border: active ? "#22d3ee" : "rgba(255,255,255,0.85)",
      fill: active ? "rgba(34,211,238,0.16)" : "rgba(255,255,255,0.04)",
      glow: "rgba(34,211,238,0.22)"
    };
  }

  function wrapText(text, maxWidth, startX, startY, lineHeight, color) {
    context.save();
    context.fillStyle = color;
    context.font = "13px IBM Plex Mono, Courier New, monospace";
    context.textAlign = "left";
    context.textBaseline = "top";

    const words = text.split("");
    let current = "";
    let line = 0;

    words.forEach((word) => {
      const test = current + word;
      if (context.measureText(test).width > maxWidth && current) {
        context.fillText(current, startX, startY + line * lineHeight);
        current = word;
        line += 1;
      } else {
        current = test;
      }
    });

    if (current) {
      context.fillText(current, startX, startY + line * lineHeight);
    }

    context.restore();
  }

  function drawNode(node) {
    const colors = getNodeColors(node);
    const active = isNodeHighlighted(node.id);
    context.save();
    context.shadowColor = active ? colors.glow : "transparent";
    context.shadowBlur = active ? 18 : 0;
    context.lineWidth = active ? 2.6 : 1.6;
    context.strokeStyle = colors.border;
    context.fillStyle = colors.fill;
    drawRoundedRect(node.x, node.y, node.width, node.height, 12);
    context.fill();
    context.stroke();

    context.beginPath();
    context.moveTo(node.x + 14, node.y + 14);
    context.lineTo(node.x + node.width - 14, node.y + 14);
    context.strokeStyle = "rgba(255,255,255,0.18)";
    context.stroke();

    context.fillStyle = active ? "#ecfeff" : "rgba(255,255,255,0.92)";
    context.font = "15px IBM Plex Mono, Courier New, monospace";
    context.textAlign = "left";
    context.textBaseline = "top";
    wrapText(node.title, node.width - 24, node.x + 14, node.y + 24, 20, context.fillStyle);

    if (active) {
      drawMeasurement(node, "#22d3ee");
    }

    context.restore();
  }

  function drawTechnicalFrame() {
    context.save();
    context.strokeStyle = "rgba(255,255,255,0.16)";
    context.lineWidth = 1;
    context.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
    context.strokeRect(42, 42, canvas.width - 84, canvas.height - 84);

    context.fillStyle = "rgba(255,255,255,0.65)";
    context.font = "14px IBM Plex Mono, Courier New, monospace";
    context.fillText("开发治理总装图", 58, 70);
    context.fillText("主流程 / 异常回流 / 终态归档", canvas.width - 350, canvas.height - 70);

    context.strokeStyle = "rgba(96,165,250,0.4)";
    context.beginPath();
    context.moveTo(60, canvas.height - 70);
    context.lineTo(120, canvas.height - 70);
    context.lineTo(120, canvas.height - 130);
    context.stroke();
    context.restore();
  }

  function drawEdges() {
    data.edges.forEach(([fromId, toId]) => {
      const from = nodesById.get(fromId);
      const to = nodesById.get(toId);
      if (!from || !to) return;

      const active = state.hoverId === fromId || state.hoverId === toId || state.selectedId === fromId || state.selectedId === toId;
      const path = getEdgePath(from, to, false);
      drawArrow(path.from.x, path.from.y, path.to.x, path.to.y, active ? "#22d3ee" : "rgba(255,255,255,0.78)", false);
    });

    if (!isExceptionVisible()) {
      return;
    }

    data.exceptionEdges.forEach(([fromId, toId]) => {
      const from = nodesById.get(fromId);
      const to = nodesById.get(toId);
      if (!from || !to) return;

      const active = state.hoverId === fromId || state.hoverId === toId || state.selectedId === fromId || state.selectedId === toId;
      const path = getEdgePath(from, to, true);
      drawArrow(path.from.x, path.from.y, path.to.x, path.to.y, active ? "#fb923c" : "rgba(249,115,22,0.8)", true);
    });
  }

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawTechnicalFrame();

    data.groups.forEach((group) => {
      if (!isExceptionVisible() && group.id === "g6") return;
      drawGroup(group);
    });

    drawEdges();
    getVisibleNodes().forEach(drawNode);
  }

  function getPointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  }

  function findNodeAt(x, y) {
    return getVisibleNodes().find((node) => x >= node.x && x <= node.x + node.width && y >= node.y && y <= node.y + node.height);
  }

  canvas.addEventListener("mousemove", (event) => {
    const pointer = getPointerPosition(event);
    const hovered = findNodeAt(pointer.x, pointer.y);
    const nextId = hovered ? hovered.id : null;
    if (state.hoverId !== nextId) {
      state.hoverId = nextId;
      canvas.style.cursor = hovered ? "pointer" : "default";
      render();
    }
  });

  canvas.addEventListener("mouseleave", () => {
    state.hoverId = null;
    canvas.style.cursor = "default";
    render();
  });

  canvas.addEventListener("click", (event) => {
    const pointer = getPointerPosition(event);
    const selected = findNodeAt(pointer.x, pointer.y);
    if (!selected) return;
    state.selectedId = selected.id;
    updateDetails(selected.id);
    render();
  });

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      viewButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      if (!isExceptionVisible() && nodesById.get(state.selectedId)?.type === "danger") {
        state.selectedId = data.defaultNodeId;
        updateDetails(state.selectedId);
      }
      render();
    });
  });

  window.addEventListener("resize", render);

  updateLegend();
  updateDetails(state.selectedId);
  render();
})();
