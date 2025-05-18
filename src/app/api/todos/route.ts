import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET /api/todos
export async function GET() {
  const { data: todos, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(todos);
}

// POST /api/todos
export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }

  const { data: todo, error } = await supabase.from('todos').insert([{ text }]).select().single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(todo);
}
