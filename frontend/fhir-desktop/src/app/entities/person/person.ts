export interface Person {
  id: string;
  identifier: [string];
  name: any;
  telecom: any;
  gender: string;
  birthDate: Date;
  address: any;
  photo: any;
  managingOrganization: string;
  active: boolean;
  link: any;
  extension: any;
}

export interface PersonCount {
  count: number;
}
