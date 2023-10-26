import Image from 'next/image'
import Logo from '%/Logo.png'

export default function LandPage() {
  return (
    <main>
      <div style={{ width: 500, height: 500, position: 'relative' }}>
        <Image src={Logo} alt={'Logo'} fill />
      </div>
    </main>
  )
}
