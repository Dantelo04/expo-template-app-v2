import { Record } from "@/lib/actions/createRecord";

export const excludeProRecords = (records: Record[]) => {
  return records.filter((record) => !record.title.includes("p.") && !record.title.includes("r."));
};