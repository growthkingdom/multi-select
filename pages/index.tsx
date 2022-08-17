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
      .then((r: { status: string; details: string; data: Array<string> }) => setRequested(r.data));
  }

  useEffect(() => Request({ method: 'REFRESH', query: '' }), []);

  //////////////////////////////////////////////////

  const [input, setInput] = useState<Array<{ label: string; value: string }>>();

  //////////////////////////////////////////////////

  const JFCustomWidget = globalThis?.window?.JFCustomWidget;

  return (
    <>
      <Script src='//js.jotform.com/JotFormCustomWidget.min.js' />

      {/* <Script id='test'>
        {window.JFCustomWidget.subscribe('ready', () => {
          window.JFCustomWidget.subscribe('submit', () => {
            window.JFCustomWidget.sendSubmit({
              valid: true,
              value: input,
            });
          });
        })}
      </Script> */}

      <main className={styles.c_main}>
        <Select
          options={requested?.map((Itm) => {
            return {
              value: Itm,
              label: Itm,
            };
          })}
          isMulti
          name='myTextInput'
          instanceId='myTextInput'
          id='myTextInput'
          isSearchable
          onChange={(Ev) => setInput([...Ev])}
          onInputChange={(Ev) => Request({ method: 'REFRESH', query: Ev })}
        />

        <Script id='JotFormCustomWidget'>
          {JFCustomWidget?.subscribe('ready', () => {
            console.log('ready');

            const settings = JFCustomWidget.getWidgetSettings();
            const medicines = JFCustomWidget.getWidgetSetting('medicines');

            JFCustomWidget?.subscribe('submit', () => {
              console.log('test');

              JFCustomWidget?.sendSubmit({
                valid: true,
                value: JSON.stringify(input?.map((Itm) => Itm.value)),
              });
            });
          })}
        </Script>
      </main>
    </>
  );
}
