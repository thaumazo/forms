import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata = {
  title: "Form demo",
  description: "Demo of @thaumazo/forms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="system">
        <header className="header">
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
