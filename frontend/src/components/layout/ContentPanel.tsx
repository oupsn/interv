import { Card, CardContent } from "@/components/ui/card.tsx"

export default function ContentPanel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-4">
        <div className="p-2 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] max-h-[calc(100vh-56px-64px-20px-24px-56px-48px)] overflow-auto">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}
