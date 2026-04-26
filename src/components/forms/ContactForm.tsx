"use client";

import { useEffect, useState } from "react";
import {
    InputLabel,
    Select,
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    CircularProgress,
} from "@mui/material";
import emailjs from "@emailjs/browser";
import { Button } from "../buttons";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { validateContact, type ContactErrors, type ContactValues } from "./validateContact";

const initialValues: ContactValues = {
    nombreyapellido: "",
    telefonowhatsapp: "",
    email: "",
    tipo_beneficio: "",
    provincia: "",
    mensaje: "",
    acepta_whatsapp: false,
};

const ContactForm = () => {
    const [values, setValues] = useState<ContactValues>(initialValues);
    const [errors, setErrors] = useState<ContactErrors>({});
    const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    const validateAndSetErrors = (nextValues: ContactValues) => {
        const validationErrors = validateContact(nextValues);
        setErrors(validationErrors);
        return validationErrors;
    };

    const handleChange = (field: keyof ContactValues, value: string | boolean) => {
        const nextValues = { ...values, [field]: value };
        setValues(nextValues);
        validateAndSetErrors(nextValues);
    };

    const handleBlur = (field: keyof ContactValues) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateAndSetErrors(values);
    };

    const showError = (field: keyof ContactValues) => {
        return Boolean(touched[field] && errors[field]);
    };

    const lockScroll = () => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isSending) return;

        setSuccessMessage("");
        setErrorMessage("");

        setTouched({
            nombreyapellido: true,
            telefonowhatsapp: true,
            email: true,
            tipo_beneficio: true,
            provincia: true,
            mensaje: true,
            acepta_whatsapp: true,
        });

        const validationErrors = validateAndSetErrors(values);

        if (Object.keys(validationErrors).length > 0) return;

        try {
            setIsSending(true);

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                values,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            setValues(initialValues);
            setErrors({});
            setTouched({});
            setSuccessMessage("Recibimos tu consulta. En breve nos comunicaremos.");
        } catch (error) {
            console.error("Error al enviar el email:", error);
            setErrorMessage("No pudimos enviar la consulta. Intentá nuevamente en unos minutos.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="lg:w-full">
            <h2 className="my-4 font-semibold lg:text-lg lg:my-8 text-body">
                Completá el formulario y te contactamos por WhatsApp para asesorarte.
            </h2>

            <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row">
                <form className="flex flex-col w-full gap-4 lg:gap-8 lg:w-1/2" onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
                        <TextField
                            fullWidth
                            id="nombreyapellido"
                            name="nombreyapellido"
                            label="Nombre y Apellido *"
                            variant="outlined"
                            type="text"
                            value={values.nombreyapellido}
                            onChange={(event) => handleChange("nombreyapellido", event.target.value)}
                            onBlur={() => handleBlur("nombreyapellido")}
                            className="order-2"
                            error={showError("nombreyapellido")}
                            helperText={showError("nombreyapellido") ? errors.nombreyapellido : ""}
                        />

                        <TextField
                            fullWidth
                            id="telefonowhatsapp"
                            name="telefonowhatsapp"
                            label="WhatsApp *"
                            variant="outlined"
                            type="text"
                            value={values.telefonowhatsapp}
                            onChange={(event) => handleChange("telefonowhatsapp", event.target.value)}
                            onBlur={() => handleBlur("telefonowhatsapp")}
                            className="order-1 lg:order-2"
                            error={showError("telefonowhatsapp")}
                            helperText={showError("telefonowhatsapp") ? errors.telefonowhatsapp : ""}
                        />

                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={values.email}
                            onChange={(event) => handleChange("email", event.target.value)}
                            onBlur={() => handleBlur("email")}
                            className="order-3 lg:order-3"
                            error={showError("email")}
                            helperText={showError("email") ? errors.email : ""}
                        />
                    </div>

                    <div className="flex flex-col w-full gap-4 lg:gap-6 lg:flex-row">
                        <div className="w-full lg:basis-1/3">
                            <FormControl fullWidth variant="outlined" error={showError("tipo_beneficio")}>
                                <InputLabel id="beneficio-label">Tipo de beneficio *</InputLabel>
                                <Select
                                    labelId="beneficio-label"
                                    id="tipo-beneficio"
                                    name="tipo_beneficio"
                                    label="Tipo de beneficio *"
                                    value={values.tipo_beneficio}
                                    onChange={(event) => handleChange("tipo_beneficio", event.target.value)}
                                    onBlur={() => handleBlur("tipo_beneficio")}
                                    onOpen={lockScroll}
                                    onClose={unlockScroll}
                                >
                                    <MenuItem value="" disabled>
                                        <em>Seleccionar tipo</em>
                                    </MenuItem>
                                    <MenuItem value="Jubilado/Pensionado ANSES">Jubilado / Pensionado ANSES</MenuItem>
                                    <MenuItem value="Empleado Estatal">Empleado Estatal</MenuItem>
                                    <MenuItem value="Pensión Graciable">Pensión Graciable</MenuItem>
                                    <MenuItem value="Jubilado/Pensión IPC">Jubilado / Pensión IPC</MenuItem>
                                    <MenuItem value="Docente">Docente</MenuItem>
                                    <MenuItem value="Fuerzas de Seguridad">Fuerzas de Seguridad</MenuItem>
                                    <MenuItem value="Otros">Otros</MenuItem>
                                </Select>
                                <FormHelperText>{showError("tipo_beneficio") ? errors.tipo_beneficio : ""}</FormHelperText>
                            </FormControl>
                        </div>

                        <div className="w-full lg:basis-2/3">
                            <FormControl fullWidth variant="outlined" error={showError("provincia")}>
                                <InputLabel id="provincia-label">Provincia *</InputLabel>
                                <Select
                                    labelId="provincia-label"
                                    id="provincia"
                                    name="provincia"
                                    label="Provincia *"
                                    value={values.provincia}
                                    onChange={(event) => handleChange("provincia", event.target.value)}
                                    onBlur={() => handleBlur("provincia")}
                                    onOpen={lockScroll}
                                    onClose={unlockScroll}
                                >
                                    <MenuItem value="" disabled>
                                        <em>Seleccionar provincia</em>
                                    </MenuItem>
                                    <MenuItem value="Buenos Aires">Buenos Aires</MenuItem>
                                    <MenuItem value="Ciudad Autónoma de Buenos Aires">Ciudad Autónoma de Buenos Aires</MenuItem>
                                    <MenuItem value="Catamarca">Catamarca</MenuItem>
                                    <MenuItem value="Chaco">Chaco</MenuItem>
                                    <MenuItem value="Chubut">Chubut</MenuItem>
                                    <MenuItem value="Córdoba">Córdoba</MenuItem>
                                    <MenuItem value="Corrientes">Corrientes</MenuItem>
                                    <MenuItem value="Entre Ríos">Entre Ríos</MenuItem>
                                    <MenuItem value="Formosa">Formosa</MenuItem>
                                    <MenuItem value="Jujuy">Jujuy</MenuItem>
                                    <MenuItem value="La Pampa">La Pampa</MenuItem>
                                    <MenuItem value="La Rioja">La Rioja</MenuItem>
                                    <MenuItem value="Mendoza">Mendoza</MenuItem>
                                    <MenuItem value="Misiones">Misiones</MenuItem>
                                    <MenuItem value="Neuquén">Neuquén</MenuItem>
                                    <MenuItem value="Río Negro">Río Negro</MenuItem>
                                    <MenuItem value="Salta">Salta</MenuItem>
                                    <MenuItem value="San Juan">San Juan</MenuItem>
                                    <MenuItem value="San Luis">San Luis</MenuItem>
                                    <MenuItem value="Santa Cruz">Santa Cruz</MenuItem>
                                    <MenuItem value="Santa Fe">Santa Fe</MenuItem>
                                    <MenuItem value="Santiago del Estero">Santiago del Estero</MenuItem>
                                    <MenuItem value="Tierra del Fuego, Antártida e Islas del Atlántico Sur">
                                        Tierra del Fuego, Antártida e Islas del Atlántico Sur
                                    </MenuItem>
                                    <MenuItem value="Tucumán">Tucumán</MenuItem>
                                </Select>
                                <FormHelperText>{showError("provincia") ? errors.provincia : ""}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>

                    <TextField
                        fullWidth
                        id="mensaje"
                        name="mensaje"
                        label="Mensaje"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={values.mensaje}
                        onChange={(event) => handleChange("mensaje", event.target.value)}
                        placeholder="Si querés contarnos algo más, dejalo acá (opcional)"
                    />

                    <div className="flex flex-col items-start gap-2 lg:gap-4">
                        <FormControl error={showError("acepta_whatsapp")}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="acepta_whatsapp"
                                        checked={values.acepta_whatsapp}
                                        onChange={(event) => {
                                            setTouched((prev) => ({ ...prev, acepta_whatsapp: true }));
                                            handleChange("acepta_whatsapp", event.target.checked);
                                        }}
                                    />
                                }
                                label={
                                    <span className="text-smallMobile lg:text-base">
                                        Acepto que me contacten por WhatsApp. *
                                    </span>
                                }
                            />
                            <FormHelperText>{showError("acepta_whatsapp") ? errors.acepta_whatsapp : ""}</FormHelperText>
                        </FormControl>

                        {successMessage && <p className="text-sm text-boton-primario">{successMessage}</p>}
                        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

                        <Button
                            text="Consultar"
                            className="bg-boton-primario hover:bg-hover-primario"
                            type="submit"
                            disabled={isSending}
                            startIcon={isSending ? <CircularProgress size={22} color="inherit" /> : null}
                        />
                    </div>
                </form>

                <div className="hidden pr-16 steps-contacto lg:block lg:w-1/2 lg:pl-8">
                    <div className="p-6 rounded-lg bg-background-secondary">
                        <h3 className="mb-4 text-base font-semibold">¿Cómo seguimos?</h3>

                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlineIcon className="mt-0.5 text-boton-primario" />
                                <span>Te contactamos por WhatsApp</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlineIcon className="mt-0.5 text-boton-primario" />
                                <span>Te asesoramos paso a paso</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlineIcon className="mt-0.5 text-boton-primario" />
                                <span>Sin costo y sin compromiso</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;