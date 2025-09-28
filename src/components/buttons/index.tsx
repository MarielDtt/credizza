type ButtonProps = {
    text: string; // Texto que se mostrará en el botón
    className?: string; // Clases adicionales opcionales
    type?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
};

export function Button({ text, className, onClick, disabled, ariaLabel }: ButtonProps) {

    return (
        <div className="flex justify-center">
            <button
                aria-label={ariaLabel ?? text}
                className={` 
                    ${!disabled
                        ? "mt-4  w-36 h-12 rounded-lg text-button"
                        : "mt-4 bg-sistema-uno w-36 h-12 rounded-lg text-sistema-texto cursor-not-allowed"
                    } 
                    ${className}`}
                onClick={(event) => {
                    if (onClick) {
                        onClick(event);
                    }
                }}
            >
                {text}
            </button>
        </div>
    )
}