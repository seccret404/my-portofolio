import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import type {
     Experience,
     ApiError,
     ExperienceResponse,
     SingleExperienceResponse,
} from '@/api/types';

export const useExperiences = () => {
     const [experiences, setExperiences] = useState<Experience[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<ApiError | null>(null);

     const fetchExperiences = async () => {
          try {
               setLoading(true);
               setError(null);
               const response = await apiClient.get<ExperienceResponse>('/get-experience');
               setExperiences(response.data.data || []);
          } catch (err) {
               setError(err as ApiError);
               console.error('Error fetching experiences:', err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchExperiences();
     }, []);

     const createExperience = async (
          experience: Omit<Experience, 'ID' | 'CreatedAt' | 'UpdatedAt' | 'DeletedAt'>
     ) => {
          try {
               setLoading(true);
               const response = await apiClient.post<SingleExperienceResponse>(
                    '/create-experience',
                    {
                         company: experience.company,
                         role: experience.role,
                         periode: experience.periode,
                         contribution: experience.contribution,
                         stack: experience.stack, // string, e.g., "Golang,React"
                    }
               );

               setExperiences((prev) => [...prev, response.data.data]);
               return response.data.data;
          } catch (err) {
               const apiError = err as ApiError;
               setError(apiError);
               console.error('Error creating experience:', apiError);
               throw apiError;
          } finally {
               setLoading(false);
          }
     };

     const editExperience = async (id: number, updatedExperience: Partial<Experience>) => {
          try {
               setLoading(true);
               setError(null);
               const response = await apiClient.put<SingleExperienceResponse>(
                    `/experiences/${id}`,
                    updatedExperience
               );
               setExperiences((prev) =>
                    prev.map((exp) => (exp.ID === id ? { ...exp, ...response.data.data } : exp))
               );
               return response.data.data;
          } catch (err) {
               const apiError = err as ApiError;
               setError(apiError);
               console.error('Error updating experience:', apiError);
               throw apiError;
          } finally {
               setLoading(false);
          }
     };

     const removeExperience = async (id: number) => {
          try {
               setLoading(true);
               setError(null);
               await apiClient.delete(`/experiences/${id}`);
               setExperiences((prev) => prev.filter((exp) => exp.ID !== id));
          } catch (err) {
               const apiError = err as ApiError;
               setError(apiError);
               console.error('Error deleting experience:', apiError);
               throw apiError;
          } finally {
               setLoading(false);
          }
     };

     return {
          experiences,
          loading,
          error,
          createExperience,
          editExperience,
          removeExperience,
          refetch: fetchExperiences,
     };
};
