'use client';

import { Card, Text } from '@tiket/passport';

export type HistoryStackProps = {
  className?: string;
};

export const HistoryStack = (props: HistoryStackProps) => {
  const { className, ...restProps } = props;

  return (
    <Card className={className} {...restProps}>
      <Text size="b3" weight="bold">Window History: {typeof window !== 'undefined' ? window?.history?.length : 0}</Text>
    </Card>
  );
};
