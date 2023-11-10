import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  const token = jwt.sign({ name: 'abc' }, '123', { expiresIn: '1m' })

  return Response.json({ token })
}
