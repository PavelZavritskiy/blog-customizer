import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useClose } from './hooks/useClose';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultCssVars,
	TCssVars,
} from 'src/constants/articleProps';

export const ArticleParamsForm: React.FC<{
	setCssVars: (state: TCssVars) => void;
}> = ({ setCssVars }) => {
	const [stateFormOpen, setStateFormOpen] = useState(false);
	const [stateFontFamily, setStateFontFamily] = useState(fontFamilyOptions[0]);
	const [stateFontSize, setStateFontSize] = useState(fontSizeOptions[0]);
	const [stateFontColor, setStateFontColor] = useState(fontColors[0]);
	const [stateBackground, setStateBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [stateContentWidth, setStateContentWidth] = useState(
		contentWidthArr[0]
	);

	const resetToInitialState = () => {
		setStateFontFamily(fontFamilyOptions[0]);
		setStateFontSize(fontSizeOptions[0]);
		setStateFontColor(fontColors[0]);
		setStateBackgroundColor(backgroundColors[0]);
		setStateContentWidth(contentWidthArr[0]);
	};

	const applySettings = () => {
		const cssVars = {
			'--font-family': stateFontFamily.value,
			'--font-size': stateFontSize.value,
			'--font-color': stateFontColor.value,
			'--container-width': stateContentWidth.value,
			'--bg-color': stateBackground.value,
		};
		setCssVars(cssVars);
	};

	const formStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: stateFormOpen,
	});

	const toggleButtonState = (state: boolean): boolean => {
		return state === false;
	};

	const rootRef = useRef<HTMLDivElement>(null);

	useClose({
		isOpen: stateFormOpen,
		rootRef,
		onChange: setStateFormOpen,
		onClose: () => {},
	});

	return (
		<>
			<ArrowButton
				isOpen={stateFormOpen}
				onClick={() => {
					setStateFormOpen(toggleButtonState(stateFormOpen));
				}}
			/>
			<aside className={formStyle} ref={rootRef}>
				<form className={styles.form}>
					<Text uppercase={true} size={31} weight={800}>
						{'Задайте параметры'}
					</Text>

					<Select
						title='шрифт'
						selected={stateFontFamily}
						options={fontFamilyOptions}
						onChange={setStateFontFamily}
					/>

					<RadioGroup
						title='размер шрифта'
						selected={stateFontSize}
						options={fontSizeOptions}
						name='radio'
						onChange={setStateFontSize}
					/>

					<Select
						title='цвет шрифта'
						selected={stateFontColor}
						options={fontColors}
						onChange={setStateFontColor}
					/>

					<Separator />

					<Select
						title='цвет фона'
						selected={stateBackground}
						options={backgroundColors}
						onChange={setStateBackgroundColor}
					/>

					<Select
						title='ширина контента'
						selected={stateContentWidth}
						options={contentWidthArr}
						onChange={setStateContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							onClick={(e) => {
								e.preventDefault();
								setCssVars(defaultCssVars);
								resetToInitialState();
							}}
							type='clear'
						/>
						<Button
							title='Применить'
							onClick={(e) => {
								e.preventDefault();
								applySettings();
							}}
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
