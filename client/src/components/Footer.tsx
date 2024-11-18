import Logo from "./Logo";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="flex container mx-auto px-4 flex-col gap-y-3 py-4 items-center">
        <Logo size="sm" noLabel />
        <p className="text-sm text-gray-400">&copy; Penscape 2024. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
