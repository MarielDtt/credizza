'use client';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { Button } from '@/components/buttons';
import { useRouter } from 'next/navigation';


const QuienesSomos = () => {

    const router = useRouter();
    const handlerButtonHome = () => {

        router.push('/');
    }

    return (
        <div>
            <h1 className="mt-6 text-center text-heading1 lg:text-display">
                Quienes Somos
            </h1>

            <div className="mx-4 mt-6 space-y-4">
                {/* HISTORIA */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: '#1f2937' }} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component="span" className="!text-bodyBoldMobile">
                            Nuestra Historia

                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className="!text-smallMobile text-texto-secundario space-y-2">
                            <p className="leading-relaxed text-justify">
                                Credizza nació de un grupo de emprendedores con más de 15 años de experiencia en el rubro de créditos para jubilados nacionales.
                            </p>
                            <p className="leading-relaxed text-justify">
                                La pandemia marcó un antes y un después: vimos la necesidad urgente de ofrecer alternativas accesibles tanto para nuestros clientes como para el equipo que nos acompaña.
                            </p>
                            <p className="leading-relaxed text-justify">
                                Así fue como empezamos a implementar productos 100% remotos, que permiten gestionar todo sin salir de casa.
                            </p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* MISIÓN */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: '#1f2937' }} />}
                    >
                        <Typography className="!text-bodyBoldMobile">
                            Nuestra Misión
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className="!text-smallMobile text-texto-secundario space-y-2">
                            <p className="leading-relaxed text-justify">
                                Somos una empresa que brinda soluciones financieras para todos, de forma ágil, rápida y simple.
                            </p>
                            <p className="leading-relaxed text-justify">
                                Lo hacemos a través de productos crediticios pensados para adaptarse a las necesidades reales de cada persona.
                            </p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* VISIÓN */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: '#1f2937' }} />}
                    >
                        <Typography component="span" className="!text-bodyBoldMobile">
                            Nuestra Visión
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className="!text-smallMobile text-texto-secundario space-y-2">
                            <p className="leading-relaxed text-justify">
                                Ser la empresa comercializadora líder en el mercado de los préstamos personales, destacándonos por ofrecer soluciones financieras simples, humanas y accesibles.
                            </p>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* VALORES */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: '#1f2937' }} />}
                    >
                        <Typography component="span" className="!text-bodyBoldMobile">
                            Nuestros Valores
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className="!text-smallMobile text-texto-secundario">
                            <ul className="pl-4 space-y-1 list-disc">
                                <li className="font-semibold">Asesoramiento permanente</li>
                                <p className="leading-relaxed text-justify"> Acompañamos a cada persona en todo momento, brindando respuestas claras y apoyo continuo.</p>
                                <li className="pt-2 font-semibold">Calidad de servicio</li>
                                <p className="leading-relaxed text-justify"> Nos esforzamos por ofrecer una atención rápida, eficiente y cordial en cada consulta.</p>
                                <li className="pt-2 font-semibold">Empatía</li>
                                <p className="leading-relaxed text-justify">Entendemos que cada situación es única, por eso escuchamos con respeto y sin juicios.</p>
                                <li className="pt-2 font-semibold">Innovación</li>
                                <p className="leading-relaxed text-justify">Apostamos a soluciones modernas y accesibles, para que pedir un crédito sea cada vez más simple.</p>
                                <li className="pt-2 font-semibold">Compromiso</li>
                                <p className="leading-relaxed text-justify">Estamos presentes de principio a fin, cumpliendo con responsabilidad y cercanía.</p>
                            </ul>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* NUESTRO EQUIPO (CORREGIDO) */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: '#1f2937' }} />}
                    >
                        <Typography component="span" className="!text-bodyBoldMobile">
                            Nuestro Equipo
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography className="!text-bodyBoldMobile !text-texto-principal text-center">
                            Las Personas que hacen Credizza
                        </Typography>

                        {/* BLOQUE NORMAL (NO FLEX) */}
                        <div className="mt-3">
                            {/* FOTO CÍRCULO PERFECTO */}
                            <div className="float-left mr-3 mb-2 h-[80px] w-[80px] rounded-full overflow-hidden relative">
                                <Image
                                    src="/CallCenter.webp"
                                    alt="Equipo Credizza"
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: 'center 20%' }}
                                    sizes="80px"
                                />
                            </div>

                            {/* TEXTO ENVOLVIENDO */}
                            <div className="leading-relaxed text-justify text-smallMobile text-texto-secundario">
                                <p className="mb-2">
                                    Detrás de Credizza hay personas reales, con experiencia, empatía y vocación de servicio.
                                </p>
                                <p className="mb-2">
                                    Nos une el compromiso de acompañar a cada cliente con claridad, respeto y cercanía.
                                </p>
                                <p className="mb-2">
                                    Trabajamos en equipo para que cada consulta sea respondida con calidez y cada solución esté pensada desde el lado humano.
                                </p>
                                <p>
                                    Creemos que una buena atención comienza por escuchar y termina con una sonrisa del otro lado.
                                </p>
                            </div>

                            {/* CORTA EL FLOAT */}
                            <div className="clear-both" />
                        </div>

                        {/* HORARIOS */}
                        <Typography className="!text-bodyBoldMobile !text-texto-principal pt-4">
                            Nuestros asesores se encuentran disponibles:
                        </Typography>

                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-2">
                                <AccessTimeIcon sx={{ fontSize: 18 }} />
                                <Typography className="!text-smallMobile">
                                    Lunes a Viernes de 10:00 a 20:00 hs.
                                </Typography>
                            </div>
                            <div className="flex items-center gap-2">
                                <EventIcon sx={{ fontSize: 18 }} />
                                <Typography className="!text-smallMobile">
                                    Sábados de 09:00 a 13:00 hs.
                                </Typography>
                            </div>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
            <Button text="Home" className="my-12 bg-boton-neutral text-texto-botones" onClick={handlerButtonHome} />
        </div>
    );
};

export default QuienesSomos;
