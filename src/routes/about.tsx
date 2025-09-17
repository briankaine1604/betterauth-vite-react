import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from About!
  <Button>Test</Button>
  </div>
}