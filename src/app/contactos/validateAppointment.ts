export type AppointmentValues = {
    tieneOferta: "si" | "no" | "";
    nombre: string;
    dni: string;
    whatsapp: string;
    ubicacion: string;
    fecha: string;
};

export type AppointmentErrors = Partial<Record<keyof AppointmentValues, string>>;

export const validateAppointment = (values: AppointmentValues): AppointmentErrors => {
    const errors: AppointmentErrors = {};

    if (!values.tieneOferta) {
        errors.tieneOferta = "Seleccioná si ya tenés una oferta.";
    }

    if (values.tieneOferta === "si") {
        if (!values.nombre.trim()) {
            errors.nombre = "Ingresá tu nombre.";
        }

        if (!/^\d{8}$/.test(values.dni)) {
            errors.dni = "El DNI debe tener 8 números. Si tiene 7, agregá un 0 adelante.";
        }

        if (!/^\d{10}$/.test(values.whatsapp)) {
            errors.whatsapp = "El WhatsApp debe tener 10 números, sin 0 ni 15.";
        }

        if (!values.ubicacion) {
            errors.ubicacion = "Elegí una ubicación.";
        }

        if (!values.fecha) {
            errors.fecha = "Elegí una fecha.";
        }
    }

    return errors;
};