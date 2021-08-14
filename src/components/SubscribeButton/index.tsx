import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        //criação da checkout session
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;
            console.log('TUDO OK ', response, sessionId);

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({ sessionId: sessionId });
        } catch (error) {
            console.log('ERROr ', error);
            alert(error.message)
        }

    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}