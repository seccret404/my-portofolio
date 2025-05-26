// Regular interface export
export interface Project {
  ID:number,
  id: string | number;
  name: string;
  desc: string;
  periode: string;
  feature: string;
  stack: string[];
  image: File | string;
  link: string;
  user_id: string;
}
export interface Experience {
  ID: number;
  company: string;
  role: string;
  periode: string;
  contribution: string;
  stack: string; // comma-separated string
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string | null;
}

// export interface ApiError {
//   message: string;
//   status?: number;
//   [key: string]: any;
// }

export interface ExperienceResponse {
  data: Experience[];
}

export interface SingleExperienceResponse {
  data: Experience;
}



// Type export
export type ProjectFormData = Omit<Project, 'id'>;

// Another example of type export
export type ApiError = {
  message: string;
  status?: number;
  data?: any;
};