'use client';

import cx from 'classnames';

import { Card, Text } from '@tiket/passport';

import styles from './styles.module.scss';

export type DisclaimerProps = {
  className?: string;
  steps: string[];
};

export const Disclaimer = (props: DisclaimerProps) => {
  const { className, steps, ...restProps } = props;

  return (
    <Card className={cx(styles.steps_to_reproduce, className)} {...restProps}>
      <Text as="h3" size="b3">
        Disclaimer
      </Text>

      <ol className={styles.ordered_list}>
        {steps.map(step => {
          return (
            <Text key={step} as="p" size="b3">
              <li className={styles.list_item}>
                {step}
              </li>
            </Text>
          );
        })}
      </ol>
    </Card>
  );
}
