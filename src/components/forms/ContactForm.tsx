import { InputLabel, Select, TextField, MenuItem, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { Button } from "../buttons";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";


const ContactForm = () => {
    const lockScroll = () => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    };

    return (
        <div className="lg:w-full ">
            <h2 className="my-4 font-semibold lg:text-lg lg:my-8 text-body">Completá el formulario y te contactamos por WhatsApp para asesorarte.</h2>
            <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row">
                <form className="flex flex-col w-full gap-4 lg:gap-8 lg:w-1/2">
                    {/* Fila 1 */}
                    <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
                        <TextField
                            fullWidth
                            id="nombreyapellido"
                            label="Nombre y Apellido"
                            variant="outlined"
                            type="text"
                            required
                            className="order-2"
                        />
                        <TextField
                            fullWidth
                            id="telefonowhatsapp"
                            label="Telefono / WhatsApp"
                            variant="outlined"
                            type="text"
                            required
                            className="order-1 lg:order-2"
                        />
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            className="order-3 lg:order-3"
                        />
                    </div>

                    {/* Fila 2 */}
                    <div className="flex flex-col w-full gap-4 lg:gap-6 lg:flex-row">
                        {/* Tipo de beneficio */}
                        <div className="w-full lg:basis-1/3">
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel id="beneficio-label">Tipo de beneficio</InputLabel>
                                <Select
                                    labelId="beneficio-label"
                                    id="tipo-beneficio"
                                    label="Tipo de beneficio"
                                    defaultValue=""
                                    onOpen={lockScroll}
                                    onClose={unlockScroll}
                                    MenuProps={{
                                        container: () => document.body,
                                        PaperProps: { sx: { mt: 1, maxHeight: 320 } },
                                    }}
                                    sx={{
                                        "& .MuiSelect-select": { pl: 2, py: 1.5 },
                                    }}
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
                            </FormControl>
                        </div>

                        {/* Provincia */}
                        <div className="w-full lg:basis-2/3">
                            <FormControl fullWidth variant="outlined" required>
                                <InputLabel id="provincia-label">Provincia</InputLabel>
                                <Select
                                    labelId="provincia-label"
                                    id="provincia"
                                    label="Provincia"
                                    defaultValue=""
                                    onOpen={lockScroll}
                                    onClose={unlockScroll}
                                    MenuProps={{
                                        container: () => document.body,
                                        PaperProps: { sx: { mt: 1, maxHeight: 320 } },
                                    }}
                                    sx={{
                                        "& .MuiSelect-select": { pl: 2, py: 1.5 },
                                    }}
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
                            </FormControl>
                        </div>
                    </div>
                    <TextField
                        fullWidth
                        id="mensaje"
                        label="Mensaje"
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Si querés contarnos algo más, dejalo acá (opcional)"
                    />

                    <div className="flex flex-col items-start gap-2 lg:gap-4">
                        <FormControl required>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={<span className="text-smallMobile lg:text-base">Acepto que me contacten por WhatsApp.</span>}
                            />
                        </FormControl>
                        <Button text="Consultar" className="bg-boton-primario hover:bg-hover-primario"     type="submit" />
                    </div>

                </form>

                <div className="hidden pr-16 steps-contacto lg:block lg:w-1/2 lg:pl-8">

                    <div className="p-6 rounded-lg bg-background-secondary">
                        <h3 className="mb-4 text-base font-semibold">
                            ¿Cómo seguimos?
                        </h3>

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
