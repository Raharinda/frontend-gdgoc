import Home from '@/app/page'

export default async function ProductPage() {
  const response =  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`);
  const buku = await response.json()

  console.log(buku)

  return (
    <div>
      <h1>Daftar Buku</h1>

      {buku.books.map(data => (
        <Home 
        key={data._id}
        title={data.title}
        image={data.cover_image} 
        />
      ))}
    </div>
  );
}
