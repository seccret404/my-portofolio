import { useState, useEffect, useCallback } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../api/projectApi';
import type{ Project, ProjectFormData, ApiError } from '../api/types';

type UseProjectsReturn = {
  projects: Project[];
  loading: boolean;
  error: ApiError | null;
  createProject: (project: ProjectFormData) => Promise<void>;
  editProject: (id: number, project: ProjectFormData) => Promise<void>;
  removeProject: (id: number) => Promise<void>;
  refreshProjects: () => Promise<void>;
};

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = async (projectData: ProjectFormData) => {
    try {
      const newProject = await addProject(projectData);
      setProjects(prev => [...prev, newProject]);
    } catch (err) {
      throw err as ApiError;
    }
  };

  const editProject = async (id: number, projectData: ProjectFormData) => {
    try {
      const updatedProject = await updateProject(id, projectData);
      setProjects(prev => prev.map(p => (p.id === id ? updatedProject : p)));
    } catch (err) {
      throw err as ApiError;
    }
  };

  const removeProject = async (id: number) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err as ApiError;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    createProject,
    editProject,
    removeProject,
    refreshProjects: fetchProjects,
  };
};