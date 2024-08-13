import { initFirebaseAdmin } from '@/config/firebase-admin'
import { clerkClient, getAuth } from '@clerk/nextjs/server'
import { getAuth as getAdminAuth } from 'firebase-admin/auth'

export async function POST(req) {
  try {
    initFirebaseAdmin()
    const { userId } = getAuth(req)

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
      })
    }

    const user = await clerkClient.users.getUser(userId)

    const firebaseToken = await getAdminAuth().createCustomToken(user.id, {
      email: user.primaryEmailAddress.emailAddress,
    })

    return new Response(JSON.stringify({ firebaseToken }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error generating Firebase token:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    })
  }
}
