import { createHashHistory } from 'history';

const history = createHashHistory();

export default history;

export const currentPath = history.location.pathname.replace('/home/', '');
