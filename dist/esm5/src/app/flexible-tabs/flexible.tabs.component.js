/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ContentChildren, QueryList, ChangeDetectorRef, Injector, ComponentFactoryResolver, ElementRef, ApplicationRef, EventEmitter, Renderer2 } from '@angular/core';
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
DynamicTabContentComponent.prototype.activate;
/** @type {?} */
DynamicTabContentComponent.prototype.deactivate;
var FlexibleTabComponent = /** @class */ (function () {
    function FlexibleTabComponent(componentFactoryResolver, host, appRef, injector, renderer, detector) {
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
    FlexibleTabComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.renderer.setAttribute(this.host.nativeElement, 'id', this.flexibleId + '-panel-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'aria-labelledby', this.flexibleId + '-tab-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'role', "tabpanel");
        this.renderer.setAttribute(this.host.nativeElement, 'aria-labeledby', this.flexibleId + '-tab-' + this.index);
        this.renderer.setAttribute(this.host.nativeElement, 'aria-hidden', this.selected ? 'false' : 'true');
        this.host.nativeElement.style.display = "selected ? 'block':'none'";
    };
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
     * @param {?} deselect
     * @return {?}
     */
    FlexibleTabComponent.prototype.deactivate = /**
     * @param {?} deselect
     * @return {?}
     */
    function (deselect) {
        if (deselect) {
            this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '-1');
            this.renderer.setStyle(this.host.nativeElement, 'display', 'none');
            if (this.selected) {
                this.selected = false;
                if (this.dynamicComponent) {
                    /** @type {?} */
                    var instance = (/** @type {?} */ (this.dynamicComponent.instance));
                    instance.deactivate();
                }
            }
        }
        this.hovered = false;
        this.detector.detectChanges();
    };
    /**
     * @return {?}
     */
    FlexibleTabComponent.prototype.activate = /**
     * @return {?}
     */
    function () {
        if (!this.selected) {
            this.selected = true;
            this.detector.detectChanges();
            this.renderer.setAttribute(this.host.nativeElement, 'tabIndex', '0');
            this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
            if (this.component) {
                this.initializeDynamicComponent();
                /** @type {?} */
                var instance = (/** @type {?} */ (this.dynamicComponent.instance));
                instance.activate(this.sourceData, this.template, this.handler);
            }
        }
    };
    /**
     * @param {?} flag
     * @return {?}
     */
    FlexibleTabComponent.prototype.hover = /**
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
        this.hovered = flag;
        this.detector.detectChanges();
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
            this.host.nativeElement.appendChild(/** @type {?} */ ((/** @type {?} */ (this.dynamicComponent.hostView)).rootNodes[0]));
        }
    };
    FlexibleTabComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-tab',
                    template: "<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template && !component\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n",
                    styles: [":host{padding:10px;margin:0;width:100%;display:block;box-sizing:border-box}:host:focus{outline:0}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleTabComponent.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ElementRef },
        { type: ApplicationRef },
        { type: Injector },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
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
    return FlexibleTabComponent;
}());
export { FlexibleTabComponent };
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
var FlexibleTabsComponent = /** @class */ (function () {
    function FlexibleTabsComponent() {
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
    FlexibleTabsComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var defaultIndex = this.pophover ? -1 : 0;
        this.tabs = [];
        this.isIconified = false;
        this.children.forEach(function (tabInstance, index) {
            tabInstance.index = index;
            tabInstance.flexibleId = _this.flexibleId;
            if (tabInstance.selected) {
                defaultIndex = index;
            }
            _this.isIconified = true;
            if (tabInstance.tabicon || tabInstance.tabalticon) {
                _this.isIconified = true;
            }
            _this.tabs.push(tabInstance);
        });
        if (this.tabs.length) {
            this.selectTab(defaultIndex);
        }
        else {
            this.selectedIndex = defaultIndex;
        }
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    FlexibleTabsComponent.prototype.keyup = /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        /** @type {?} */
        var code = event.which;
        /** @type {?} */
        var id = undefined;
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
        if (this.selectedIndex != index) {
            this.tabs.map(function (tab) {
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
                tab.deactivate(false);
            });
            if (index > -1) {
                this.tabs[index].hover(flag);
            }
            this.popped = this.selectedIndex > -1 || flag;
        }
    };
    FlexibleTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-tabs',
                    template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div *ngIf=\"position === 'top' || position === 'left'\"\r\n        [attr.aria-orientation]=\"position === 'left' ?  'vertical' : 'horizontal'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n\t\t\t[id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\"  [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div \r\n        class=\"tabs-viewport\" \r\n        role=\"tabpanel\"\r\n        [class.popper]=\"pophover\" \r\n        [class.pop]=\"popped\" \r\n        (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div *ngIf=\"position === 'bottom' || position === 'right'\"\r\n        [class.collapsed]=\"collapsed\" \r\n        [attr.aria-orientation]=\"position === 'right' ? 'vertical' : 'horizontal'\"\r\n        class=\"tabs-control\" \r\n        role=\"tablist\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"tab\" \r\n            (keyup)=\"keyup($event, i)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [id]=\"flexibleId + '-tab-' + i\" \r\n            [attr.tabindex]=\"tab.selected ? 0 : -1\"\r\n            [attr.aria-controls]=\"flexibleId + '-panel-' + i\" \r\n            [attr.aria-selected]=\"tab.selected ? true:false\" \r\n            [attr.aria-posinset]=\"i+1\" \r\n            [attr.aria-setsize]=\"tabs.length\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\"  [class]=\"tab.tabicon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\"  [class]=\"tab.tabalticon\" [class.icon]=\"true\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                    styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;min-height:150px;display:flex;align-items:stretch}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;min-width:27px;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs .tabs-control a.icon :before{display:block}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
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
        flexibleId: [{ type: Input, args: ["flexibleId",] }],
        collapsed: [{ type: Input, args: ["collapsed",] }],
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
    FlexibleTabsComponent.prototype.flexibleId;
    /** @type {?} */
    FlexibleTabsComponent.prototype.collapsed;
    /** @type {?} */
    FlexibleTabsComponent.prototype.onchange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUudGFicy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUNILFNBQVMsRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLGVBQWUsRUFDZixTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFFBQVEsRUFDUix3QkFBd0IsRUFFeEIsVUFBVSxFQUNQLGNBQWMsRUFDakIsWUFBWSxFQUNaLFNBQVMsRUFFVCxNQUFNLGVBQWUsQ0FBQzs7O0lBR3RCLFFBQVMsUUFBUTtJQUNqQixLQUFNLEtBQUs7SUFDWCxPQUFRLE9BQU87SUFDZixNQUFPLE1BQU07SUFDYixPQUFRLE9BQU87Ozs7O0lBSWYsS0FBTSxLQUFLO0lBQ1gsTUFBTyxNQUFNO0lBQ2IsT0FBUSxPQUFPO0lBQ2YsUUFBUyxRQUFROzs7Ozs7Ozs7Ozs7SUF3RGQsOEJBQ00sMEJBQ0EsTUFDQSxRQUNBLFVBQ0EsVUFDQTtRQUxBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsU0FBSSxHQUFKLElBQUk7UUFDSixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFRO1FBQ1IsYUFBUSxHQUFSLFFBQVE7UUFDUixhQUFRLEdBQVIsUUFBUTt1QkFuQ1AsS0FBSzt3QkFNTSxLQUFLO0tBK0J6Qjs7OztJQUVELHVDQUFROzs7SUFBUjtRQUNDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9HLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQSxDQUFDLENBQUEsTUFBTSxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQywyQkFBMkIsQ0FBQTtLQUNqRTs7OztJQUVELDhDQUFlOzs7SUFBZjtRQUNDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDaEM7Ozs7O0lBQ0QseUNBQVU7Ozs7SUFBVixVQUFXLFFBQWlCO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ25FLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7b0JBQzNCLElBQU0sUUFBUSxHQUFHLG1CQUE2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFDLENBQUM7b0JBQzlFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDdEI7YUFDRDtTQUNEO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUNELHVDQUFROzs7SUFBUjtRQUNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzs7Z0JBQ2xDLElBQU0sUUFBUSxHQUFHLG1CQUE2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFDLENBQUM7Z0JBQzlFLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNoRTtTQUNEO0tBQ0Q7Ozs7O0lBQ0Qsb0NBQUs7Ozs7SUFBTCxVQUFNLElBQWE7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM5Qjs7OztJQUNPLHlEQUEwQjs7OztRQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0I7aUJBQ25ELHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsbUJBQUMsbUJBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQWdDLEVBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixFQUFDLENBQUM7U0FDMUg7OztnQkFsR0YsU0FBUyxTQUFDO29CQUNWLFFBQVEsRUFBRSxjQUFjO29CQUN4Qix1VUFBNEM7O2lCQUU1Qzs7OztnQkE3Q0Esd0JBQXdCO2dCQUV4QixVQUFVO2dCQUNQLGNBQWM7Z0JBSmpCLFFBQVE7Z0JBTVIsU0FBUztnQkFQVCxpQkFBaUI7OzsyQkF1RGIsS0FBSyxTQUFDLFVBQVU7d0JBR2hCLEtBQUssU0FBQyxPQUFPOzRCQUdoQixLQUFLLFNBQUMsV0FBVzs2QkFHZCxLQUFLLFNBQUMsWUFBWTswQkFHbEIsS0FBSyxTQUFDLFNBQVM7MkJBR2YsS0FBSyxTQUFDLFVBQVU7NkJBR2hCLEtBQUssU0FBQyxNQUFNOzBCQUdmLEtBQUssU0FBQyxTQUFTOzsrQkF6RmpCOztTQTZEYSxvQkFBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxSTdCO29CQTdCSSxFQUFFOzZCQUNPLENBQUMsQ0FBQzsyQkFDSixLQUFLO3NCQUNWLEtBQUs7d0JBTU8sWUFBWSxDQUFDLEdBQUc7b0JBR3BCLFFBQVEsQ0FBQyxHQUFHO3dCQUdSLEtBQUs7dUJBR04sZ0VBQWdFOzBCQUdoRSxFQUFFO3lCQUdILEtBQUs7d0JBR0wsSUFBSSxZQUFZLEVBQUU7S0FFbEI7Ozs7SUFFbkIsa0RBQWtCOzs7SUFBbEI7UUFBQSxpQkFzQkM7O1FBckJBLElBQUksWUFBWSxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUV6QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQVcsRUFBRSxLQUFLO1lBQ3hDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQzFCLFdBQVcsQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQztZQUN6QyxFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDekIsWUFBWSxHQUFHLEtBQUssQ0FBQzthQUNyQjtZQUNBLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1lBQ0QsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUUsWUFBWSxDQUFFLENBQUM7U0FDL0I7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO1NBQ2xDO0tBQ0Q7Ozs7OztJQUVELHFDQUFLOzs7OztJQUFMLFVBQU0sS0FBVSxFQUFFLEtBQWE7O1FBQzlCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7O1FBQ3pCLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3JCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDbkYsRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBQ25GLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNuRixFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7WUFDbkYsRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0RTtRQUNELEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDUixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDYjtLQUNEOzs7OztJQUNELHlDQUFTOzs7O0lBQVQsVUFBVSxLQUFhO1FBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7Z0JBQ2pCLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckIsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDbEIsYUFBYSxFQUFFLEtBQUs7b0JBQ3BCLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUs7aUJBQ3JDLENBQUMsQ0FBQzthQUNIO1NBQ0Q7S0FDRDs7Ozs7O0lBQ0Qsd0NBQVE7Ozs7O0lBQVIsVUFBUyxLQUFhLEVBQUUsSUFBYTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7Z0JBQ2pCLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3QjtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7U0FDOUM7S0FDRDs7Z0JBN0dELFNBQVMsU0FBQztvQkFDVixRQUFRLEVBQUUsZUFBZTtvQkFDekIsaThIQUE2Qzs7aUJBRTdDOzs7OzsyQkFPQyxlQUFlLFNBQUMsb0JBQW9COzJCQUdqQyxLQUFLLFNBQUMsVUFBVTt1QkFHaEIsS0FBSyxTQUFDLE1BQU07MkJBR1osS0FBSyxTQUFDLFVBQVU7MEJBR2hCLEtBQUssU0FBQyxTQUFTOzZCQUdsQixLQUFLLFNBQUMsWUFBWTs0QkFHbEIsS0FBSyxTQUFDLFdBQVc7MkJBR2pCLE1BQU0sU0FBQyxVQUFVOztnQ0EvTG5COztTQW9LYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdENvbnRlbnRDaGlsZHJlbixcclxuXHRRdWVyeUxpc3QsXHJcblx0QWZ0ZXJDb250ZW50SW5pdCxcclxuXHRDaGFuZ2VEZXRlY3RvclJlZixcclxuXHRJbmplY3RvcixcclxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcblx0RW1iZWRkZWRWaWV3UmVmLFxyXG5cdEVsZW1lbnRSZWYsXHJcbiAgICBBcHBsaWNhdGlvblJlZixcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0UmVuZGVyZXIyLFxyXG5cdE9uSW5pdFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGVudW0gVGFiVHlwZXMge1xyXG5cdGJ1dHRvbiA9IFwiYnV0dG9uXCIsIFxyXG5cdHRhYiA9IFwidGFiXCIsIFxyXG5cdHBsYWluID0gXCJwbGFpblwiLCBcclxuXHRpY29uID0gXCJpY29uXCIsIFxyXG5cdHJhZGlvID0gXCJyYWRpb1wiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRhYlBvc2l0aW9ucyB7XHJcblx0dG9wID0gXCJ0b3BcIiwgXHJcblx0bGVmdCA9IFwibGVmdFwiLCBcclxuXHRyaWdodCA9IFwicmlnaHRcIiwgXHJcblx0Ym90dG9tID0gXCJib3R0b21cIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtaWNUYWJDb250ZW50Q29tcG9uZW50IHtcclxuICAvKlxyXG4gICAqIFdpbGwgYWN0aXZhdGUgdGhlIGNvbXBvbmVudCB3aXRoIGdpdmVuIGRhdGEuXHJcbiAgICogQGF0dHJpYnV0ZSBkYXRhOiBpbml0aWFsIGRhdGEuXHJcbiAgICogQGFycmVpYnV0ZSB0ZW1wbGF0ZTogaWYgdGhpcyBjb21wb25lbnQgbmVlZHMgdG8gaGF2ZSBzdWItdGVtcGxhdGVcclxuICAgKiBAYXR0cmlidXRlIGhlbHBlcjogaWYgY29tcG9uZW50IG5lZWRzIGEgaGVscGVyLlxyXG4gICAqL1xyXG4gIGFjdGl2YXRlKGRhdGE6IGFueSwgdGVtcGxhdGU/OiBhbnksIGhlbHBlcj86IGFueSk6IHZvaWQ7XHJcblxyXG4gIC8qXHJcbiAgICogV2lsbCB0ZWxsIGNvbXBvbmVudCB0byBwYXVzZSBhbGwgYWN0aXZpdGllcyBhbmQgZnJlZXogZGF0YSB0aWxsIGFjdGl2YXRpb24uXHJcbiAgICogcmVjb21tZW5kYXRpb24gaXMgZm9yIHRoZSBjb21wb25lbnQgdG8gZWlndGhlciB1bmRlZmluZSBkYXRhIGFuZCBoYW5kbGUgaXQgb3IgdXNlXHJcbiAgICogSlNPTi5wYXJzZShKU09OLnN0cmluZ3lmeShkYXRhKSkgdG8gZnJlZXogaXQgYW5kIGJyZWFrIGF3YXkgZnJvbSBwb2ludGVyIGl0IGhhcyByZWNlaXZlZCBpbiBhY3RpdmF0aW9uXHJcbiAgICovXHJcbiAgZGVhY3RpdmF0ZSgpOiB2b2lkO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFiQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcblx0aG92ZXJlZCA9IGZhbHNlO1xyXG5cdGluZGV4OiBudW1iZXI7XHJcblx0ZmxleGlibGVJZDogc3RyaW5nO1xyXG5cdGR5bmFtaWNDb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJzZWxlY3RlZFwiKVxyXG4gICAgcHVibGljIHNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwidGl0bGVcIilcclxuXHRwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuXHRcclxuXHRASW5wdXQoXCJjb21wb25lbnRcIilcclxuXHRwdWJsaWMgY29tcG9uZW50OiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwidGFiYWx0aWNvblwiKVxyXG4gICAgcHVibGljIHRhYmFsdGljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcblx0cHVibGljIHNvdXJjZURhdGE6IGFueTtcclxuXHRcclxuXHRASW5wdXQoXCJoYW5kbGVyXCIpXHJcblx0cHVibGljIGhhbmRsZXI6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcblx0XHRwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXHJcblx0XHRwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuXHRcdHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuXHRcdHByaXZhdGUgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXHJcblx0KSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnaWQnLCB0aGlzLmZsZXhpYmxlSWQgKyAnLXBhbmVsLScgKyB0aGlzLmluZGV4KTtcclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnYXJpYS1sYWJlbGxlZGJ5JywgdGhpcy5mbGV4aWJsZUlkICsgJy10YWItJyArIHRoaXMuaW5kZXgpO1xyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdyb2xlJywgXCJ0YWJwYW5lbFwiKTtcclxuXHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAnYXJpYS1sYWJlbGVkYnknLCB0aGlzLmZsZXhpYmxlSWQgKyAnLXRhYi0nICsgIHRoaXMuaW5kZXgpO1xyXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnQsICdhcmlhLWhpZGRlbicsIHRoaXMuc2VsZWN0ZWQgPyAnZmFsc2UnOid0cnVlJyk7XHJcblx0XHR0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5PVwic2VsZWN0ZWQgPyAnYmxvY2snOidub25lJ1wiIFxyXG5cdH1cclxuXHJcblx0dGVtcGxhdGVDb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHtkYXRhOiB0aGlzLnNvdXJjZURhdGEgfTtcclxuXHR9XHJcblx0ZGVhY3RpdmF0ZShkZXNlbGVjdDogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0aWYgKGRlc2VsZWN0KSB7XHJcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LCAndGFiSW5kZXgnLCAnLTEnKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG5cdFx0XHRpZih0aGlzLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdGlmICh0aGlzLmR5bmFtaWNDb21wb25lbnQpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGluc3RhbmNlID0gKDxEeW5hbWljVGFiQ29udGVudENvbXBvbmVudD50aGlzLmR5bmFtaWNDb21wb25lbnQuaW5zdGFuY2UpO1xyXG5cdFx0XHRcdFx0aW5zdGFuY2UuZGVhY3RpdmF0ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5ob3ZlcmVkID0gZmFsc2U7XHJcblx0XHR0aGlzLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHR9XHJcblx0YWN0aXZhdGUoKTogdm9pZCB7XHJcblx0XHRpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ3RhYkluZGV4JywgJzAnKTtcclxuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuXHRcdFx0aWYgKHRoaXMuY29tcG9uZW50KSB7XHJcblx0XHRcdFx0dGhpcy5pbml0aWFsaXplRHluYW1pY0NvbXBvbmVudCgpO1xyXG5cdFx0XHRcdGNvbnN0IGluc3RhbmNlID0gKDxEeW5hbWljVGFiQ29udGVudENvbXBvbmVudD50aGlzLmR5bmFtaWNDb21wb25lbnQuaW5zdGFuY2UpO1xyXG5cdFx0XHRcdGluc3RhbmNlLmFjdGl2YXRlKHRoaXMuc291cmNlRGF0YSwgdGhpcy50ZW1wbGF0ZSwgdGhpcy5oYW5kbGVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlcihmbGFnOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLmhvdmVyZWQgPSBmbGFnO1xyXG5cdFx0dGhpcy5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0fVxyXG5cdHByaXZhdGUgaW5pdGlhbGl6ZUR5bmFtaWNDb21wb25lbnQoKSB7XHJcblx0XHRpZiAoIXRoaXMuZHluYW1pY0NvbXBvbmVudCkge1xyXG5cdFx0XHR0aGlzLmR5bmFtaWNDb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG5cdFx0XHRcdC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNvbXBvbmVudClcclxuXHRcdFx0XHQuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xyXG5cclxuXHRcdFx0dGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLmR5bmFtaWNDb21wb25lbnQuaG9zdFZpZXcpO1xyXG5cdFx0XHR0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCgodGhpcy5keW5hbWljQ29tcG9uZW50Lmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFicycsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCAge1xyXG5cdHRhYnMgPSBbXTtcclxuXHRzZWxlY3RlZEluZGV4ID0gLTE7XHJcblx0aXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHRwb3BwZWQgPSBmYWxzZTtcclxuXHJcblx0QENvbnRlbnRDaGlsZHJlbihGbGV4aWJsZVRhYkNvbXBvbmVudClcclxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PEZsZXhpYmxlVGFiQ29tcG9uZW50PjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3NpdGlvblwiKVxyXG4gICAgcHVibGljIHBvc2l0aW9uID0gVGFiUG9zaXRpb25zLnRvcDtcclxuXHJcbiAgICBASW5wdXQoXCJ0eXBlXCIpXHJcbiAgICBwdWJsaWMgdHlwZSA9IFRhYlR5cGVzLnRhYjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3Bob3ZlclwiKVxyXG4gICAgcHVibGljIHBvcGhvdmVyID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcIkNsaWNrIHRvIHNlbGVjdCB0YWIuIFVzZSBhcnJvdyBrZXlzIHRvIG5hdmlnYXRlIHRvIG90aGVyIHRhYnMuXCI7XHJcblxyXG5cdEBJbnB1dChcImZsZXhpYmxlSWRcIilcclxuXHRwdWJsaWMgZmxleGlibGVJZCA9ICcnO1xyXG5cclxuXHRASW5wdXQoXCJjb2xsYXBzZWRcIilcclxuXHRwdWJsaWMgY29sbGFwc2VkID0gZmFsc2U7XHJcblx0XHJcblx0QE91dHB1dCgnb25jaGFuZ2UnKVxyXG5cdHByaXZhdGUgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcblx0XHRsZXQgZGVmYXVsdEluZGV4ID0gIHRoaXMucG9waG92ZXIgPyAtMSA6IDA7XHJcblx0XHR0aGlzLnRhYnMgPSBbXTtcclxuXHRcdHRoaXMuaXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKHRhYkluc3RhbmNlLCBpbmRleCkgPT4ge1xyXG5cdFx0XHR0YWJJbnN0YW5jZS5pbmRleCA9IGluZGV4O1xyXG5cdFx0XHR0YWJJbnN0YW5jZS5mbGV4aWJsZUlkID0gdGhpcy5mbGV4aWJsZUlkO1xyXG5cdFx0XHRpZih0YWJJbnN0YW5jZS5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdGRlZmF1bHRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdGlmICh0YWJJbnN0YW5jZS50YWJpY29uIHx8IHRhYkluc3RhbmNlLnRhYmFsdGljb24pIHtcclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnRhYnMucHVzaCh0YWJJbnN0YW5jZSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLnRhYnMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0VGFiKCBkZWZhdWx0SW5kZXggKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGRlZmF1bHRJbmRleDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGtleXVwKGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdGxldCBpZCA9IHVuZGVmaW5lZDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzNyAmJiAodGhpcy5wb3NpdGlvbiA9PT0gJ3RvcCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScpKSB7IC8vIGxlZnQgYXJyb3dcclxuXHRcdFx0aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyAnLXRhYi0nICsgKGluZGV4IC0gMSkpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOSAmJiAodGhpcy5wb3NpdGlvbiA9PT0gJ3RvcCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScpKSB7Ly8gcmdodCBhcnJvd1xyXG5cdFx0XHRpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArICctdGFiLScgKyAoaW5kZXggKyAxKSk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM4ICYmICh0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JykpIHsgLy8gdXAgYXJyb3dcclxuXHRcdFx0aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyAnLXRhYi0nICsgKGluZGV4ICsgMSkpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCAmJiAodGhpcy5wb3NpdGlvbiA9PT0gJ2xlZnQnIHx8IHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcpKSB7Ly8gZG93biBhcnJvd1xyXG5cdFx0XHRpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArICctdGFiLScgKyAoaW5kZXggLSAxKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoaWQpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0XHRcdGlkLmZvY3VzKCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2VsZWN0VGFiKGluZGV4OiBudW1iZXIpIHtcclxuXHRcdGlmICh0aGlzLnNlbGVjdGVkSW5kZXggIT0gaW5kZXgpIHtcclxuXHRcdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHRcdHRhYi5kZWFjdGl2YXRlKHRydWUpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGluZGV4ID4gLTEpIHtcclxuXHRcdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmFjdGl2YXRlKCk7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdFx0dGhpcy5wb3BwZWQgPSB0cnVlO1xyXG5cdFx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcblx0XHRcdFx0XHRzZWxlY3RlZEluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRcdHNlbGVjdGVkVGl0bGU6IHRoaXMudGFic1tpbmRleF0udGl0bGVcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclRhYihpbmRleDogbnVtYmVyLCBmbGFnOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5wb3Bob3Zlcikge1xyXG5cdFx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdFx0dGFiLmRlYWN0aXZhdGUoZmFsc2UpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGluZGV4ID4gLTEpe1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uaG92ZXIoZmxhZyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5wb3BwZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMSB8fCBmbGFnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=