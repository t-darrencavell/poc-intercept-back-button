'use client';

import { Card, Text } from '@tiket/passport';
import cx from 'classnames';

import styles from './styles.module.scss';

export type CompatibilityProps = {
  className?: string;
  data: Record<string, boolean>;
};

export const Compatibility = (props: CompatibilityProps) => {
  const { className, data, ...restProps } = props;

  return (
    <Card className={cx(styles.compatibility, className)} {...restProps}>
      <Text as="h3" size="b3">
        Compatibility
      </Text>

      <div className={styles.compatibility_list}>
        {Object.entries(data).map(([key, value]) => {
          return (
            <Text
              key={key}
              size="b3"
              className={cx(styles.compatibility_item, {
                [styles.supported]: value,
                [styles.not_supported]: !value,
              })}
            >
              {key}
            </Text>
          )
        })}
      </div>
    </Card>
  );
}
