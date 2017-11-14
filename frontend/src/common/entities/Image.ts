import { Record } from "immutable";
import { schema } from "normalizr";

const defaultValues: Record<string, any> = {
  id: null,
  url: ""
};
export const ImageSchema = new schema.Entity("images", {});
export class Image extends Record(defaultValues) {
  public readonly id: number;
  public readonly url: string;

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
