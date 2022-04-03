import toString from 'lodash/toString';

const createJoinStrings = (separator: string) => (...strings: string[]) => strings.map(toString).join(separator);

export const joinDotNotation = createJoinStrings('.');