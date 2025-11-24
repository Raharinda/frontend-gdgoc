import Image from 'next/image'

export default function BookItem({ title, image }) {
  return (
    <div>
      <h2>{title}</h2>
      <Image src={image} alt={title} width={350} height={450}/>
    </div>
  )
}
