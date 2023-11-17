import {
  configureWunderGraphApplication,
  cors,
  EnvironmentVariable,
  introspect,
  templates,
} from "@wundergraph/sdk";
import server from "./wundergraph.server";
import operations from "./wundergraph.operations";
import { NextJsTemplate } from "@wundergraph/nextjs/dist/template";

const countries = introspect.graphql({
  apiNamespace: "countries",
  url: "https://countries.trevorblades.com/",
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [countries],
  server,
  operations,
  generate: {
    codeGenerators: [
      {
        templates: [
          // use all the typescript react templates to generate a client
          ...templates.typescript.all,
          templates.typescript.operations,
          templates.typescript.linkBuilder,
        ],
      },
      {
        templates: [new NextJsTemplate()],
        path: "../../packages/generated-wundergraph",
      },
    ],
  },
  openApi: {
    title: "WGStack API",
  },
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            "http://localhost:3000",
          ]
        : [
            "http://localhost:3000",
            new EnvironmentVariable("WG_ALLOWED_ORIGIN"),
          ],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== "production" ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
});
