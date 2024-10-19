import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/view')({
  component: About,
})

function About() {
  return <div className="p-2">Hello from About!</div>
}
