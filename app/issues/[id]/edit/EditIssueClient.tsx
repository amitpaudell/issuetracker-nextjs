'use client';

import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { Issue } from '@/generated/prisma/client';

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssueClient = ({ issue }: { issue: Issue }) => {
  return <IssueForm issue={issue} />;
};

export default EditIssueClient;
