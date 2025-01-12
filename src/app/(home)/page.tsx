import { Navbar } from './navbar';
import { Templates } from './templates';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className='fixed top-0 left-0 right-0 z-10 h-16 p-4 bg-white'>
        <Navbar />
      </div>
      <div className='mt-16'>
        <Templates />
      </div>
    </div>
  )
};

export default Home;