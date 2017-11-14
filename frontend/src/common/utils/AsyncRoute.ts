import * as React from "react";

type ModuleComponent = React.ComponentType | ESModuleComponent;
type ESModuleComponent = { default: React.ComponentType };

function isESModuleComponent(module: any): module is ESModuleComponent {
  return module.default;
}

type LoaderFunc = () => Promise<ModuleComponent>;

export default class AsyncRoute {
  public path: string;
  public loader: LoaderFunc;
  public component: React.ComponentType;

  constructor(config: { path: string; loader: LoaderFunc }) {
    this.path = config.path;
    this.loader = config.loader;
  }

  public async load() {
    const module = await this.loader();
    if (isESModuleComponent(module)) {
      this.component = module.default;
    } else {
      this.component = module;
    }
  }
}
