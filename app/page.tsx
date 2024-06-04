import Image from 'next/image'
import Link from 'next/link'
import ButtonAppBar from './components/Navbar'
import Homepage from './homepage/page'

export default function Home() {
  return (
    <main>
      <ButtonAppBar />
      {/* <Link href="/airports"><p>View Airports</p></Link> */}
      <Homepage/>
    </main>
  )
}
