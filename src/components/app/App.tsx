import { defaultCssVars, TCssVars } from 'src/constants/articleProps';
import styles from 'src/styles/index.module.scss';
import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [cssVars, setCssVars] = useState<TCssVars>(defaultCssVars);
	return (
		<main className={styles.main} style={cssVars as CSSProperties}>
			<ArticleParamsForm
				setCssVars={(state) => {
					setCssVars(state);
				}}
			/>
			<Article />
		</main>
	);
};
