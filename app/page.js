import ProductGallery from "../components/product/ProductGallery";
import Breadcrumb from "../components/layout/breadcrumb";
import BookSection from "../components/home/bookSection"
import SearchBooks from "../components/search/SearchBooks";


export default function Home() {
  const breadcrumbItems = [ 
    { label: 'Home', href: '/', active: true },
    { label: 'Shop', active: false }
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <ProductGallery />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <BookSection/>
      </div>
      
    <div className="max-w-2xl mx-auto">
      <SearchBooks />
    </div>

    </div>
  );
}