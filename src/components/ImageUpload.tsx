import React, { useState, useCallback } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesUploaded,
  maxImages = 10,
  existingImages = []
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadImages = useCallback(async (files: FileList) => {
    if (files.length === 0) return;

    if (existingImages.length + files.length > maxImages) {
      toast({
        title: "Too many images",
        description: `Maximum ${maxImages} images allowed per product.`,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not an image file.`,
            variant: "destructive"
          });
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} exceeds 5MB limit.`,
            variant: "destructive"
          });
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(data.path);

        uploadedUrls.push(urlData.publicUrl);
      }

      if (uploadedUrls.length > 0) {
        onImagesUploaded(uploadedUrls);
        toast({
          title: "Success",
          description: `${uploadedUrls.length} image(s) uploaded successfully.`
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  }, [onImagesUploaded, maxImages, existingImages.length, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadImages(e.dataTransfer.files);
    }
  }, [uploadImages]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImages(e.target.files);
    }
  }, [uploadImages]);

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-muted-foreground/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="image-upload"
        className="hidden"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      
      <div className="flex flex-col items-center gap-4">
        {uploading ? (
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        ) : (
          <Upload className="h-12 w-12 text-muted-foreground" />
        )}
        
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {uploading ? 'Uploading...' : 'Upload Product Images'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop images here, or click to select files
          </p>
          <p className="text-sm text-muted-foreground">
            Maximum {maxImages} images • Up to 5MB each • JPG, PNG, WebP supported
          </p>
        </div>
        
        <Button
          variant="outline"
          onClick={() => document.getElementById('image-upload')?.click()}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Select Images'}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;