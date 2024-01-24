'use client'

import type { CoachmarkStep } from '@tiket/passport/types/coachmark';

import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import { Badge, Card, Coachmark, Text } from '@tiket/passport';
import { IconChevronLeft } from '@tiket/passport-icons';
import { HistoryStack } from '../_components/HistoryStack';
import { Disclaimer } from '../_components/Disclaimer';

import styles from './page.module.scss';

export default function Form() {
  const leaveAlert = useCallback((event: BeforeUnloadEvent) => {
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

  const [steps, setSteps] = useState<CoachmarkStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const STEPS: CoachmarkStep[] = [
      {
        selector: '.coach-1',
        defaultPlacement: 'right',
        title: 'Step 1',
        content: 'to trigger user events and interactivity, this one uses coachmark',
      },
    ];

    setSteps(STEPS);
  }, []);


  return (
    <main className={styles.main_poc_3}>
      <button className={styles.back_button} onClick={handleClickBack}>
        <IconChevronLeft size="md" color="activity" />
        <Text size="b3" weight="bold" variant="activity">Back</Text>
      </button>

      <HistoryStack className={styles.container} />

      <Card className={styles.container}>
        <Badge color="red" content={<Text>Not customizeable</Text>} />

        <Text as="h1" size="h3" className={cx(styles.title, 'coach-1')}>
          #3. Intercept back using beforeunload event (with coachmark)
        </Text>

        <Text as="p" size="b3" className={cx(styles.subtitle, 'coach-2')}>
          Add user interactivity to the page as stated in one of the chromium bugs
        </Text>

        <Text as="p" size="b3" className={cx(styles.helper_text, 'coach-3')}>
          ref: {' '}
          <a target="_blank" href="https://chromestatus.com/feature/5082396709879808" rel="noopener noreferrer">
            https://chromestatus.com/feature/5082396709879808
          </a>
        </Text>

        <Text as="p" size="b3" className={cx(styles.helper_text, 'coach-3')}>
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

      {steps.length > 0 && (
        <Coachmark
          steps={steps}
          index={stepIndex}
          onClose={() => {
            setSteps([]);
            setStepIndex(0);
          }}
          onProgress={(steps: CoachmarkStep[], nextIndex: number) => {
            setStepIndex(nextIndex);
          }}
        />
      )}
    </main>
  );
}
