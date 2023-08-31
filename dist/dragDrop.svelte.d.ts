import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        ulStyle?: string | undefined;
        liStyle?: string | undefined;
        list: any[];
    };
    events: {
        reSort: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            item: any;
            index: any;
        };
    };
};
export type DragDropProps = typeof __propDef.props;
export type DragDropEvents = typeof __propDef.events;
export type DragDropSlots = typeof __propDef.slots;
export default class DragDrop extends SvelteComponentTyped<DragDropProps, DragDropEvents, DragDropSlots> {
}
export {};
