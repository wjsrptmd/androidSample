export interface UIComponent {
    component: string;
    props?: { [key: string]: any };
    children?: UIComponent[];
}
