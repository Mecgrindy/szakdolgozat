export interface Person {
  id: string;
  identifier: string;
  name: [string];
  telecom: any;
  gender: string;
  birthDate: Date;
  address: [string];
  photo: string;
  managingOrganization: string;
  active: boolean;
  link: any;
}

export interface PersonCount {
  count: number;
}