import { Component, Input, Output, ContentChildren, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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
var FlexibleTabComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'flexible-tab',
                    template: "    \r\n<ng-container  \r\n    *ngIf=\"((!hovered && selected) || hovered) && template\"\r\n    [ngTemplateOutlet]=\"template\" \r\n    [ngTemplateOutletContext]=\"templateContext()\"></ng-container>\r\n\r\n<ng-content *ngIf=\"((!hovered && selected) || hovered) && !template\"></ng-content>\r\n",
                    styles: [":host{padding:0;margin:0;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleTabComponent.ctorParameters = function () { return []; };
    FlexibleTabComponent.propDecorators = {
        selected: [{ type: Input, args: ["selected",] }],
        title: [{ type: Input, args: ["title",] }],
        tabalticon: [{ type: Input, args: ["tabalticon",] }],
        tabicon: [{ type: Input, args: ["tabicon",] }],
        template: [{ type: Input, args: ["template",] }],
        sourceData: [{ type: Input, args: ["data",] }]
    };
    return FlexibleTabComponent;
}());
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
        { type: Component, args: [{
                    selector: 'flexible-tabs',
                    template: "\r\n<div class=\"flexible-tabs {{type}} {{position}}\">\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'top' || position === 'left'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\"\r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'left'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n    <div class=\"tabs-viewport\" [class.popper]=\"pophover\" [class.pop]=\"popped\" (mouseleave)=\"hoverTab(-1, false)\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n    <div class=\"tabs-control\" role=\"list\" *ngIf=\"position === 'bottom' || position === 'right'\">\r\n        <a *ngFor=\"let tab of tabs; let i = index\" \r\n            role=\"listitem\" \r\n            tabindex=\"0\"\r\n            (keyup)=\"keyup($event)\" \r\n            (click)=\"selectTab(i)\" \r\n            (mouseenter)=\"hoverTab(i, true)\"\r\n            [title]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon)) ? tab.title : ''\" \r\n            [class.selected]=\"tab.selected\">\r\n            <span *ngIf=\"tab.tabicon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabicon && !tab.tabalticon && !tab.selected\" [class]=\"tab.tabicon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"tab.tabalticon && tab.selected\" [class]=\"tab.tabalticon\" aria-hidden=\"true\"></span>\r\n            <span *ngIf=\"!tab.tabicon && !tab.tabalticon && isIconified && position === 'right'\" class=\"place-icon\" aria-hidden=\"true\"></span>\r\n            <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n            <span class=\"tab-title\" [class.off-screen]=\"type === 'radio' || (type === 'icon' && (tab.tabicon || tab.tabalticon))\" [textContent]=\"tab.title\"></span>\r\n        </a>\r\n    </div>\r\n</div>\r\n",
                    styles: [".flexible-tabs{position:relative;display:flex;width:100%}.flexible-tabs .place-icon{width:17px;height:16px;display:inline-block}.flexible-tabs .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}.flexible-tabs .tabs-viewport{box-sizing:border-box;padding:10px;min-height:150px}.flexible-tabs .tabs-viewport.popper{opacity:0;pointer-events:none}.flexible-tabs .tabs-viewport.popper *{pointer-events:none}.flexible-tabs .tabs-viewport.popper.pop{opacity:1;pointer-events:all}.flexible-tabs .tabs-viewport.popper.pop *{pointer-events:inherit}.flexible-tabs .tabs-control{z-index:2;flex-wrap:wrap-reverse;display:flex}.flexible-tabs .tabs-control a{box-sizing:border-box;white-space:nowrap;padding:2px 15px;background-color:#fdfeff;color:#999}.flexible-tabs .tabs-control a:hover{background-color:#fff;color:#ff3e58}.flexible-tabs .tabs-control a.selected{background-color:#fff;color:#000;font-weight:700}.flexible-tabs.top{flex-direction:column}.flexible-tabs.top.plain .tabs-control a{margin:0 2px}.flexible-tabs.top.plain .tabs-viewport{margin:5px 0}.flexible-tabs.top.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.top.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.top.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.top.radio .tabs-viewport{margin:5px 0}.flexible-tabs.top.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.top.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.top.button .tabs-viewport{margin:5px 0}.flexible-tabs.top.icon .tabs-control a{margin:0 2px}.flexible-tabs.top.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.top.tab .tabs-control{margin-bottom:-1px}.flexible-tabs.top.tab .tabs-control a{border:1px solid #ddd;border-radius:4px 4px 0 0}.flexible-tabs.top.tab .tabs-control a.selected{border-bottom-color:#fff}.flexible-tabs.top.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom{flex-direction:column}.flexible-tabs.bottom.plain .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.plain .tabs-control a{margin:0 2px}.flexible-tabs.bottom.plain .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.radio .tabs-control a{margin:0 2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.bottom.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.bottom.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.bottom.radio .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.button .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc}.flexible-tabs.bottom.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.bottom.button .tabs-viewport{margin:5px 0}.flexible-tabs.bottom.icon .tabs-control{flex-wrap:wrap}.flexible-tabs.bottom.icon .tabs-control a{margin:0 2px}.flexible-tabs.bottom.icon .tabs-viewport{border:1px solid #ddd}.flexible-tabs.bottom.tab .tabs-control{flex-wrap:wrap;margin-top:-1px}.flexible-tabs.bottom.tab .tabs-control a{border:1px solid #ddd;border-radius:0 0 4px 4px}.flexible-tabs.bottom.tab .tabs-control a.selected{border-top-color:#fff}.flexible-tabs.bottom.tab .tabs-viewport{border:1px solid #ddd}.flexible-tabs.left{flex-direction:row}.flexible-tabs.left.plain .tabs-control{flex:0 0 10%;border-right:1px solid #ddd}.flexible-tabs.left.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.left.plain .tabs-viewport{flex:0 0 10%;margin:5px 0}.flexible-tabs.left.radio .tabs-control{flex:0 0 1%}.flexible-tabs.left.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.left.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.left.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.left.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.button .tabs-control{flex:0 0 10%}.flexible-tabs.left.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.left.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.left.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.left.icon .tabs-control{flex:0 0 10%}.flexible-tabs.left.icon .tabs-control a{width:100%;display:table;margin:0 2px}.flexible-tabs.left.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.left.tab .tabs-control{flex:0 0 10%;margin-right:-1px}.flexible-tabs.left.tab .tabs-control a{border:1px solid #ddd;float:left;border-radius:4px 0 0 4px;width:100%;display:table}.flexible-tabs.left.tab .tabs-control a.selected{border-right-color:#fff}.flexible-tabs.left.tab .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right{flex-direction:row}.flexible-tabs.right.plain .tabs-control{flex:0 0 10%;border-left:1px solid #ddd}.flexible-tabs.right.plain .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.plain .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.radio .tabs-control{flex:0 0 1%}.flexible-tabs.right.radio .tabs-control a{margin:2px;padding:2px 5px;background-color:#2e32ff;border-radius:50%;width:25px;color:#fff}.flexible-tabs.right.radio .tabs-control a:hover{color:#ff3e58;background-color:#e1e2f7}.flexible-tabs.right.radio .tabs-control a.selected{background-color:#8687ad}.flexible-tabs.right.radio .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.button .tabs-control{flex:0 0 10%}.flexible-tabs.right.button .tabs-control a{border:1px solid #888;margin:0 2px;border-radius:4px;background-color:#f0f0f0cc;width:100%;display:table}.flexible-tabs.right.button .tabs-control a.selected{background-color:#2e32ff;color:#fff}.flexible-tabs.right.button .tabs-viewport{flex:1;margin:5px 0}.flexible-tabs.right.icon .tabs-control{flex:0 0 10%}.flexible-tabs.right.icon .tabs-control a{margin:0 2px;width:100%;display:table}.flexible-tabs.right.icon .tabs-viewport{flex:1;border:1px solid #ddd}.flexible-tabs.right.tab .tabs-control{flex:0 0 10%;margin-left:-1px}.flexible-tabs.right.tab .tabs-control a{border:1px solid #ddd;display:table;float:left;border-radius:0 4px 4px 0;width:100%}.flexible-tabs.right.tab .tabs-control a.selected{border-left-color:#fff}.flexible-tabs.right.tab .tabs-viewport{flex:1;border:1px solid #ddd}@media screen and (max-width:600px){.flexible-tabs{display:table}.tabs-control{display:block}.tabs-control a{width:100%;display:table}.tabs-viewport{margin:5px 0}}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var FlexibleTabsModule = /** @class */ (function () {
    function FlexibleTabsModule() {
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

export { FlexibleTabComponent, FlexibleTabsComponent, FlexibleTabsModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtdGFicy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNlZGVoL2ZsZXhpYmxlLXRhYnMvc3JjL2FwcC9mbGV4aWJsZS10YWJzL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2VkZWgvZmxleGlibGUtdGFicy9zcmMvYXBwL2ZsZXhpYmxlLXRhYnMvZmxleGlibGUtdGFicy1tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgYSB0YWJsZSB3aGljaCBpcyB1c2luZyB0aGUgZ2l2ZW4gRmxleGlibGVUYWJsZUhlYWRlciBzZXQgaW5cclxuKiBvcmRlciB0byB0YWJ1bGF0ZSB0aGUgZ2l2ZW4gZGF0YS4gQXMgcGVyIGRlZmluaXRpb24gb2YgZWFyY2ggaGVhZGVyIGNvbXBvbmVudCxcclxuKiBhIGNvbHVtbiBjb3VsZCBiZSBoaWRkZW4sIHNvcnRhYmxlLCBvciBkcmFnZ2FibGUuIEVhY2ggdGFibGUgcm93IGNhbiBleHBhbmQvY29sbGFwc2VcclxuKiBvciByZXNwb25kIHRvIGEgY2xpY2sgYWN0aW9uLlxyXG4qL1xyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRDb250ZW50Q2hpbGRyZW4sXHJcblx0UXVlcnlMaXN0LFxyXG5cdEFmdGVyQ29udGVudEluaXQsXHJcblx0RXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgZW51bSBUYWJUeXBlcyB7XHJcblx0YnV0dG9uID0gXCJidXR0b25cIiwgXHJcblx0dGFiID0gXCJ0YWJcIiwgXHJcblx0cGxhaW4gPSBcInBsYWluXCIsIFxyXG5cdGljb24gPSBcImljb25cIiwgXHJcblx0cmFkaW8gPSBcInJhZGlvXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVGFiUG9zaXRpb25zIHtcclxuXHR0b3AgPSBcInRvcFwiLCBcclxuXHRsZWZ0ID0gXCJsZWZ0XCIsIFxyXG5cdHJpZ2h0ID0gXCJyaWdodFwiLCBcclxuXHRib3R0b20gPSBcImJvdHRvbVwiXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFiJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUudGFiLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS50YWIuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJDb21wb25lbnQge1xyXG5cclxuXHRob3ZlcmVkID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwic2VsZWN0ZWRcIilcclxuICAgIHB1YmxpYyBzZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIEBJbnB1dChcInRpdGxlXCIpXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJ0YWJhbHRpY29uXCIpXHJcbiAgICBwdWJsaWMgdGFiYWx0aWNvbjogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcInRhYmljb25cIilcclxuICAgIHB1YmxpYyB0YWJpY29uOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBzb3VyY2VEYXRhOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuXHR0ZW1wbGF0ZUNvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4ge2RhdGE6IHRoaXMuc291cmNlRGF0YSB9O1xyXG5cdH1cclxufVxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtdGFicycsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVUYWJzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCAge1xyXG5cdHRhYnMgPSBbXTtcclxuXHRzZWxlY3RlZEluZGV4ID0gLTE7XHJcblx0aXNJY29uaWZpZWQgPSBmYWxzZTtcclxuXHRwb3BwZWQgPSBmYWxzZTtcclxuXHJcblx0QENvbnRlbnRDaGlsZHJlbihGbGV4aWJsZVRhYkNvbXBvbmVudClcclxuXHRjaGlsZHJlbjogUXVlcnlMaXN0PEZsZXhpYmxlVGFiQ29tcG9uZW50PjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3NpdGlvblwiKVxyXG4gICAgcHVibGljIHBvc2l0aW9uID0gVGFiUG9zaXRpb25zLnRvcDtcclxuXHJcbiAgICBASW5wdXQoXCJ0eXBlXCIpXHJcbiAgICBwdWJsaWMgdHlwZSA9IFRhYlR5cGVzLnRhYjtcclxuXHJcbiAgICBASW5wdXQoXCJwb3Bob3ZlclwiKVxyXG4gICAgcHVibGljIHBvcGhvdmVyID0gZmFsc2U7XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcImNsaWNrIHRvIHNlbGVjdCB0YWIgXCI7XHJcblxyXG5cdEBPdXRwdXQoJ29uY2hhbmdlJylcclxuXHRwcml2YXRlIG9uY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuXHJcblx0bmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG5cdFx0dGhpcy50YWJzID0gW107XHJcblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnBvcGhvdmVyID8gLTEgOiAwO1xyXG5cdFx0dGhpcy5pc0ljb25pZmllZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgodGFiSW5zdGFuY2UsIGluZGV4KSA9PiB7XHJcblx0XHRcdGlmKHRhYkluc3RhbmNlLnNlbGVjdGVkKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmlzSWNvbmlmaWVkID0gdHJ1ZTtcclxuXHRcdFx0aWYgKHRhYkluc3RhbmNlLnRhYmljb24gfHwgdGFiSW5zdGFuY2UudGFiYWx0aWNvbikge1xyXG5cdFx0XHRcdHRoaXMuaXNJY29uaWZpZWQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudGFicy5wdXNoKHRhYkluc3RhbmNlKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHRoaXMudGFicy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0a2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRldmVudC50YXJnZXQuY2xpY2soKTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2VsZWN0VGFiKGluZGV4KSB7XHJcblx0XHR0aGlzLnRhYnMubWFwKCh0YWIpPT57XHJcblx0XHRcdHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHR0YWIuaG92ZXJlZCA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHRpZiAoaW5kZXggPiAtMSkge1xyXG5cdFx0XHR0aGlzLnRhYnNbaW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcblx0XHRcdHRoaXMucG9wcGVkID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5vbmNoYW5nZS5lbWl0KHtcclxuXHRcdFx0XHRzZWxlY3RlZEluZGV4OiBpbmRleCxcclxuXHRcdFx0XHRzZWxlY3RlZFRpdGxlOiB0aGlzLnRhYnNbaW5kZXhdLnRpdGxlXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRob3ZlclRhYihpbmRleCwgZmxhZykge1xyXG5cdFx0aWYgKHRoaXMucG9waG92ZXIpIHtcclxuXHRcdFx0dGhpcy50YWJzLm1hcCgodGFiKT0+e1xyXG5cdFx0XHRcdHRhYi5ob3ZlcmVkID0gZmFsc2U7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZiAoaW5kZXggPiAtMSl7XHJcblx0XHRcdFx0dGhpcy50YWJzW2luZGV4XS5ob3ZlcmVkID0gZmxhZztcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLnBvcHBlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA+IC0xIHx8IGZsYWc7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiIsIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGZsZXhpYmxlIHRhYnMgaW4gYSBsYXp5IGxvYWQgZmFzaGlvbi5cclxuKi9cclxuaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IEZsZXhpYmxlVGFic0NvbXBvbmVudCwgRmxleGlibGVUYWJDb21wb25lbnQgfSBmcm9tICcuL2ZsZXhpYmxlLnRhYnMuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmxleGlibGVUYWJzQ29tcG9uZW50LFxyXG4gICAgICAgIEZsZXhpYmxlVGFiQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEZsZXhpYmxlVGFic0NvbXBvbmVudCxcclxuICAgICAgICBGbGV4aWJsZVRhYkNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlVGFic01vZHVsZSB7fVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1BOztJQVdDLFFBQVMsUUFBUTtJQUNqQixLQUFNLEtBQUs7SUFDWCxPQUFRLE9BQU87SUFDZixNQUFPLE1BQU07SUFDYixPQUFRLE9BQU87Ozs7SUFJZixLQUFNLEtBQUs7SUFDWCxNQUFPLE1BQU07SUFDYixPQUFRLE9BQU87SUFDZixRQUFTLFFBQVE7OztJQThCZDt1QkFwQk8sS0FBSzt3QkFHTSxLQUFLO0tBaUJQOzs7O0lBRW5CLDhDQUFlOzs7SUFBZjtRQUNDLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ2hDOztnQkEvQkQsU0FBUyxTQUFDO29CQUNWLFFBQVEsRUFBRSxjQUFjO29CQUN4QixtVEFBNEM7O2lCQUU1Qzs7Ozs7MkJBS0ksS0FBSyxTQUFDLFVBQVU7d0JBR2hCLEtBQUssU0FBQyxPQUFPOzZCQUdiLEtBQUssU0FBQyxZQUFZOzBCQUdsQixLQUFLLFNBQUMsU0FBUzsyQkFHZixLQUFLLFNBQUMsVUFBVTs2QkFHaEIsS0FBSyxTQUFDLE1BQU07OytCQXZEakI7OztJQStGSTtvQkF2QkksRUFBRTs2QkFDTyxDQUFDLENBQUM7MkJBQ0osS0FBSztzQkFDVixLQUFLO3dCQU1PLFlBQVksQ0FBQyxHQUFHO29CQUdwQixRQUFRLENBQUMsR0FBRzt3QkFHUixLQUFLO3VCQUdOLHNCQUFzQjt3QkFHdkIsSUFBSSxZQUFZLEVBQUU7S0FFbEI7Ozs7SUFFbkIsa0RBQWtCOzs7SUFBbEI7UUFBQSxpQkFrQkM7UUFqQkEsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FB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