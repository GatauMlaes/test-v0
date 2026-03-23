'use client';

import { useState, useCallback } from 'react';
import { FileText, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fileUploadService } from '@/lib/services/fileUploadService';
import { notification } from '@/lib/services/notification';

interface DocumentUploaderProps {
  onUpload: (filePath: string) => void;
  maxFiles?: number;
  type: 'hotel' | 'vehicle';
  optional?: boolean;
  disabled?: boolean;
}

export function DocumentUploader({
  onUpload,
  maxFiles = 3,
  type,
  optional = true,
  disabled = false,
}: DocumentUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      if (uploadedDocs.length + files.length > maxFiles) {
        notification.showError(`Maximum ${maxFiles} documents allowed`);
        return;
      }

      setIsUploading(true);
      try {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const validation = fileUploadService.validateFile(file, 'document');

          if (!validation.valid) {
            notification.showError(validation.error || 'Invalid file');
            continue;
          }

          const result = await fileUploadService.upload(file, type, 'private');
          setUploadedDocs((prev) => [...prev, result.file_path]);
          onUpload(result.file_path);
        }
        notification.showSuccess('Documents uploaded successfully');
      } catch (error) {
        notification.showError('Failed to upload documents');
      } finally {
        setIsUploading(false);
      }
    },
    [type, uploadedDocs.length, maxFiles, onUpload]
  );

  const removeDocument = (filePath: string) => {
    setUploadedDocs((prev) => prev.filter((f) => f !== filePath));
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border/60 rounded-xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="document-input"
          disabled={disabled || isUploading}
        />

        <label htmlFor="document-input" className="flex flex-col items-center gap-2 cursor-pointer">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Upload documents (optional)</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              PDF, DOC, DOCX (Max 10MB each)
            </p>
          </div>
        </label>

        {isUploading && (
          <div className="mt-3 text-center text-sm text-muted-foreground">
            Uploading...
          </div>
        )}
      </div>

      {uploadedDocs.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">
            Documents ({uploadedDocs.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {uploadedDocs.map((filePath, idx) => (
              <div
                key={filePath}
                className="flex items-center justify-between p-3 bg-card border border-border/60 rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground truncate">
                    Document {idx + 1}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(filePath)}
                  className="p-1 hover:bg-red-500/10 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
