import { prisma } from '@/lib/prisma'

export default async (req, res) => {
    const users = await prisma.board.findMany({
        include: {
            lists: {
                include: {
                    cards: { include: { status: { select: { value: true } } } },
                },
            },
        },
    })
    return res.json(users)
}
