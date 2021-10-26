import styles from './heading.module.scss';

export default function PageHeading({ text }) {
  return <h1 className={styles.title}>{text}</h1>;
}
