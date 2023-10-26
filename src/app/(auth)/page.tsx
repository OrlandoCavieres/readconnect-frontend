import Library from '%/Library.png'
import Library3 from '%/LibraryArt.png'
import Image from 'next/image'
import Link from 'next/link'


export default function LandPage() {
  return (
    <main>
      <div className='landPage_main'>
        <div className='landpage_firstContainer'>
          <div className='hero_title'>
            Descubre, Lee, Comparte y Recuerda Libros
          </div>

          <div className='hero_subtitle'>
            Bienvenido a un lugar donde la pasión por los libros se une.
          </div>
        </div>

        <div className='landpage_secondContainer'>
          <div style={{ width: 350, height: 350, position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
            <Image src={Library} alt='Imagen de una biblioteca' fill sizes='350px 350px' />
          </div>
          <div className='innerMessage'>
            <div>
              Para que no olvides nuevamente ese libro que debías o querías leer,
              organiza lo que vas a leer y lo que ya has leído en listas.
            </div>
            <div>
              Simplifica tu experiencia al guardar listas y ver que opina el resto
              de los libros que te gustan o quieres leer.
            </div>
          </div>
        </div>

        <div className='landpage_thirdContainer'>
          <div style={{ width: 350, height: 350, position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
            <Image src={Library3} alt='Imagen de una biblioteca' fill sizes='350px 350px' />
          </div>

          <div className='innerMessage'>
            <div>
              Explora esos libros que has dejado en el tintero
            </div>

            <div>
              ¿Qué esperas? Ingresa ya y comienza a elegir libros <Link className='linkLogin' href={'/login'}>aquí</Link>!
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
