
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

// Use the values from src/integrations/supabase/client.ts
const supabaseUrl = "https://xwdbgupffevkzvulrdoj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3ZGJndXBmZmV2a3p2dWxyZG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMjU3MjIsImV4cCI6MjA1NzkwMTcyMn0.IBQh4DU6s9IMDNMG_Lq0ZXMYdowvc0Ajk653De5SHQ0";

// Log successful client creation
console.log('Supabase client initialized with project URL:', supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
