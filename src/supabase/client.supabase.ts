import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqunvmhrvbglltllnlqx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdXh2d2Ftb2lwcmtyamloaGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTkzODEsImV4cCI6MjA5MDc3NTM4MX0.fSiBk8pLLRYDMHCZMibb8aVDHFT9yphe6MUi86LFc8U';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
