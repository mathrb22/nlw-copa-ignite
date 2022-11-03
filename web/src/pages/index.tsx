import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GetStaticProps } from 'next';

interface HomeProps {
	poolCount: number;
	guessCount: number;
	userCount: number;
}

export default function Home(props: HomeProps) {
	const [poolTitle, setPoolTitle] = useState<string>('');
	const [isCreatingPool, setIsCreatingPool] = useState<boolean>(false);

	async function createPool(event: FormEvent) {
		setIsCreatingPool(true);
		event.preventDefault();

		toast.promise(
			api
				.post(
					'pools',
					{
						title: poolTitle,
					},
					{
						timeout: 10000,
					}
				)
				.then(
					(response) =>
						new Promise((resolve) => {
							setTimeout(() => {
								const { code } = response.data;
								navigator.clipboard.writeText(code);
								setPoolTitle('');
								setIsCreatingPool(false);
								resolve(code);
							}, 1000);
						})
				)
				.catch((err) => {
					setPoolTitle('');
					setIsCreatingPool(false);
					throw err;
				}),

			{
				loading: 'Criando o bolão...',
				success:
					'Bolão criado com sucesso, e o seu código foi copiado para a área de transferência! 👏',
				error: 'Erro ao criar o bolão, tente novamente!',
			},
			{
				className: 'toast-container',
				duration: 5000,
			}
		);
	}

	return (
		<div className='max-w-[1124px] h-screen px-8 mx-auto flex items-center flex-col lg:flex-row gap-16 sm:gap-16 md:gap-16 lg:gap-16 xl:gap-24 2xl:gap-24 py-12 lg:py-0'>
			<main className='max-w-[680px]  lg:max-w-lg mx-auto'>
				<Image src={logoImg} alt='NLW Copa' />

				<h1 className='mt-14 text-white font-bold text-3xl sm:text-4xl md:text-[2.8em] leading-tight'>
					Crie seu próprio bolão da copa e compartilhe entre amigos!
				</h1>

				<div className='mt-10 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<Image src={usersAvatarExampleImg} alt='' className='w-32 sm:w-36' />
					<strong className='text-gray-100 text-xl'>
						<span className='text-nlw-green-500'>+{props.userCount}</span> pessoas já
						estão usando
					</strong>
				</div>

				<form
					onSubmit={createPool}
					className='mt-10 flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-2'>
					<input
						type='text'
						value={poolTitle}
						onChange={(event) => setPoolTitle(event.target.value)}
						required
						placeholder='Qual nome do seu bolão?'
						className='flex-1 w-full md:w-auto py-4 px-6 rounded bg-gray-800 placeholder:text-gray-200 text-gray-100 border border-gray-600 text-sm'
					/>
					<button
						type='submit'
						disabled={isCreatingPool}
						className='py-4 px-6 w-full md:w-auto rounded bg-nlw-yellow-500 text-sm uppercase font-bold text-gray-900 hover:bg-nlw-yellow-700 transition-colors'>
						Criar meu bolão
					</button>
				</form>

				<p className='mt-4 text-gray-300 text-sm leading-relaxed'>
					Após criar seu bolão, você receberá um código único que poderá usar para
					convidar outras pessoas 🚀
				</p>

				<div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-start flex-row md:items-center gap-4 md:gap-0 text-gray-100'>
					<div className='flex items-center gap-6'>
						<Image src={iconCheckImg} alt='' />
						<div className='flex flex-col gap-1'>
							<span className='text-2xl font-bold'>+{props.poolCount}</span>
							<span>Bolões criados</span>
						</div>
					</div>

					<div className='w-px h-14 bg-gray-600'></div>

					<div className='flex items-center gap-6'>
						<Image src={iconCheckImg} alt='' />
						<div className='flex flex-col gap-1'>
							<span className='text-2xl font-bold'>+{props.guessCount}</span>
							<span>Palpites enviados</span>
						</div>
					</div>
				</div>
			</main>
			<Image
				src={appPreviewImg}
				alt='Imagem de dois celulares exibindo uma prévia da aplicação móvel do NLW Copa'
				quality={100}
				className='pb-12 lg:pb-0'
			/>
			<Toaster />
		</div>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const [poolCountResponse, guessCountResponse, userCountResponse] =
		await Promise.all([
			api.get('pools/count'),
			api.get('guesses/count'),
			api.get('users/count'),
		]);
	return {
		props: {
			poolCount: poolCountResponse.data.count,
			guessCount: guessCountResponse.data.count,
			userCount: userCountResponse.data.count,
		},
		revalidate: 15 * 60,
	};
};
