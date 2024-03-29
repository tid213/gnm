import { createClient } from '@supabase/supabase-js'
const {REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY} = process.env;


const supabaseUrl = REACT_APP_SUPABASE_URL;
const supabaseAnonKey = REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey)