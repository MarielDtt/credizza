type ButtonProps = {
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
    startIcon?: React.ReactNode;
};

export function Button({
    text,
    className,
    onClick,
    disabled,
    ariaLabel,
    type = "button",
    startIcon,
}: ButtonProps) {
    return (
        <div className="flex justify-center">
            <button
                type={type}
                aria-label={ariaLabel ?? text}
                disabled={disabled}
                className={`
                    flex items-center justify-center
                    ${!disabled
                        ? "w-36 h-12 rounded-lg text-button"
                        : "bg-sistema-uno w-36 h-12 rounded-lg text-sistema-texto cursor-not-allowed"
                    }
                    ${className}
                `}
                onClick={(event) => {
                    if (onClick) {
                        onClick(event);
                    }
                }}
            >
                {startIcon ? startIcon : text}
            </button>
        </div>
    );
}