import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public client: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://nqunvmhrvbglltllnlqx.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xdW52bWhydmJnbGx0bGxubHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNTczOTAsImV4cCI6MjA5MjkzMzM5MH0._gpWfAT5EXhISuE7UStRNMGJuh2qeaJuS_FdRtIk0_U';

    this.client = createClient(supabaseUrl, supabaseKey);
  }
}
