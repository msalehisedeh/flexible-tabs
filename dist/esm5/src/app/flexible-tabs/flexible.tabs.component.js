/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ContentChildren, QueryList, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef, EventEmitter } from '@angular/core';
/** @enum {string} */
var TabTypes = {
    button: "button",
    tab: "tab",
    plain: "plain",
    icon: "icon",
    radio: "radio",
};
export { TabTypes };
/** @enum {string} */
var TabPositions = {
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
var FlexibleTabComponent = /** @class */ (function () {
    function FlexibleTabComponent(componentFactoryResolver, appRef, injector, host, detector) {
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
    FlexibleTabComponent.prototype.templateContext = /**
     * @return {?}
     */
    function () {
        return { data: this.sourceData };
    };
    /**
     * @return {?}
     */
    FlexibleTabComponent.prototype.dynamicallyLoadedComponent = /**
     * @return {?}
     */
    function () {
        if (this.component) {
            if (this.selected) {
                this.initializeDynamicComponent();
                /** @type {?} */
                var instance = (/** @type {?} */ (this.dynamicComponent.instance));
                this.host.nativeElement.append(/** @type {?} */ ((/** @type {?} */ (this.dynamicComponent.hostView)).rootNodes[0]));
                instance.data = this.sourceData;
            }
            else if (this.dynamicComponent) {
                this.host.nativeElement.innerHTML = "";
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    FlexibleTabComponent.prototype.initializeDynamicComponent = /**
     * @return {?}
     */
    function () {
        if (!this.dynamicComponent) {
            this.dynamicComponent = this.componentFactoryResolver
                .resolveComponentFactory(this.component)
                .create(this.injector);
            this.appRef.attachView(this.dynamicComponent.hostView);
        }
    };
    FlexibleTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-tab',
                    template: "    \r\n<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n<div *ngIf=\"dynamicallyLoadedComponent()\"></div>\r\n",
                    styles: [":host{padding:0;margin:0;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleTabComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    FlexibleTabComponent.propDecorators = {
        selected: [{ type: Input, args: ["selected",] }],
        title: [{ type: Input, args: ["title",] }],
        component: [{ type: Input, args: ["component",] }],
        tabalticon: [{ type: Input, args: ["tabalticon",] }],
        tabicon: [{ type: Input, args: ["tabicon",] }],
        template: [{ type: Input, args: ["template",] }],
        sourceData: [{ type: Input, args: ["data",] }]
    };
    return FlexibleTabComponent;
}());
export { FlexibleTabComponent };
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
var FlexibleTabsComponent = /** @class */ (function () {
    function FlexibleTabsComponent() {
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
    FlexibleTabsComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.tabs = [];
        this.selectedIndex = this.pophover ? -1 : 0;
        this.isIconified = false;
        this.children.forEach(function (tabInstance, index) {
            if (tabInstance.selected) {
                _this.selectedIndex = index;
            }
            _this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                _this.isIconified = true;
            }
            _this.tabs.push(tabInstance);
        });
        if (this.tabs.length) {
            this.selectTab(this.selectedIndex);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexibleTabsComponent.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FlexibleTabsComponent.prototype.selectTab = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.tabs.map(function (tab) {
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
    };
    /**
     * @param {?} index
     * @param {?} flag
     * @return {?}
     */
    FlexibleTabsComponent.prototype.hoverTab = /**
     * @param {?} index
     * @param {?} flag
     * @return {?}
     */
    function (index, flag) {
        if (this.pophover) {
            this.tabs.map(function (tab) {
                tab.hovered = false;
                tab.detector.detectChanges();
            });
            if (index > -1) {
                this.tabs[index].hovered = flag;
                this.tabs[index].detector.detectChanges();
            }
            this.popped = this.selectedIndex > -1 || flag;
        }
    };
    FlexibleTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-tabs',
                    template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"tabs-viewport\" [class.popper]=\"pophover\" [class.pop]=\"popped\" (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                    styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleTabsComponent.ctorParameters = function () { return []; };
    FlexibleTabsComponent.propDecorators = {
        children: [{ type: ContentChildren, args: [FlexibleTabComponent,] }],
        position: [{ type: Input, args: ["position",] }],
        type: [{ type: Input, args: ["type",] }],
        pophover: [{ type: Input, args: ["pophover",] }],
        message: [{ type: Input, args: ["message",] }],
        onchange: [{ type: Output, args: ['onchange',] }]
    };
    return FlexibleTabsComponent;
}());
export { FlexibleTabsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUudGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUNILFNBQVMsRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGVBQWUsRUFDZixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUix3QkFBd0IsRUFFeEIsVUFBVSxFQUNQLGNBQWMsRUFDakIsWUFBWSxFQUNaLE1BQU0sZUFBZSxDQUFDOzs7SUFHdEIsUUFBUyxRQUFRO0lBQ2pCLEtBQU0sS0FBSztJQUNYLE9BQVEsT0FBTztJQUNmLE1BQU8sTUFBTTtJQUNiLE9BQVEsT0FBTzs7Ozs7SUFJZixLQUFNLEtBQUs7SUFDWCxNQUFPLE1BQU07SUFDYixPQUFRLE9BQU87SUFDZixRQUFTLFFBQVE7Ozs7Ozs7Ozs7SUFzQ2QsOEJBQ00sMEJBQ0EsUUFDQSxVQUNBLE1BQ0Q7UUFKQyw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLFdBQU0sR0FBTixNQUFNO1FBQ04sYUFBUSxHQUFSLFFBQVE7UUFDUixTQUFJLEdBQUosSUFBSTtRQUNMLGFBQVEsR0FBUixRQUFRO3VCQTdCTixLQUFLO3dCQUlNLEtBQUs7S0EwQnRCOzs7O0lBRUosOENBQWU7OztJQUFmO1FBQ0MsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNoQzs7OztJQUNELHlEQUEwQjs7O0lBQTFCO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDOztnQkFDbEMsSUFB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LFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO2dCQUNqQixHQUFHLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDcEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUM3QixDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1NBQzlDO0tBQ0Q7O2dCQXZGRCxTQUFTLFNBQUM7b0JBQ1YsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLCswRkFBNkM7O2lCQUU3Qzs7Ozs7MkJBT0MsZUFBZSxTQUFDLG9CQUFvQjsyQkFHakMsS0FBSyxTQUFDLFVBQVU7dUJBR2hCLEtBQUssU0FBQyxNQUFNOzJCQUdaLEtBQUssU0FBQyxVQUFVOzBCQUdoQixLQUFLLFNBQUMsU0FBUzsyQkFHbEIsTUFBTSxTQUFDLFVBQVU7O2dDQXRJbkI7O1NBaUhhLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0Q29udGVudENoaWxkcmVuLFxyXG5cdFF1ZXJ5TGlzdCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdENoYW5nZURldGVjdG9yUmVmLFxyXG5cdEluamVjdG9yLFxyXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuXHRFbWJlZGRlZFZpZXdSZWYsXHJcblx0RWxlbWVudFJlZixcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG5cdEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGVudW0gVGFiVHlwZXMge1xyXG5cdGJ1dHRvbiA9IFwiYnV0dG9uXCIsIFxyXG5cdHRhYiA9IFwidGFiXCIsIFxyXG5cdHBsYWluID0gXCJwbGFpblwiLCBcclxuXHRpY29uID0gXCJpY29uXCIsIFxyXG5cdHJhZGlvID0gXCJyYWRpb1wiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRhYlBvc2l0aW9ucyB7XHJcblx0dG9wID0gXCJ0b3BcIiwgXHJcblx0bGVmdCA9IFwibGVmdFwiLCBcclxuXHRyaWdodCA9IFwicmlnaHRcIiwgXHJcblx0Ym90dG9tID0gXCJib3R0b21cIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtaWNUYWJDb250ZW50Q29tcG9uZW50IHtcclxuXHRkYXRhOiBhbnk7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFiJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJDb21wb25lbnQge1xyXG5cclxuXHRob3ZlcmVkID0gZmFsc2U7XHJcblx0ZHluYW1pY0NvbXBvbmVudDogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNlbGVjdGVkXCIpXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJ0aXRsZVwiKVxyXG5cdHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG5cdFxyXG5cdEBJbnB1dChcImNvbXBvbmVudFwiKVxyXG5cdHB1YmxpYyBjb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJhbHRpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiYWx0aWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRhYmljb25cIilcclxuICAgIHB1YmxpYyB0YWJpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBzb3VyY2VEYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG5cdFx0cHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG5cdFx0cHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcblx0XHRwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsXHJcblx0XHRwdWJsaWMgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXHJcblx0KSB7fVxyXG5cclxuXHR0ZW1wbGF0ZUNvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4ge2RhdGE6IHRoaXMuc291cmNlRGF0YSB9O1xyXG5cdH1cclxuXHRkeW5hbWljYWxseUxvYWRlZENvbXBvbmVudCgpIHtcclxuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZUR5bmFtaWNDb21wb25lbnQoKTtcclxuXHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9ICg8RHluYW1pY1RhYkNvbnRlbnRDb21wb25lbnQ+dGhpcy5keW5hbWljQ29tcG9uZW50Lmluc3RhbmNlKTtcclxuXHRcdFx0XHR0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5hcHBlbmQoKHRoaXMuZHluYW1pY0NvbXBvbmVudC5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50KTtcclxuXHRcdFx0XHRpbnN0YW5jZS5kYXRhID0gdGhpcy5zb3VyY2VEYXRhO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZHluYW1pY0NvbXBvbmVudCkge1xyXG5cdFx0XHRcdHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHJpdmF0ZSBpbml0aWFsaXplRHluYW1pY0NvbXBvbmVudCgpIHtcclxuXHRcdGlmICghdGhpcy5keW5hbWljQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMuZHluYW1pY0NvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcblx0XHRcdFx0LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY29tcG9uZW50KVxyXG5cdFx0XHRcdC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XHJcblxyXG5cdFx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuZHluYW1pY0NvbXBvbmVudC5ob3N0Vmlldyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWJzJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0ICB7XHJcblx0dGFicyA9IFtdO1xyXG5cdHNlbGVjdGVkSW5kZXggPSAtMTtcclxuXHRpc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cdHBvcHBlZCA9IGZhbHNlO1xyXG5cclxuXHRAQ29udGVudENoaWxkcmVuKEZsZXhpYmxlVGFiQ29tcG9uZW50KVxyXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8RmxleGlibGVUYWJDb21wb25lbnQ+O1xyXG5cclxuICAgIEBJbnB1dChcInBvc2l0aW9uXCIpXHJcbiAgICBwdWJsaWMgcG9zaXRpb24gPSBUYWJQb3NpdGlvbnMudG9wO1xyXG5cclxuICAgIEBJbnB1dChcInR5cGVcIilcclxuICAgIHB1YmxpYyB0eXBlID0gVGFiVHlwZXMudGFiO1xyXG5cclxuICAgIEBJbnB1dChcInBvcGhvdmVyXCIpXHJcbiAgICBwdWJsaWMgcG9waG92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiY2xpY2sgdG8gc2VsZWN0IHRhYiBcIjtcclxuXHJcblx0QE91dHB1dCgnb25jaGFuZ2UnKVxyXG5cdHByaXZhdGUgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcblx0XHR0aGlzLnRhYnMgPSBbXTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMucG9waG92ZXIgPyAtMSA6IDA7XHJcblx0XHR0aGlzLmlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCh0YWJJbnN0YW5jZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0aWYodGFiSW5zdGFuY2Uuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodGFiSW5zdGFuY2UudGFiaWNvbiB8fCB0YWJJbnN0YW5jZS50YWJhbHRpY29uKSB7XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy50YWJzLnB1c2godGFiSW5zdGFuY2UpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy50YWJzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5zZWxlY3RlZEluZGV4ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRrZXl1cChldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpbmRleDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHR0YWIuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHR0YWIuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHR0aGlzLnRhYnNbaW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy50YWJzW2luZGV4XS5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcblx0XHRcdFx0c2VsZWN0ZWRJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0c2VsZWN0ZWRUaXRsZTogdGhpcy50YWJzW2luZGV4XS50aXRsZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJUYWIoaW5kZXg6IG51bWJlciwgZmxhZzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMucG9waG92ZXIpIHtcclxuXHRcdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHRcdHRhYi5ob3ZlcmVkID0gZmFsc2U7XHJcblx0XHRcdFx0dGFiLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChpbmRleCA+IC0xKXtcclxuXHRcdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmhvdmVyZWQgPSBmbGFnO1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucG9wcGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID4gLTEgfHwgZmxhZztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19