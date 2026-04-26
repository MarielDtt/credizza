export type ContactValues = {
    nombreyapellido: string;
    telefonowhatsapp: string;
    email: string;
    tipo_beneficio: string;
    provincia: string;
    mensaje: string;
    acepta_whatsapp: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const onlyDigits = (s: string) => (s.match(/\d/g) ?? []).join("");

export function validateContact(values: ContactValues): ContactErrors {
    const errors: ContactErrors = {};

    const nombre = values.nombreyapellido.trim();

    if (!nombre) {
        errors.nombreyapellido = "Ingresá tu nombre y apellido.";
    } else if (nombre.length < 3) {
        errors.nombreyapellido = "Ingresá un nombre válido.";
    }

    const telefono = values.telefonowhatsapp.trim();
    const digits = onlyDigits(telefono);

    if (!telefono) {
        errors.telefonowhatsapp = "Ingresá tu WhatsApp.";
    } else if (digits.length !== 10) {
        errors.telefonowhatsapp = "El celular debe tener 10 números, sin 0 ni 15.";
    }

    const email = values.email.trim();

    if (email) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

        if (!emailOk) {
            errors.email = "Ingresá un email válido.";
        }
    }

    if (!values.tipo_beneficio) {
        errors.tipo_beneficio = "Seleccioná el tipo de beneficio.";
    }

    if (!values.provincia) {
        errors.provincia = "Seleccioná una provincia.";
    }

    if (!values.acepta_whatsapp) {
        errors.acepta_whatsapp = "Debés aceptar que te contacten por WhatsApp.";
    }

    return errors;
}