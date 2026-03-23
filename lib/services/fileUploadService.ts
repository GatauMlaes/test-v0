import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import type { FileUploadResponse, ApiResponse, FileDeleteRequest } from '@/types/api';

export const fileUploadService = {
  /**
   * Upload image - Uses /api/v1/uploads/images endpoint
   */
  async uploadImage(
    file: File,
    folder: 'images/avatars' | 'images/hotels' | 'images/vehicles/units',
    accessibility: 'public' | 'private' = 'public'
  ): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    formData.append('accessibility', accessibility);

    const response = await apiClient.post<ApiResponse<FileUploadResponse>>(
      API_ENDPOINTS.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.data;
  },

  /**
   * Upload document - Uses /api/v1/uploads/documents endpoint
   */
  async uploadDocument(
    file: File,
    folder: 'documents/hotels' | 'documents/vehicles',
    accessibility: 'public' | 'private' = 'private'
  ): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('folder', folder);
    formData.append('accessibility', accessibility);

    const response = await apiClient.post<ApiResponse<FileUploadResponse>>(
      API_ENDPOINTS.UPLOAD_DOCUMENT,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.data;
  },

  /**
   * Delete image
   */
  async deleteImage(
    filename: string,
    folder: 'images/avatars' | 'images/hotels' | 'images/vehicles/units',
    accessibility: 'public' | 'private'
  ): Promise<boolean> {
    const response = await apiClient.delete<ApiResponse<{ deleted: boolean }>>(
      API_ENDPOINTS.DELETE_IMAGE,
      {
        data: {
          filename,
          folder,
          accessibility,
        } as FileDeleteRequest,
      }
    );

    return response.data.data.deleted;
  },

  /**
   * Delete document
   */
  async deleteDocument(
    filename: string,
    folder: 'documents/hotels' | 'documents/vehicles',
    accessibility: 'public' | 'private'
  ): Promise<boolean> {
    const response = await apiClient.delete<ApiResponse<{ deleted: boolean }>>(
      API_ENDPOINTS.DELETE_DOCUMENT,
      {
        data: {
          filename,
          folder,
          accessibility,
        } as FileDeleteRequest,
      }
    );

    return response.data.data.deleted;
  },

  /**
   * Validate image file
   */
  validateImage(file: File): { valid: boolean; error?: string } {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Image size must be less than 5MB',
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Only JPG, PNG, and WebP files are allowed',
      };
    }

    return { valid: true };
  },

  /**
   * Validate document file
   */
  validateDocument(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'Document size must be less than 10MB',
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Only PDF, DOC, and DOCX files are allowed',
      };
    }

    return { valid: true };
  },
};
