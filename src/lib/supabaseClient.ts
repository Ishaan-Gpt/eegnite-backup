import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wezbnulztcdfomsjudse.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlemJudWx6dGNkZm9tc2p1ZHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzQwNDUsImV4cCI6MjA2ODE1MDA0NX0.x_w7L7E7WQ5Bx_kYV_W7ckuF5R-8DJKxowJvHlNFOV8';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 