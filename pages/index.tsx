import { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from '../styles/home.module.scss';
import Script from 'next/script';

export default function Home() {
  const [requested, setRequested] = useState<Array<string>>();

  function Request({ method, query }: { method: 'REFRESH'; query: string }) {
    fetch(`https://demo.whitelabelmd.com/drugbank/direct.php?q=${query}`, {
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

  useEffect(() => Request({ method: 'REFRESH', query: '' }), []);

  //////////////////////////////////////////////////

  const [input, setInput] = useState<Array<{ label: string; value: string }>>();

  //////////////////////////////////////////////////

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
          onChange={(Ev) => setInput([...Ev])}
          onInputChange={(Ev) => Request({ method: 'REFRESH', query: Ev })}
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
