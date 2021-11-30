import Link from 'next/link'
import styles from '@/styles/scss/Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; Event 2021</p>
            <Link href="/events">
                <a>Events</a>
            </Link>
        </footer>
    )
}
