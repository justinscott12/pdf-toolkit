import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  gradient?: string
}

const gradients = [
  "from-purple-500/20 via-pink-500/20 to-blue-500/20",
  "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
  "from-pink-500/20 via-rose-500/20 to-orange-500/20",
  "from-green-500/20 via-emerald-500/20 to-teal-500/20",
  "from-yellow-500/20 via-orange-500/20 to-red-500/20",
  "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
  "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
  "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
]

export function ToolCard({ title, description, icon: Icon, href, gradient }: ToolCardProps) {
  // Use a deterministic gradient based on title hash if no gradient is provided
  const getDeterministicGradient = (title: string) => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      hash = ((hash << 5) - hash) + title.charCodeAt(i)
      hash = hash & hash // Convert to 32-bit integer
    }
    return gradients[Math.abs(hash) % gradients.length]
  }
  
  const cardGradient = gradient || getDeterministicGradient(title)
  
  return (
    <Link href={href} className="block h-full group">
      <Card className={cn(
        "h-full transition-all duration-300 cursor-pointer",
        "hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]",
        "border-2 hover:border-primary/50",
        "relative overflow-hidden"
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          cardGradient
        )} />
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 shadow-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text group-hover:from-primary group-hover:to-primary/70 transition-all duration-300">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="mt-3 text-base">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

