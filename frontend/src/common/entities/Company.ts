import { Record } from "immutable";
import { schema } from "normalizr";
import { Image, ImageSchema } from "./Image";

const defaultValues: Record<string, any> = {
  id: null,
  name: "",
  founded_on: null,
  canonical_path: "",
  avatar: "company"
};

export const CompanySchema = new schema.Entity(
  "companies",
  {
    avatar: ImageSchema
  },
  {
    processStrategy(entity) {
      const obj: Record<string, any> = {};
      for (const key in defaultValues) {
        obj[key] = entity[key] || defaultValues[key];
      }
      return obj;
    }
  }
);

export class Company extends Record(defaultValues) {
  public readonly id: number;
  public readonly name: string;
  public readonly founded_on: string;
  public readonly canonical_path: string;
  public readonly avatar: Image;

  merge(...collections: Array<Partial<any> | Iterable<[string, any]>>) {
    return this.mergeWith((oldVal, newVal) => newVal || oldVal, ...collections);
  }

  mergeDeep(...collections: Array<Partial<any> | Iterable<[string, any]>>) {
    return this.mergeDeepWith(
      (oldVal, newVal) => newVal || oldVal,
      ...collections
    );
  }
}
