/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ContentChildren, QueryList, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef, EventEmitter, Renderer2 } from '@angular/core';
/** @enum {string} */
const TabTypes = {
    button: "button",
    tab: "tab",
    plain: "plain",
    icon: "icon",
    radio: "radio",
};
export { TabTypes };
/** @enum {string} */
const TabPositions = {
    top: "top",
    left: "left",
    right: "right",
    bottom: "bottom",
};
export { TabPositions };
/**
 * @record
 */
export function DynamicTabContentComponent() { }
/** @type {?} */
DynamicTabContentComponent.prototype.activate;
/** @type {?} */
DynamicTabContentComponent.prototype.deactivate;
export class FlexibleTabComponent {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} host
     * @param {?} appRef
     * @param {?} injector
     * @param {?} renderer
     * @param {?} detector
     */
    constructor(componentFactoryResolver, host, appRef, injector, renderer, detector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.host = host;
        this.appRef = appRef;
        this.injector = injector;
        this.renderer = renderer;
        this.detector = detector;
        this.hovered = false;
        this.selected = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.renderer.setAttribute(this.host.nativeElement, 'id', this.flexibleId + '-panel-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'aria-labelledby', this.flexibleId + '-tab-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'role', "tabpanel");
        this.renderer.setAttribute(this.host.nativeElement, 'aria-labeledby', this.flexibleId + '-tab-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'aria-hidden', this.selected ? 'false' : 'true');
        this.host.nativeElement.style.display = "selected ? 'block':'none'";
    }
    /**
     * @return {?}
     */
    templateContext() {
        return { data: this.sourceData };
    }
    /**
     * @param {?} deselect
     * @return {?}
     */
    deactivate(deselect) {
        if (deselect) {
            this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '-1');
            this.renderer.setStyle(this.host.nativeElement, 'display', 'none');
            if (this.selected) {
                this.selected = false;
                if (this.dynamicComponent) {
                    /** @type {?} */
                    const instance = (/** @type {?} */ (this.dynamicComponent.instance));
                    instance.deactivate();
                }
            }
        }
        this.hovered = false;
        this.detector.detectChanges();
    }
    /**
     * @return {?}
     */
    activate() {
        if (!this.selected) {
            this.selected = true;
            this.detector.detectChanges();
            this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '0');
            this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
            if (this.component) {
                this.initializeDynamicComponent();
                /** @type {?} */
                const instance = (/** @type {?} */ (this.dynamicComponent.instance));
                instance.activate(this.sourceData, this.template, this.handler);
            }
        }
    }
    /**
     * @param {?} flag
     * @return {?}
     */
    hover(flag) {
        this.hovered = flag;
        this.detector.detectChanges();
    }
    /**
     * @return {?}
     */
    initializeDynamicComponent() {
        if (!this.dynamicComponent) {
            this.dynamicComponent = this.componentFactoryResolver
                .resolveComponentFactory(this.component)
                .create(this.injector);
            this.appRef.attachView(this.dynamicComponent.hostView);
            this.host.nativeElement.appendChild(/** @type {?} */ ((/** @type {?} */ (this.dynamicComponent.hostView)).rootNodes[0]));
        }
    }
}
FlexibleTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tab',
                template: "<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template && !component\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n",
                styles: [":host{padding:10px;margin:0;width:100%;display:block;box-sizing:border-box}:host:focus{outline:0}"]
            }] }
];
/** @nocollapse */
FlexibleTabComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ElementRef },
    { type: ApplicationRef },
    { type: Injector },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
FlexibleTabComponent.propDecorators = {
    selected: [{ type: Input, args: ["selected",] }],
    title: [{ type: Input, args: ["title",] }],
    component: [{ type: Input, args: ["component",] }],
    tabalticon: [{ type: Input, args: ["tabalticon",] }],
    tabicon: [{ type: Input, args: ["tabicon",] }],
    template: [{ type: Input, args: ["template",] }],
    sourceData: [{ type: Input, args: ["data",] }],
    handler: [{ type: Input, args: ["handler",] }]
};
if (false) {
    /** @type {?} */
    FlexibleTabComponent.prototype.hovered;
    /** @type {?} */
    FlexibleTabComponent.prototype.index;
    /** @type {?} */
    FlexibleTabComponent.prototype.flexibleId;
    /** @type {?} */
    FlexibleTabComponent.prototype.dynamicComponent;
    /** @type {?} */
    FlexibleTabComponent.prototype.selected;
    /** @type {?} */
    FlexibleTabComponent.prototype.title;
    /** @type {?} */
    FlexibleTabComponent.prototype.component;
    /** @type {?} */
    FlexibleTabComponent.prototype.tabalticon;
    /** @type {?} */
    FlexibleTabComponent.prototype.tabicon;
    /** @type {?} */
    FlexibleTabComponent.prototype.template;
    /** @type {?} */
    FlexibleTabComponent.prototype.sourceData;
    /** @type {?} */
    FlexibleTabComponent.prototype.handler;
    /** @type {?} */
    FlexibleTabComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    FlexibleTabComponent.prototype.host;
    /** @type {?} */
    FlexibleTabComponent.prototype.appRef;
    /** @type {?} */
    FlexibleTabComponent.prototype.injector;
    /** @type {?} */
    FlexibleTabComponent.prototype.renderer;
    /** @type {?} */
    FlexibleTabComponent.prototype.detector;
}
export class FlexibleTabsComponent {
    constructor() {
        this.tabs = [];
        this.selectedIndex = -1;
        this.isIconified = false;
        this.popped = false;
        this.position = TabPositions.top;
        this.type = TabTypes.tab;
        this.pophover = false;
        this.message = "Click to select tab. Use arrow keys to navigate to other tabs.";
        this.flexibleId = '';
        this.collapsed = false;
        this.onchange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        let defaultIndex = this.pophover ? -1 : 0;
        this.tabs = [];
        this.isIconified = false;
        this.children.forEach((tabInstance, index) => {
            tabInstance.index = index;
            tabInstance.flexibleId = this.flexibleId;
            if (tabInstance.selected) {
                defaultIndex = index;
            }
            this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                this.isIconified = true;
            }
            this.tabs.push(tabInstance);
        });
        if (this.tabs.length) {
            this.selectTab(defaultIndex);
        }
        else {
            this.selectedIndex = defaultIndex;
        }
    }
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    keyup(event, index) {
        /** @type {?} */
        const code = event.which;
        /** @type {?} */
        let id = undefined;
        if (code === 13) {
            event.target.click();
        }
        else if (code === 37 && (this.position === 'top' || this.position === 'bottom')) {
            // left arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index - 1));
        }
        else if (code === 39 && (this.position === 'top' || this.position === 'bottom')) {
            // rght arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index + 1));
        }
        else if (code === 38 && (this.position === 'left' || this.position === 'right')) {
            // up arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index + 1));
        }
        else if (code === 40 && (this.position === 'left' || this.position === 'right')) {
            // down arrow
            id = document.getElementById(this.flexibleId + '-tab-' + (index - 1));
        }
        if (id) {
            event.preventDefault();
            event.stopPropagation();
            id.focus();
            return false;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectTab(index) {
        if (this.selectedIndex != index) {
            this.tabs.map((tab) => {
                tab.deactivate(true);
            });
            if (index > -1) {
                this.tabs[index].activate();
                this.selectedIndex = index;
                this.popped = true;
                this.onchange.emit({
                    selectedIndex: index,
                    selectedTitle: this.tabs[index].title
                });
            }
        }
    }
    /**
     * @param {?} index
     * @param {?} flag
     * @return {?}
     */
    hoverTab(index, flag) {
        if (this.pophover) {
            this.tabs.map((tab) => {
                tab.deactivate(false);
            });
            if (index > -1) {
                this.tabs[index].hover(flag);
            }
            this.popped = this.selectedIndex > -1 || flag;
        }
    }
}
FlexibleTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tabs',
                template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div *ngIf=\"position === 'top' || position === 'left'\"\r\n        [attr.aria-orientation]=\"position === 'left' ?  'vertical' : 'horizontal'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n\t\t\t[id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\"  [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div \r\n        class=\"tabs-viewport\" \r\n        role=\"tabpanel\"\r\n        [class.popper]=\"pophover\" \r\n        [class.pop]=\"popped\" \r\n        (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div *ngIf=\"position === 'bottom' || position === 'right'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        [attr.aria-orientation]=\"position === 'right' ? 'vertical' : 'horizontal'\"\r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\"  [class]=\"tab.tabalticon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;min-height:150px;display:flex;align-items:stretch}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;min-width:27px;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs .tabs-control a.icon :before{display:block}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
            }] }
];
/** @nocollapse */
FlexibleTabsComponent.ctorParameters = () => [];
FlexibleTabsComponent.propDecorators = {
    children: [{ type: ContentChildren, args: [FlexibleTabComponent,] }],
    position: [{ type: Input, args: ["position",] }],
    type: [{ type: Input, args: ["type",] }],
    pophover: [{ type: Input, args: ["pophover",] }],
    message: [{ type: Input, args: ["message",] }],
    flexibleId: [{ type: Input, args: ["flexibleId",] }],
    collapsed: [{ type: Input, args: ["collapsed",] }],
    onchange: [{ type: Output, args: ['onchange',] }]
};
if (false) {
    /** @type {?} */
    FlexibleTabsComponent.prototype.tabs;
    /** @type {?} */
    FlexibleTabsComponent.prototype.selectedIndex;
    /** @type {?} */
    FlexibleTabsComponent.prototype.isIconified;
    /** @type {?} */
    FlexibleTabsComponent.prototype.popped;
    /** @type {?} */
    FlexibleTabsComponent.prototype.children;
    /** @type {?} */
    FlexibleTabsComponent.prototype.position;
    /** @type {?} */
    FlexibleTabsComponent.prototype.type;
    /** @type {?} */
    FlexibleTabsComponent.prototype.pophover;
    /** @type {?} */
    FlexibleTabsComponent.prototype.message;
    /** @type {?} */
    FlexibleTabsComponent.prototype.flexibleId;
    /** @type {?} */
    FlexibleTabsComponent.prototype.collapsed;
    /** @type {?} */
    FlexibleTabsComponent.prototype.onchange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUudGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUNILFNBQVMsRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGVBQWUsRUFDZixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUix3QkFBd0IsRUFFeEIsVUFBVSxFQUNQLGNBQWMsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFFVCxNQUFNLGVBQWUsQ0FBQzs7O0lBR3RCLFFBQVMsUUFBUTtJQUNqQixLQUFNLEtBQUs7SUFDWCxPQUFRLE9BQU87SUFDZixNQUFPLE1BQU07SUFDYixPQUFRLE9BQU87Ozs7O0lBSWYsS0FBTSxLQUFLO0lBQ1gsTUFBTyxNQUFNO0lBQ2IsT0FBUSxPQUFPO0lBQ2YsUUFBUyxRQUFROzs7Ozs7Ozs7OztBQXlCbEIsTUFBTTs7Ozs7Ozs7O0lBK0JGLFlBQ00sMEJBQ0EsTUFDQSxRQUNBLFVBQ0EsVUFDQTtRQUxBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsU0FBSSxHQUFKLElBQUk7UUFDSixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1IsYUFBUSxHQUFSLFFBQVE7UUFDUixhQUFRLEdBQVIsUUFBUTt1QkFuQ1AsS0FBSzt3QkFNTSxLQUFLO0tBK0J6Qjs7OztJQUVELFFBQVE7UUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENB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Q0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLO2lCQUNyQyxDQUFDLENBQUM7YUFDSDtTQUNEO0tBQ0Q7Ozs7OztJQUNELFFBQVEsQ0FBQyxLQUFhLEVBQUUsSUFBYTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBQyxFQUFFO2dCQUNwQixHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1NBQzlDO0tBQ0Q7OztZQTdHRCxTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGk4SEFBNkM7O2FBRTdDOzs7Ozt1QkFPQyxlQUFlLFNBQUMsb0JBQW9CO3VCQUdqQyxLQUFLLFNBQUMsVUFBVTttQkFHaEIsS0FBSyxTQUFDLE1BQU07dUJBR1osS0FBSyxTQUFDLFVBQVU7c0JBR2hCLEtBQUssU0FBQyxTQUFTO3lCQUdsQixLQUFLLFNBQUMsWUFBWTt3QkFHbEIsS0FBSyxTQUFDLFdBQVc7dUJBR2pCLE1BQU0sU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgYSB0YWJsZSB3aGljaCBpcyB1c2luZyB0aGUgZ2l2ZW4gRmxleGlibGVUYWJsZUhlYWRlciBzZXQgaW5cclxuKiBvcmRlciB0byB0YWJ1bGF0ZSB0aGUgZ2l2ZW4gZGF0YS4gQXMgcGVyIGRlZmluaXRpb24gb2YgZWFyY2ggaGVhZGVyIGNvbXBvbmVudCxcclxuKiBhIGNvbHVtbiBjb3VsZCBiZSBoaWRkZW4sIHNvcnRhYmxlLCBvciBkcmFnZ2FibGUuIEVhY2ggdGFibGUgcm93IGNhbiBleHBhbmQvY29sbGFwc2VcclxuKiBvciByZXNwb25kIHRvIGEgY2xpY2sgYWN0aW9uLlxyXG4qL1xyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRDb250ZW50Q2hpbGRyZW4sXHJcblx0UXVlcnlMaXN0LFxyXG5cdEFmdGVyQ29udGVudEluaXQsXHJcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXHJcblx0SW5qZWN0b3IsXHJcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG5cdEVtYmVkZGVkVmlld1JlZixcclxuXHRFbGVtZW50UmVmLFxyXG4gICAgQXBwbGljYXRpb25SZWYsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdFJlbmRlcmVyMixcclxuXHRPbkluaXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBlbnVtIFRhYlR5cGVzIHtcclxuXHRidXR0b24gPSBcImJ1dHRvblwiLCBcclxuXHR0YWIgPSBcInRhYlwiLCBcclxuXHRwbGFpbiA9IFwicGxhaW5cIiwgXHJcblx0aWNvbiA9IFwiaWNvblwiLCBcclxuXHRyYWRpbyA9IFwicmFkaW9cIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUYWJQb3NpdGlvbnMge1xyXG5cdHRvcCA9IFwidG9wXCIsIFxyXG5cdGxlZnQgPSBcImxlZnRcIiwgXHJcblx0cmlnaHQgPSBcInJpZ2h0XCIsIFxyXG5cdGJvdHRvbSA9IFwiYm90dG9tXCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEeW5hbWljVGFiQ29udGVudENvbXBvbmVudCB7XHJcbiAgLypcclxuICAgKiBXaWxsIGFjdGl2YXRlIHRoZSBjb21wb25lbnQgd2l0aCBnaXZlbiBkYXRhLlxyXG4gICAqIEBhdHRyaWJ1dGUgZGF0YTogaW5pdGlhbCBkYXRhLlxyXG4gICAqIEBhcnJlaWJ1dGUgdGVtcGxhdGU6IGlmIHRoaXMgY29tcG9uZW50IG5lZWRzIHRvIGhhdmUgc3ViLXRlbXBsYXRlXHJcbiAgICogQGF0dHJpYnV0ZSBoZWxwZXI6IGlmIGNvbXBvbmVudCBuZWVkcyBhIGhlbHBlci5cclxuICAgKi9cclxuICBhY3RpdmF0ZShkYXRhOiBhbnksIHRlbXBsYXRlPzogYW55LCBoZWxwZXI/OiBhbnkpOiB2b2lkO1xyXG5cclxuICAvKlxyXG4gICAqIFdpbGwgdGVsbCBjb21wb25lbnQgdG8gcGF1c2UgYWxsIGFjdGl2aXRpZXMgYW5kIGZyZWV6IGRhdGEgdGlsbCBhY3RpdmF0aW9uLlxyXG4gICAqIHJlY29tbWVuZGF0aW9uIGlzIGZvciB0aGUgY29tcG9uZW50IHRvIGVpZ3RoZXIgdW5kZWZpbmUgZGF0YSBhbmQgaGFuZGxlIGl0IG9yIHVzZVxyXG4gICAqIEpTT04ucGFyc2UoSlNPTi5zdHJpbmd5ZnkoZGF0YSkpIHRvIGZyZWV6IGl0IGFuZCBicmVhayBhd2F5IGZyb20gcG9pbnRlciBpdCBoYXMgcmVjZWl2ZWQgaW4gYWN0aXZhdGlvblxyXG4gICAqL1xyXG4gIGRlYWN0aXZhdGUoKTogdm9pZDtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG5cdGhvdmVyZWQgPSBmYWxzZTtcclxuXHRpbmRleDogbnVtYmVyO1xyXG5cdGZsZXhpYmxlSWQ6IHN0cmluZztcclxuXHRkeW5hbWljQ29tcG9uZW50OiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwic2VsZWN0ZWRcIilcclxuICAgIHB1YmxpYyBzZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcInRpdGxlXCIpXHJcblx0cHVibGljIHRpdGxlOiBzdHJpbmc7XHJcblx0XHJcblx0QElucHV0KFwiY29tcG9uZW50XCIpXHJcblx0cHVibGljIGNvbXBvbmVudDogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInRhYmFsdGljb25cIilcclxuICAgIHB1YmxpYyB0YWJhbHRpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGFiaWNvblwiKVxyXG4gICAgcHVibGljIHRhYmljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0ZW1wbGF0ZVwiKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwiZGF0YVwiKVxyXG5cdHB1YmxpYyBzb3VyY2VEYXRhOiBhbnk7XHJcblx0XHJcblx0QElucHV0KFwiaGFuZGxlclwiKVxyXG5cdHB1YmxpYyBoYW5kbGVyOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG5cdFx0cHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG5cdFx0cHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcblx0XHRwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcblx0XHRwcml2YXRlIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG5cdCkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2lkJywgdGhpcy5mbGV4aWJsZUlkICsgJy1wYW5lbC0nICsgdGhpcy5pbmRleCk7XHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2FyaWEtbGFiZWxsZWRieScsIHRoaXMuZmxleGlibGVJZCArICctdGFiLScgKyB0aGlzLmluZGV4KTtcclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAncm9sZScsIFwidGFicGFuZWxcIik7XHJcblx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2FyaWEtbGFiZWxlZGJ5JywgdGhpcy5mbGV4aWJsZUlkICsgJy10YWItJyArICB0aGlzLmluZGV4KTtcclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnYXJpYS1oaWRkZW4nLCB0aGlzLnNlbGVjdGVkID8gJ2ZhbHNlJzondHJ1ZScpO1xyXG5cdFx0dGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheT1cInNlbGVjdGVkID8gJ2Jsb2NrJzonbm9uZSdcIiBcclxuXHR9XHJcblxyXG5cdHRlbXBsYXRlQ29udGV4dCgpIHtcclxuXHRcdHJldHVybiB7ZGF0YTogdGhpcy5zb3VyY2VEYXRhIH07XHJcblx0fVxyXG5cdGRlYWN0aXZhdGUoZGVzZWxlY3Q6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdGlmIChkZXNlbGVjdCkge1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ3RhYkluZGV4JywgJy0xJyk7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ25vbmUnKTtcclxuXHRcdFx0aWYodGhpcy5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRpZiAodGhpcy5keW5hbWljQ29tcG9uZW50KSB7XHJcblx0XHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9ICg8RHluYW1pY1RhYkNvbnRlbnRDb21wb25lbnQ+dGhpcy5keW5hbWljQ29tcG9uZW50Lmluc3RhbmNlKTtcclxuXHRcdFx0XHRcdGluc3RhbmNlLmRlYWN0aXZhdGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0fVxyXG5cdGFjdGl2YXRlKCk6IHZvaWQge1xyXG5cdFx0aWYgKCF0aGlzLnNlbGVjdGVkKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICd0YWJJbmRleCcsICcwJyk7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblx0XHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xyXG5cdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZUR5bmFtaWNDb21wb25lbnQoKTtcclxuXHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9ICg8RHluYW1pY1RhYkNvbnRlbnRDb21wb25lbnQ+dGhpcy5keW5hbWljQ29tcG9uZW50Lmluc3RhbmNlKTtcclxuXHRcdFx0XHRpbnN0YW5jZS5hY3RpdmF0ZSh0aGlzLnNvdXJjZURhdGEsIHRoaXMudGVtcGxhdGUsIHRoaXMuaGFuZGxlcik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXIoZmxhZzogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy5ob3ZlcmVkID0gZmxhZztcclxuXHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdH1cclxuXHRwcml2YXRlIGluaXRpYWxpemVEeW5hbWljQ29tcG9uZW50KCkge1xyXG5cdFx0aWYgKCF0aGlzLmR5bmFtaWNDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy5keW5hbWljQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuXHRcdFx0XHQucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jb21wb25lbnQpXHJcblx0XHRcdFx0LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcclxuXHJcblx0XHRcdHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5keW5hbWljQ29tcG9uZW50Lmhvc3RWaWV3KTtcclxuXHRcdFx0dGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoKHRoaXMuZHluYW1pY0NvbXBvbmVudC5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYnMnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQgIHtcclxuXHR0YWJzID0gW107XHJcblx0c2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cdGlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblx0cG9wcGVkID0gZmFsc2U7XHJcblxyXG5cdEBDb250ZW50Q2hpbGRyZW4oRmxleGlibGVUYWJDb21wb25lbnQpXHJcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxGbGV4aWJsZVRhYkNvbXBvbmVudD47XHJcblxyXG4gICAgQElucHV0KFwicG9zaXRpb25cIilcclxuICAgIHB1YmxpYyBwb3NpdGlvbiA9IFRhYlBvc2l0aW9ucy50b3A7XHJcblxyXG4gICAgQElucHV0KFwidHlwZVwiKVxyXG4gICAgcHVibGljIHR5cGUgPSBUYWJUeXBlcy50YWI7XHJcblxyXG4gICAgQElucHV0KFwicG9waG92ZXJcIilcclxuICAgIHB1YmxpYyBwb3Bob3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJDbGljayB0byBzZWxlY3QgdGFiLiBVc2UgYXJyb3cga2V5cyB0byBuYXZpZ2F0ZSB0byBvdGhlciB0YWJzLlwiO1xyXG5cclxuXHRASW5wdXQoXCJmbGV4aWJsZUlkXCIpXHJcblx0cHVibGljIGZsZXhpYmxlSWQgPSAnJztcclxuXHJcblx0QElucHV0KFwiY29sbGFwc2VkXCIpXHJcblx0cHVibGljIGNvbGxhcHNlZCA9IGZhbHNlO1xyXG5cdFxyXG5cdEBPdXRwdXQoJ29uY2hhbmdlJylcclxuXHRwcml2YXRlIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG5cdFx0bGV0IGRlZmF1bHRJbmRleCA9ICB0aGlzLnBvcGhvdmVyID8gLTEgOiAwO1xyXG5cdFx0dGhpcy50YWJzID0gW107XHJcblx0XHR0aGlzLmlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCh0YWJJbnN0YW5jZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0dGFiSW5zdGFuY2UuaW5kZXggPSBpbmRleDtcclxuXHRcdFx0dGFiSW5zdGFuY2UuZmxleGlibGVJZCA9IHRoaXMuZmxleGlibGVJZDtcclxuXHRcdFx0aWYodGFiSW5zdGFuY2Uuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHRkZWZhdWx0SW5kZXggPSBpbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodGFiSW5zdGFuY2UudGFiaWNvbiB8fCB0YWJJbnN0YW5jZS50YWJhbHRpY29uKSB7XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy50YWJzLnB1c2godGFiSW5zdGFuY2UpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy50YWJzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggZGVmYXVsdEluZGV4ICk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBkZWZhdWx0SW5kZXg7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRrZXl1cChldmVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRsZXQgaWQgPSB1bmRlZmluZWQ7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRldmVudC50YXJnZXQuY2xpY2soKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzcgJiYgKHRoaXMucG9zaXRpb24gPT09ICd0b3AnIHx8IHRoaXMucG9zaXRpb24gPT09ICdib3R0b20nKSkgeyAvLyBsZWZ0IGFycm93XHJcblx0XHRcdGlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgJy10YWItJyArIChpbmRleCAtIDEpKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzkgJiYgKHRoaXMucG9zaXRpb24gPT09ICd0b3AnIHx8IHRoaXMucG9zaXRpb24gPT09ICdib3R0b20nKSkgey8vIHJnaHQgYXJyb3dcclxuXHRcdFx0aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyAnLXRhYi0nICsgKGluZGV4ICsgMSkpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCAmJiAodGhpcy5wb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcpKSB7IC8vIHVwIGFycm93XHJcblx0XHRcdGlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgJy10YWItJyArIChpbmRleCArIDEpKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDAgJiYgKHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnKSkgey8vIGRvd24gYXJyb3dcclxuXHRcdFx0aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyAnLXRhYi0nICsgKGluZGV4IC0gMSkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGlkKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0XHRpZC5mb2N1cygpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpbmRleDogbnVtYmVyKSB7XHJcblx0XHRpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IGluZGV4KSB7XHJcblx0XHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0XHR0YWIuZGVhY3RpdmF0ZSh0cnVlKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdFx0dGhpcy50YWJzW2luZGV4XS5hY3RpdmF0ZSgpO1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHRcdHRoaXMucG9wcGVkID0gdHJ1ZTtcclxuXHRcdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG5cdFx0XHRcdFx0c2VsZWN0ZWRJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0XHRzZWxlY3RlZFRpdGxlOiB0aGlzLnRhYnNbaW5kZXhdLnRpdGxlXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJUYWIoaW5kZXg6IG51bWJlciwgZmxhZzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMucG9waG92ZXIpIHtcclxuXHRcdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHRcdHRhYi5kZWFjdGl2YXRlKGZhbHNlKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChpbmRleCA+IC0xKXtcclxuXHRcdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmhvdmVyKGZsYWcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucG9wcGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID4gLTEgfHwgZmxhZztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19