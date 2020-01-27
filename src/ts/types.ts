export interface Options {
    wrapperClassName: string,
    dropdownClassName: string,
    dropdownSelectedFontClassName: string,
    dropdownSelectedFontNameClassName: string,
    dropdownFontListClassName: string,
    isExpandedClassName: string,
    onExpanded: Function,
    onSelected: Function,
    onCollapsed: Function
}

export interface Font {
    name: string,
    family: string,
    url: string
}
