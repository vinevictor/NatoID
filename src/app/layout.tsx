import Header from "../components/layout/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-600 w-full h-full">
        <Header />
        {children} 
      </body>
    </html>
  );
}
