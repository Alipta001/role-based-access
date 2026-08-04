export interface AssignedUser {
  _id: string;
  name: string;
  email: string;
}

export interface RecordType {
  _id: string;
  title: string;
  description: string;
  status:
    | "Pending"
    | "In Progress"
    | "Completed"
    | "Cancelled";

  priority:
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

  due_date: string;

  assigned_to?: AssignedUser;

  createdAt: string;
  updatedAt: string;
}