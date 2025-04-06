const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://stvlhikgnjwweafhvcbk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0dmxoaWtnbmp3d2VhZmh2Y2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5NjQ4NzgsImV4cCI6MjA1OTU0MDg3OH0.Y1tui-ao4mA81N3mTI7q2jxcGZYBjf3OaBM0plKIrgg';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listBuckets() {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      console.error('Error listing buckets:', error);
      return;
    }
    console.log('Available buckets:', data);
  } catch (err) {
    console.error('Exception:', err);
  }
}

listBuckets(); 