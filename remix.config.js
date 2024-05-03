/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  future: {
    serverModuleFormat: "esm",
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
