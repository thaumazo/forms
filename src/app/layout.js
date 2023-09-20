import "./globals.css";

export const metadata = {
  title: "Form demo",
  description: "Demo of @thaumazo/forms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
