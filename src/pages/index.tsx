import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// Client-side --> quando não se precisa de indexação
// Server-side --> Dados dinamicos da sessão do usario por exemplo, onde as paginas se diferem para cada usuario
// Static Site --> generation 1 html para todos usarios

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world. </h1>
          <p>
            Get access to all the publications<br />
            <span>{product.amount}</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>

  )
}

/**
 * getServerSideProps
 * Chamada que sera feita sempre que um usuario acessar a pagina.
 * o que pode ocasionar um certo problema de perfomance , pois se
 * 10.000 de usuarios acessarem a pagina, as quesições serão feitas
 * 10.000 vezes
 */ 
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1JCW1gAZ1ON73k62utyeAhoN', {
//     expand: ['product']
//   })

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(price.unit_amount / 100)
//   };

//   return {
//     props: {
//       product: product,
//     }
//   }
// }

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JCW1gAZ1ON73k62utyeAhoN', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  };

  return {
    props: {
      product: product,
    },
    revalidate: 60 * 60 * 24 // 24h
  }
}