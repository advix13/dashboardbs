'use client';

import { useState, useRef } from 'react';
import { supabase, ProductImage } from '@/lib/supabase';
import { Upload, X, Image as ImageIcon, Star, StarOff } from 'lucide-react';

interface ImageGalleryProps {
  productId?: string;
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
  mainImageUrl: string | '';
  onMainImageChange: (url: string) => void;
}

export default function ImageGallery({
  productId,
  images,
  onImagesChange,
  mainImageUrl,
  onMainImageChange
}: ImageGalleryProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    setUploadingImage(true);
    
    try {
      let newImages = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        // Upload image to Supabase Storage using the 'images' bucket
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, file);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
        
        // Get public URL
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);
        
        if (data && data.publicUrl) {
          const newImage: ProductImage = {
            id: 'temp_' + Date.now() + '_' + i,
            product_id: productId || 'temp',
            url: data.publicUrl,
            alt_text: file.name || '',
            is_primary: images.length === 0 && i === 0, // First image is primary by default
            sort_order: images.length + i
          };
          
          newImages.push(newImage);
        }
        
        // Update progress
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }
      
      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        onImagesChange(updatedImages);
        
        // If it's the first image, set it as main image
        if (images.length === 0) {
          onMainImageChange(newImages[0].url);
        }
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: ' + (error.message || 'Unknown error'));
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (mainImageInputRef.current) {
        mainImageInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    const removedImage = updatedImages.splice(index, 1)[0];
    
    // If we're removing the primary image, set a new one if available
    if (removedImage.is_primary && updatedImages.length > 0) {
      updatedImages[0].is_primary = true;
      onMainImageChange(updatedImages[0].url);
    } else if (removedImage.url === mainImageUrl && updatedImages.length > 0) {
      // Find the primary image in the remaining images
      const primaryImage = updatedImages.find(img => img.is_primary);
      if (primaryImage) {
        onMainImageChange(primaryImage.url);
      }
    }
    
    onImagesChange(updatedImages);
  };

  const setPrimaryImage = (index: number) => {
    const updatedImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index
    }));
    
    onImagesChange(updatedImages);
    onMainImageChange(updatedImages[index].url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Product Images
        </label>
        <label className="bg-blue-500 text-white px-2.5 py-1 rounded-md hover:bg-blue-600 cursor-pointer inline-flex items-center text-xs">
          <Upload size={14} className="mr-1" />
          <span>
            {uploadingImage 
              ? `Uploading ${uploadProgress}%` 
              : 'Add Images'
            }
          </span>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={uploadingImage}
          />
        </label>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {/* Main Product Image Column */}
        <div className="col-span-1 space-y-2">
          <div className="text-xs font-medium text-gray-700">Main Image</div>
          <label className="cursor-pointer block">
            <div className="bg-gray-50 border rounded-md p-2 aspect-square flex items-center justify-center hover:bg-gray-100 transition-colors">
              {mainImageUrl ? (
                <div className="relative w-full h-full">
                  <img 
                    src={mainImageUrl} 
                    alt="Main product image" 
                    className="w-full h-full object-contain"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/200?text=No+Image')}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto text-gray-300 mb-1" size={24} />
                  <p className="text-xs text-gray-500">Click to add main image</p>
                </div>
              )}
            </div>
            <input
              ref={mainImageInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
            />
          </label>
          <p className="text-xs text-gray-500 italic">
            Used in listings
          </p>
        </div>
        
        {/* Gallery Images Column */}
        <div className="col-span-3 space-y-2">
          <div className="text-xs font-medium text-gray-700">Product Gallery</div>
          <div className="bg-gray-50 border rounded-md p-2">
            <div className="mb-1 text-xs text-gray-500">
              {images.length === 0 
                ? 'No images added yet'
                : `${images.length} image${images.length > 1 ? 's' : ''} - click star to set main`
              }
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <div key={image.id} className="relative border rounded-md overflow-hidden group">
                  <div className="aspect-square relative">
                    <img 
                      src={image.url} 
                      alt={image.alt_text || 'Product image'} 
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/80')}
                    />
                  </div>
                  
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-1 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {image.is_primary ? (
                      <Star size={14} className="text-yellow-400" />
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setPrimaryImage(index)}
                        className="text-white opacity-80 hover:opacity-100"
                        title="Set as main image"
                      >
                        <StarOff size={14} />
                      </button>
                    )}
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-white opacity-80 hover:opacity-100"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty state / Add image tile */}
              {images.length < 12 && (
                <label className="aspect-square border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center p-1 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <ImageIcon className="text-gray-400" size={16} />
                  <span className="text-xs text-gray-500 text-center">Add</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Square images recommended
          </p>
        </div>
      </div>
    </div>
  );
} 