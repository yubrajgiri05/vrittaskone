export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white h-20 flex items-center justify-center">
      <p className="text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </p>
    </footer>
  )
}