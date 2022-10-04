import * as React from 'react';
import type { ScrollConfig } from 'rc-virtual-list/lib/List';
export declare type OptionListProps = Record<string, never>;
export interface RefOptionListProps {
    onKeyDown: React.KeyboardEventHandler;
    onKeyUp: React.KeyboardEventHandler;
    scrollTo?: (args: number | ScrollConfig) => void;
}
declare const RefOptionList: React.ForwardRefExoticComponent<Pick<OptionListProps, string> & React.RefAttributes<RefOptionListProps>>;
export default RefOptionList;
