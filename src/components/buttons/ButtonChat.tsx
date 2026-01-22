'use client';

export default function ButtonChat() {
    return (
        <button
            onClick={() => {
                window.$crisp?.push(["do", "chat:show"]);
                window.$crisp?.push(["do", "chat:open"]);
            }}
            style={{
                position: 'fixed',
                right: 16,
                bottom: 180,
                zIndex: 2147483647,
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: '#000',
                border: '2px solid #4ADE80',
                color: '#FFFFFF',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
            }}
            aria-label="Abrir chat"
        >
            CHAT
        </button>
    );
}
