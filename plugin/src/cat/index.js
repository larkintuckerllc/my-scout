import generateName from 'sillyname';
import cute from './cute.jpg';
import styles from './index.css';

export default () => {
  const catEl = document.createElement('div');
  const imageEl = document.createElement('img');
  catEl.id = styles.root;
  imageEl.src = cute;
  catEl.appendChild(imageEl);
  window.console.log('cat');
  window.console.log(generateName());
  return catEl;
};
