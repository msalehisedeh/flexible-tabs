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
        function FlexibleTabComponent() {
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
        FlexibleTabComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'flexible-tab',
                        template: "    \r\n<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template\"></ng-content>\r\n",
                        styles: [":host{padding:0;margin:0;width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        FlexibleTabComponent.ctorParameters = function () { return []; };
        FlexibleTabComponent.propDecorators = {
            selected: [{ type: core.Input, args: ["selected",] }],
            title: [{ type: core.Input, args: ["title",] }],
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
                });
                if (index > -1) {
                    this.tabs[index].selected = true;
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
                    });
                    if (index > -1) {
                        this.tabs[index].hovered = flag;
                    }
                    this.popped = this.selectedIndex > -1 || flag;
                }
            };
        FlexibleTabsComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'flexible-tabs',
                        template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"tabs-viewport\" [class.popper]=\"pophover\" [class.pop]=\"popped\" (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                        styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
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

    exports.FlexibleTabComponent = FlexibleTabComponent;
    exports.FlexibleTabsComponent = FlexibleTabsComponent;
    exports.FlexibleTabsModule = FlexibleTabsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtdGFicy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9mbGV4aWJsZS10YWJzL3NyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZsZXhpYmxlLXRhYnMvc3JjL2FwcC9mbGV4aWJsZS10YWJzL2ZsZXhpYmxlLXRhYnMtbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0Q29udGVudENoaWxkcmVuLFxyXG5cdFF1ZXJ5TGlzdCxcclxuXHRBZnRlckNvbnRlbnRJbml0LFxyXG5cdEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGVudW0gVGFiVHlwZXMge1xyXG5cdGJ1dHRvbiA9IFwiYnV0dG9uXCIsIFxyXG5cdHRhYiA9IFwidGFiXCIsIFxyXG5cdHBsYWluID0gXCJwbGFpblwiLCBcclxuXHRpY29uID0gXCJpY29uXCIsIFxyXG5cdHJhZGlvID0gXCJyYWRpb1wiXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFRhYlBvc2l0aW9ucyB7XHJcblx0dG9wID0gXCJ0b3BcIiwgXHJcblx0bGVmdCA9IFwibGVmdFwiLCBcclxuXHRyaWdodCA9IFwicmlnaHRcIiwgXHJcblx0Ym90dG9tID0gXCJib3R0b21cIlxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYicsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFiQ29tcG9uZW50IHtcclxuXHJcblx0aG92ZXJlZCA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcInNlbGVjdGVkXCIpXHJcbiAgICBwdWJsaWMgc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJ0aXRsZVwiKVxyXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGFiYWx0aWNvblwiKVxyXG4gICAgcHVibGljIHRhYmFsdGljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiaWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgICBwdWJsaWMgc291cmNlRGF0YTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0dGVtcGxhdGVDb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHtkYXRhOiB0aGlzLnNvdXJjZURhdGEgfTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLXRhYnMnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFic0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQgIHtcclxuXHR0YWJzID0gW107XHJcblx0c2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cdGlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblx0cG9wcGVkID0gZmFsc2U7XHJcblxyXG5cdEBDb250ZW50Q2hpbGRyZW4oRmxleGlibGVUYWJDb21wb25lbnQpXHJcblx0Y2hpbGRyZW46IFF1ZXJ5TGlzdDxGbGV4aWJsZVRhYkNvbXBvbmVudD47XHJcblxyXG4gICAgQElucHV0KFwicG9zaXRpb25cIilcclxuICAgIHB1YmxpYyBwb3NpdGlvbiA9IFRhYlBvc2l0aW9ucy50b3A7XHJcblxyXG4gICAgQElucHV0KFwidHlwZVwiKVxyXG4gICAgcHVibGljIHR5cGUgPSBUYWJUeXBlcy50YWI7XHJcblxyXG4gICAgQElucHV0KFwicG9waG92ZXJcIilcclxuICAgIHB1YmxpYyBwb3Bob3ZlciA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJjbGljayB0byBzZWxlY3QgdGFiIFwiO1xyXG5cclxuXHRAT3V0cHV0KCdvbmNoYW5nZScpXHJcblx0cHJpdmF0ZSBvbmNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuXHRcdHRoaXMudGFicyA9IFtdO1xyXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5wb3Bob3ZlciA/IC0xIDogMDtcclxuXHRcdHRoaXMuaXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goKHRhYkluc3RhbmNlLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRpZih0YWJJbnN0YW5jZS5zZWxlY3RlZCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdGlmICh0YWJJbnN0YW5jZS50YWJpY29uIHx8IHRhYkluc3RhbmNlLnRhYmFsdGljb24pIHtcclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnRhYnMucHVzaCh0YWJJbnN0YW5jZSk7XHJcblx0XHR9KTtcclxuXHRcdGlmICh0aGlzLnRhYnMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0VGFiKCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGtleXVwKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpbmRleCkge1xyXG5cdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHR0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0dGFiLmhvdmVyZWQgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKGluZGV4ID4gLTEpIHtcclxuXHRcdFx0dGhpcy50YWJzW2luZGV4XS5zZWxlY3RlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMub25jaGFuZ2UuZW1pdCh7XHJcblx0XHRcdFx0c2VsZWN0ZWRJbmRleDogaW5kZXgsXHJcblx0XHRcdFx0c2VsZWN0ZWRUaXRsZTogdGhpcy50YWJzW2luZGV4XS50aXRsZVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJUYWIoaW5kZXgsIGZsYWcpIHtcclxuXHRcdGlmICh0aGlzLnBvcGhvdmVyKSB7XHJcblx0XHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0XHR0YWIuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYgKGluZGV4ID4gLTEpe1xyXG5cdFx0XHRcdHRoaXMudGFic1tpbmRleF0uaG92ZXJlZCA9IGZsYWc7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5wb3BwZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPiAtMSB8fCBmbGFnO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iLCIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBGbGV4aWJsZVRhYnNDb21wb25lbnQsIEZsZXhpYmxlVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS50YWJzLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZsZXhpYmxlVGFic0NvbXBvbmVudCxcclxuICAgICAgICBGbGV4aWJsZVRhYkNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBGbGV4aWJsZVRhYnNDb21wb25lbnQsXHJcbiAgICAgICAgRmxleGlibGVUYWJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYnNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklucHV0IiwiRXZlbnRFbWl0dGVyIiwiQ29udGVudENoaWxkcmVuIiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUE7O1FBV0MsUUFBUyxRQUFRO1FBQ2pCLEtBQU0sS0FBSztRQUNYLE9BQVEsT0FBTztRQUNmLE1BQU8sTUFBTTtRQUNiLE9BQVEsT0FBTzs7OztRQUlmLEtBQU0sS0FBSztRQUNYLE1BQU8sTUFBTTtRQUNiLE9BQVEsT0FBTztRQUNmLFFBQVMsUUFBUTs7O1FBOEJkOzJCQXBCTyxLQUFLOzRCQUdNLEtBQUs7U0FpQlA7Ozs7UUFFbkIsOENBQWU7OztZQUFmO2dCQUNDLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ2hDOztvQkEvQkRBLGNBQVMsU0FBQzt3QkFDVixRQUFRLEVBQUUsY0FBYzt3QkFDeEIsbVRBQTRDOztxQkFFNUM7Ozs7OytCQUtJQyxVQUFLLFNBQUMsVUFBVTs0QkFHaEJBLFVBQUssU0FBQyxPQUFPO2lDQUdiQSxVQUFLLFNBQUMsWUFBWTs4QkFHbEJBLFVBQUssU0FBQyxTQUFTOytCQUdmQSxVQUFLLFNBQUMsVUFBVTtpQ0FHaEJBLFVBQUssU0FBQyxNQUFNOzttQ0F2RGpCOzs7UUErRkk7d0JBdkJJLEVBQUU7aUNBQ08sQ0FBQyxDQUFDOytCQUNKLEtBQUs7MEJBQ1YsS0FBSzs0QkFNTyxZQUFZLENBQUMsR0FBRzt3QkFHcEIsUUFBUSxDQUFDLEdBQUc7NEJBR1IsS0FBSzsyQkFHTixzQkFBc0I7NEJBR3ZCLElBQUlDLGlCQUFZLEVBQUU7U0FFbEI7Ozs7UUFF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