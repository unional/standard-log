export interface BrushOption {
  /**
   * How many colors available.
   * Recommend at least 10.
   */
  maxColor: number

  /**
   * By default, `ColorAppender` will color the background of the logger ID.
   * If this is set to true, then the text of the ID will be colored instead.
   * Currently this only have effect on NodeJS environment.
   */
  coloringText: boolean
}
export interface Brush {
  color(id: string, ...rest: string[]): string[]
}

export type ColorMode = 'CSS' | 'ANSI' | 'ANSI16M' | 'NONE'

export interface ColorModeOption {
  /**
   * Choose which color mode to use.
   * For browser usage, you should choose 'CSS',
   * For NodeJS, you should choose 'ANSI'
   * For NodeJS with no support of Windows, you can choose 'ANSI16M'
   * Choose 'NONE' if you want to disable color.
   */
  colorMode: ColorMode
}
