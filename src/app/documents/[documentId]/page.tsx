import { Editor } from './editor';
import { Toolbar } from './toolbar';
import { Navbar } from './navbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { documentId } = await params;

  return (
    <div className='min-h-100 bg-[#FAFBFD]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD]'>
        <Navbar />
        <Toolbar />
      </div>
      <div className='pt-[114px]'>
        <Editor />
      </div>
    </div>
  )
};

export default DocumentIdPage;