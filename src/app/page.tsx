
export default function Loading() {
  return (
    <div className="flex items-center gap-4 justify-center min-h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      Carregando...
    </div>
  );
}
