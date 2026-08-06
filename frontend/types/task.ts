// export interface AssignedUser {
//   _id: string;
//   name: string;
//   email: string;
// }

// export interface TaskType {
//   _id: string;
//   title: string;
//   description: string;
//   status:
//     | "Pending"
//     | "In Progress"
//     | "Completed"
//     | "Cancelled";

//   priority:
//     | "Low"
//     | "Medium"
//     | "High"
//     | "Critical";

//   due_date: string;

//   assigned_to?: AssignedUser;

//   createdAt: string;
//   updatedAt: string;
// }


export interface AssignedUser {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

export interface TaskType {
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

  created_at: string;
  updated_at: string;

  created_by?: AssignedUser;
  updated_by?: string;

  isDeleted?: boolean;
}