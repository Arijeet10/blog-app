import StoreProvider from "@/redux/provider";
import "./globals.css";

export const metadata = {
  title: "Blog App",
  description: "By Arijeet Sarkar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="hide-scrollbar">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
