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
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultCssVars,
	TCssVars,
	cssVariableNames,
} from 'src/constants/articleProps';

export const ArticleParamsForm: React.FC<{
	setCssVars: (state: TCssVars) => void;
}> = ({ setCssVars }) => {
	const [stateFormOpen, setStateFormOpen] = useState(false);
	const [stateFontFamily, setStateFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [stateFontSize, setStateFontSize] = useState(
		defaultArticleState.fontSizeOption
	);
	const [stateFontColor, setStateFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [stateBackground, setStateBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [stateContentWidth, setStateContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const rootRef = useRef<HTMLDivElement>(null);

	const cssVars = {
		[cssVariableNames.fontFamily]: stateFontFamily.value,
		[cssVariableNames.fontSize]: stateFontSize.value,
		[cssVariableNames.fontColor]: stateFontColor.value,
		[cssVariableNames.containerWidth]: stateContentWidth.value,
		[cssVariableNames.bgColor]: stateBackground.value,
	};

	const resetToInitialState = () => {
		setStateFontFamily(defaultArticleState.fontFamilyOption);
		setStateFontSize(defaultArticleState.fontSizeOption);
		setStateFontColor(defaultArticleState.fontColor);
		setStateBackgroundColor(defaultArticleState.backgroundColor);
		setStateContentWidth(defaultArticleState.contentWidth);
	};

	const formStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: stateFormOpen,
	});

	const toggleButtonState = (state: boolean): boolean => {
		return !state;
	};

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
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCssVars(cssVars);
					}}>
					<Text as='h2' uppercase={true} size={31} weight={800}>
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
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
