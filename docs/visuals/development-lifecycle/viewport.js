(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.developmentLifecycleViewport = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const DEFAULT_MAIN_HEIGHT = 620;
  const DEFAULT_ALL_HEIGHT = 760;

  function resolveViewportHeight(showExceptions) {
    return showExceptions ? DEFAULT_ALL_HEIGHT : DEFAULT_MAIN_HEIGHT;
  }

  function normalizeScale(scale, fallback) {
    return Number.isFinite(scale) && scale > 0 ? scale : fallback;
  }

  function buildMousewheelOptions(mousewheelOptions, minScale, maxScale) {
    const nextMinScale = normalizeScale(minScale, 0.75);
    const fallbackMaxScale = Math.max(nextMinScale, 1);
    const nextMaxScale = Math.max(nextMinScale, normalizeScale(maxScale, fallbackMaxScale));

    return {
      ...(mousewheelOptions || {}),
      minScale: nextMinScale,
      maxScale: nextMaxScale
    };
  }

  function syncMousewheelBounds(graph, minScale, maxScale) {
    const currentOptions = graph?.options?.mousewheel || {};
    const nextOptions = buildMousewheelOptions(currentOptions, minScale, maxScale);

    if (graph?.options) {
      graph.options.mousewheel = nextOptions;
    }

    if (graph?.mousewheel?.options) {
      Object.assign(graph.mousewheel.options, nextOptions);
    }

    return nextOptions;
  }

  return {
    buildMousewheelOptions,
    resolveViewportHeight,
    syncMousewheelBounds
  };
});
