'use client'

import { useCallback, useEffect } from 'react';

import { Badge, Card, Text } from '@tiket/passport';
import { IconChevronLeft } from '@tiket/passport-icons';
import { HistoryStack } from '../_components/HistoryStack';
import { Disclaimer } from '../_components/Disclaimer';

import styles from './page.module.scss';

export default function Form() {
  const leaveAlert = useCallback((event: BeforeUnloadEvent) => {
    console.log('leave alaert');

    event.preventDefault();
    event.returnValue = '';
  }, []);
  
  useEffect(() => {
    window.addEventListener('beforeunload', leaveAlert);

    return () => {
      window.removeEventListener('beforeunload', leaveAlert);
    }
  }, [leaveAlert]);

  const handleClickBack = () => {
    window.location.assign('/');
  };

  return (
    <main className={styles.main_poc_3}>
      <button className={styles.back_button} onClick={handleClickBack}>
        <IconChevronLeft size="md" color="activity" />
        <Text size="b3" weight="bold" variant="activity">Back</Text>
      </button>

      <HistoryStack className={styles.container} />

      <Card className={styles.container}>
        <Badge color="red" content={<Text>Not customizeable</Text>} />

        <Text as="h1" size="h3" className={styles.title}>
          #4. Intercept back using beforeunload event
        </Text>

        <Text as="p" size="b3" className={styles.subtitle}>
          Takeout the user interactivity and straight to the implementation
        </Text>

        <Text as="p" size="b3" className={styles.helper_text}>
          ref: {' '}
          <a target="_blank" href="https://chromestatus.com/feature/5082396709879808" rel="noopener noreferrer">
            https://chromestatus.com/feature/5082396709879808
          </a>
        </Text>

        <Text as="p" size="b3" className={styles.helper_text}>
          ref: {' '}
          <a target="_blank" href="https://bugs.chromium.org/p/chromium/issues/detail?id=707007" rel="noopener noreferrer">
            https://bugs.chromium.org/p/chromium/issues/detail?id=707007
          </a>
        </Text>
      </Card>

      <Disclaimer
        steps={[
          'The benefits is that most of the browser supports this feature',
          'The downsides are, it\'s not customizeable',
        ]}
        className={styles.container}
      />
    </main>
  );
}
