declare module "hypernova/server" {
  interface HypernovaServerOptions {
    devMode: boolean;
    logger: {
      level: string;
    };
    port: number;
    getComponent(name: string): any;
  }

  function HypernovaServer(options: HypernovaServerOptions): any;

  namespace HypernovaServer {

  }

  export = HypernovaServer;
}
