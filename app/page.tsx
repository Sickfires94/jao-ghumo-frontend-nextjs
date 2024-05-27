import Image from 'next/image'
import Link from 'next/link'
import ButtonAppBar from './components/Navbar'

export default function Home() {



  return (
    <main>
      <ButtonAppBar />
      <Link href="/airports"><p>View Airports</p></Link>
    </main>
  )
}
