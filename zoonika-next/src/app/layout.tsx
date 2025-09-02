import "../styles/global.css";
import { AuthProvider } from "../context/authContext";

export const metadata = {
  title: "Zoonika - Cuidamos con amor cada mascota",
  description:
    "Zoonika - Servicios veterinarios de calidad y atención personalizada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
