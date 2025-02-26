// TableContainer.tsx
export function TableContainer({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`overflow-x-auto ${className || ""}`}>{children}</div>;
}

// Table.tsx
export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
    return <table className={`w-full ${className || ""}`}>{children}</table>;
}

// TableHeader.tsx
export function TableHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <thead className={className}>
            <tr>{children}</tr>
        </thead>
    );
}

// TableRow.tsx
export function TableRow({ children, className }: { children: React.ReactNode; className?: string }) {
    return <tr className={className}>{children}</tr>;
}

// TableCell.tsx
export function TableCell({
    children,
    isHeader = false,
    className,
}: {
    children: React.ReactNode;
    isHeader?: boolean;
    className?: string;
}) {
    return isHeader ? (
        <th className={`px-6 py-3 uppercase tracking-wider ${className || ""}`}>{children}</th>
    ) : (
        <td className={`px-6 py-4 ${className || ""}`}>{children}</td>
    );
}
