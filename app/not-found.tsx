import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center justify-center h-full py-20">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link href="/" className="text-primary underline">
                Go back home
            </Link>
        </div>
    </div>
  )
}