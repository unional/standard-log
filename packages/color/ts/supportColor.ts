import sc from 'supports-color'

/**
 * Color level.
 * This is the same definition as the `ColorSupportLevel` in `supports-color`.
 * Using the same definition for simplicity
 * @see https://github.com/chalk/supports-color/blob/main/index.d.ts#L19
 */
export enum ColorLevels {
	DISABLED = 0,
	/**
	 * Basic 16 colors (4-bits)
	 */
	BASIC = 1,
	/**
	 * ANSI 256 colors (8-bits)
	 */
	ANSI = 2,
	/**
	 * Truecolor 16 million colors (24-bits)
	 */
	TRUE = 3
}

export namespace supportColor {
	export type Result = { stdout: ColorLevels; stderr: ColorLevels }
}

let value: supportColor.Result

/**
 * Detects if the platform supports color.
 * For browser, the value can only be:
 * - `{ stdout: 0, stderr: 0 }`, or
 * - `{ stdout: 3, stderr: 3 }`.
 * So you only need to check one case.
 * The result value is made the same so that it can be used in all platforms.
 */
export function supportColor(): supportColor.Result {
	// istanbul ignore next
	return (value = value || {
		stderr: sc.stderr ? sc.stderr.level : ColorLevels.DISABLED,
		stdout: sc.stdout ? sc.stdout.level : ColorLevels.DISABLED
	})
}
