// components/Footer.tsx
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-8 text-sm text-center text-gray-500">
      <div className="mb-2">
        <Link href="#" className="mx-2">About</Link>
        <Link href="#" className="mx-2">Gallery</Link>
        <Link href="#" className="mx-2">Instagram</Link>
        <Link href="#" className="mx-2">Online Shop</Link>
      </div>
      <div>© 2025 Floral Lumina</div>
    </footer>
  )
}
