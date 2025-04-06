// CommonJS format
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

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
    
    // Create a test image (1x1 transparent pixel)
    const testImageBuffer = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
    fs.writeFileSync('test-image.gif', testImageBuffer);
    
    console.log('Trying to upload to each bucket...');
    
    // Try all available buckets
    if (buckets && buckets.length > 0) {
      for (const bucket of buckets) {
        console.log(`Trying to upload to bucket: ${bucket.name}`);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket.name)
          .upload('test-image.gif', testImageBuffer, {
            contentType: 'image/gif',
            upsert: true
          });
        
        if (uploadError) {
          console.error(`Error uploading to ${bucket.name} bucket:`, uploadError);
        } else {
          console.log(`Upload to ${bucket.name} successful:`, uploadData);
          
          // Get public URL
          const { data: publicUrlData } = supabase.storage
            .from(bucket.name)
            .getPublicUrl('test-image.gif');
          
          console.log('Public URL:', publicUrlData);
          console.log(`SUCCESS! Found working bucket: ${bucket.name}`);
          return;
        }
      }
    } else {
      console.log('No buckets found. Trying default "public" bucket...');
      
      // Try the default 'public' bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('public')
        .upload('test-image.gif', testImageBuffer, {
          contentType: 'image/gif',
          upsert: true
        });
      
      if (uploadError) {
        console.error('Error uploading to public bucket:', uploadError);
      } else {
        console.log('Upload to public bucket successful:', uploadData);
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};

testUpload(); 