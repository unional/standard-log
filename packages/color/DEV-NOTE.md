# Dev note

Windows 8 or below seems to follow this:
<http://www.termsys.demon.co.uk/vtansi.htm>

## Browser-field-spec support

Originally was using `os` module to check for Windows version and plan to use that to enable `ANSI16M` in supported Windows version.

However the browser-field-spec suport in `webpack` is lacking <https://github.com/webpack/webpack/issues/4223>.

So in the mean time, reduce scope so that it can be used in all environments.
