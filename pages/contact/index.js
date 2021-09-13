/**
 * メールフォームのサンプル
 * @link https://robkendal.co.uk/blog/2021-09-03-sending-contact-forms-with-next-js-and-wordpress
 */
import Head from 'next/head';
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Home.module.css';

const Contact = ({ menuItems }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async evt => {
    // we'll fill this in in a moment
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact us page</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Contact us</h1>
        <hr />

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label'>Your name</label>
            <input
              className='input'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='label'>Your email</label>
            <input
              className='input'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='label'>Your message</label>
            <textarea
              className='textarea'
              value={message}
              onChange={e => setMessage(e.target.value)}
              ></textarea>
          </div>

          <button>Send</button>
        </form>
        <p>
            <Link href={`../`}>
                <a>» TOPに戻る</a>
            </Link>
        </p>
		  </main>
	  </div>
  );
};

export default Contact;