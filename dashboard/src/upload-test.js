// Use ES modules
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://stvlhikgnjwweafhvcbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmxoaWtnbmp3d2VhZmh2Y2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjQ4NzgsImV4cCI6MjA1OTU0MDg3OH0.Y1tui-ao4mA81N3mTI7q2jxcGZYBjf3OaBM0plKIrgg';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testUpload = async () => {
  try {
    console.log('Listing buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return;
    }
    
    console.log('Available buckets:', buckets);
    
    if (buckets.length === 0) {
      console.log('Creating a bucket named "test-bucket"...');
      const { data: newBucket, error: createError } = await supabase.storage.createBucket('test-bucket', { public: true });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        return;
      }
      
      console.log('Bucket created:', newBucket);
    }
    
    // Create a test image (1x1 transparent pixel)
    const testImageBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    fs.writeFileSync('test-image.gif', testImageBuffer);
    
    console.log('Uploading test image...');
    
    // Try to upload to public bucket first
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('public')
      .upload('test-image.gif', testImageBuffer, {
        contentType: 'image/gif',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Error uploading to public bucket:', uploadError);
      
      // Try uploading to the first available bucket
      if (buckets.length > 0) {
        console.log(`Trying alternative bucket: ${buckets[0].name}`);
        const { data: altUploadData, error: altUploadError } = await supabase.storage
          .from(buckets[0].name)
          .upload('test-image.gif', testImageBuffer, {
            contentType: 'image/gif',
            upsert: true
          });
        
        if (altUploadError) {
          console.error(`Error uploading to ${buckets[0].name} bucket:`, altUploadError);
        } else {
          console.log(`Upload to ${buckets[0].name} successful:`, altUploadData);
          
          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from(buckets[0].name)
            .getPublicUrl('test-image.gif');
          
          console.log('Public URL:', publicUrlData);
        }
      }
    } else {
      console.log('Upload to public bucket successful:', uploadData);
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('public')
        .getPublicUrl('test-image.gif');
      
      console.log('Public URL:', publicUrlData);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};

testUpload(); 