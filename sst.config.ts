/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "gainsgladiators",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    await import("./infra/web");
    const api = await import("./infra/api");

    return {
      deploy: api.deployAi.url,
      research: api.researcherAi.url
    };
  },
});
