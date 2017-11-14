import * as normalizr from "normalizr";
import { schema, denormalize } from "normalizr";
import { Entities } from "../entities/Entities";
import { ProjectSchema } from "../entities/Project";
import { CompanySchema } from "../entities/Company";
import { ImageSchema } from "../entities/Image";

interface NormalizeResult {
  result: any;
  entities: Entities;
}

const Schemas: Record<string, schema.Entity> = {
  Project: ProjectSchema,
  Company: CompanySchema,
  Image: ImageSchema
};

export { denormalize };
export function normalize(
  obj: any,
  entities: Entities = new Entities()
): NormalizeResult {
  if (typeof obj !== "object") {
    return { result: obj, entities };
  }
  if (Array.isArray(obj)) {
    const resultArray: any[] = [];
    for (const value of obj) {
      const { result, entities: _entities } = normalize(value, entities);
      resultArray.push(result);
      entities = _entities;
    }
    return { result: resultArray, entities };
  }
  if ("_entity_type" in obj) {
    const { _entity_type: type, ...cloned } = obj;

    const { result, entities: _entities } = normalizr.normalize(
      cloned,
      Schemas[type]
    );
    entities = entities.mergeDeep(_entities);
    return { result, entities };
  }

  const newObj = { ...obj };
  for (const key in newObj) {
    const { result, entities: _entities } = normalize(newObj[key], entities);
    newObj[key] = result;
    entities = _entities;
  }
  return { result: newObj, entities };
}
