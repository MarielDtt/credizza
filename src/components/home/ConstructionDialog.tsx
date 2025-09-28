import * as React from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Button } from '../buttons';

const ConstructionDialog = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (sessionStorage.getItem("uc_seen")) return;
        const t1 = setTimeout(() => setOpen(true), 200);     // abre a los 200ms
        const t2 = setTimeout(() => setOpen(false), 4200);   // cierra a los 4.2s
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                slots={{
                    transition: ConstructionDialog,
                }}
                slotProps={{ paper: { sx: { borderRadius: '20px' } } }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
                    className="text-heading2"
                >
                    <WarningAmberIcon fontSize="large" aria-hidden className='text-boton-secundario' />
                    <span>Esta página está en construcción</span>
                    <WarningAmberIcon fontSize="large" aria-hidden className='text-boton-secundario' />
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description " className='text-justify '>
                        Estamos ajustando los últimos detalles. Podés escribirnos por WhatsApp o seguir navegando.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='space-x-8'>
                    <Button
                        text='Consultar'
                        className=' bg-boton-primario text-texto-botones lg:hover:bg-hover-primario'
                        onClick={() => window.open("https://wa.me/541162108715?text=Hola,%20me%20interesa%20información%20para%20optener%20un%20crédito", "_blank")}
                        ariaLabel="Consultar por WhatsApp"
                    />
                    <Button text='Seguir Navegando' onClick={handleClose} className='bg-boton-neutral text-texto-botones lg:hover:bg-boton-neutral/90' />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
