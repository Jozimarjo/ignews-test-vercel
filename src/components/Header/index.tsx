import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Image from 'next/image'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}> <Image src="/images/logo.svg" alt="ig.news" width={110} height={31} />
                <nav>
                    <a className={styles.active}> Home </a>
                    <a> Posts </a>
                </nav>
                <SignInButton/>
            </div>
        </header>
    );
}