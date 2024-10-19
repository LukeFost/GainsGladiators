import MarketPlace from '@/MarketPlace';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/market')({
  component: About,
})

function About() {
  return (<>
  <MarketPlace/>
  </>);
}
