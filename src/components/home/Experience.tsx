'use client'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Experience() {
  const experience = [
    {
      id: 1,
      name: "Liliana G.",
      age: 64,
      rating: 5,
      testimonial: "Al principio desconfiaba, pero fueron súper cordiales y claros. Vinieron en el día y cumplieron con lo prometido.",
      avatar: "/LilianaG.webp"
    },
    {
      id: 2,
      name: "Soledad D.",
      age: 36,
      rating: 5,
      testimonial: "“Súper rápido. Trabajo en administración pública y no podía ir al banco.Vinieron a mi trabajo y cobré en el día. Recomiendo totalmente.”",
      avatar: "/SoledadD.webp"
    },
    {
      id: 3,
      name: "Margarita P.",
      age: 63,
      rating: 4,
      testimonial: "“Recomendable ,excelente servicio...”",
      avatar: "/MargaritaP.webp"
    },
    {
      id: 4,
      name: "Fabiana P.",
      age: 59,
      rating: 5,
      testimonial: "“Muy recomendable.Excelente atención muy confiable 👏”",
      avatar: "/FabianaP.webp"
    }
  ];

  const [isDesktop, setIsDesktop] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="px-4 mb-28">
      <h1 className="pb-6 text-center text-heading2 lg:hidden">
        Experiencias con Credizza
      </h1>

      <div className="lg:flex lg:items-start lg:justify-center lg:gap-12 lg:px-8">
        {/* Columna izquierda SOLO desktop */}
        <div className="hidden lg:flex lg:flex-none lg:w-[380px] lg:flex-col space-y-0.5">
          <p className="m-0 -mb-6 text-[80px] leading-none text-boton-primario">“</p>
          <p className="m-0 leading-tight text-display">Qué dicen</p>
          <p className="m-0 leading-tight text-display">
            <span className="text-boton-primario">nuestros</span> usuarios
          </p>

          {isDesktop && (
            <div className="flex gap-3 pt-8 mt-6">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition
                  ${isBeginning
                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-boton-primario text-white hover:opacity-90'}
                `}
              >
                <ArrowBackIcon fontSize="small" />
              </button>

              <button
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition
                  ${isEnd
                    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-boton-primario text-white hover:opacity-90'}
                `}
              >
                <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          )}
        </div>

        {/* MOBILE: bloque intacto */}
        {!isDesktop && (
          <Card
            sx={{
              boxShadow: '0px 4px 8px rgba(0, 0, 16, 0.25)',
              borderRadius: 4,
              backgroundColor: 'background.default',
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            <CardContent className="p-0">
              <Swiper
                navigation={!isDesktop}
                modules={[Navigation]}
                className="mySwiper"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
                }}
              >
                {experience.map((exp) => (
                  <SwiperSlide key={exp.id}>
                    <div className="flex items-center gap-4">
                      <Avatar
                        alt={exp.name}
                        src={exp.avatar}
                        sx={{
                          width: isDesktop ? 72 : 56,
                          height: isDesktop ? 72 : 56,
                          overflow: 'hidden',
                          '& img': {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center 20%',
                            display: 'block',
                          },
                        }}
                      />
                      <div className="flex flex-col pl-4">
                        <p className="pt-2 text-bodyBoldMobile lg:text-[18px] lg:font-semibold">
                          {exp.name} <span className="text-body">{exp.age} años</span>
                        </p>
                        <Rating value={exp.rating} readOnly size={isDesktop ? "medium" : "small"} />
                      </div>
                    </div>

                    <p className="px-8 pt-4 text-left text-body lg:text-[18px] lg:leading-relaxed lg:px-6">
                      {exp.testimonial}
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </CardContent>
          </Card>
        )}

        {/* DESKTOP */}
        {isDesktop && (
          <div className="relative z-10 flex-1 w-full min-w-0">
     
            <div className="px-4 py-6 -mx-4 -my-2 overflow-hidden">
              <Swiper
                slidesPerView="auto"
                spaceBetween={24}
                navigation={false}
                modules={[Navigation]}
                className="mySwiperDesktop"
                onSwiper={(s) => {
                  swiperRef.current = s;
                  setIsBeginning(s.isBeginning);
                  setIsEnd(s.isEnd);
                }}
                onSlideChange={(s) => {
                  setIsBeginning(s.isBeginning);
                  setIsEnd(s.isEnd);
                }}
                allowTouchMove={false}
                simulateTouch={false}
                touchStartPreventDefault={false}
              >
                {experience.map((exp) => (
                  <SwiperSlide key={exp.id} className="!w-[440px]">
                    <Card
                      sx={{
                        // Sombra más elegante para fondos claros (sin “placa”)
                        boxShadow: '0px 8px 22px rgba(0,0,0,0.10)',
                        borderRadius: 4,
                        backgroundColor: 'background.default',
                        border: '1px solid rgba(0,0,0,0.04)', // separa sin ensuciar
                        height: 260, // alto fijo (todas iguales)
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          padding: 3, // aire interno
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar src={exp.avatar} sx={{ width: 72, height: 72 }} />
                          <div>
                            <p className="font-semibold text-[18px]">
                              {exp.name} <span>{exp.age} años</span>
                            </p>
                            <Rating value={exp.rating} readOnly />
                          </div>
                        </div>

                        {/* tipografía body */}
                        <p
                          className="pt-4 text-body"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: 110,
                          }}
                        >
                          {exp.testimonial}
                        </p>

                        <div className="flex-1" />
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
        <style jsx global>{`
        /* Padding del carrusel para que la sombra NO se corte con overflow hidden */
        .mySwiperDesktop {
          padding: 16px 24px;
        }
      `}</style>
      </div>
    </div>
  );
}
