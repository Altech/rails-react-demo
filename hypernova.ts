import * as hypernova from "hypernova/server";
import Component, { preloadAll } from "./frontend/src/index";

hypernova({
  devMode: true,
  logger: { level: "info" },
  async getComponent(name: string) {
    if (name === "App") {
      await preloadAll();
      return Component;
    }
    return null;
  },
  port: 3030
});
