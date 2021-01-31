import '../css/main.css';
import {TopPanel} from './TopPanel'
export const isInternalLink = (link: string) => /^\/(?!\/)/.test(link);

TopPanel()