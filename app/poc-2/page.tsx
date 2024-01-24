'use client'

import { useCallback, useEffect, useRef, useState } from 'react';

import { Badge, Card, Dialog, Text } from '@tiket/passport';
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

  return (
    <main className={styles.main_poc_2}>
      <button className={styles.back_button} onClick={handleClickBack}>
        <IconChevronLeft size="md" color="activity" />
        <Text size="b3" weight="bold" variant="activity">Back</Text>
      </button>

      <HistoryStack className={styles.container} />

      <Card className={styles.container}>
        <Badge color="green" content={<Text>Customizeable</Text>} />

        <Text as="h1" size="h3" className={styles.title}>
          #2. Intercept back using popstate event
        </Text>

        <Text as="p" size="b3" className={styles.subtitle}>
          Takeout the user interactivity and straight to the implementation
        </Text>

        <Text as="p" size="b3" className={styles.helper_text}>
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
    </main>
  );
}
