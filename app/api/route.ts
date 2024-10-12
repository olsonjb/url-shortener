import urls from '@/app/lib/urls';
import { v4 as uuid } from 'uuid';

export async function POST(request: Request) {
  const { url } = await request.json();
  const slug = uuid().slice(0, 7);

  urls[slug] = url;

  return new Response(JSON.stringify({ slug }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET() {
  return new Response(JSON.stringify(urls), {
    headers: { 'Content-Type': 'application/json' },
  });
}