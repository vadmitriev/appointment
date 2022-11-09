export interface IResourceValue {
  value?: string | number;
  unit?: string;
}

export interface IResource {
  id: string;
  details: string;
  values?: string[] | IResourceValue[];
  code?: string;
}

export interface ResourceResponse {
  items: IResource[];
}
