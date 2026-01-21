import { Application } from "./application.model";

export interface Job {
  id: number;
  title: string;
  companyId: number;
  location: string;
  type: string;
  description: string;
  salary: string;
  postedDate: string;
  views?: number;
  applications?: Application[]; // Embedded from json-server
}
