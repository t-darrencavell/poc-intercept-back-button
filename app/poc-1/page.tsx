'use client'

import type { CoachmarkStep } from '@tiket/passport/types/coachmark';

import { useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { Badge, Card, Coachmark, Dialog, Text } from '@tiket/passport';
import { IconChevronLeft } from '@tiket/passport-icons';
import { HistoryStack } from '../_components/HistoryStack';
import { Disclaimer } from '../_components/Disclaimer';
import { Compatibility } from '../_components/Compatibility';

import styles from './page.module.scss';

export default function Form() {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const isInitial = useRef(true);

  const popState = useCallback(() => {
    if (location.hash === '#!/stealingyourhistory') {
      setIsOpen(true);
      setSteps([]);

      history.replaceState({}, document.title, url);
    }
  }, [url]);

  useEffect(() => {
    if (isInitial.current) {
      const url = new URL(window.location.href);
      setUrl(url.href);

      window.addEventListener('popstate', popState);
    
      history.replaceState({}, document.title, url + '#!/stealingyourhistory');
      history.pushState({}, document.title, url);
    }

    isInitial.current = false;
  }, [popState]);

  const handleClickPrimaryButton = () => {
    setIsOpen(false);
  };
  
  const handleClickSecondaryButton = () => {
    window.removeEventListener('popstate', popState);

    window.history.back();
  };

  const handleClickBack = () => {
    window.history.back();
  };
  
  const [steps, setSteps] = useState<CoachmarkStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const STEPS: CoachmarkStep[] = [
      {
        selector: '.coach-1',
        defaultPlacement: 'right',
        title: 'Step 1',
        content: 'this should actually not working as mentioned in the stackoverflow link down below',
      },
      {
        selector: '.coach-2',
        defaultPlacement: 'right',
        title: 'Step 2',
        content: 'but it somehow works by tricking the browser, pushing the new state using history.pushState',
      },
      {
        selector: '.coach-3',
        defaultPlacement: 'right',
        title: 'Step 3',
        content: 'you can check the history length on the above for more info',
      },
    ];

    setSteps(STEPS);
  }, []);

  return (
    <main className={styles.main_poc_1}>
      <button className={styles.back_button} onClick={handleClickBack}>
        <IconChevronLeft size="md" color="activity" />
        <Text size="b3" weight="bold" variant="activity">Back</Text>
      </button>

      <HistoryStack className={styles.container} />

      <Card className={styles.container}>
        <Badge color="green" content={<Text>Customizeable</Text>} />

        <Text as="h1" size="h3" className={cx(styles.title, 'coach-1')}>
          #1. Intercept back using popstate event (with coachmark)
        </Text>

        <Text as="p" size="b3" className={cx(styles.subtitle, 'coach-2')}>
          Add user interactivity to the page as stated in one of the chromium bugs
        </Text>

        <Text as="p" size="b3" className={cx(styles.helper_text, 'coach-3')}>
          ref: {' '}
          <a target="_blank" href="https://stackoverflow.com/questions/57339098/chrome-popstate-not-firing-on-back-button-if-no-user-interaction" rel="noopener noreferrer">
            https://stackoverflow.com/questions/57339098/chrome-popstate-not-firing-on-back-button-if-no-user-interaction
          </a>
        </Text>
      </Card>

      <Disclaimer
        steps={[
          'The flow of using before pop state has the best appearance so far and works as charm',
          'It\'s even able to customize the popup dialog',
          'The downsides is that, it will not work if the page is opened directly'
        ]}
        className={styles.container}
      />

      <Compatibility
        data={{
          'Chrome': true,
          'Safari': true
        }}
        className={styles.container}
      />

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Batalkan review ini?"
        description="Jika dibatalkan, review ini akan disimpan supaya bisa kamu lanjutin nanti."
        primaryButtonText="Lanjutkan Review"
        secondaryButtonText="Batalkan & Simpan"
        onPrimaryButtonClick={handleClickPrimaryButton}
        onSecondaryButtonClick={handleClickSecondaryButton}
        withCloseButton
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
