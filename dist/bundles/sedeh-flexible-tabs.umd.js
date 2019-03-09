(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/flexible-tabs', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['flexible-tabs'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var TabTypes = {
        button: "button",
        tab: "tab",
        plain: "plain",
        icon: "icon",
        radio: "radio",
    };
    /** @enum {string} */
    var TabPositions = {
        top: "top",
        left: "left",
        right: "right",
        bottom: "bottom",
    };
    var FlexibleTabComponent = (function () {
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
                        var instance = ((this.dynamicComponent.instance));
                        this.host.nativeElement.append(/** @type {?} */ (((this.dynamicComponent.hostView)).rootNodes[0]));
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
            { type: core.Component, args: [{
                        selector: 'flexible-tab',
                        template: "    \r\n<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template && !component\"></ng-content>\r\n<div *ngIf=\"dynamicallyLoadedComponent()\"></div>\r\n",
                        styles: [":host{padding:0;margin:0;width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        FlexibleTabComponent.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ApplicationRef },
                { type: core.Injector },
                { type: core.ElementRef },
                { type: core.ChangeDetectorRef }
            ];
        };
        FlexibleTabComponent.propDecorators = {
            selected: [{ type: core.Input, args: ["selected",] }],
            title: [{ type: core.Input, args: ["title",] }],
            component: [{ type: core.Input, args: ["component",] }],
            tabalticon: [{ type: core.Input, args: ["tabalticon",] }],
            tabicon: [{ type: core.Input, args: ["tabicon",] }],
            template: [{ type: core.Input, args: ["template",] }],
            sourceData: [{ type: core.Input, args: ["data",] }]
        };
        return FlexibleTabComponent;
    }());
    var FlexibleTabsComponent = (function () {
        function FlexibleTabsComponent() {
            this.tabs = [];
            this.selectedIndex = -1;
            this.isIconified = false;
            this.popped = false;
            this.position = TabPositions.top;
            this.type = TabTypes.tab;
            this.pophover = false;
            this.message = "click to select tab ";
            this.onchange = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'flexible-tabs',
                        template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"tabs-viewport\" [class.popper]=\"pophover\" [class.pop]=\"popped\" (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                        styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
                    }] }
        ];
        /** @nocollapse */
        FlexibleTabsComponent.ctorParameters = function () { return []; };
        FlexibleTabsComponent.propDecorators = {
            children: [{ type: core.ContentChildren, args: [FlexibleTabComponent,] }],
            position: [{ type: core.Input, args: ["position",] }],
            type: [{ type: core.Input, args: ["type",] }],
            pophover: [{ type: core.Input, args: ["pophover",] }],
            message: [{ type: core.Input, args: ["message",] }],
            onchange: [{ type: core.Output, args: ['onchange',] }]
        };
        return FlexibleTabsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlexibleTabsModule = (function () {
        function FlexibleTabsModule() {
        }
        FlexibleTabsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
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
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return FlexibleTabsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.TabTypes = TabTypes;
    exports.TabPositions = TabPositions;
    exports.FlexibleTabComponent = FlexibleTabComponent;
    exports.FlexibleTabsComponent = FlexibleTabsComponent;
    exports.FlexibleTabsModule = FlexibleTabsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtdGFicy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9mbGV4aWJsZS10YWJzL3NyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZsZXhpYmxlLXRhYnMvc3JjL2FwcC9mbGV4aWJsZS10YWJzL2ZsZXhpYmxlLXRhYnMtbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0Q29udGVudENoaWxkcmVuLFxyXG5cdFF1ZXJ5TGlzdCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdENoYW5nZURldGVjdG9yUmVmLFxyXG5cdEluamVjdG9yLFxyXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuXHRFbWJlZGRlZFZpZXdSZWYsXHJcblx0RWxlbWVudFJlZixcclxuICAgIEFwcGxpY2F0aW9uUmVmLFxyXG5cdEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGVudW0gVGFiVHlwZXMge1xyXG5cdGJ1dHRvbiA9IFwiYnV0dG9uXCIsIFxyXG5cdHRhYiA9IFwidGFiXCIsIFxyXG5cdHBsYWluID0gXCJwbGFpblwiLCBcclxuXHRpY29uID0gXCJpY29uXCIsIFxyXG5cdHJhZGlvID0gXCJyYWRpb1wiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRhYlBvc2l0aW9ucyB7XHJcblx0dG9wID0gXCJ0b3BcIiwgXHJcblx0bGVmdCA9IFwibGVmdFwiLCBcclxuXHRyaWdodCA9IFwicmlnaHRcIiwgXHJcblx0Ym90dG9tID0gXCJib3R0b21cIlxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIER5bmFtaWNUYWJDb250ZW50Q29tcG9uZW50IHtcclxuXHRkYXRhOiBhbnk7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFiJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJDb21wb25lbnQge1xyXG5cclxuXHRob3ZlcmVkID0gZmFsc2U7XHJcblx0ZHluYW1pY0NvbXBvbmVudDogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNlbGVjdGVkXCIpXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJ0aXRsZVwiKVxyXG5cdHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG5cdFxyXG5cdEBJbnB1dChcImNvbXBvbmVudFwiKVxyXG5cdHB1YmxpYyBjb21wb25lbnQ6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJhbHRpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiYWx0aWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRhYmljb25cIilcclxuICAgIHB1YmxpYyB0YWJpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBzb3VyY2VEYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG5cdFx0cHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG5cdFx0cHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXHJcblx0XHRwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsXHJcblx0XHRwdWJsaWMgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXHJcblx0KSB7fVxyXG5cclxuXHR0ZW1wbGF0ZUNvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4ge2RhdGE6IHRoaXMuc291cmNlRGF0YSB9O1xyXG5cdH1cclxuXHRkeW5hbWljYWxseUxvYWRlZENvbXBvbmVudCgpIHtcclxuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZUR5bmFtaWNDb21wb25lbnQoKTtcclxuXHRcdFx0XHRjb25zdCBpbnN0YW5jZSA9ICg8RHluYW1pY1RhYkNvbnRlbnRDb21wb25lbnQ+dGhpcy5keW5hbWljQ29tcG9uZW50Lmluc3RhbmNlKTtcclxuXHRcdFx0XHR0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5hcHBlbmQoKHRoaXMuZHluYW1pY0NvbXBvbmVudC5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50KTtcclxuXHRcdFx0XHRpbnN0YW5jZS5kYXRhID0gdGhpcy5zb3VyY2VEYXRhO1xyXG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuZHluYW1pY0NvbXBvbmVudCkge1xyXG5cdFx0XHRcdHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0cHJpdmF0ZSBpbml0aWFsaXplRHluYW1pY0NvbXBvbmVudCgpIHtcclxuXHRcdGlmICghdGhpcy5keW5hbWljQ29tcG9uZW50KSB7XHJcblx0XHRcdHRoaXMuZHluYW1pY0NvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcblx0XHRcdFx0LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMuY29tcG9uZW50KVxyXG5cdFx0XHRcdC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XHJcblxyXG5cdFx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHRoaXMuZHluYW1pY0NvbXBvbmVudC5ob3N0Vmlldyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWJzJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0ICB7XHJcblx0dGFicyA9IFtdO1xyXG5cdHNlbGVjdGVkSW5kZXggPSAtMTtcclxuXHRpc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cdHBvcHBlZCA9IGZhbHNlO1xyXG5cclxuXHRAQ29udGVudENoaWxkcmVuKEZsZXhpYmxlVGFiQ29tcG9uZW50KVxyXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8RmxleGlibGVUYWJDb21wb25lbnQ+O1xyXG5cclxuICAgIEBJbnB1dChcInBvc2l0aW9uXCIpXHJcbiAgICBwdWJsaWMgcG9zaXRpb24gPSBUYWJQb3NpdGlvbnMudG9wO1xyXG5cclxuICAgIEBJbnB1dChcInR5cGVcIilcclxuICAgIHB1YmxpYyB0eXBlID0gVGFiVHlwZXMudGFiO1xyXG5cclxuICAgIEBJbnB1dChcInBvcGhvdmVyXCIpXHJcbiAgICBwdWJsaWMgcG9waG92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiY2xpY2sgdG8gc2VsZWN0IHRhYiBcIjtcclxuXHJcblx0QE91dHB1dCgnb25jaGFuZ2UnKVxyXG5cdHByaXZhdGUgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcblx0XHR0aGlzLnRhYnMgPSBbXTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMucG9waG92ZXIgPyAtMSA6IDA7XHJcblx0XHR0aGlzLmlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCh0YWJJbnN0YW5jZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0aWYodGFiSW5zdGFuY2Uuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodGFiSW5zdGFuY2UudGFiaWNvbiB8fCB0YWJJbnN0YW5jZS50YWJhbHRpY29uKSB7XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy50YWJzLnB1c2godGFiSW5zdGFuY2UpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy50YWJzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5zZWxlY3RlZEluZGV4ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRrZXl1cChldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpbmRleDogbnVtYmVyKSB7XHJcblx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHR0YWIuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHR0YWIuZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHR0aGlzLnRhYnNbaW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy50YWJzW2luZGV4XS5kZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcblx0XHRcdFx0c2VsZWN0ZWRJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0c2VsZWN0ZWRUaXRsZTogdGhpcy50YWJzW2luZGV4XS50aXRsZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJUYWIoaW5kZXg6IG51bWJlciwgZmxhZzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMucG9waG92ZXIpIHtcclxuXHRcdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHRcdHRhYi5ob3ZlcmVkID0gZmFsc2U7XHJcblx0XHRcdFx0dGFiLmRldGVjdG9yLmRldGVjdENoYW5nZXMoKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChpbmRleCA+IC0xKXtcclxuXHRcdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmhvdmVyZWQgPSBmbGFnO1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uZGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucG9wcGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID4gLTEgfHwgZmxhZztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgZmxleGlibGUgdGFicyBpbiBhIGxhenkgbG9hZCBmYXNoaW9uLlxyXG4qL1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVUYWJzQ29tcG9uZW50LCBGbGV4aWJsZVRhYkNvbXBvbmVudCB9IGZyb20gJy4vZmxleGlibGUudGFicy5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBGbGV4aWJsZVRhYnNDb21wb25lbnQsXHJcbiAgICAgICAgRmxleGlibGVUYWJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVUYWJzQ29tcG9uZW50LFxyXG4gICAgICAgIEZsZXhpYmxlVGFiQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJzTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJBcHBsaWNhdGlvblJlZiIsIkluamVjdG9yIiwiRWxlbWVudFJlZiIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5wdXQiLCJFdmVudEVtaXR0ZXIiLCJDb250ZW50Q2hpbGRyZW4iLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFNQTs7UUFpQkMsUUFBUyxRQUFRO1FBQ2pCLEtBQU0sS0FBSztRQUNYLE9BQVEsT0FBTztRQUNmLE1BQU8sTUFBTTtRQUNiLE9BQVEsT0FBTzs7OztRQUlmLEtBQU0sS0FBSztRQUNYLE1BQU8sTUFBTTtRQUNiLE9BQVEsT0FBTztRQUNmLFFBQVMsUUFBUTs7O1FBc0NkLDhCQUNNLDBCQUNBLFFBQ0EsVUFDQSxNQUNEO1lBSkMsNkJBQXdCLEdBQXhCLHdCQUF3QjtZQUN4QixXQUFNLEdBQU4sTUFBTTtZQUNOLGFBQVEsR0FBUixRQUFRO1lBQ1IsU0FBSSxHQUFKLElBQUk7WUFDTCxhQUFRLEdBQVIsUUFBUTsyQkE3Qk4sS0FBSzs0QkFJTSxLQUFLO1NBMEJ0Qjs7OztRQUVKLDhDQUFlOzs7WUFBZjtnQkFDQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNoQzs7OztRQUNELHlEQUEwQjs7O1lBQTFCO2dCQUNDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNsQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzs7d0JBQ2xDLElBQU0sUUFBUSxLQUFnQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFDLENBQUM7d0JBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sbUJBQUMsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBZ0MsR0FBRSxTQUFTLENBQUMsQ0FBQyxDQUFnQixFQUFDLENBQUM7d0JBQ3JILFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztxQkFDaEM7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