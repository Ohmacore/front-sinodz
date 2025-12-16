export function ShipIcon({ className = "h-6 w-6" }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 13h1l.5 2H20l.5-2h1l-.5 2c-.1.5-.5.9-1 1H4.5c-.5 0-.9-.4-1-1L3 13z" />
            <path d="M4 11l8-6 8 6H4z" />
            <path d="M6 13h12v3H6v-3z" />
            <rect x="11" y="2" width="2" height="5" />
            <path d="M2 16l2 2 2-2H2zM16 16l2 2 2-2h-4z" />
        </svg>
    );
}
