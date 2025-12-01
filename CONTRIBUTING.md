# Contributing Guide

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local`
4. Configure all environment variables
5. Set up database: `npm run db:push`
6. Seed database: `npm run db:seed`
7. Run development server: `npm run dev`

## Code Style

- Use TypeScript for all new code
- Follow Next.js 14 App Router conventions
- Use Tailwind CSS for styling
- Follow existing code patterns

## Testing

- Test all user flows
- Test admin functions
- Test payment processing
- Test advertisement closure/reactivation

## Environment Variables

Always check `REQUIRED_CONFIGURATION.md` for required variables.

## Database Changes

1. Update `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Run `npm run db:push` or create migration

## API Routes

- All routes should have proper error handling
- Use NextAuth for authentication
- Validate all inputs
- Return consistent JSON responses

## Security

- Never commit `.env.local`
- Always validate user input
- Use parameterized queries
- Verify user permissions

## Pull Request Process

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Update documentation if needed
5. Submit pull request


