import "./globals.css";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d2730]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
    </div>
  );
}
