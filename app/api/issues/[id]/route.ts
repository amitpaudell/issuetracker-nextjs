import { createIssueSchema } from '@/app/validationSchema';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const body = await request.json();

  const validationSchema = createIssueSchema.safeParse(body);
  if (!validationSchema.success) {
    return NextResponse.json(validationSchema.error.issues, { status: 400 });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 400 });
  }
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({});
}
