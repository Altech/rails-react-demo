import { Record, Map, Iterable } from "immutable";
import { Project } from "./Project";
import { Image } from "./Image";
import { Company } from "./Company";

type MapLike<K extends string, V> = Record<K, V> | Map<K, V>;

const converterCreator = (RecordClass: any) => (
  _entities: MapLike<string, any>
) => {
  const entities = Map.isMap(_entities)
    ? _entities as Map<string, any>
    : Map(_entities);
  return entities.map(value => new RecordClass(value));
};

const converters: Record<
  string,
  (entities: MapLike<string, any>) => Iterable<string, any>
> = {
  projects: converterCreator(Project),
  images: converterCreator(Image),
  companies: converterCreator(Company)
};

export class Entities extends Record({
  projects: Map<string, Project>({
    [-1]: new Project()
  }),
  images: Map<string, Image>({
    company: new Image({
      url:
        "https://dubpy8abnqmkw.cloudfront.net/images/anonymous/anonymous-company.png"
    }),
    [-1]: new Image()
  }),
  companies: Map<string, Company>({
    [-1]: new Company()
  })
}) {
  mergeDeep(_entities: MapLike<string, any>) {
    const entities = Map.isMap(_entities)
      ? _entities as Map<string, any>
      : Map(_entities);
    const converted = entities.map((value, key) => converters[key!](value));
    return (super.mergeDeep(converted) as any) as Entities;
  }
}
