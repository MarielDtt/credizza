import Image from 'next/image';
export default function Home() {
  return (
    <div className="m-auto bg-background-default">
      <Image
        src="/Logo.png"
        width={312}
        height={240}
        alt="Logo Crediza"
        className='m-auto mt-8'
      />

      <p className="h-1 mt-8 text-2xl font-bold text-center xl:text-6xl :">  🚧 Sitio en Construcción 🚧  </p>
      <div className='p-4 mt-12'>
        <p className='text-xl text-center xl:text-4xl '> Muy pronto tendremos novedades para vos </p>
      </div>
      <div className='flex justify-center m-auto mt-12 space-x-4'>
        <a
          href="https://facebook.com/credizza"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Ir a Facebook
        </a>

        <a
          href="https://wa.me/541162108715"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Escribir por WhatsApp
        </a>

      </div>
      <p className='mt-24 text-center text-gray-400'> © 2025 Credizza </p>
    </div>
  );
}
