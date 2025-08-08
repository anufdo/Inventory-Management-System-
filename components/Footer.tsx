export default function Footer() {
  return (
    <footer className="w-full h-12 border-t bg-white flex items-center px-4 text-sm text-gray-600">
      Inventory © {new Date().getFullYear()}
    </footer>
  );
}


