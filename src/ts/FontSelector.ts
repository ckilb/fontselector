import {Options} from './types';
import '../scss/style.scss';

const CSS_CLASS_PREFIX = 'font-selector-';

export default class FontSelector {
    constructor(selector: string, options: Options) {
        options = FontSelector.mergeOptionsWithDefaults(options);

        FontSelector.initializeFontSelectors(options, selector);
    }

    private static initializeFontSelectors(options: Options, selector: string): void {
        const selectElements = document.querySelectorAll<HTMLSelectElement>(selector);

        selectElements.forEach((selectElement: HTMLSelectElement) => {
            FontSelector.loadFonts(selectElement);

            const wrapperElement = FontSelector.wrapSelectElement(selectElement, options);
            const dropdownElement = FontSelector.createDropdownElement(selectElement, options);

            wrapperElement.appendChild(dropdownElement);
        })
    }

    private static mergeOptionsWithDefaults(options: Options): Options {
        options = Object.assign(
            FontSelector.getDefaultOptions(),
            options
        );

        return options;
    }

    private static getDefaultOptions(): Options {
        return {
            'wrapperClassName': CSS_CLASS_PREFIX + 'wrapper',
            'dropdownClassName': CSS_CLASS_PREFIX + 'dropdown',
            'dropdownSelectedFontClassName': CSS_CLASS_PREFIX + 'selected-font',
            'dropdownSelectedFontNameClassName': CSS_CLASS_PREFIX + 'selected-font-name',
            'dropdownFontListClassName': CSS_CLASS_PREFIX + 'font-list',
            'isExpandedClassName': CSS_CLASS_PREFIX + 'is-expanded',
            'onExpanded': function () {},
            'onSelected': function () {},
            'onCollapsed': function () {}
        };
    }

    private static createDropdownElement(selectElement: HTMLSelectElement, options: Options): HTMLDivElement {
        const dropdownElement = document.createElement('div');
        const fontListElement = document.createElement('ul');
        const optionElement = this.getSelectedOption(selectElement);
        const fontFamily = optionElement.value;
        const fontName = optionElement.innerText.trim();
        const selectedFontElement = this.createSelectedFontElement(fontFamily, fontName, dropdownElement, options);
        const fontListListItemElements = this.createFontListListItemElements(
            dropdownElement,
            selectElement,
            selectedFontElement,
            options
        );

        fontListListItemElements.forEach((listItemElement: HTMLLIElement) => {
            fontListElement.appendChild(listItemElement);
        });

        dropdownElement.classList.add(options.dropdownClassName);
        fontListElement.classList.add(options.dropdownFontListClassName);

        dropdownElement.appendChild(selectedFontElement);
        dropdownElement.appendChild(fontListElement);

        return dropdownElement;
    }

    private static createSelectedFontElement(
        selectedFontFamily: string,
        selectedFontName: string,
        dropdownElement: HTMLDivElement,
        options: Options
    ): HTMLAnchorElement {
        const selectedFontElement = document.createElement('a');
        const selectedFontFamilyClassName = this.getFontFamilyClassName(selectedFontFamily);
        const selectedFontNameElement = document.createElement('span');

        selectedFontNameElement.innerText = selectedFontName;
        selectedFontNameElement.classList.add(options.dropdownSelectedFontNameClassName);

        selectedFontElement.append(selectedFontNameElement);
        selectedFontElement.classList.add(options.dropdownSelectedFontClassName, selectedFontFamilyClassName);

        selectedFontElement.addEventListener('click', () => {
            if (this.isExpanded(dropdownElement, options)) {
                this.collapseFontList(dropdownElement, options);

                return;
            }

            this.expandFontList(dropdownElement, options);
        });

        document.body.addEventListener('click', (event) => {
            if (!event.target || event.target !== selectedFontElement) {
                this.collapseFontList(dropdownElement, options);
            }
        });

        return selectedFontElement;
    }

    private static isExpanded(dropdownElement: HTMLDivElement, options: Options) {
        return dropdownElement.classList.contains(options.isExpandedClassName);
    }

    private static expandFontList(dropdownElement: HTMLDivElement, options: Options): void {
        dropdownElement.classList.add(options.isExpandedClassName);

        options.onExpanded();
    }

    private static collapseFontList(dropdownElement: HTMLDivElement, options: Options): void {
        dropdownElement.classList.remove(options.isExpandedClassName);

        options.onCollapsed();
    }

    private static createFontListListItemElements(
        dropdownElement: HTMLDivElement,
        selectElement: HTMLSelectElement,
        selectedFontElement: HTMLAnchorElement,
        options: Options
    ): HTMLLIElement[] {
        const listItemElements: HTMLLIElement[] = [];

        for (let index = 0; index < selectElement.options.length; index++) {
            const listItem: HTMLLIElement = document.createElement('li');
            const optionElement = selectElement.options[index];
            const fontFamily = optionElement.value;
            const fontName = optionElement.innerText.trim();
            const fontFamilyClassName = this.getFontFamilyClassName(fontFamily);

            listItem.classList.add(fontFamilyClassName);
            listItem.innerText = fontName;
            listItem.setAttribute('data-font', fontFamily);
            listItem.addEventListener('click', () => {
                this.selectFont(
                    listItem.getAttribute('data-font')!,
                    fontName,
                    dropdownElement,
                    selectElement,
                    selectedFontElement,
                    options
                );
            });

            listItemElements.push(listItem);
        }

        return listItemElements;
    }

    private static selectFont(
        fontFamily: string,
        fontName: string,
        dropdownElement: HTMLDivElement,
        selectElement: HTMLSelectElement,
        selectedFontElement: HTMLAnchorElement,
        options: Options
    ): void {
        const selectedOption = this.getSelectedOption(selectElement);
        const previouslySelectedFontFamilyClassName = this.getFontFamilyClassName(selectedOption.value);
        const newSelectedFontFamilyClassName = this.getFontFamilyClassName(fontFamily);
        const selectedFontNameElement = document.createElement('span');
        selectedFontNameElement.classList.add(options.dropdownSelectedFontNameClassName);

        selectedFontElement.classList.add(options.dropdownSelectedFontClassName, newSelectedFontFamilyClassName);

        this.collapseFontList(dropdownElement, options);

        selectedFontElement.classList.remove(previouslySelectedFontFamilyClassName);
        selectedFontElement.classList.add(newSelectedFontFamilyClassName);
        selectedFontNameElement.innerText = fontName;

        selectedFontElement.innerHTML = '';
        selectedFontElement.append(selectedFontNameElement);

        selectElement.value = fontFamily;

        options.onSelected(fontFamily);
    }

    private static wrapSelectElement(selectElement: HTMLSelectElement, options: Options): HTMLDivElement {
        const parentNode = selectElement.parentNode!;
        const wrapper = document.createElement('div');

        wrapper.classList.add(options.wrapperClassName);

        parentNode.insertBefore(wrapper, selectElement);

        wrapper.appendChild(selectElement);

        return wrapper;
    }

    private static getSelectedOption(selectElement: HTMLSelectElement): HTMLOptionElement
    {
        return selectElement.options[selectElement.options.selectedIndex];
    }

    private static loadFonts(selectElement: HTMLSelectElement): void {
        for (let index = 0; index < selectElement.options.length; index++) {
            const optionElement = selectElement.options[index];
            const fontFamily = optionElement.value;
            const fontUrl = optionElement.getAttribute('data-font-url')!;

            this.loadFont(fontFamily, fontUrl);
        }
    }

    private static loadFont(fontFamily: string, fontUrl: string): void {
        let styleTag = document.createElement('style');
        styleTag.setAttribute('type', 'text/css');
        styleTag.innerHTML = "\n@font-face { font-family: '" + fontFamily  + "'; src: url('" + fontUrl +  "'); }\n";
        styleTag.innerHTML += '.' + this.getFontFamilyClassName(fontFamily) + '{ font-family: "' + fontFamily + '"}';

        document.head.append(styleTag);
    }

    private static getFontFamilyClassName(fontFamily: string) {
        return 'font-' + fontFamily
            .replace(/[^a-z0-9\-]/gi, '-')
            .toLowerCase();
    }
}