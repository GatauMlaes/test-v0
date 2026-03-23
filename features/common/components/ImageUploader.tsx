'use client';

import { useState, useCallback } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fileUploadService } from '@/lib/services/fileUploadService';
import { notification } from '@/lib/services/notification';

interface ImageUploaderProps {
  onUpload: (filePath: string) => void;
  maxFiles?: number;
  type: 'hotel' | 'vehicle';
  disabled?: boolean;
}

export function ImageUploader({
  onUpload,
  maxFiles = 5,
  type,
  disabled = false,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      if (uploadedImages.length + files.length > maxFiles) {
        notification.showError(`Maximum ${maxFiles} images allowed`);
        return;
      }

      setIsUploading(true);
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const validation = fileUploadService.validateFile(file, 'image');

          if (!validation.valid) {
            notification.showError(validation.error || 'Invalid file');
            continue;
          }

          const result = await fileUploadService.upload(file, type, 'public');
          setUploadedImages((prev) => [...prev, result.file_path]);
          onUpload(result.file_path);
        }
        notification.showSuccess('Images uploaded successfully');
      } catch (error) {
        notification.showError('Failed to upload images');
      } finally {
        setIsUploading(false);
      }
    },
    [type, uploadedImages.length, maxFiles, onUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (filePath: string) => {
    setUploadedImages((prev) => prev.filter((f) => f !== filePath));
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border/60 hover:border-primary/50 hover:bg-primary/5'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={disabled || isUploading}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Drop images here or click to select</p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: JPG, PNG, WebP (Max 5MB each)
            </p>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-r-transparent mx-auto mb-2" />
              <p className="text-sm text-foreground">Uploading...</p>
            </div>
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Uploaded ({uploadedImages.length}/{maxFiles})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {uploadedImages.map((filePath) => (
              <div key={filePath} className="relative group">
                <img
                  src={fileUploadService.getPreviewUrl(filePath)}
                  alt="Uploaded"
                  className="w-full h-24 object-cover rounded-lg border border-border/60"
                />
                <button
                  type="button"
                  onClick={() => removeImage(filePath)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
