import BookItem from '@/components/ProductPage/BookItem'

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/random_book`);
  const data = await response.json()
  console.log(data)

  const buku = data

  return (
    <div>
      <h1>Daftar Buku</h1>
        <div className='max-w-7xl mx-auto px-6 py-2'>
          <BookItem
          key={buku._id}
          title={buku.title}
          image={buku.cover_image}
          width={50}
          />
        </div>

      
    </div>
  );
}
