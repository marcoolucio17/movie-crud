import { supabase } from '@/lib/supabaseClient';

/**
 * Método GET para conseguir todas las películas
 * @returns JSON de las películas
 */
export async function GET() {
  const { data, error } = await supabase
    .from('movie')
    .select('*, genre(name)');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const formatted = data.map(({ genre, ...movie }) => ({
    ...movie,
    genre: genre?.name || null,
  }));

  return new Response(JSON.stringify(formatted), { status: 200 });
}


/**
 * Método POST para dar de alta una nueva peli
 * @param req : request hecha por el cliente
 * @returns JSON conteniendo un string del resultado
 */
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from('movie')
    .insert([body])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
}
