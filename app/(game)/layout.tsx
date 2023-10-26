import { Metadata } from "next";
import HeaderGame from "./components/HeaderGame";

export const metadata: Metadata = {
  title: "GeoRAD Game",
  description: "Calculando as formas.",
  icons: {
    icon: "/assets/logo.svg",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderGame />
      {children}
    </>
  );
}
