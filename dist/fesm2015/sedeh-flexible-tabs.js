import { Component, Input, Output, ContentChildren, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @enum {string} */
const TabTypes = {
    button: "button",
    tab: "tab",
    plain: "plain",
    icon: "icon",
    radio: "radio",
};
/** @enum {string} */
const TabPositions = {
    top: "top",
    left: "left",
    right: "right",
    bottom: "bottom",
};
class FlexibleTabComponent {
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
class FlexibleTabsComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FlexibleTabsModule {
}
FlexibleTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    FlexibleTabsComponent,
                    FlexibleTabComponent
                ],
                exports: [
                    FlexibleTabsComponent,
                    FlexibleTabComponent
                ],
                entryComponents: [],
                providers: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TabTypes, TabPositions, FlexibleTabComponent, FlexibleTabsComponent, FlexibleTabsModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtdGFicy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNlZGVoL2ZsZXhpYmxlLXRhYnMvc3JjL2FwcC9mbGV4aWJsZS10YWJzL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy9zcmMvYXBwL2ZsZXhpYmxlLXRhYnMvZmxleGlibGUtdGFicy1tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgYSB0YWJsZSB3aGljaCBpcyB1c2luZyB0aGUgZ2l2ZW4gRmxleGlibGVUYWJsZUhlYWRlciBzZXQgaW5cclxuKiBvcmRlciB0byB0YWJ1bGF0ZSB0aGUgZ2l2ZW4gZGF0YS4gQXMgcGVyIGRlZmluaXRpb24gb2YgZWFyY2ggaGVhZGVyIGNvbXBvbmVudCxcclxuKiBhIGNvbHVtbiBjb3VsZCBiZSBoaWRkZW4sIHNvcnRhYmxlLCBvciBkcmFnZ2FibGUuIEVhY2ggdGFibGUgcm93IGNhbiBleHBhbmQvY29sbGFwc2VcclxuKiBvciByZXNwb25kIHRvIGEgY2xpY2sgYWN0aW9uLlxyXG4qL1xyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRDb250ZW50Q2hpbGRyZW4sXHJcblx0UXVlcnlMaXN0LFxyXG5cdEFmdGVyQ29udGVudEluaXQsXHJcblx0Q2hhbmdlRGV0ZWN0b3JSZWYsXHJcblx0SW5qZWN0b3IsXHJcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG5cdEVtYmVkZGVkVmlld1JlZixcclxuXHRFbGVtZW50UmVmLFxyXG4gICAgQXBwbGljYXRpb25SZWYsXHJcblx0RXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgZW51bSBUYWJUeXBlcyB7XHJcblx0YnV0dG9uID0gXCJidXR0b25cIiwgXHJcblx0dGFiID0gXCJ0YWJcIiwgXHJcblx0cGxhaW4gPSBcInBsYWluXCIsIFxyXG5cdGljb24gPSBcImljb25cIiwgXHJcblx0cmFkaW8gPSBcInJhZGlvXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGFiUG9zaXRpb25zIHtcclxuXHR0b3AgPSBcInRvcFwiLCBcclxuXHRsZWZ0ID0gXCJsZWZ0XCIsIFxyXG5cdHJpZ2h0ID0gXCJyaWdodFwiLCBcclxuXHRib3R0b20gPSBcImJvdHRvbVwiXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRHluYW1pY1RhYkNvbnRlbnRDb21wb25lbnQge1xyXG5cdGRhdGE6IGFueTtcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYkNvbXBvbmVudCB7XHJcblxyXG5cdGhvdmVyZWQgPSBmYWxzZTtcclxuXHRkeW5hbWljQ29tcG9uZW50OiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwic2VsZWN0ZWRcIilcclxuICAgIHB1YmxpYyBzZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcInRpdGxlXCIpXHJcblx0cHVibGljIHRpdGxlOiBzdHJpbmc7XHJcblx0XHJcblx0QElucHV0KFwiY29tcG9uZW50XCIpXHJcblx0cHVibGljIGNvbXBvbmVudDogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInRhYmFsdGljb25cIilcclxuICAgIHB1YmxpYyB0YWJhbHRpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGFiaWNvblwiKVxyXG4gICAgcHVibGljIHRhYmljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0ZW1wbGF0ZVwiKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwiZGF0YVwiKVxyXG4gICAgcHVibGljIHNvdXJjZURhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcblx0XHRwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXHJcblx0XHRwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuXHRcdHByaXZhdGUgaG9zdDogRWxlbWVudFJlZixcclxuXHRcdHB1YmxpYyBkZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuXHQpIHt9XHJcblxyXG5cdHRlbXBsYXRlQ29udGV4dCgpIHtcclxuXHRcdHJldHVybiB7ZGF0YTogdGhpcy5zb3VyY2VEYXRhIH07XHJcblx0fVxyXG5cdGR5bmFtaWNhbGx5TG9hZGVkQ29tcG9uZW50KCkge1xyXG5cdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0dGhpcy5pbml0aWFsaXplRHluYW1pY0NvbXBvbmVudCgpO1xyXG5cdFx0XHRcdGNvbnN0IGluc3RhbmNlID0gKDxEeW5hbWljVGFiQ29udGVudENvbXBvbmVudD50aGlzLmR5bmFtaWNDb21wb25lbnQuaW5zdGFuY2UpO1xyXG5cdFx0XHRcdHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmFwcGVuZCgodGhpcy5keW5hbWljQ29tcG9uZW50Lmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQpO1xyXG5cdFx0XHRcdGluc3RhbmNlLmRhdGEgPSB0aGlzLnNvdXJjZURhdGE7XHJcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5keW5hbWljQ29tcG9uZW50KSB7XHJcblx0XHRcdFx0dGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRwcml2YXRlIGluaXRpYWxpemVEeW5hbWljQ29tcG9uZW50KCkge1xyXG5cdFx0aWYgKCF0aGlzLmR5bmFtaWNDb21wb25lbnQpIHtcclxuXHRcdFx0dGhpcy5keW5hbWljQ29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcclxuXHRcdFx0XHQucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jb21wb25lbnQpXHJcblx0XHRcdFx0LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcclxuXHJcblx0XHRcdHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcodGhpcy5keW5hbWljQ29tcG9uZW50Lmhvc3RWaWV3KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYnMnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQgIHtcclxuXHR0YWJzID0gW107XHJcblx0c2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cdGlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblx0cG9wcGVkID0gZmFsc2U7XHJcblxyXG5cdEBDb250ZW50Q2hpbGRyZW4oRmxleGlibGVUYWJDb21wb25lbnQpXHJcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxGbGV4aWJsZVRhYkNvbXBvbmVudD47XHJcblxyXG4gICAgQElucHV0KFwicG9zaXRpb25cIilcclxuICAgIHB1YmxpYyBwb3NpdGlvbiA9IFRhYlBvc2l0aW9ucy50b3A7XHJcblxyXG4gICAgQElucHV0KFwidHlwZVwiKVxyXG4gICAgcHVibGljIHR5cGUgPSBUYWJUeXBlcy50YWI7XHJcblxyXG4gICAgQElucHV0KFwicG9waG92ZXJcIilcclxuICAgIHB1YmxpYyBwb3Bob3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJjbGljayB0byBzZWxlY3QgdGFiIFwiO1xyXG5cclxuXHRAT3V0cHV0KCdvbmNoYW5nZScpXHJcblx0cHJpdmF0ZSBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdHRoaXMudGFicyA9IFtdO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5wb3Bob3ZlciA/IC0xIDogMDtcclxuXHRcdHRoaXMuaXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKHRhYkluc3RhbmNlLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRpZih0YWJJbnN0YW5jZS5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdGlmICh0YWJJbnN0YW5jZS50YWJpY29uIHx8IHRhYkluc3RhbmNlLnRhYmFsdGljb24pIHtcclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnRhYnMucHVzaCh0YWJJbnN0YW5jZSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLnRhYnMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0VGFiKCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGtleXVwKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRldmVudC50YXJnZXQuY2xpY2soKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2VsZWN0VGFiKGluZGV4OiBudW1iZXIpIHtcclxuXHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0dGFiLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdHRhYi5ob3ZlcmVkID0gZmFsc2U7XHJcblx0XHRcdHRhYi5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHR9KTtcclxuXHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdHRoaXMudGFic1tpbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdHRoaXMucG9wcGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuXHRcdFx0XHRzZWxlY3RlZEluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRzZWxlY3RlZFRpdGxlOiB0aGlzLnRhYnNbaW5kZXhdLnRpdGxlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclRhYihpbmRleDogbnVtYmVyLCBmbGFnOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5wb3Bob3Zlcikge1xyXG5cdFx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdFx0dGFiLmhvdmVyZWQgPSBmYWxzZTtcclxuXHRcdFx0XHR0YWIuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGluZGV4ID4gLTEpe1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uaG92ZXJlZCA9IGZsYWc7XHJcblx0XHRcdFx0dGhpcy50YWJzW2luZGV4XS5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5wb3BwZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMSB8fCBmbGFnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGbGV4aWJsZVRhYnNDb21wb25lbnQsIEZsZXhpYmxlVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZsZXhpYmxlVGFic0NvbXBvbmVudCxcclxuICAgICAgICBGbGV4aWJsZVRhYkNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBGbGV4aWJsZVRhYnNDb21wb25lbnQsXHJcbiAgICAgICAgRmxleGlibGVUYWJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYnNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFNQTs7SUFpQkMsUUFBUyxRQUFRO0lBQ2pCLEtBQU0sS0FBSztJQUNYLE9BQVEsT0FBTztJQUNmLE1BQU8sTUFBTTtJQUNiLE9BQVEsT0FBTzs7OztJQUlmLEtBQU0sS0FBSztJQUNYLE1BQU8sTUFBTTtJQUNiLE9BQVEsT0FBTztJQUNmLFFBQVMsUUFBUTs7Ozs7Ozs7OztJQXNDZCxZQUNNLDBCQUNBLFFBQ0EsVUFDQSxNQUNEO1FBSkMsNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1IsU0FBSSxHQUFKLElBQUk7UUFDTCxhQUFRLEdBQVIsUUFBUTt1QkE3Qk4sS0FBSzt3QkFJTSxLQUFLO0tBMEJ0Qjs7OztJQUVKLGVBQWU7UUFDZCxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNoQzs7OztJQUNELDBCQUEwQjtRQUN6QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzs7Z0JBQ2xDLE1BQU0sUUFBUSxzQkFBZ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBQyxDQUFDO2dCQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLG1CQUFDLG1CQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFnQyxHQUFFLFNBQVMsQ0FBQyxDQUFDLENBQWdCLEVBQUMsQ0FBQztnQkFDckgsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ2hDO2lCQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBQ3ZDO1NBQ0Q7UUFDRCxPQUFPLEtBQUssQ0FBQztLQUNiOzs7O0lBQ08sMEJBQTBCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0I7aUJBQ25ELHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEOzs7O1lBOURGLFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsY0FBYztnQkFDeEIsdVhBQTRDOzthQUU1Qzs7OztZQTlCQSx3QkFBd0I7WUFHckIsY0FBYztZQUpqQixRQUFRO1lBR1IsVUFBVTtZQUpWLGlCQUFpQjs7O3VCQXNDYixLQUFLLFNBQUMsVUFBVTtvQkFHaEIsS0FBSyxTQUFDLE9BQU87d0JBR2hCLEtBQUssU0FBQyxXQUFXO3lCQUdkLEtBQUssU0FBQyxZQUFZO3NCQUdsQixLQUFLLFNBQUMsU0FBUzt1QkFHZixLQUFLLFNBQUMsVUFBVTt5QkFHaEIsS0FBSyxTQUFDLE1BQU07OztJQW9FYjtvQkF2QkksRUFBRTs2QkFDTyxDQUFDLENBQUM7MkJBQ0osS0FBSztzQkFDVixLQUFLO3dCQU1PLFlBQVksQ0FBQyxHQUFHO29CQUdwQixRQUFRLENBQUMsR0FBRzt3QkFHUixLQUFLO3VCQUdOLHNCQUFzQjt3QkFHdkIsSUFBSSxZQUFZLEVBQUU7S0FFbEI7Ozs7SUFFbkIsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLO1lBQ3hDLElBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLFdBQVcsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxDQUFDO1NBQ3JDO0tBQ0Q7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVU7O1FBQ1QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUUvQixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtLQUNEOzs7OztJQUNELFNBQVMsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRztZQUNqQixHQUFHLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNwQixHQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzdCLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNsQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSzthQUNyQyxDQUFDLENBQUM7U0FDSDtLQUNEOzs7Ozs7SUFDRCxRQUFRLENBQUMsS0FBYSxFQUFFLElBQWE7UUFDcEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRztnQkFDakIsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUM7Z0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUMxQztZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDOUM7S0FDRDs7O1lBdkZELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsZUFBZTtnQkFDekIsKzBGQUE2Qzs7YUFFN0M7Ozs7O3VCQU9DLGVBQWUsU0FBQyxvQkFBb0I7dUJBR2pDLEtBQUssU0FBQyxVQUFVO21CQUdoQixLQUFLLFNBQUMsTUFBTTt1QkFHWixLQUFLLFNBQUMsVUFBVTtzQkFHaEIsS0FBSyxTQUFDLFNBQVM7dUJBR2xCLE1BQU0sU0FBQyxVQUFVOzs7Ozs7O0FDbkluQjs7O1lBS0MsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDVixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtpQkFDdkI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHFCQUFxQjtvQkFDckIsb0JBQW9CO2lCQUN2QjtnQkFDRCxlQUFlLEVBQUUsRUFDaEI7Z0JBQ0QsU0FBUyxFQUFFLEVBQ1Y7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7YUFDcEM7Ozs7Ozs7Ozs7Ozs7OzsifQ==