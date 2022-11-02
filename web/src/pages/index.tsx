import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';

export default function Home() {
	return (
		<div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
			<main>
				<Image src={logoImg} alt='NLW Copa' />

				<h1 className='mt-14 text-white font-bold text-[2.8em] leading-tight'>
					Crie seu próprio bolão da copa e compartilhe entre amigos!
				</h1>

				<div className='mt-10 flex items-center gap-2'>
					<Image src={usersAvatarExampleImg} alt='' />
					<strong className='text-gray-100 text-xl'>
						<span className='text-nlw-green-500'>+12.592</span> pessoas já estão
						usando
					</strong>
				</div>

				<form className='mt-10 flex items-center gap-2'>
					<input
						type='text'
						required
						placeholder='Qual nome do seu bolão?'
						className='flex-1 py-4 px-6 rounded bg-gray-800 placeholder:text-gray-200 text-gray-100 border border-gray-600 text-sm'
					/>
					<button
						type='submit'
						className='py-4 px-6 rounded bg-nlw-yellow-500 text-sm uppercase font-bold text-gray-900 hover:bg-nlw-yellow-700 transition-colors'>
						Criar meu bolão
					</button>
				</form>

				<p className='mt-4 text-gray-300 text-sm leading-relaxed'>
					Após criar seu bolão, você receberá um código único que poderá usar para
					convidar outras pessoas 🚀
				</p>

				<div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
					<div className='flex items-center gap-6'>
						<Image src={iconCheckImg} alt='' />
						<div className='flex flex-col gap-1'>
							<span className='text-2xl font-bold'>+2.034</span>
							<span>Bolões criados</span>
						</div>
					</div>

					<div className='w-px h-14 bg-gray-600'></div>

					<div className='flex items-center gap-6'>
						<Image src={iconCheckImg} alt='' />
						<div className='flex flex-col gap-1'>
							<span className='text-2xl font-bold'>+192.847</span>
							<span>Palpites enviados</span>
						</div>
					</div>
				</div>
			</main>
			<Image
				src={appPreviewImg}
				alt='Imagem de dois celulares exibindo uma prévia da aplicação móvel do NLW Copa'
				quality={100}
			/>
		</div>
	);
}
