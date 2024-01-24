'use client'

import Link from 'next/link';
import { HistoryStack } from './_components/HistoryStack';
import { Badge, Card, Text } from '@tiket/passport';

import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main_landing}>
      <HistoryStack />

      <Card className={styles.container}>
        <Text as="h1" size="h3">
          Simulate user journey, entry point from another page
        </Text>

        <Text as="p" size="sm" variant="lowEmphasis" weight="regular">
          User normally enters through entry point landing page /myreview and navigate it&apos;s way through /myreview/form
        </Text>

        <div className={styles.poc}>
          <Link className={styles.link_poc} href="poc-1">
            #1. Intercept back using popstate event (with coachmark)
          </Link>
          <Badge color="green" content={<Text>Applicable</Text>} />
        </div>

        <div className={styles.poc}>
          <Link className={styles.link_poc} href="poc-2">
            #2. Intercept back using popstate event
          </Link>
          <Badge color="green" content={<Text>Applicable</Text>} />
        </div>

        <div className={styles.poc}>
          <Link className={styles.link_poc} href="/poc-3">
            #3. Intercept back using beforeunload event (with coachmark)
          </Link>
          <Badge color="grey" content={<Text>Applicable with terms</Text>} />
        </div>

        <div className={styles.poc}>
          <Link className={styles.link_poc} href="/poc-4">
            #4. Intercept back using beforeunload event
          </Link>
          <Badge color="grey" content={<Text>Applicable with terms</Text>} />
        </div>
      </Card>

      <Card className={styles.container}>
        <Text as="h1" size="h3">
          Entry point directly to page
        </Text>

        <Text as="p" size="sm" variant="lowEmphasis" weight="regular">
          This is the case of /myreview/form where user can enter directly to the form
        </Text>

        <div className={styles.poc}>
          <a href="poc-1" target="_blank" rel="noopener noreferrer" className={styles.link_poc}>
            #1. Intercept back using popstate event (with coachmark)
          </a>
          <Badge color="red" content={<Text>Not applicable</Text>} />
        </div>

        <div className={styles.poc}>
          <a href="poc-2" target="_blank" rel="noopener noreferrer" className={styles.link_poc}>
            #2. Intercept back using popstate event
          </a>
          <Badge color="red" content={<Text>Not applicable</Text>} />
        </div>

        <div className={styles.poc}>
          <a href="poc-3" target="_blank" rel="noopener noreferrer" className={styles.link_poc}>
            #3. Intercept back using beforeunload event (with coachmark)
          </a>
          <Badge color="green" content={<Text>Applicable</Text>} />
        </div>

        <div className={styles.poc}>
          <a href="poc-4" target="_blank" rel="noopener noreferrer" className={styles.link_poc}>
            #4. Intercept back using beforeunload event
          </a>
          <Badge color="green" content={<Text>Applicable</Text>} />
        </div>
      </Card>

      <Card className={styles.container}>
        <Text as="h1" size="h3">
          TLDR;
        </Text>

        <Text as="p" size="sm" variant="lowEmphasis" weight="regular">
          As of the above researches, using beforeunload event will cater the requirements (#3 and #4), even with perks of customizeable popup popstate event (#1 and #2), it does not able to directly cater if the page itself is an entrypoint, and fail the interceptor
        </Text>
      </Card>
    </main>
  );
}
