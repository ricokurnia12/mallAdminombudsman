import { ObjectId } from "mongoose";
export interface ServiceInterface {
  name: string;
  agenciesId: ObjectId;
}
