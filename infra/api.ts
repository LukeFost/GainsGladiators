
export const researcherAi = new sst.aws.Function("Researcher",{
  handler: "packages/functions/src/researcher.handler",
  url: true,
  link: [],
  nodejs: {
    install: ["openai"]
  }
})

export const deployAi = new sst.aws.Function("DeployAi", {
  handler: "packages/functions/src/phala/deploy.handler",
  url: true,
  link: [],
})
