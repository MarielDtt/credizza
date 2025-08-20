import Image from 'next/image';
export default function Home() {
  return (
    <div className="m-auto bg-background-default">
      <Image
        src="/Logo.png"
        width={212}
        height={140}
        alt="Logo Crediza"
        className='m-auto mt-8'
      />

      <p className="h-1 mt-16 text-6xl font-bold text-center">  🚧 Sitio en Construcción 🚧  </p>
      <div className='p-4 mt-16'>
        <p className='mt-12 text-4xl text-center'> Muy pronto tendremos novedades para vos </p>
      </div>
      <div className='flex justify-center m-auto mt-8 space-x-4'>
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
      <p className='mt-8 text-center'> © 2025 Credizza </p>
    </div>
  );
}
