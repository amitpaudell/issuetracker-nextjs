import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

import EditIssueClient from './EditIssueClient';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) return notFound();
  return <EditIssueClient issue={issue}></EditIssueClient>;
};

export default EditIssuePage;
