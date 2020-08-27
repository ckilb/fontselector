import '../scss/style.scss';
import { Font, Options } from './types';
import './polyfill.ts';

const CSS_CLASS_PREFIX = 'font-selector-';

export default class FontSelector {
    options: Options;
    nativeSelectElement: HTMLSelectElement;
    wrapperElement: HTMLDivElement;
    dropdownElement: HTMLDivElement;
    selectedFontElement: HTMLAnchorElement;
    fontListListItemElements: HTMLLIElement[];
    fonts: Font[];
    selectedFont: Font | undefined;

    constructor(selector: string, options: Partial<Options>) {
        this.options = FontSelector.mergeOptionsWithDefaults(options);
        this.nativeSelectElement = document.querySelector<HTMLSelectElement>(selector)!;
        this.fonts = this.getFonts();
        this.wrapperElement = this.wrapSelectElement();
        this.selectedFontElement = this.createSelectedFontElement();
        this.fontListListItemElements = this.createFontListListItemElements();
        this.dropdownElement = this.createDropdownElement();
        this.selectFont(this.getSelectedOption().value);

        this.loadFonts();

        this.wrapperElement.appendChild(this.dropdownElement);
    }

    public selectFont(fontFamily: string): void
    {
        const font = this.getFontByFamily(fontFamily);

        if (!font) {
            return;
        }

        const newSelectedFontFamilyClassName = this.getFontFamilyClassName(font.family);
        const selectedFontNameElement = document.createElement('span');

        selectedFontNameElement.classList.add(this.options.dropdownSelectedFontNameClassName);

        this.selectedFontElement.setAttribute('class', '');

        this.selectedFontElement.classList.add(this.options.dropdownSelectedFontClassName);
        this.selectedFontElement.classList.add(newSelectedFontFamilyClassName);

        this.collapseFontList();

        selectedFontNameElement.textContent = font.name;

        this.selectedFontElement.innerHTML = '';
        this.selectedFontElement.append(selectedFontNameElement);

        this.nativeSelectElement.value = font.family;
        this.selectedFont = font;

        this.options.onSelected(font);
    }

    public getSelectedFont(): Font | null {
        if (!this.selectedFont) {
            return null;
        }

        return this.selectedFont;
    }

    private static mergeOptionsWithDefaults(options: Partial<Options>): Options {
        return {
            ...FontSelector.getDefaultOptions(),
            ...options
        };
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

    private createDropdownElement(): HTMLDivElement {
        const dropdownElement = document.createElement('div');
        const fontListElement = document.createElement('ul');

        this.fontListListItemElements.forEach((listItemElement: HTMLLIElement) => {
            fontListElement.appendChild(listItemElement);
        });

        dropdownElement.classList.add(this.options.dropdownClassName);
        fontListElement.classList.add(this.options.dropdownFontListClassName);

        dropdownElement.appendChild(this.selectedFontElement);
        dropdownElement.appendChild(fontListElement);

        return dropdownElement;
    }

    private createSelectedFontElement(): HTMLAnchorElement {
        const selectedFontElement = document.createElement('a');
        const selectedFontNameElement = document.createElement('span');

        selectedFontNameElement.classList.add(this.options.dropdownSelectedFontNameClassName);

        selectedFontElement.append(selectedFontNameElement);
        selectedFontElement.classList.add(this.options.dropdownSelectedFontClassName);

        selectedFontElement.addEventListener('click', () => {
            if (this.isExpanded()) {
                this.collapseFontList();

                return;
            }

            this.expandFontList();
        });

        document.body.addEventListener('click', (event) => {
            if (!event.target || event.target !== selectedFontElement) {
                this.collapseFontList();
            }
        });

        return selectedFontElement;
    }

    private isExpanded() {
        return this.dropdownElement.classList.contains(this.options.isExpandedClassName);
    }

    private expandFontList(): void {
        this.dropdownElement.classList.add(this.options.isExpandedClassName);

        this.options.onExpanded();
    }

    private collapseFontList(): void {
        this.dropdownElement.classList.remove(this.options.isExpandedClassName);

        this.options.onCollapsed();
    }

    private createFontListListItemElements(): HTMLLIElement[] {
        const listItemElements: HTMLLIElement[] = [];

        this.fonts.forEach((font) => {
            const listItem: HTMLLIElement = document.createElement('li');
            const fontFamilyClassName = this.getFontFamilyClassName(font.family);

            listItem.classList.add(fontFamilyClassName);
            listItem.textContent = font.name;
            listItem.setAttribute('data-font', font.family);

            listItem.addEventListener('click', () => {
                this.selectFont(
                    listItem.getAttribute('data-font')!,
                );
            });

            listItemElements.push(listItem);
        });

        return listItemElements;
    }

    private wrapSelectElement(): HTMLDivElement {
        const parentNode = this.nativeSelectElement.parentNode!;
        const wrapper = document.createElement('div');

        wrapper.classList.add(this.options.wrapperClassName);

        parentNode.insertBefore(wrapper, this.nativeSelectElement);

        wrapper.appendChild(this.nativeSelectElement);

        return wrapper;
    }

    private getSelectedOption(): HTMLOptionElement
    {
        return this.nativeSelectElement.options[this.nativeSelectElement.options.selectedIndex];
    }

    private loadFonts(): void {
        this.fonts.forEach((font) => {
            this.loadFont(font);
        });
    }

    private loadFont(font: Font): void {
        let styleTag = document.createElement('style');

        styleTag.setAttribute('type', 'text/css');
        styleTag.innerHTML = "\n@font-face { font-family: '" + font.family  + "'; src: url('" + font.url +  "'); }\n";
        styleTag.innerHTML += '.' + this.getFontFamilyClassName(font.family) + '{ font-family: "' + font.family + '"}';

        document.head.append(styleTag);
    }

    private getFontFamilyClassName(fontFamily: string) {
        return 'font-' + fontFamily
            .replace(/[^a-z0-9\-]/gi, '-')
            .toLowerCase();
    }

    private getFontByFamily(fontFamily: string): Font | null {
        for (let index = 0; index < this.fonts.length; index++) {
            const font = this.fonts[index];

            if (font.family === fontFamily) {
                return font;
            }
        }

        return null;
    }

    private getFonts(): Font[] {
        const fonts = [];

        for (let index = 0; index < this.nativeSelectElement.options.length; index++) {
            const optionElement =  this.nativeSelectElement.options[index];
            const font: Font = {
                name: optionElement.textContent!.trim(),
                family: optionElement.value,
                url: optionElement.getAttribute('data-font-url')!
            };

            fonts.push(font);
        }

        return fonts;
    }
}
