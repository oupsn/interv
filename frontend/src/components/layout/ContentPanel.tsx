import { Card, CardContent } from "@/components/ui/card.tsx"
import React from "react"

export default function ContentPanel({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Card className="rounded-lg border-none relative h-full overflow-y-clip">
      <CardContent className=" h-full w-full px-4 py-6 absolute">
        <div className={"overflow-y-auto px-2 h-full"}>{children}</div>
      </CardContent>
    </Card>
  )
}
