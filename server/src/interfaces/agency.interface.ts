import { Document, ObjectId } from "mongoose";

export interface AgencyInterface {
  name: string;
}

export interface DeletedAgencyOrError {
  deletedAgency?: Document<unknown, {}, { name: string }> & { name: string } & {
    _id: ObjectId;
  }; // Update type hereR
  error?: string;

}
