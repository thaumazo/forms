import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "Form demo",
  description: "Demo of @thaumazo/forms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="autoTheme">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
