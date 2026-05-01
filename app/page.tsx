import Image from 'next/image';
import Pagination from './components/Pagination';

export default function Home() {
  return (
    <div>
      <Pagination itemCount={200} pageSize={10} currentPage={2}></Pagination>
    </div>
  );
}
