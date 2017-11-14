import { Record } from "immutable";
import { schema } from "normalizr";
import { Company, CompanySchema } from "./Company";
import { Image, ImageSchema } from "./Image";

const defaultValues: Record<string, any> = {
  id: null,
  title: "",
  published_at: "",
  description: "",
  why_description: "",
  what_description: "",
  how_description: "",
  candidate_count: null,
  monthly_support_count: null,
  canonical_path: "",
  keywords: [],
  looking_for: null,
  page_view: null,
  location: "",
  image: -1,
  company: -1
};

export const ProjectSchema = new schema.Entity(
  "projects",
  {
    company: CompanySchema,
    image: ImageSchema
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

export class Project extends Record(defaultValues) {
  public readonly id: number;
  public readonly title: string;
  public readonly published_at: string;
  public readonly description: string;
  public readonly why_description: string;
  public readonly what_description: string;
  public readonly how_description: string;
  public readonly candidate_count: number;
  public readonly monthly_support_count: number;
  public readonly keywords: string[];
  public readonly canonical_path: string;
  public readonly looking_for: string;
  public readonly page_view: number;
  public readonly location: string;
  public readonly image: Image;
  public readonly company: Company;

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
