(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('flexible-tabs', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['flexible-tabs'] = {}),global.ng.core,global.ng.common));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtdGFicy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2ZsZXhpYmxlLXRhYnMvc3JjL2FwcC9mbGV4aWJsZS10YWJzL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnRzIiwibmc6Ly9mbGV4aWJsZS10YWJzL3NyYy9hcHAvZmxleGlibGUtdGFicy9mbGV4aWJsZS10YWJzLW1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdENvbnRlbnRDaGlsZHJlbixcclxuXHRRdWVyeUxpc3QsXHJcblx0QWZ0ZXJDb250ZW50SW5pdCxcclxuXHRFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBlbnVtIFRhYlR5cGVzIHtcclxuXHRidXR0b24gPSBcImJ1dHRvblwiLCBcclxuXHR0YWIgPSBcInRhYlwiLCBcclxuXHRwbGFpbiA9IFwicGxhaW5cIiwgXHJcblx0aWNvbiA9IFwiaWNvblwiLCBcclxuXHRyYWRpbyA9IFwicmFkaW9cIlxyXG59XHJcblxyXG5leHBvcnQgZW51bSBUYWJQb3NpdGlvbnMge1xyXG5cdHRvcCA9IFwidG9wXCIsIFxyXG5cdGxlZnQgPSBcImxlZnRcIiwgXHJcblx0cmlnaHQgPSBcInJpZ2h0XCIsIFxyXG5cdGJvdHRvbSA9IFwiYm90dG9tXCJcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWInLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLnRhYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYkNvbXBvbmVudCB7XHJcblxyXG5cdGhvdmVyZWQgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJzZWxlY3RlZFwiKVxyXG4gICAgcHVibGljIHNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwidGl0bGVcIilcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRhYmFsdGljb25cIilcclxuICAgIHB1YmxpYyB0YWJhbHRpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGFiaWNvblwiKVxyXG4gICAgcHVibGljIHRhYmljb246IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0ZW1wbGF0ZVwiKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwiZGF0YVwiKVxyXG4gICAgcHVibGljIHNvdXJjZURhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG5cdHRlbXBsYXRlQ29udGV4dCgpIHtcclxuXHRcdHJldHVybiB7ZGF0YTogdGhpcy5zb3VyY2VEYXRhIH07XHJcblx0fVxyXG59XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS10YWJzJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUudGFicy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZVRhYnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0ICB7XHJcblx0dGFicyA9IFtdO1xyXG5cdHNlbGVjdGVkSW5kZXggPSAtMTtcclxuXHRpc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cdHBvcHBlZCA9IGZhbHNlO1xyXG5cclxuXHRAQ29udGVudENoaWxkcmVuKEZsZXhpYmxlVGFiQ29tcG9uZW50KVxyXG5cdGNoaWxkcmVuOiBRdWVyeUxpc3Q8RmxleGlibGVUYWJDb21wb25lbnQ+O1xyXG5cclxuICAgIEBJbnB1dChcInBvc2l0aW9uXCIpXHJcbiAgICBwdWJsaWMgcG9zaXRpb24gPSBUYWJQb3NpdGlvbnMudG9wO1xyXG5cclxuICAgIEBJbnB1dChcInR5cGVcIilcclxuICAgIHB1YmxpYyB0eXBlID0gVGFiVHlwZXMudGFiO1xyXG5cclxuICAgIEBJbnB1dChcInBvcGhvdmVyXCIpXHJcbiAgICBwdWJsaWMgcG9waG92ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiY2xpY2sgdG8gc2VsZWN0IHRhYiBcIjtcclxuXHJcblx0QE91dHB1dCgnb25jaGFuZ2UnKVxyXG5cdHByaXZhdGUgb25jaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHRuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcblx0XHR0aGlzLnRhYnMgPSBbXTtcclxuXHRcdHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMucG9waG92ZXIgPyAtMSA6IDA7XHJcblx0XHR0aGlzLmlzSWNvbmlmaWVkID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCh0YWJJbnN0YW5jZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0aWYodGFiSW5zdGFuY2Uuc2VsZWN0ZWQpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHRpZiAodGFiSW5zdGFuY2UudGFiaWNvbiB8fCB0YWJJbnN0YW5jZS50YWJhbHRpY29uKSB7XHJcblx0XHRcdFx0dGhpcy5pc0ljb25pZmllZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy50YWJzLnB1c2godGFiSW5zdGFuY2UpO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAodGhpcy50YWJzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5zZWxlY3RlZEluZGV4ICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRrZXl1cChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaW5kZXgpIHtcclxuXHRcdHRoaXMudGFicy5tYXAoKHRhYik9PntcclxuXHRcdFx0dGFiLnNlbGVjdGVkID0gZmFsc2U7XHJcblx0XHRcdHRhYi5ob3ZlcmVkID0gZmFsc2U7XHJcblx0XHR9KTtcclxuXHRcdGlmIChpbmRleCA+IC0xKSB7XHJcblx0XHRcdHRoaXMudGFic1tpbmRleF0uc2VsZWN0ZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxuXHRcdFx0dGhpcy5wb3BwZWQgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLm9uY2hhbmdlLmVtaXQoe1xyXG5cdFx0XHRcdHNlbGVjdGVkSW5kZXg6IGluZGV4LFxyXG5cdFx0XHRcdHNlbGVjdGVkVGl0bGU6IHRoaXMudGFic1tpbmRleF0udGl0bGVcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyVGFiKGluZGV4LCBmbGFnKSB7XHJcblx0XHRpZiAodGhpcy5wb3Bob3Zlcikge1xyXG5cdFx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdFx0dGFiLmhvdmVyZWQgPSBmYWxzZTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmIChpbmRleCA+IC0xKXtcclxuXHRcdFx0XHR0aGlzLnRhYnNbaW5kZXhdLmhvdmVyZWQgPSBmbGFnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMucG9wcGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID4gLTEgfHwgZmxhZztcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIiwiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgZmxleGlibGUgdGFicyBpbiBhIGxhenkgbG9hZCBmYXNoaW9uLlxyXG4qL1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRmxleGlibGVUYWJzQ29tcG9uZW50LCBGbGV4aWJsZVRhYkNvbXBvbmVudCB9IGZyb20gJy4vZmxleGlibGUudGFicy5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBGbGV4aWJsZVRhYnNDb21wb25lbnQsXHJcbiAgICAgICAgRmxleGlibGVUYWJDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVUYWJzQ29tcG9uZW50LFxyXG4gICAgICAgIEZsZXhpYmxlVGFiQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJzTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJJbnB1dCIsIkV2ZW50RW1pdHRlciIsIkNvbnRlbnRDaGlsZHJlbiIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BOztRQVdDLFFBQVMsUUFBUTtRQUNqQixLQUFNLEtBQUs7UUFDWCxPQUFRLE9BQU87UUFDZixNQUFPLE1BQU07UUFDYixPQUFRLE9BQU87Ozs7UUFJZixLQUFNLEtBQUs7UUFDWCxNQUFPLE1BQU07UUFDYixPQUFRLE9BQU87UUFDZixRQUFTLFFBQVE7OztRQThCZDsyQkFwQk8sS0FBSzs0QkFHTSxLQUFLO1NBaUJQOzs7O1FBRW5CLDhDQUFlOzs7WUFBZjtnQkFDQyxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNoQzs7b0JBL0JEQSxjQUFTLFNBQUM7d0JBQ1YsUUFBUSxFQUFFLGNBQWM7d0JBQ3hCLG1UQUE0Qzs7cUJBRTVDOzs7OzsrQkFLSUMsVUFBSyxTQUFDLFVBQVU7NEJBR2hCQSxVQUFLLFNBQUMsT0FBTztpQ0FHYkEsVUFBSyxTQUFDLFlBQVk7OEJBR2xCQSxVQUFLLFNBQUMsU0FBUzsrQkFHZkEsVUFBSyxTQUFDLFVBQVU7aUNBR2hCQSxVQUFLLFNBQUMsTUFBTTs7bUNBdkRqQjs7O1FBK0ZJO3dCQXZCSSxFQUFFO2lDQUNPLENBQUMsQ0FBQzsrQkFDSixLQUFLOzBCQUNWLEtBQUs7NEJBTU8sWUFBWSxDQUFDLEdBQUc7d0JBR3BCLFFBQVEsQ0FBQyxHQUFHOzRCQUdSLEtBQUs7MkJBR04sc0JBQXNCOzRCQUd2QixJQUFJQyxpQkFBWSxFQUFFO1NBRWxCOzs7O1FBRW5CLGtEQUFrQjs7O1lBQWxCO2dC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