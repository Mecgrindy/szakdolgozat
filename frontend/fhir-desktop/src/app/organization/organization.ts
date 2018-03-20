export class Organization {
  id: string;
  identifier: string;
  type: string;
  active: boolean;
  name: string;
  alias: [string];
  telecom: any;
  address: [string];
  partof: string;
  endpoint: string;
}
