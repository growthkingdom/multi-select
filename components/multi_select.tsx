import Script from 'next/script';
import { useState } from 'react';
import Select from 'react-select';
import styles from '../styles/home.module.scss';

export function MultiSelect({ uri }: { uri: string }) {
  const [requested, setRequested] = useState<Array<string>>();

  function Request({ method, query }: { method: 'REFRESH'; query: string }) {
    if (query.length !== 0) {
      fetch(`${uri}${query}`, {
        method: 'GET',
      })
        .then((r) => r.json())
        .then((r: { status: string; details: string; data: Array<string> }) => {
          if (r.status == 'success') {
            setRequested(r.data);

            return;
          }

          console.warn(r.status || 'Error processing the request');
        });
    }
  }

  const [input, setInput] = useState<Array<{ label: string; value: string }>>();

  return (
    <>
      <main className={styles.c_main}>
        <Select
          options={requested
            ?.map((Itm) => {
              return {
                value: Itm,
                label: Itm,
              };
            })
            .slice(0, 9)}
          isMulti
          name='multi-select'
          instanceId='multi-select'
          id='multi-select'
          isSearchable
          onChange={(Evt) => setInput([...Evt])}
          onInputChange={(Evt) => Request({ method: 'REFRESH', query: Evt })}
          menuPlacement={'top'}
        />

        <input
          type='text'
          id='text-input'
          value={input ? input?.map((Itm) => Itm.value) : ''}
          readOnly
          className={styles.input}
        />

        <Script id='' strategy='afterInteractive'>
          {`JFCustomWidget.subscribe('ready', () => {
            JFCustomWidget.subscribe('submit', () => {
              console.log()

              JFCustomWidget.sendSubmit({
                valid: true,
                value: document.getElementById('text-input').value,
              });
            });
          })`}
        </Script>
      </main>
    </>
  );
}
