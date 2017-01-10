import { RGB, RGBA } from 'color-map'

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
  paint(text: string): string
}
