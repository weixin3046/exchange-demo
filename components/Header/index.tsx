import LocaleSwitcher from "@/components/LocaleSwitcher";
import Nav from "@/components/Nav";
import { Link } from "@/i18n/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ThemeToggle from "../ThemeToggle";

export default function Header() {
  return (
    <header className="flex h-12 items-center justify-between px-6">
      <Link href="/" className="w-[200px] text-center">
        <div className="">logo</div>
      </Link>
      <div className="mx-4 mt-2.5 mb-5 h-4 w-[1px] bg-[hsla(0,0%,100%,.15)]" />
      <nav className="flex flex-1 items-center justify-between">
        <Nav />
        <div className="flex-1"></div>
        <ConnectButton />
        <div className="mx-4 mt-2.5 mb-5 h-4 w-[1px] bg-[hsla(0,0%,100%,.15)]" />
        <div className="flex items-center gap-2.5">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
