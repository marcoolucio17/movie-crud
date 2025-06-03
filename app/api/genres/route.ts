import { supabase } from '@/lib/supabaseClient';

/**
 * Método GET para traer todos los géneros dados de alta en la base de datos
 * @returns JSON con los géneros dados de alta
 */
export async function GET() {
  const { data, error } = await supabase
    .from('genre')
    .select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}