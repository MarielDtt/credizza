"use client";

import { useState } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "@/components/forms/ContactForm";
import { Button } from "@/components/buttons";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";

const mediosContacto = [
    {
        title: "Mail",
        href: "mailto:credizza@gmail.com",
        icon: EmailOutlinedIcon,
    },
    {
        title: "Teléfono",
        href: "tel:+541126289448",
        icon: PhoneOutlinedIcon,
    },
    {
        title: "Whatsapp",
        href: "https://wa.me/541166669143",
        icon: WhatsAppIcon,
    },
    {
        title: "Facebook",
        href: "https://www.facebook.com/credizza",
        icon: FacebookIcon,
    },
];

const ubicaciones = [
    {
        title: "Zona Villa Devoto",
        mapSrc: "https://www.google.com/maps?q=Villa+Devoto,+CABA&z=14&output=embed",
    },
    {
        title: "Zona Plaza Congreso",
        mapSrc: "https://www.google.com/maps?q=Plaza+Congreso,+CABA&z=14&output=embed",
    },
];

const Contactos = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tieneOferta, setTieneOferta] = useState<"si" | "no" | "">("");
    const [dni, setDni] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    const [dniError, setDniError] = useState("");
    const [whatsappError, setWhatsappError] = useState("");
    const [ofertaError, setOfertaError] = useState("");

    const isFormValid = tieneOferta !== "" && dni.length === 8 && whatsapp.length === 10;

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setOpenModal(false);
        setTieneOferta("");
        setDni("");
        setWhatsapp("");
        setDniError("");
        setWhatsappError("");
        setOfertaError("");
    };

    const validar = () => {
        let valid = true;

        if (!tieneOferta) {
            setOfertaError("Seleccioná si ya tenés una oferta.");
            valid = false;
        } else {
            setOfertaError("");
        }

        if (dni.length !== 8) {
            setDniError("Ingresá tu DNI (8 números). Si tiene 7, agregá un 0 adelante.");
            valid = false;
        } else {
            setDniError("");
        }

        if (whatsapp.length !== 10) {
            setWhatsappError("Ingresá tu WhatsApp con 10 números (sin 0 ni 15).");
            valid = false;
        } else {
            setWhatsappError("");
        }

        return valid;
    };

    const handleSendMail = () => {
        if (!validar()) return;

        const subject = encodeURIComponent("Solicitud de turno - Credizza");
        const body = encodeURIComponent(
            `Solicitud de turno

¿Ya tenés oferta?: ${tieneOferta === "si" ? "Sí" : "No"}
DNI: ${dni}
WhatsApp: ${whatsapp}`
        );

        window.location.href = `mailto:credizza@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <section className="w-full px-4 bg-background-default py-14 lg:py-20">
                <div className="flex w-full max-w-[1200px] flex-col ">
                    <h1 className="text-center text-heading1 text-text-primary lg:text-display">
                        Medios de contacto
                    </h1>

                    <div className="flex items-start justify-between w-full gap-2 mt-12 lg:mt-16 lg:justify-center lg:gap-24">
                        {mediosContacto.map(({ title, href, icon: Icon }) => (
                            <a
                                key={title}
                                href={href}
                                target={title === "Facebook" || title === "Whatsapp" ? "_blank" : "_self"}
                                rel="noreferrer"
                                aria-label={title}
                                className="flex w-[72px] flex-col items-center gap-2 text-center transition-transform duration-200 hover:scale-105 lg:w-auto lg:gap-3"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7cd454] shadow-md transition hover:brightness-95 lg:h-20 lg:w-20">
                                    <Icon className="!h-6 !w-6 text-white lg:!h-8 lg:!w-8" />
                                </div>

                                <span className="text-xs font-medium text-text-primary lg:text-base">
                                    {title}
                                </span>
                            </a>
                        ))}
                    </div>

                    <div className="mt-12 w-full max-w-[680px] rounded-sm bg-[#E85C47] px-4 py-3 text-center text-xs font-medium text-white shadow-sm lg:mt-10 lg:px-6 lg:py-3 lg:text-sm mx-auto">
                        Horarios de atención: Lunes a viernes de 8:00 a 20:00 hs. – Sábados: de 9:00 a 13:00 hs.
                    </div>

                    <div className="w-full mt-12 contacto-page lg:mt-8">
                        <div className="mx-2 form-contacto lg:w-full lg:mt-8 lg:ml-8">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 pt-8 bg-background-default pb-14 lg:px-6 lg:pt-12 lg:pb-20">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col">
                    <div className="mb-12 lg:mb-14">
                        <h2 className="text-heading2 text-text-primary lg:text-heading1">
                            Dónde encontrarnos
                        </h2>

                        <p className="mt-3 max-w-[820px] text-sm text-text-primary lg:text-base">
                            Trabajamos con turno previo para una mejor organización.
                            Podés encontrarnos en Zona de Villa Devoto y en la zona de Congreso.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                        {ubicaciones.map((ubicacion) => (
                            <div
                                key={ubicacion.title}
                                className="overflow-hidden bg-white border shadow-md rounded-2xl border-black/10"
                            >
                                <div className="px-5 py-4">
                                    <h3 className="text-lg font-semibold text-center text-text-primary">
                                        {ubicacion.title}
                                    </h3>
                                </div>

                                <div className="h-[280px] w-full">
                                    <iframe
                                        src={ubicacion.mapSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        title={ubicacion.title}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-10 lg:mt-12">
                        <Button
                            text="Solicitar turno"
                            className="bg-boton-primario hover:bg-hover-primario"
                            onClick={handleOpenModal}
                            type="button"
                        />
                    </div>
                </div>
            </section>

            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                fullWidth
                maxWidth="sm"
                scroll="paper"
                PaperProps={{
                    sx: {
                        borderRadius: "20px",
                        width: "calc(100% - 32px)",
                        margin: "16px",
                        maxHeight: "calc(100dvh - 32px)",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.3rem", sm: "2rem" },
                        color: "#1f2937",
                        textAlign: "center",
                        pt: { xs: 3, sm: 4 },
                        pb: 2,
                        position: "relative",
                    }}
                >
                    Solicitar turno
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{ position: "absolute", right: 12, top: 12 }}
                        aria-label="Cerrar"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    sx={{
                        px: 4,
                        pb: 4,
                        overflowY: "auto",
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="mb-3 text-sm font-medium text-text-primary">
                                ¿Ya tenés oferta?
                            </p>

                            <RadioGroup
                                row
                                value={tieneOferta}
                                onChange={(e) => setTieneOferta(e.target.value as "si" | "no")}
                            >
                                <FormControlLabel
                                    value="si"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#7cd454",
                                                "&.Mui-checked": { color: "#7cd454" },
                                            }}
                                        />
                                    }
                                    label="Sí"
                                />
                                <FormControlLabel
                                    value="no"
                                    control={
                                        <Radio
                                            sx={{
                                                color: "#7cd454",
                                                "&.Mui-checked": { color: "#7cd454" },
                                            }}
                                        />
                                    }
                                    label="No"
                                />
                            </RadioGroup>

                            {ofertaError && (
                                <p className="mt-1 text-xs text-red-500">{ofertaError}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-text-primary">
                                Ingresá 8 números. Si tu DNI tiene 7, agregá un 0 adelante.
                            </p>

                            <TextField
                                label="DNI"
                                value={dni}
                                onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
                                size="small"
                                fullWidth
                            />

                            {dniError && (
                                <p className="text-xs text-red-500">{dniError}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-xs text-text-primary">
                                Ingresá 10 números, sin 0 adelante y sin 15. Ejemplo: 1123456789.
                            </p>

                            <TextField
                                label="WhatsApp"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ""))}
                                size="small"
                                fullWidth
                            />

                            {whatsappError && (
                                <p className="text-xs text-red-500">{whatsappError}</p>
                            )}
                        </div>

                        <div className="flex justify-end mt-2">
                            <Button
                                text="Enviar"
                                className={
                                    isFormValid
                                        ? "bg-boton-primario hover:bg-hover-primario"
                                        : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                                }
                                onClick={handleSendMail}
                                type="button"
                                disabled={!isFormValid}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Contactos;