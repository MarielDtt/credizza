"use client";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import ContactForm from "@/components/forms/ContactForm";
import { Button } from "@/components/buttons";
import {
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { AppointmentErrors, AppointmentValues, validateAppointment } from "./validateAppointment";


const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TURNO_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const mediosContacto = [
    { title: "Mail", href: "mailto:credizza@gmail.com", icon: EmailOutlinedIcon },
    { title: "Teléfono", href: "tel:+541126289448", icon: PhoneOutlinedIcon },
    { title: "Whatsapp", href: "https://wa.me/541166669143", icon: WhatsAppIcon },
    { title: "Facebook", href: "https://www.facebook.com/credizza", icon: FacebookIcon },
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
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [ubicacion, setUbicacion] = useState("");
    const [fecha, setFecha] = useState("");
    const [errors, setErrors] = useState<AppointmentErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof AppointmentValues, boolean>>>({});
    const [solicitudEnviada, setSolicitudEnviada] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!solicitudEnviada) return;

        const timer = setTimeout(() => {
            handleCloseModal();
        }, 8000);

        return () => clearTimeout(timer);
    }, [solicitudEnviada]);

    const values: AppointmentValues = {
        tieneOferta,
        nombre,
        dni,
        whatsapp,
        ubicacion,
        fecha,
    };

    const isFormValid =
        tieneOferta === "si" &&
        nombre.trim() !== "" &&
        dni.length === 8 &&
        whatsapp.length === 10 &&
        ubicacion !== "" &&
        fecha !== "" &&
        Object.keys(validateAppointment(values)).length === 0;

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => {
        setOpenModal(false);
        setTieneOferta("");
        setNombre("");
        setDni("");
        setWhatsapp("");
        setUbicacion("");
        setFecha("");
        setErrors({});
        setTouched({});
        setSolicitudEnviada(false);
        setIsSending(false);
        setErrorMessage("");
    };

    const handleValidate = (newValues: AppointmentValues) => {
        setErrors(validateAppointment(newValues));
    };

    const handleSendMail = async () => {
        const validationErrors = validateAppointment(values);
        setErrors(validationErrors);

        setTouched({
            tieneOferta: true,
            nombre: true,
            dni: true,
            whatsapp: true,
            ubicacion: true,
            fecha: true,
        });

        if (Object.keys(validationErrors).length > 0) return;

        setIsSending(true);
        setErrorMessage("");

        try {
            if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
                setErrorMessage("Faltan configurar las variables de EmailJS.");
                setIsSending(false);
                return;
            }

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: nombre,
                    nombre,
                    dni,
                    telefono: whatsapp,
                    ubicacion,
                    fecha,
                    tiene_oferta: tieneOferta === "si" ? "Sí" : "No",
                },
                PUBLIC_KEY
            );
            setSolicitudEnviada(true);
        } catch {
            setErrorMessage("No pudimos enviar la solicitud. Intentá nuevamente.");
        } finally {
            setIsSending(false);
        }
    };

    const handleWhatsappConsulta = () => {
        window.open(
            "https://wa.me/541166669143?text=Hola,%20quiero%20consultar%20por%20una%20oferta%20de%20pr%C3%A9stamo.",
            "_blank"
        );
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
                        {ubicaciones.map((ubicacionItem) => (
                            <div
                                key={ubicacionItem.title}
                                className="overflow-hidden bg-white border shadow-md rounded-2xl border-black/10"
                            >
                                <div className="px-5 py-4">
                                    <h3 className="text-lg font-semibold text-center text-text-primary">
                                        {ubicacionItem.title}
                                    </h3>
                                </div>

                                <div className="h-[280px] w-full">
                                    <iframe
                                        src={ubicacionItem.mapSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        title={ubicacionItem.title}
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

                <DialogContent sx={{ px: 4, pb: 4, overflowY: "auto" }}>
                    {solicitudEnviada ? (
                        <div className="flex flex-col gap-4 py-2">
                            <Typography variant="h6">Cita en proceso</Typography>

                            <Typography>
                                Tu solicitud fue enviada correctamente. En breve un asesor se comunicará para confirmar el turno e indicarte la dirección.
                            </Typography>

                            <div className="flex justify-end mt-2">
                                <Button
                                    text="Cerrar"
                                    className="bg-boton-primario hover:bg-hover-primario"
                                    onClick={handleCloseModal}
                                    type="button"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <FormControl error={Boolean(touched.tieneOferta && errors.tieneOferta)}>
                                <p className="mb-3 text-sm font-medium text-text-primary">
                                    ¿Ya tenés oferta?
                                </p>

                                <RadioGroup
                                    row
                                    value={tieneOferta}
                                    onChange={(e) => {
                                        const valor = e.target.value as "si" | "no";
                                        setTieneOferta(valor);
                                        setTouched((prev) => ({ ...prev, tieneOferta: true }));

                                        const newValues = {
                                            tieneOferta: valor,
                                            nombre: valor === "no" ? "" : nombre,
                                            dni: valor === "no" ? "" : dni,
                                            whatsapp: valor === "no" ? "" : whatsapp,
                                            ubicacion: valor === "no" ? "" : ubicacion,
                                            fecha: valor === "no" ? "" : fecha,
                                        };

                                        if (valor === "no") {
                                            setNombre("");
                                            setDni("");
                                            setWhatsapp("");
                                            setUbicacion("");
                                            setFecha("");
                                            setTouched({ tieneOferta: true });
                                        }

                                        handleValidate(newValues);
                                    }}
                                >
                                    <FormControlLabel
                                        value="si"
                                        control={<Radio sx={{ color: "#7cd454", "&.Mui-checked": { color: "#7cd454" } }} />}
                                        label="Sí"
                                    />
                                    <FormControlLabel
                                        value="no"
                                        control={<Radio sx={{ color: "#7cd454", "&.Mui-checked": { color: "#7cd454" } }} />}
                                        label="No"
                                    />
                                </RadioGroup>

                                {touched.tieneOferta && errors.tieneOferta && (
                                    <FormHelperText>{errors.tieneOferta}</FormHelperText>
                                )}
                            </FormControl>

                            {tieneOferta === "no" && (
                                <div className="flex flex-col gap-3 p-4 border rounded-xl border-black/10 bg-background-default">
                                    <p className="text-sm font-medium text-text-primary">
                                        Este trámite presencial es solo para préstamos preaprobados dentro de las últimas 72 hs.
                                    </p>

                                    <p className="text-sm text-text-primary">
                                        Si todavía no contás con una oferta, podés consultarnos por WhatsApp para iniciar la evaluación.
                                    </p>

                                    <div className="flex justify-end mt-2">
                                        <Button
                                            text="Ir a WhatsApp"
                                            className="bg-boton-primario hover:bg-hover-primario"
                                            onClick={handleWhatsappConsulta}
                                            type="button"
                                        />
                                    </div>
                                </div>
                            )}
                            {tieneOferta === "si" && (
                                <>
                                    <TextField
                                        label="Nombre"
                                        value={nombre}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setNombre(value);
                                            handleValidate({ tieneOferta, nombre: value, dni, whatsapp, ubicacion, fecha });
                                        }}
                                        onBlur={() => setTouched((prev) => ({ ...prev, nombre: true }))}
                                        size="small"
                                        fullWidth
                                        error={Boolean(touched.nombre && errors.nombre)}
                                        helperText={touched.nombre && errors.nombre ? errors.nombre : ""}
                                    />

                                    <TextField
                                        label="DNI"
                                        value={dni}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                                            setDni(value);
                                            handleValidate({ tieneOferta, nombre, dni: value, whatsapp, ubicacion, fecha });
                                        }}
                                        onBlur={() => {
                                            setTouched((prev) => ({ ...prev, dni: true }));

                                            if (dni.length === 7) {
                                                const fixedDni = `0${dni}`;
                                                setDni(fixedDni);
                                                handleValidate({ tieneOferta, nombre, dni: fixedDni, whatsapp, ubicacion, fecha });
                                            }
                                        }}
                                        size="small"
                                        fullWidth
                                        error={Boolean(touched.dni && errors.dni)}
                                        helperText={touched.dni && errors.dni ? errors.dni : ""}
                                    />

                                    <TextField
                                        label="WhatsApp"
                                        value={whatsapp}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                                            setWhatsapp(value);
                                            handleValidate({ tieneOferta, nombre, dni, whatsapp: value, ubicacion, fecha });
                                        }}
                                        onBlur={() => setTouched((prev) => ({ ...prev, whatsapp: true }))}
                                        size="small"
                                        fullWidth
                                        error={Boolean(touched.whatsapp && errors.whatsapp)}
                                        helperText={touched.whatsapp && errors.whatsapp ? errors.whatsapp : ""}
                                    />

                                    <FormControl fullWidth size="small" error={Boolean(touched.ubicacion && errors.ubicacion)}>
                                        <InputLabel>Elegí ubicación</InputLabel>
                                        <Select
                                            value={ubicacion}
                                            label="Elegí ubicación"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setUbicacion(value);
                                                setFecha("");
                                                setTouched((prev) => ({ ...prev, ubicacion: true, fecha: false }));
                                                handleValidate({ tieneOferta, nombre, dni, whatsapp, ubicacion: value, fecha: "" });
                                            }}
                                            onBlur={() => setTouched((prev) => ({ ...prev, ubicacion: true }))}
                                        >
                                            <MenuItem value="Congreso">Congreso</MenuItem>
                                            <MenuItem value="Devoto">Devoto</MenuItem>
                                        </Select>

                                        {touched.ubicacion && errors.ubicacion && (
                                            <FormHelperText>{errors.ubicacion}</FormHelperText>
                                        )}
                                    </FormControl>

                                    <TextField
                                        label="Fecha"
                                        type="date"
                                        value={fecha}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFecha(value);
                                            handleValidate({ tieneOferta, nombre, dni, whatsapp, ubicacion, fecha: value });
                                        }}
                                        onBlur={() => setTouched((prev) => ({ ...prev, fecha: true }))}
                                        size="small"
                                        fullWidth
                                        disabled={!ubicacion}
                                        InputLabelProps={{ shrink: true }}
                                        error={Boolean(touched.fecha && errors.fecha)}
                                        helperText={touched.fecha && errors.fecha ? errors.fecha : ""}
                                    />

                                    <p className="text-xs text-text-primary">
                                        Las oficinas atienden solo con turno previo.
                                    </p>

                                    {errorMessage && (
                                        <p className="text-xs text-red-500">{errorMessage}</p>
                                    )}

                                    <div className="flex justify-end mt-2">
                                        <div className="relative">
                                            <Button
                                                text={isSending ? "" : "Enviar"}
                                                disabled={!isFormValid || isSending}
                                                className={
                                                    isFormValid && !isSending
                                                        ? "bg-boton-primario hover:bg-hover-primario"
                                                        : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
                                                }
                                                onClick={handleSendMail}
                                                type="button"
                                            />

                                            {isSending && (
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <CircularProgress size={22} sx={{ color: "white" }} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Contactos;