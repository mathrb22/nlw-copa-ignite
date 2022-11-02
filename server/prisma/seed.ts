import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			avatarUrl: 'https://github.com/mathrb22.png',
		},
	});

	const pool = await prisma.pool.create({
		data: {
			title: 'Example Pool',
			code: 'BOL123',
			ownerId: user.id,
			participants: {
				create: {
					userId: user.id,
				},
			},
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-18T12:00:00.173Z',
			firstTeamCountryCode: 'DE',
			secondTeamCountryCode: 'BR',
		},
	});

	await prisma.game.create({
		data: {
			date: '2022-11-22T12:00:00.173Z',
			firstTeamCountryCode: 'BR',
			secondTeamCountryCode: 'AR',

			guesses: {
				create: {
					firstTeamPoints: 2,
					secondTeamPoints: 1,
					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id,
							},
						},
					},
				},
			},
		},
	});
}

main();
