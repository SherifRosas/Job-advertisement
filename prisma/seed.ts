import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create default settings
  const settings = await prisma.settings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      advertisementStatus: 'active',
      bankName: 'National Bank of Egypt',
      bankAccountNumber: 'To be configured',
      bankDetails: 'Please configure bank account details in admin settings',
      interviewLocation: 'To be announced',
      adminGmail: process.env.ADMIN_GMAIL || 'sherifrosas.ai@gmail.com',
      advertisementStartDate: new Date(),
      selectionDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  console.log('✅ Default settings created:', settings.id)
  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


