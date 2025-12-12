import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './supabase'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        // Main Platform Admin authentication
        const mainAdminEmail = 'sherifrosas.ai@gmail.com'
        const mainAdminPassword = '777930#Sh'
        
        // Additional admin authentication (from env)
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

        // Check main platform admin first
        if (credentials.email === mainAdminEmail && credentials.password === mainAdminPassword) {
          return {
            id: 'main-admin',
            email: mainAdminEmail,
            name: 'Main Platform Admin',
            role: 'main-admin',
          }
        }

        // Check additional admin
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: 'admin',
            email: adminEmail,
            name: 'Admin',
            role: 'admin',
          }
        }

        // Test user authentication (bypass password for test users)
        // Check if user exists in database
        try {
          const user = await db.getUserByEmail(credentials.email)
          if (user) {
            // Allow login for any test user (no password check)
            return {
              id: user.id,
              email: user.email,
              name: user.name || 'Test User',
              role: 'user',
            }
          }
        } catch (error) {
          console.error('Error checking test user:', error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('signIn callback called:', {
        provider: account?.provider,
        email: user.email,
        hasAccount: !!account,
      })
      
      if (account?.provider === 'google') {
        try {
          // Use Supabase instead of Prisma
          const existingUser = await db.getUserByEmail(user.email || '')

          if (!existingUser) {
            // Generate a unique ID for the user (using crypto.randomUUID)
            const userId = crypto.randomUUID()
            
            try {
              await db.createUser({
                id: userId,
                email: user.email || '',
                // gmailId is currently not part of the Supabase user type; omit it here
                name: user.name || '',
                emailVerified: false,
                phoneVerified: false,
              })
              console.log('User created successfully:', userId)
            } catch (createError) {
              console.error('Error creating user:', createError)
              // Don't block login - continue even if user creation fails
            }
          } else {
            // Update existing user (without gmailId, which is not in the update type)
            try {
              await db.updateUser(existingUser.id, {
                name: user.name || existingUser.name || undefined,
              })
              console.log('User updated successfully:', existingUser.id)
            } catch (updateError) {
              console.error('Error updating user:', updateError)
              // Don't block login - continue even if update fails
            }
          }
        } catch (error) {
          console.error('Error in signIn callback:', error)
          // Don't block login if user creation fails
          // Return true to allow login to proceed
        }
      }
      // Always return true to allow login
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (!session?.user) {
        return session
      }
      
      // Safely extract token values - ensure they're not functions
      const tokenId = token?.id
      const tokenRole = token?.role
      
      // Set user ID - only if it's a valid value (not a function)
      if (tokenId !== undefined && tokenId !== null) {
        if (typeof tokenId === 'string') {
          (session.user as any).id = tokenId
        } else if (typeof tokenId !== 'function') {
          (session.user as any).id = String(tokenId)
        }
      }
      
      // Set user role - default to 'user' if not set
      if (tokenRole !== undefined && tokenRole !== null) {
        if (typeof tokenRole === 'string') {
          (session.user as any).role = tokenRole
        } else if (typeof tokenRole !== 'function') {
          (session.user as any).role = String(tokenRole)
        } else {
          (session.user as any).role = 'user'
        }
      } else {
        (session.user as any).role = 'user'
      }
      
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

