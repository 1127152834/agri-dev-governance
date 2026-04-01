#!/usr/bin/env node

const assert = require("node:assert/strict");
const viewport = require("../docs/visuals/development-lifecycle/viewport.js");

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    throw error;
  }
}

test("fit 缩放应成为新的最小缩放边界", () => {
  const nextOptions = viewport.buildMousewheelOptions(
    {
      enabled: true,
      minScale: 0.75,
      maxScale: 1.25
    },
    0.5502590673575131,
    1.25
  );

  assert.equal(nextOptions.minScale, 0.5502590673575131);
  assert.equal(nextOptions.maxScale, 1.25);
});

test("同步缩放边界时应同时更新 graph 与 mousewheel 插件配置", () => {
  const graph = {
    options: {
      mousewheel: {
        enabled: true,
        minScale: 0.75,
        maxScale: 1.25
      }
    },
    mousewheel: {
      options: {
        enabled: true,
        minScale: 0.75,
        maxScale: 1.25
      }
    }
  };

  const nextOptions = viewport.syncMousewheelBounds(graph, 0.5502590673575131, 1.25);

  assert.equal(nextOptions.minScale, 0.5502590673575131);
  assert.equal(graph.options.mousewheel.minScale, 0.5502590673575131);
  assert.equal(graph.mousewheel.options.minScale, 0.5502590673575131);
});

test("主流程与全流程应使用稳定的视口高度", () => {
  assert.equal(viewport.resolveViewportHeight(false), 620);
  assert.equal(viewport.resolveViewportHeight(true), 760);
});
