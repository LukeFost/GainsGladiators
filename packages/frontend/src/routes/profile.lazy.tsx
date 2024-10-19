import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/profile')({
  component: About,
})

import {useAccount} from 'wagmi'

function About() {
  const {address} = useAccount();
  return (<>
  <div>{address}</div>
  </>)
}
