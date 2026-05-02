import { Table } from '@radix-ui/themes';
import { prisma } from '@/lib/prisma';
import { Link, IssueStatusBadge } from '@/app/components';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import { Status } from '@/generated/prisma/enums';
import { Issue } from '@/generated/prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '../components/Pagination';
import { Metadata } from 'next';

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Created', value: 'createdAt' },
  ];

  const params = await searchParams;
  const { status, orderBy, page } = params;

  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status) ? status : undefined;

  const validOrderBy = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: 'asc' }
    : undefined;

  const validPage = parseInt(page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status: validStatus },
    orderBy: validOrderBy,
    skip: (validPage - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });
  return (
    <div>
      <IssueActions></IssueActions>

      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value}>
                  <NextLink
                    href={{
                      query: { status, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
                  {column.value === orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`issues/${issue.id}`}>{issue.title}</Link>

                  <div className="block md:hidden">
                    <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Pagination
          pageSize={pageSize}
          currentPage={validPage}
          itemCount={issueCount}
        ></Pagination>
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};

export default IssuePage;
