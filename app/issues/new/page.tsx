'use client';

import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton></IssueFormSkeleton>,
});
const NewIssuePage = () => {
  return (
    <div>
      <IssueForm></IssueForm>
    </div>
  );
};

export default NewIssuePage;
