export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Bienvenue</h1>
        <p className="text-sm text-gray-600">Giovanni Rousseau</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">Giovanni Rousseau</p>
          <p className="text-xs text-gray-500">giovanni.rousseau@example.com</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
          GR
        </div>
      </div>
    </header>
  );
}
