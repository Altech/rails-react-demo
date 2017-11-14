declare module "hypernova" {
  interface ServerFunc<T> {
    (props: T): any;
  }

  interface HypernovaOption<T> {
    server(): ServerFunc<T>;
    client(props: T): any;
  }

  function Hypernova<T>(options: HypernovaOption<T>): any;

  type SerializeResult = any;
  type LoadResult<T> = {
    node: Element;
    data: T;
  };

  type DeserializedData = any;
  type Attributes = { [x: string]: string };

  namespace Hypernova {
    export function serialize<T>(
      name: string,
      contents: string,
      data: T
    ): SerializeResult;
    export function load<T>(name: string): LoadResult<T>[];
    export function toScript(
      attrs: Attributes,
      props: DeserializedData
    ): string;
    function fromScript(attrs: Attributes): DeserializedData;
  }

  export = Hypernova;
}
