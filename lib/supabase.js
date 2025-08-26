import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ibmutlcdehhlzxjnovna.supabase.co"
const supabaseAnonKey = "{eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlibXV0bGNkZWhobHp4am5vdm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNjE2ODIsImV4cCI6MjA3MTYzNzY4Mn0.PzWjzQYGBqvsKmkqjWSWeD5BNn0TRrvrijkCuHSFfq0}"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})