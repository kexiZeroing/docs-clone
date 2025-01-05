import { Editor } from './editor';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  // https://nextjs.org/docs/messages/sync-dynamic-apis
  const { documentId } = await params;

  return (
    <div className='min-h-100 flex justify-center'>
      <Editor />
    </div>
  )
};

export default DocumentIdPage;