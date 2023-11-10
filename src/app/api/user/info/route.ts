import jwt from 'jsonwebtoken'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('Authorization')
    const decoded = token ? jwt.verify(token, '123') : null

    return Response.json({ decoded })
  } catch (error) {
    return Response.json({ msg: 'invalid token' }, { status: 401 })
  }
}
