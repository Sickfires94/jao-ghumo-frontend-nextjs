import Image from 'next/image'
import Link from 'next/link'
import ButtonAppBar from './components/Navbar'

export default function Home() {
  return (
    <main>
      <ButtonAppBar />
      <h1>
        Hello World
      </h1>
      <Link className="link" href="/users"><p>Users</p></Link>
      <Link href="/airports"><p>View Airports</p></Link>
    </main>
  )
}
