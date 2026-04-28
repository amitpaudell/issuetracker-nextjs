import authOptions from '@/app/auth/AuthOptions';
import { createIssueSchema, patchIssueSchema } from '@/app/validationSchema';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({}, { status: 401 });
  // }
  const { id } = await params;
  const body = await request.json();

  const validationSchema = patchIssueSchema.safeParse(body);
  if (!validationSchema.success) {
    return NextResponse.json(validationSchema.error.issues, { status: 400 });
  }

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid user' }, { status: 404 });
    }
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
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
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
