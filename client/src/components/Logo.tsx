function Logo() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative w-8 h-8">
        <img src="logo.svg" alt="logo" className="w-full" />
      </div>
      <span className="font-semibold text-slate-900">Penscape</span>
    </div>
  );
}

export default Logo;
