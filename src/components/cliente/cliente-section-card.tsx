interface ClienteSectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function ClienteSectionCard({
  title,
  children
}: ClienteSectionCardProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-md shadow">
      <h3 className="text-lg font-medium text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
