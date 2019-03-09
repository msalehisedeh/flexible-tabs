/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ContentChildren, QueryList, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef, EventEmitter } from '@angular/core';
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
DynamicTabContentComponent.prototype.data;
export class FlexibleTabComponent {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     * @param {?} host
     * @param {?} detector
     */
    constructor(componentFactoryResolver, appRef, injector, host, detector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.host = host;
        this.detector = detector;
        this.hovered = false;
        this.selected = false;
    }
    /**
     * @return {?}
     */
    templateContext() {
        return { data: this.sourceData };
    }
    /**
     * @return {?}
     */
    dynamicallyLoadedComponent() {
        if (this.component) {
            if (this.selected) {
                this.initializeDynamicComponent();
                /** @type {?} */
                const instance = (/** @type {?} */ (this.dynamicComponent.instance));
                this.host.nativeElement.append(/** @type {?} */ ((/** @type {?} */ (this.dynamicComponent.hostView)).rootNodes[0]));
                instance.data = this.sourceData;
            }
            else if (this.dynamicComponent) {
                this.host.nativeElement.innerHTML = "";
            }
        }
        return false;
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
        }
    }
}
FlexibleTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tab',
                template: "    \r\n<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n<div *ngIf=\"dynamicallyLoadedComponent()\"></div>\r\n",
                styles: [":host{padding:0;margin:0;width:100%}"]
            }] }
];
/** @nocollapse */
FlexibleTabComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
FlexibleTabComponent.propDecorators = {
    selected: [{ type: Input, args: ["selected",] }],
    title: [{ type: Input, args: ["title",] }],
    component: [{ type: Input, args: ["component",] }],
    tabalticon: [{ type: Input, args: ["tabalticon",] }],
    tabicon: [{ type: Input, args: ["tabicon",] }],
    template: [{ type: Input, args: ["template",] }],
    sourceData: [{ type: Input, args: ["data",] }]
};
if (false) {
    /** @type {?} */
    FlexibleTabComponent.prototype.hovered;
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
    FlexibleTabComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    FlexibleTabComponent.prototype.appRef;
    /** @type {?} */
    FlexibleTabComponent.prototype.injector;
    /** @type {?} */
    FlexibleTabComponent.prototype.host;
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
        this.message = "click to select tab ";
        this.onchange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.tabs = [];
        this.selectedIndex = this.pophover ? -1 : 0;
        this.isIconified = false;
        this.children.forEach((tabInstance, index) => {
            if (tabInstance.selected) {
                this.selectedIndex = index;
            }
            this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                this.isIconified = true;
            }
            this.tabs.push(tabInstance);
        });
        if (this.tabs.length) {
            this.selectTab(this.selectedIndex);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectTab(index) {
        this.tabs.map((tab) => {
            tab.selected = false;
            tab.hovered = false;
            tab.detector.detectChanges();
        });
        if (index > -1) {
            this.tabs[index].selected = true;
            this.tabs[index].detector.detectChanges();
            this.selectedIndex = index;
            this.popped = true;
            this.onchange.emit({
                selectedIndex: index,
                selectedTitle: this.tabs[index].title
            });
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
                tab.hovered = false;
                tab.detector.detectChanges();
            });
            if (index > -1) {
                this.tabs[index].hovered = flag;
                this.tabs[index].detector.detectChanges();
            }
            this.popped = this.selectedIndex > -1 || flag;
        }
    }
}
FlexibleTabsComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-tabs',
                template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"tabs-viewport\" [class.popper]=\"pophover\" [class.pop]=\"popped\" (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
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
    FlexibleTabsComponent.prototype.onchange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUudGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUNILFNBQVMsRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGVBQWUsRUFDZixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUix3QkFBd0IsRUFFeEIsVUFBVSxFQUNQLGNBQWMsRUFDakIsWUFBWSxFQUNaLE1BQU0sZUFBZSxDQUFDOzs7SUFHdEIsUUFBUyxRQUFRO0lBQ2pCLEtBQU0sS0FBSztJQUNYLE9BQVEsT0FBTztJQUNmLE1BQU8sTUFBTTtJQUNiLE9BQVEsT0FBTzs7Ozs7SUFJZixLQUFNLEtBQUs7SUFDWCxNQUFPLE1BQU07SUFDYixPQUFRLE9BQU87SUFDZixRQUFTLFFBQVE7Ozs7Ozs7OztBQVlsQixNQUFNOzs7Ozs7OztJQTBCRixZQUNNLDBCQUNBLFFBQ0EsVUFDQSxNQUNEO1FBSkMsNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1IsU0FBSSxHQUFKLElBQUk7UUFDTCxhQUFRLEdBQVIsUUFBUTt1QkE3Qk4sS0FBSzt3QkFJTSxLQUFLO0tBMEJ0Qjs7OztJQUVKLGVBQWU7UUFDZCxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ2hDOzs7O0lBQ0QsMEJBQTBCO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzs7Z0JBQ2xDLE1B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QUFHLENBQUMsQ0FBQyxHQUFHLEVBQUMsRUFBRTtnQkFDcEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQzFDO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztTQUM5QztLQUNEOzs7WUF2RkQsU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSxlQUFlO2dCQUN6QiwrMEZBQTZDOzthQUU3Qzs7Ozs7dUJBT0MsZUFBZSxTQUFDLG9CQUFvQjt1QkFHakMsS0FBSyxTQUFDLFVBQVU7bUJBR2hCLEtBQUssU0FBQyxNQUFNO3VCQUdaLEtBQUssU0FBQyxVQUFVO3NCQUdoQixLQUFLLFNBQUMsU0FBUzt1QkFHbEIsTUFBTSxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdENvbnRlbnRDaGlsZHJlbixcclxuXHRRdWVyeUxpc3QsXHJcblx0QWZ0ZXJDb250ZW50SW5pdCxcclxuXHRDaGFuZ2VEZXRlY3RvclJlZixcclxuXHRJbmplY3RvcixcclxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcblx0RW1iZWRkZWRWaWV3UmVmLFxyXG5cdEVsZW1lbnRSZWYsXHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuXHRFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBlbnVtIFRhYlR5cGVzIHtcclxuXHRidXR0b24gPSBcImJ1dHRvblwiLCBcclxuXHR0YWIgPSBcInRhYlwiLCBcclxuXHRwbGFpbiA9IFwicGxhaW5cIiwgXHJcblx0aWNvbiA9IFwiaWNvblwiLCBcclxuXHRyYWRpbyA9IFwicmFkaW9cIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUYWJQb3NpdGlvbnMge1xyXG5cdHRvcCA9IFwidG9wXCIsIFxyXG5cdGxlZnQgPSBcImxlZnRcIiwgXHJcblx0cmlnaHQgPSBcInJpZ2h0XCIsIFxyXG5cdGJvdHRvbSA9IFwiYm90dG9tXCJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEeW5hbWljVGFiQ29udGVudENvbXBvbmVudCB7XHJcblx0ZGF0YTogYW55O1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFiQ29tcG9uZW50IHtcclxuXHJcblx0aG92ZXJlZCA9IGZhbHNlO1xyXG5cdGR5bmFtaWNDb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJzZWxlY3RlZFwiKVxyXG4gICAgcHVibGljIHNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwidGl0bGVcIilcclxuXHRwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuXHRcclxuXHRASW5wdXQoXCJjb21wb25lbnRcIilcclxuXHRwdWJsaWMgY29tcG9uZW50OiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwidGFiYWx0aWNvblwiKVxyXG4gICAgcHVibGljIHRhYmFsdGljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgICBwdWJsaWMgc291cmNlRGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuXHRcdHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcclxuXHRcdHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxyXG5cdFx0cHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmLFxyXG5cdFx0cHVibGljIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG5cdCkge31cclxuXHJcblx0dGVtcGxhdGVDb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHtkYXRhOiB0aGlzLnNvdXJjZURhdGEgfTtcclxuXHR9XHJcblx0ZHluYW1pY2FsbHlMb2FkZWRDb21wb25lbnQoKSB7XHJcblx0XHRpZiAodGhpcy5jb21wb25lbnQpIHtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHR0aGlzLmluaXRpYWxpemVEeW5hbWljQ29tcG9uZW50KCk7XHJcblx0XHRcdFx0Y29uc3QgaW5zdGFuY2UgPSAoPER5bmFtaWNUYWJDb250ZW50Q29tcG9uZW50PnRoaXMuZHluYW1pY0NvbXBvbmVudC5pbnN0YW5jZSk7XHJcblx0XHRcdFx0dGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuYXBwZW5kKCh0aGlzLmR5bmFtaWNDb21wb25lbnQuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudCk7XHJcblx0XHRcdFx0aW5zdGFuY2UuZGF0YSA9IHRoaXMuc291cmNlRGF0YTtcclxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmR5bmFtaWNDb21wb25lbnQpIHtcclxuXHRcdFx0XHR0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cdHByaXZhdGUgaW5pdGlhbGl6ZUR5bmFtaWNDb21wb25lbnQoKSB7XHJcblx0XHRpZiAoIXRoaXMuZHluYW1pY0NvbXBvbmVudCkge1xyXG5cdFx0XHR0aGlzLmR5bmFtaWNDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG5cdFx0XHRcdC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNvbXBvbmVudClcclxuXHRcdFx0XHQuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xyXG5cclxuXHRcdFx0dGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLmR5bmFtaWNDb21wb25lbnQuaG9zdFZpZXcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFicycsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCAge1xyXG5cdHRhYnMgPSBbXTtcclxuXHRzZWxlY3RlZEluZGV4ID0gLTE7XHJcblx0aXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHRwb3BwZWQgPSBmYWxzZTtcclxuXHJcblx0QENvbnRlbnRDaGlsZHJlbihGbGV4aWJsZVRhYkNvbXBvbmVudClcclxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PEZsZXhpYmxlVGFiQ29tcG9uZW50PjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3NpdGlvblwiKVxyXG4gICAgcHVibGljIHBvc2l0aW9uID0gVGFiUG9zaXRpb25zLnRvcDtcclxuXHJcbiAgICBASW5wdXQoXCJ0eXBlXCIpXHJcbiAgICBwdWJsaWMgdHlwZSA9IFRhYlR5cGVzLnRhYjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3Bob3ZlclwiKVxyXG4gICAgcHVibGljIHBvcGhvdmVyID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcImNsaWNrIHRvIHNlbGVjdCB0YWIgXCI7XHJcblxyXG5cdEBPdXRwdXQoJ29uY2hhbmdlJylcclxuXHRwcml2YXRlIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG5cdFx0dGhpcy50YWJzID0gW107XHJcblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnBvcGhvdmVyID8gLTEgOiAwO1xyXG5cdFx0dGhpcy5pc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgodGFiSW5zdGFuY2UsIGluZGV4KSA9PiB7XHJcblx0XHRcdGlmKHRhYkluc3RhbmNlLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRhYkluc3RhbmNlLnRhYmljb24gfHwgdGFiSW5zdGFuY2UudGFiYWx0aWNvbikge1xyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudGFicy5wdXNoKHRhYkluc3RhbmNlKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMudGFicy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0a2V5dXAoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaW5kZXg6IG51bWJlcikge1xyXG5cdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHR0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGFiLmhvdmVyZWQgPSBmYWxzZTtcclxuXHRcdFx0dGFiLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKGluZGV4ID4gLTEpIHtcclxuXHRcdFx0dGhpcy50YWJzW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMudGFic1tpbmRleF0uZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHRcdFx0dGhpcy5wb3BwZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG5cdFx0XHRcdHNlbGVjdGVkSW5kZXg6IGluZGV4LFxyXG5cdFx0XHRcdHNlbGVjdGVkVGl0bGU6IHRoaXMudGFic1tpbmRleF0udGl0bGVcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyVGFiKGluZGV4OiBudW1iZXIsIGZsYWc6IGJvb2xlYW4pIHtcclxuXHRcdGlmICh0aGlzLnBvcGhvdmVyKSB7XHJcblx0XHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0XHR0YWIuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdHRhYi5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoaW5kZXggPiAtMSl7XHJcblx0XHRcdFx0dGhpcy50YWJzW2luZGV4XS5ob3ZlcmVkID0gZmxhZztcclxuXHRcdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA+IC0xIHx8IGZsYWc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==