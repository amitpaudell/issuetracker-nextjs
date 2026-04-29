import { prisma } from '@/lib/prisma';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import EditIssueButton from './EditIssueButton';
import IssueDetail from './IssueDetail';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/AuthOptions';
import AssigneeSelect from './AssigneeSelect';

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue}></IssueDetail>
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue}></AssigneeSelect>
            <EditIssueButton issueId={issue.id}></EditIssueButton>
            <DeleteIssueButton issueId={issue.id}></DeleteIssueButton>
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
