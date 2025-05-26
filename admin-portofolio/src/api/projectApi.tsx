import apiClient from './apiClient';
import type { Project, ProjectFormData, ApiError } from './types';

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await apiClient.get<Project[]>('/get-project');
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
export const getProjectById = async (id: number): Promise<Project> => {
  try {
    const response = await apiClient.get<Project>(`/get-project/${id}`);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
// src/api/projectApi.ts
export const addProject = async (formData: FormData): Promise<Project> => {
  try {
    const response = await apiClient.post<Project>('/create-project', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

 

export const updateProject = async (id: string, projectData: Partial<Project>) => {
  try {
    // Convert stack array to string if needed
    const payload = {
      ...projectData,
      stack: Array.isArray(projectData.stack) 
        ? projectData.stack.join(',') 
        : projectData.stack
    };

    const response = await apiClient.put(`/update-project/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    console.error('Update failed:', err);
    throw err;
  }
};


export const deleteProject = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/projects/${id}`);
  } catch (error) {
    throw error as ApiError;
  }
};

