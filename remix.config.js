/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    serverModuleFormat: "esm",
    v2_dev: true,
  },
  serverDependenciesToBundle: [
    "yet-another-react-lightbox",
    "yet-another-react-lightbox/plugins/zoom",
    "yet-another-react-lightbox/plugins/thumbnails",
    "lodash-es",
    "lodash",
    "lowlight",
    "fault",
  ],
};
