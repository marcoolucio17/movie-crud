import { supabase } from '@/lib/supabaseClient';

/**
 * Método PUT para actualizar cierta película en la base de datos
 * @param req 
 * @param param1 
 * @returns JSON del resultado
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const body = await req.json();

  const { data, error } = await supabase
    .from('movie')
    .update({
      title: body.title,
      rating: body.rating,
      review: body.review,
      genre: body.genre,
    })
    .eq('id', id)
    .select();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

/**
 * Método DELETE para eliminar cierta película
 * @param id: ID de la película a eliminar
 * @returns JSON del resultado
 */
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  const { error } = await supabase
    .from('movie')
    .delete()
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(null, { status: 204 });
}
