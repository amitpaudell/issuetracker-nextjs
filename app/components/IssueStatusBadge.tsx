import { Status } from '@/generated/prisma/enums';
import { Badge } from '@radix-ui/themes';
import React from 'react';

interface Props {
  status: Status;
}
const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'green' | 'orange' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'orange' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <div>
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </div>
  );
};

export default IssueStatusBadge;
