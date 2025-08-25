import { DecorativeLeftSection } from '@/components/decorative-left-section'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 bg-[url('/registration-left-banner.png')] bg-cover">
      <DecorativeLeftSection />
      {children}
    </div>
  )
}