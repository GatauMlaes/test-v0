import apiClient from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import type { FileUploadResponse } from '@/types/api';

export const fileUploadService = {
  /**
   * Upload image or document
   */
  async upload(
    file: File,
    type: 'hotel' | 'vehicle',
    accessibility: 'public' | 'private' = 'public'
  ): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('accessibility', accessibility);

    const endpoint =
      type === 'hotel' ? API_ENDPOINTS.HOTEL_UPLOAD : API_ENDPOINTS.VEHICLE_UPLOAD;

    const response = await apiClient.post<{ data: FileUploadResponse }>(
      endpoint,
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
   * Validate file before upload
   */
  validateFile(file: File, type: 'image' | 'document'): { valid: boolean; error?: string } {
    const maxSizes = {
      image: 5 * 1024 * 1024, // 5MB
      document: 10 * 1024 * 1024, // 10MB
    };

    const allowedTypes = {
      image: ['image/jpeg', 'image/png', 'image/webp'],
      document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    };

    // Check file size
    if (file.size > maxSizes[type]) {
      const maxMB = maxSizes[type] / (1024 * 1024);
      return {
        valid: false,
        error: `File size must be less than ${maxMB}MB`,
      };
    }

    // Check file type
    if (!allowedTypes[type].includes(file.type)) {
      const typeName = type === 'image' ? 'JPG, PNG, WebP' : 'PDF, DOC, DOCX';
      return {
        valid: false,
        error: `Only ${typeName} files are allowed`,
      };
    }

    return { valid: true };
  },

  /**
   * Generate preview URL for file
   */
  getPreviewUrl(filePath: string): string {
    // If file path is already a full URL, return it
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }

    // Otherwise construct API URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    return `${baseUrl}${filePath}`;
  },
};
