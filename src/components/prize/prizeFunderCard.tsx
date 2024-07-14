import { Avatar, Card, Text } from '@mantine/core';
import Link from 'next/link';

interface PrizeFunderCardProps {
  name: string;


}

export default function PrizeFunderCard({
  name,
}: PrizeFunderCardProps) {
  return (
    <Card
      shadow="xs"
      padding="lg"
      my="md"
      radius="md"
      withBorder
      className="flex flex-row justify-start items-center gap-4"
    >
     {name}
     
    </Card>
  );
}
