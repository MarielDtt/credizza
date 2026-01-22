'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

export default function HomeCarousel() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const slides = [
    { src: '/Jubilados.webp', alt: 'Imagen de jubilados' },
    { src: '/Privados.webp', alt: 'Imagen de empleados privados' },
    { src: '/Estatales.webp', alt: 'Imagen de empleados estatales' },
    { src: '/Boton-2.webp', alt: 'Imagen con botón de contáctanos' }, // última con CTA
  ];

  const handleCtaClick = () => {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:open']);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        autoplay={
          isDesktop
            ? false
            : {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        navigation={
          isDesktop
            ? {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }
            : false
        }
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{
          600: { slidesPerView: 1, spaceBetween: 16 },
          900: { slidesPerView: 1, spaceBetween: 24 },
        }}
      >
        {slides.map((s, idx) => {
          const isCtaSlide = idx === slides.length - 1;

          return (
            <SwiperSlide key={s.src}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: isDesktop ? 640 : 360,
                    height: isDesktop ? 'auto' : 300,
                    aspectRatio: isDesktop ? '940 / 788' : undefined,
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={idx === 0}
                    style={{ objectFit: 'cover' }}
                  />

                  {/* Botón superpuesto SOLO en la última slide */}
                  {isCtaSlide && (
                    <button
                      type="button"
                      onClick={handleCtaClick}
                      aria-label="Comenzar ahora"
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '52%',
                        transform: 'translate(-50%, -50%)',
                        padding: '12px 18px',
                        borderRadius: 10,
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: '16px',
                        color: '#FFFFFF',
                        background: '#7CFF6B',
                        boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
                      }}
                    >
                      Comenzar ahora
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Flechas SOLO en desktop (mobile no se modifica) */}
      {isDesktop && (
        <>
          <button
            className="swiper-prev"
            aria-label="Anterior"
            style={{
              position: 'absolute',
              left: 'calc(48% - 360px)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: 44,
              height: 44,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.8)',
              boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              fontSize: 28,
              lineHeight: '44px',
            }}
          >
            ‹
          </button>

          <button
            className="swiper-next"
            aria-label="Siguiente"
            style={{
              position: 'absolute',
              right: 'calc(48% - 360px)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 20,
              width: 44,
              height: 44,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.8)',
              boxShadow: '0 8px 18px rgba(0,0,0,0.12)',
              fontSize: 28,
              lineHeight: '44px',
              animation: 'pulseArrow 1.8s ease-in-out infinite',
            }}
          >
            ›
          </button>

          <style jsx>{`
            @keyframes pulseArrow {
              0% {
                opacity: 1;
                transform: translateY(-50%) translateX(0);
              }
              50% {
                opacity: 0.65;
                transform: translateY(-50%) translateX(3px);
              }
              100% {
                opacity: 1;
                transform: translateY(-50%) translateX(0);
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}
